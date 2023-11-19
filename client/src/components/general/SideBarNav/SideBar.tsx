import {Link} from "react-router-dom";
import {FileStructureContext, FileStructureContextProvider} from "../../../ contexts/FileStructureContent";
import {useContext} from "react";
import {Button, Code} from "@nextui-org/react";
import {CiFileOn, CiFolderOn} from "react-icons/ci";

const sidebarStyles: React.CSSProperties = {
    width: '250px',
    height: '100%',
    color: 'white',
    padding: '20px',
    overflowY: 'auto',
};

const sidebarHeaderStyles: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
};

const fileListStyles: React.CSSProperties = {
    listStyleType: 'none',
    paddingLeft: '0',
};

const fileIconStyles: React.CSSProperties = {
    marginRight: '8px',
};

export interface FileStructure {
    name: string;
    type: string;
    children?: FileStructure[];
    content?: string;
    originalContent?: string;
}

const Sidebar: React.FC = () => {
    // Mock file structure
    const {extractedContents, setSelectedFile} = useContext(FileStructureContext);

    const getFileItemStyles = (indent: number): React.CSSProperties => {
        return {
            marginBottom: '8px',
            marginTop: '8px',
            marginLeft: String(indent) + 'px'
        };
    }

    function getFileContent(fileStructure: FileStructure[], filePath: string): string | undefined {
        const pathParts = filePath.split('/');
        let currentLevel = fileStructure;

        for (let i = 0; i < pathParts.length; i++) {
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

    const renderFileStructure = (structure: any[], path: string, indent = 0) => {
        return (
            <ul style={fileListStyles}>
                {structure.map((item, index) => (
                    <li key={index} style={getFileItemStyles(indent)}>
                        {
                            item.type === 'file' && (
                                <>{/*}
                                    <Link to={encodeURIComponent(`${path}/${item.name}`)}>
                                        <Code>{'📄 ' + item.name}</Code>
                                    </Link> */}
                                    <button onClick={() => {
                                        setSelectedFile(item.content!)
                                    }}>
                                        <Code>{'📄 ' + item.name}</Code>
                                    </button>
                                </>
                            )
                        }
                        {
                            item.type === 'folder' && (
                                <>
                                    <Code>{'📁 ' + item.name}</Code>
                                    {item.children && item.children.length > 0 && renderFileStructure(item.children!, `${path}/${item.name}`, indent + 20)}
                                </>
                            )
                        }
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div style={sidebarStyles}>
            <div style={sidebarHeaderStyles}>Project Structure</div>
            {renderFileStructure(extractedContents, '', 0)}
        </div>
    );
};

export default Sidebar;
