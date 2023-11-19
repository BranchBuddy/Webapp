import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import {Modal, ModalBody, Button, ModalFooter, ModalContent, Input, ModalHeader} from '@nextui-org/react';
import JSZip from 'jszip';
import {FileStructure} from "../general/SideBarNav/SideBar";
import {FileStructureContext} from "../../ contexts/FileStructureContent";

interface UploadFileProps {
    isOpen: boolean;
    onClose: () => void;
}


function UploadFileModal(props: UploadFileProps) {
    const {setExtractedContents} = useContext(FileStructureContext);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const zip = new JSZip();

            try {
                const zipFile = await zip.loadAsync(file);
                const parsedContents = await parseFileStructure(zipFile);
                setExtractedContents(parsedContents);
                // print the folder structure
                console.log(parsedContents);
            } catch (error) {
                console.error('Error extracting zip file:', error);
            }
        }
    };

    const parseFileStructure = async (zipFile: JSZip): Promise<FileStructure[]> => {
        const fileStructure: FileStructure[] = [];

        for (const filePath in zipFile.files) {
            const file = zipFile.files[filePath];
            const path = filePath.split('/');

            let currentFolder = fileStructure;
            for (let i = 0; i < path.length; i++) {
                const part = path[i];
                const isFile = i === path.length - 1;

                if (isFile) {
                    if (!part) {
                        continue;
                    }
                    const content = await file.async('string');
                    currentFolder.push({name: part, type: 'file', content, originalContent: content});
                } else {
                    let folder = currentFolder.find((f) => f.name === part && f.type === 'folder');
                    if (!folder) {
                        folder = {name: part, type: 'folder', children: []};
                        currentFolder.push(folder);
                    }
                    currentFolder = folder.children!;
                }
            }
        }

        return fileStructure;
    };

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose}
                   portalContainer={document.getElementById("main") as HTMLElement}>
                <ModalContent>
                    <ModalHeader>Upload Zip</ModalHeader>
                    <ModalBody>
                        <input
                            type="file"
                            onChange={handleFileChange}/>
                    </ModalBody>
                    <ModalFooter>
                        <div className="text-right">
                            <Button onClick={props.onClose} color="primary" >
                                Done
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UploadFileModal;
