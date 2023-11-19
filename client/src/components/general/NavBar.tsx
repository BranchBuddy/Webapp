import React, { useContext } from "react";
import {
    Navbar, 
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu
} from "@nextui-org/react";
import {FaChevronDown} from "react-icons/fa6";
import UploadFile from "../Modals/UploadFile";
import { ApiClient } from "../../api/ApiClient";
import { FileStructureContext } from "../../ contexts/FileStructureContent";
import { FileStructure } from "./SideBarNav/SideBar";
import { setFileContentFromStructure } from "../../pages/Editor";


export function getFileContentFromStructure(fileStructure: FileStructure[], filePath: string): string | undefined {
    console.log(fileStructure)
    console.log("Running getFileContent in Navbar.tsx")
    const pathParts = filePath.split('/');
    let currentLevel = fileStructure;

    for (let i = 1; i < pathParts.length; i++) {
        const part = pathParts[i];

        const item = currentLevel.find((item) => item.name === part);

        if (!item) {
            // Path not found
            return undefined;
        }

        if (item.type === 'file' && i === pathParts.length - 1) {
            // Found the file, return its content
            return item.content;
        }

        if (item.type === 'folder') {
            // Move to the next level of the hierarchy
            currentLevel = item.children || [];
        }
    }

    // Path points to a folder, not a file
    return undefined;
}


type FunctionInfo = {
    name: string;
    parameters: string[];
    body: string;
  };

  function splitCodeIntoFunctions(code: string): FunctionInfo[] {
    const functionRegex = /def\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*{([^}]*)}/g;
    const functions: FunctionInfo[] = [];
    let match;
    
    while ((match = functionRegex.exec(code)) !== null) {
        console.log(match)
      const [, name, parameters, body] = match;
      const parameterArray = parameters.split(',').map(param => param.trim());
      functions.push({ name, parameters: parameterArray, body });
    }
  
    return functions;
  }
function NavBar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const apiClient = new ApiClient()
    const {selectedFile, extractedContents, setExtractedContents} = useContext(FileStructureContext);
    const handleUpload = () => {
        setIsOpen(true);
    }

    const improveCode = () => {
        const sendImproveRequest = async (func: string) => {
            const requestBody = JSON.stringify({
                code: func
            })
            try {
                const response: {response: string, time: string} = await apiClient.post('/improve', requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer your_token'
                    },
                    withCredentials: false,
                })
                console.log(response)
                setExtractedContents(setFileContentFromStructure(extractedContents, selectedFile, response.response));
                
              } catch (error) {
                console.error('Error sending data:', error);
              }
        }
        const fileContent = getFileContentFromStructure(extractedContents, selectedFile)
        if (fileContent) {
            sendImproveRequest(fileContent); 
        } 
    }
    return (
        <>
            <Navbar disableScrollHandler={true}>
                <NavbarContent justify="start">
                    <p className="font-bold text-inherit">BranchBuddy</p>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4 w-800" justify="center">
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button color="default" href="#" variant="flat" onClick={handleUpload}>
                            Upload folder
                        </Button>
                       
                        {/* <GitHubLoader owner="BranchBuddy" repo="Webapp" filePath="Readme.md"></GitHubLoader> */}
                    </NavbarItem>
                    <NavbarItem> <Button color="default" href="#" variant="flat" onClick={improveCode}>
                            improve code
                        </Button></NavbarItem>
                </NavbarContent>
            </Navbar>
            <UploadFile isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </>
    );
}

export default NavBar;
