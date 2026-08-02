import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"

interface ProtectedRouteProps {
    requiredRole?: string
}

function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
    const { token, role } = useAuthStore()
    if (!token) return <Navigate to="/" replace />
    if (requiredRole && role !== requiredRole) return <Navigate to="/asistencia" replace />
    return <Outlet />
}

export default ProtectedRoute
