import { createContext } from "react";
import { type ProgramActions } from "../../interfaces/componentConfig";
import { type ProgramStateProps } from "../../interfaces/componentConfig";
import { ProgramaEstudios } from "../../models/ProgramaModel";

type ProgramContextConfig = {
    state: ProgramStateProps,
    dispatch: React.Dispatch<ProgramActions>,
    addProgram: (program: ProgramaEstudios) => void,
    updateProgram: (program: ProgramaEstudios) => void,
    deleteProgram: (id: number) => void,
    searchProgram: (id: number) => void
}

export const ProgramContext = createContext<ProgramContextConfig | undefined>(undefined);