import { createContext } from "react";
import { type ProgramActions } from "../../interfaces/componentConfig";
import { type ProgramStateProps } from "../../interfaces/componentConfig";
import { type ProgramaConfig } from "../../interfaces/ModelsInterfaces";

type ProgramContextConfig = {
    state: ProgramStateProps,
    dispatch: React.Dispatch<ProgramActions>,
    addProgram: (program: ProgramaConfig) => void,
    updateProgram: (updated: ProgramaConfig) => void,
    deleteProgram: (id: number) => void,
    searchProgram: (id: number) => void
}

export const ProgramContext = createContext<ProgramContextConfig | undefined>(undefined);