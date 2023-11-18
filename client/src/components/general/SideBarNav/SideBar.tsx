import {Link} from "@nextui-org/react";
import {FileStructureContext, FileStructureContextProvider} from "../../../ contexts/FileStructureContent";
import {useContext} from "react";

const sidebarStyles: React.CSSProperties = {
    width: '250px',
    height: '100%',
    backgroundColor: '#333',
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
}

const Sidebar: React.FC = () => {
    // Mock file structure
    const {extractedContents} = useContext(FileStructureContext);

    return (
        <div style={sidebarStyles}>
            <div style={sidebarHeaderStyles}>Project Structure</div>
            {renderFileStructure(extractedContents)}
        </div>
    );
};
const getFileItemStyles = (indent: number): React.CSSProperties => {
    return {
        marginBottom: '8px',
        marginLeft: String(indent) + 'px'
    };
}
const renderFileStructure = (structure: any[], indent = 0) => {
    return (
        <ul style={fileListStyles}>
            {structure.map((item, index) => (
                <li key={index} style={getFileItemStyles(indent)}>
                    <span style={fileIconStyles}>{item.type === 'folder' ? '📁' : '📄'}</span>
                    <Link href={`/files/${encodeURIComponent(item.name)}`}>
                        <a style={{color: 'white', textDecoration: 'none'}}>{item.name}</a>
                    </Link>
                    {item.children && item.children.length > 0 && renderFileStructure(item.children, indent + 5)}
                </li>
            ))}
        </ul>
    );
};

export default Sidebar;
