import React from 'react';
import SendMessageBar from './SendMessageBar';
import ChatMessages from './ChatMessages';

const Chat = () => {
    return (
        <div className="flex flex-col h-full w-full gap-4">
            <ChatMessages />
            <SendMessageBar />
        </div>
    );
};

export default Chat;
