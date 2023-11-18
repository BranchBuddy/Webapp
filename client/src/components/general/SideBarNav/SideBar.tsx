const sidebarStyles: React.CSSProperties = {
  width: '500px',
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

const fileItemStyles: React.CSSProperties = {
  marginBottom: '8px',
};

const fileIconStyles: React.CSSProperties = {
  marginRight: '8px',
};
const Sidebar: React.FC = () => {
  // Mock file structure
  const fileStructure = [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'components', type: 'folder', children: [] },
        { name: 'pages', type: 'folder', children: [] },
        { name: 'styles', type: 'folder', children: [] },
      ],
    },
    { name: 'public', type: 'folder', children: [] },
    { name: 'package.json', type: 'file' },
    { name: 'tsconfig.json', type: 'file' },
    { name: 'README.md', type: 'file' },
  ];

  return (
    <div style={sidebarStyles}>
      <div style={sidebarHeaderStyles}>Project Structure</div>
      {renderFileStructure(fileStructure)}
    </div>
  );
};

const renderFileStructure = (structure: any[]) => {
  return (
    <ul style={fileListStyles}>
      {structure.map((item, index) => (
        <li key={index} style={fileItemStyles}>
          <span style={fileIconStyles}>{item.type === 'folder' ? '📁' : '📄'}</span>
          {item.name}
          {item.children && item.children.length > 0 && renderFileStructure(item.children)}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
