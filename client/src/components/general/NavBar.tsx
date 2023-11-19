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
    DropdownMenu
} from "@nextui-org/react";
import {FaChevronDown} from "react-icons/fa6";
import UploadFile from "../Modals/UploadFile";
import DiffModal, {checkFileDifferences, DiffsToText} from "../Modals/DiffModal";
import {FileStructureContext} from "../../ contexts/FileStructureContent";

function NavBar() {
    const {extractedContents} = useContext(FileStructureContext);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDiffOpen, setIsDiffOpen] = React.useState(false);
    const [text, setText] = React.useState('');


    const handleUpload = () => {
        setIsOpen(true);
    }

    const handleDiffs = () => {
        const text = DiffsToText(checkFileDifferences(extractedContents));
        setText(text);
        setIsDiffOpen(true)
    }

    return (
        <>
            <Navbar disableScrollHandler={true}>
                <NavbarContent justify="start">
                    <p className="font-bold text-inherit">BranchBuddy</p>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4 w-800" justify="center">
                    <Dropdown>
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                    endContent={<FaChevronDown/>}
                                    radius="sm"
                                    variant="light"
                                >
                                    Features
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="ACME features"
                            className="w-[340px]"
                            itemClasses={{
                                base: "gap-4",
                            }}
                        >
                            <DropdownItem
                                key="Commit"
                            >
                                Commit
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page">
                            Customers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Integrations
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button color="primary" href="#" variant="flat" onClick={handleUpload}>
                            Upload folder
                        </Button>
                        <Button color="primary" href="#" variant="flat" onClick={handleDiffs}>
                            Check differences
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <UploadFile isOpen={isOpen} onClose={() => setIsOpen(false)}/>
            <DiffModal isOpen={isDiffOpen} onClose={() => setIsDiffOpen(false)} text={text}/>
        </>
    );
}

export default NavBar;
