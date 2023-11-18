import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalBody, Button, ModalFooter } from '@nextui-org/react';

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    errorMessage: string;
}

function ErrorModal(props: ErrorModalProps) {
    return (
        <>
            {ReactDOM.createPortal(
                <Modal isOpen={props.isOpen} onClose={props.onClose}>
                    <ModalBody>
                        <h2 className="text-xl font-semibold text-red-600 mb-4">
                            Error
                        </h2>
                        <p className="text-gray-700">{props.errorMessage}</p>
                    </ModalBody>
                    <ModalFooter>
                        <div className="mt-6 text-right">
                            <Button onClick={props.onClose} color="danger">
                                Close
                            </Button>
                        </div>
                    </ModalFooter>
                </Modal>,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                document.getElementById('overlay-root')!,
            )}
        </>
    );
}

export default ErrorModal;
