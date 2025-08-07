import { createContext } from "react";
import { type ProgramActions } from "../../interfaces/componentConfig";
import { type ProgramStateProps } from "../../interfaces/componentConfig";

type ProgramContextConfig = {
    state: ProgramStateProps,
    dispatch: React.Dispatch<ProgramActions>,
    getPrograms: (page: number) => Promise<void>,
    addProgram: (program: ProgramaConfig) => Promise<boolean>,
    updateProgram: (updated: ProgramaConfig) => Promise<boolean>,
    deleteProgram: (id: string) => Promise<boolean>,
    searchProgram: (id: string) => void
}

export const ProgramContext = createContext<ProgramContextConfig | undefined>(undefined);