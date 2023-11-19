import React, {useContext} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea} from '@nextui-org/react';
import {FileStructure} from "../general/SideBarNav/SideBar";
import {FileStructureContext} from "../../ contexts/FileStructureContent";
import {diffLines, Change } from 'diff';

interface DiffProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
}


function DiffModal(props: DiffProps) {
    const {extractedContents} = useContext(FileStructureContext);
    let displayedText = props.text;

    if (!displayedText) {
        displayedText = DiffsToText(checkFileDifferences(extractedContents));
    }

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose}
                   portalContainer={document.getElementById("main") as HTMLElement}
                   size="5xl">
                <ModalContent>
                    <ModalHeader>File Differences</ModalHeader>
                    <ModalBody>
                        <Textarea
                            isReadOnly
                            defaultValue={displayedText}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <div className="mt-6 text-right">
                            <Button onClick={props.onClose} color="danger" className="mx-6">
                                Close
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export function calculateDiff(originalContent: string, currentContent: string): string {
    const differences: Change[] = diffLines(originalContent, currentContent);

    return differences
        .map((part) => {
            if (part.added) {
                return `+++${part.value.split("\n").map((line) => line.trim()).filter(line => line !== "").join("+++\n+++")}+++`; // Green for added text
            }
            if (part.removed) {
                return `---${part.value.split("\n").map((line) => line.trim()).filter(line => line !== "").join("---\n---")}---`;
            }
            return part.value.trim();
        })
        .join('\n');
}

export function DiffsToText(diffs: Record<string, string>): string {
    let text = '';
    for (const [key, value] of Object.entries(diffs)) {
        text += `${key}:\n${value}\n\n`;
    }
    return text;
}

export function checkFileDifferences(fileStructure: FileStructure[]): Record<string, string> {
    const differences: Record<string, string> = {};

    const traverse = (currentLevel: FileStructure[], currentPath: string) => {
        currentLevel.forEach((item) => {
            const path = currentPath ? `${currentPath}/${item.name}` : item.name;

            if (item.type === 'file') {
                // Compare content
                const originalContent = item.originalContent;
                const currentContent = item.content; // You can replace this with the actual current content

                if (originalContent !== currentContent) {
                    // Calculate and format the differences using the separate function
                    differences[path] = calculateDiff(originalContent || '', currentContent || '');
                }
            } else if (item.type === 'folder' && item.children) {
                // Recursively traverse the folder
                traverse(item.children, path);
            }
        });
    };

    traverse(fileStructure, '');

    return differences;
}

export default DiffModal;