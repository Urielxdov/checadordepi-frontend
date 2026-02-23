import { createContext } from "react";
import { type ProgramActions } from "../../interfaces/componentConfig";
import { type ProgramStateProps } from "../../interfaces/componentConfig";
import type { ProgramaConfig } from "../../interfaces/ModelsInterfaces";

type ProgramContextConfig = {
    state: ProgramStateProps,
    dispatch: React.Dispatch<ProgramActions>,
    getPrograms: (page: number, tk: string) => Promise<void>,
    addProgram: (program: ProgramaConfig, tk: string) => Promise<boolean>,
    updateProgram: (updated: ProgramaConfig, tk: string) => Promise<boolean>,
    deleteProgram: (id: string, tk: string) => Promise<boolean>,
    searchProgram: (id: string) => void
}

export const ProgramContext = createContext<ProgramContextConfig | undefined>(undefined);