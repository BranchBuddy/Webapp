import React, { useState } from 'react';
import SendMessageBar from './SendMessageBar';
import ChatMessages from './ChatMessages';

const Chat = () => {
    return (
        <div className="flex flex-col">
          <ChatMessages />
          <SendMessageBar />
        </div>
    );
};

export default Chat;
