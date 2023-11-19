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
                                        console.log(`${path}/${item.name}`);
                                        setSelectedFile(`${path}/${item.name}`)
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
