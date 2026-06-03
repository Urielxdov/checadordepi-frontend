import { useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import type { TokenConfig } from "../../interfaces/httpModels";
import { useNavigate } from "react-router-dom";

const TOKEN_KEY = "access-token";

interface AuthProviderProps {
    children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [jwt, setJwt] = useState<TokenConfig>({ token: "", expiresAt: 0 });
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();

    const scheduleExpiry = (expiresAt: number) => {
        const remaining = expiresAt - Date.now();
        if (remaining <= 0) {
            clear();
            navigate("/");
            return;
        }
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            clear();
            navigate("/");
        }, remaining);
    };

    useEffect(() => {
        const backup = localStorage.getItem(TOKEN_KEY);
        if (backup) {
            const parsed: TokenConfig = JSON.parse(backup);
            setJwt(parsed);
            scheduleExpiry(parsed.expiresAt);
        }
    }, []);

    const store = (tk: string, durationMs: number) => {
        const expiresAt = Date.now() + durationMs;
        const newJWT: TokenConfig = { token: tk, expiresAt };
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, JSON.stringify(newJWT));
        setJwt(newJWT);
        scheduleExpiry(expiresAt);
    };

    const clear = () => {
        localStorage.removeItem(TOKEN_KEY);
        setJwt({ token: "", expiresAt: 0 });
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    return (
        <AuthContext.Provider value={{ token: jwt.token, store, clear }}>
            {children}
        </AuthContext.Provider>
    );
}
