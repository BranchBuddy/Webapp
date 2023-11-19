import React, {useContext} from "react";
import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
} from "@nextui-org/react";
import {FaChevronDown} from "react-icons/fa6";
import UploadFile from "../Modals/UploadFile";
import {ApiClient} from "../../api/ApiClient";
import {FileStructureContext} from "../../ contexts/FileStructureContent";
import {FileStructure} from "./SideBarNav/SideBar";
import {setFileContentFromStructure} from "../../pages/Editor";
import DiffModal, {checkFileDifferences, DiffsToText} from "../Modals/DiffModal";
import {Octokit} from "@octokit/rest";

export function getFileContentFromStructure(
    fileStructure: FileStructure[],
    filePath: string
): string | undefined {
    console.log("Running getFileContent in Navbar.tsx");
    const pathParts = filePath.split("/");
    let currentLevel = fileStructure;

    for (let i = 1; i < pathParts.length; i++) {
        const part = pathParts[i];

        const item = currentLevel.find((item) => item.name === part);

        if (!item) {
            // Path not found
            return undefined;
        }

        if (item.type === "file" && i === pathParts.length - 1) {
            // Found the file, return its content
            return item.content;
        }

        if (item.type === "folder") {
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
        const [, name, parameters, body] = match;
        const parameterArray = parameters.split(",").map((param) => param.trim());
        functions.push({name, parameters: parameterArray, body});
    }

    return functions;
}

function NavBar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const apiClient = new ApiClient();
    const {selectedFile, extractedContents, setExtractedContents, setSelectedFile} =
        useContext(FileStructureContext);
    const handleUpload = () => {
        setIsOpen(true);
    };
    const sendImproveRequest = async (func: string) => {
        const requestBody = JSON.stringify({
            code: func,
        });
        try {
            const response: { response: string; time: string } =
                await apiClient.post("/improve", requestBody, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer your_token",
                    },
                    withCredentials: false,
                });
            setExtractedContents(
                setFileContentFromStructure(
                    extractedContents,
                    selectedFile,
                    response.response
                )
            );
            setSelectedFile(selectedFile);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };
    const improveCode = () => {

        const fileContent = getFileContentFromStructure(
            extractedContents,
            selectedFile
        );
        if (fileContent) {
            sendImproveRequest(fileContent);
        }
    };
    const sendCommentRequest = async (func: string) => {
        const requestBody = JSON.stringify({
            code: func,
        });
        try {
            const response: { response: string; time: string } =
                await apiClient.post("/comment", requestBody, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer your_token",
                    },
                    withCredentials: false,
                });
            setExtractedContents(
                setFileContentFromStructure(
                    extractedContents,
                    selectedFile,
                    response.response
                )
            );
            setSelectedFile(selectedFile);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };
    const commentCode = () => {

        const fileContent = getFileContentFromStructure(
            extractedContents,
            selectedFile
        );
        if (fileContent) {
            sendCommentRequest(fileContent);
        }
    };

    const handleCommit = async () => {
        const fileContent = getFileContentFromStructure(
            extractedContents,
            selectedFile
        );
        if (fileContent) {
            await sendImproveRequest(fileContent)
            await sendCommentRequest(fileContent);
        }
    }
    const [isDiffOpen, setIsDiffOpen] = React.useState(false);
    const [text, setText] = React.useState('');
    const handleDiffs = () => {
        const text = DiffsToText(checkFileDifferences(extractedContents));
        setText(text);
        setIsDiffOpen(true)
    }


    const getFileContentFromBranch = async (owner: string, repo: string, path: string) => {
        try {
            const octokit = new Octokit({
                auth: "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",
            });

            const response = await octokit.request(`GET /repos/${owner}/${repo}/contents/${path}`, {
                owner: owner,
                repo: repo,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            });
            return response.data.content
        } catch (error) {
            console.log(error)
        }
    }
    // generate file name to file content
    const generateAllBranchDiff = async (owner: string, repo: string) => {
        const octokit = new Octokit({
            auth: "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",
        });
        const branchesResponse = await octokit.git.listMatchingRefs({
            owner: 'BranchBuddy',
            repo: 'Webapp',
            ref: 'heads/',
        });
        const branchData: {
            'lastCommitAuthor': string,
            'lastCommitHash': string,
            'fileToSource': [string, string][],
            'concatenatedDiff': string
        }[] = []
        for (const branch of branchesResponse.data) {

            const commit_url: string[] = (branch.url as string).split('/')
            const commit_ref = commit_url[commit_url.length - 1]
            const commit = await octokit.request(`GET /repos/${owner}/${repo}/commits/${commit_ref}`, {
                owner: 'BranchBuddy',
                repo: 'Webapp',
                ref: 'REF',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            const commit_author = commit.data.author.login

            const fileToSource: [string, string][] = []
            let concatenatedDiff = ''
            const commit_files = commit.data.files
            for (const file of commit_files) {
                const fileContent = await getFileContentFromBranch(owner, repo, file.filename)
                fileToSource.push([file.filename, fileContent])
                concatenatedDiff = concatenatedDiff + file.patch
            }
            const branchDataPiece = {
                'lastCommitAuthor': commit_author,
                'lastCommitHash': commit_ref,
                'fileToSource': fileToSource,
                'concatenatedDiff': concatenatedDiff
            }
            branchData.push(branchDataPiece)
        }
        return branchData
    }
    const checkSimilarity = async () => {
        // Get head of all branches
        const branchData = await generateAllBranchDiff('BranchBuddy', 'Webapp')
        const currentDiff = checkFileDifferences(extractedContents)
        let concatenatedDiff = ''
        let currentFileToSource = {}
        for (const [key, value] of Object.entries(currentDiff)) {
            const fileContent = getFileContentFromStructure(extractedContents, key)
            if (fileContent) {
                concatenatedDiff = concatenatedDiff + value
                // @ts-ignore
                currentFileToSource[key] = fileContent
            }
        }

        // @ts-ignore
        if (({} !== currentFileToSource)) {
            for (const branchDataPiece of branchData) {
                try {
                    const requestBody = {
                        'focused_diff': currentDiff,
                        'focused_sources': currentFileToSource,
                        'other_diffs': branchDataPiece.concatenatedDiff,
                        'other_sources': branchDataPiece.fileToSource
                    };
                    const response: { response: string; time: string } =
                        await apiClient.post("/compare-functions-between-branches", JSON.stringify(requestBody), {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer your_token",
                            },
                            withCredentials: false,
                        });
                    console.log(response);
                } catch (error) {
                    console.error("Error sending data:", error);
                }
            }
        }

    }
    return (
        <>
            <Navbar disableScrollHandler={true}>
                <NavbarContent justify="start">
                    <p className="font-bold text-inherit">BranchBuddy</p>
                </NavbarContent>
                <NavbarContent
                    className="hidden sm:flex gap-4 w-800"
                    justify="center"
                ></NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button
                            color="default"
                            href="#"
                            variant="flat"
                            onClick={handleCommit}
                        >
                            Prepare for Commit
                        </Button>

                        {/* <GitHubLoader owner="BranchBuddy" repo="Webapp" filePath="Readme.md"></GitHubLoader> */}
                    </NavbarItem>
                    <NavbarItem>
                        {" "}
                        <Button
                            color="default"
                            href="#"
                            variant="flat"
                            onClick={improveCode}
                        >
                            Improve Code
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            color="default"
                            href="#"
                            variant="flat"
                            onClick={commentCode}
                        >
                            Comment Code
                        </Button>
                    </NavbarItem>
                    <Button color="primary" href="#" variant="flat" onClick={handleDiffs}>
                        Check differences
                    </Button>
                    <Button color="primary" href="#" variant="flat" onClick={checkSimilarity}>
                        Check Similar Code
                    </Button>
                    <NavbarItem style={{
                        paddingLeft: '10%',
                        marginRight: '-40%'
                    }}>
                        <Button
                            color="default"
                            href="#"
                            variant="flat"
                            onClick={handleUpload}
                        >
                            Upload folder
                        </Button>

                        {/* <GitHubLoader owner="BranchBuddy" repo="Webapp" filePath="Readme.md"></GitHubLoader> */}
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <UploadFile isOpen={isOpen} onClose={() => setIsOpen(false)}/>
            <DiffModal isOpen={isDiffOpen} onClose={() => setIsDiffOpen(false)} text={text}/>
        </>
    );
}

export default NavBar;
