import { createContext } from "react";
import { type ProgramActions } from "../../interfaces/componentConfig";
import { type ProgramStateProps } from "../../interfaces/componentConfig";

type ProgramContextConfig = {
    state: ProgramStateProps,
    dispatch: React.Dispatch<ProgramActions>,
    addProgram: (data: FormData) => void,
    updateProgram: (data: FormData) => void,
    deleteProgram: (id: number) => void,
    searchProgram: (id: number) => void
}

export const ProgramContext = createContext<ProgramContextConfig | undefined>(undefined);