import { Button, Textarea } from '@nextui-org/react';
import { FiSend } from 'react-icons/fi';
import React from 'react';

const SendMessageBar = () => {
    return (
        <div className="flex flex-grow-0 gap-4">
            <Textarea
                minRows={1}
                maxRows={3}
                classNames={{
                    label: 'h-0 p-0',
                    helperWrapper: 'h-0 p-0',
                }}
                variant="bordered"
                placeholder="Enter your message here"
            />
            <Button
                isIconOnly
                color="primary"
                variant="solid"
                aria-label="Take a photo"
                className="h-full"
            >
                <FiSend />
            </Button>
        </div>
    );
};

export default SendMessageBar;
