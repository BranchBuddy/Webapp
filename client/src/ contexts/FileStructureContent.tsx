import React, {useState, createContext, ReactNode} from "react";
import {FileStructure} from "../components/general/SideBarNav/SideBar";

interface FileStructureContextProps {
    extractedContents: FileStructure[];
    setExtractedContents: React.Dispatch<React.SetStateAction<FileStructure[]>>;
}

export const FileStructureContext = createContext<FileStructureContextProps>(
    {
        extractedContents: [],
        setExtractedContents: () => {
        }

    });

interface FileStructureContextProviderProps {
    children: ReactNode;
}

export const FileStructureContextProvider: React.FC<FileStructureContextProviderProps> = ({children}) => {
    const [extractedContents, setExtractedContents] = useState<FileStructure[]>([]);

    return (
        <FileStructureContext.Provider value={{extractedContents, setExtractedContents}}>
            {children}
        </FileStructureContext.Provider>
    );
};