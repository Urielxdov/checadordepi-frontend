import { createContext } from "react";
import type { ProgramStateProps } from "../reducers/ProgramReducer";
import type { ProgramaModel } from "../../interfaces/Models";

type ProgramContextConfig = {
    state: ProgramStateProps,
    getPrograms: (page: number, tk: string) => Promise<void>,
    addProgram: (program: ProgramaModel, tk: string) => Promise<boolean>,
    updateProgram: (updated: ProgramaModel, tk: string) => Promise<boolean>,
    deleteProgram: (id: string, tk: string) => Promise<boolean>,
    searchProgram: (id: string) => void
}

export const ProgramContext = createContext<ProgramContextConfig | undefined>(undefined);