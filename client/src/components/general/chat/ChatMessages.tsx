import React from 'react';
import ChatBubble from './MessageBubble';
import { ScrollShadow } from '@nextui-org/react';

const ChatMessages = () => {
    return (
        <ScrollShadow className="h-full">
            <div className="flex-grow">
                <ChatBubble
                    side={'left'}
                    avatar={''}
                    messages={['Hi Jenny, How r u today?']}
                />
                <ChatBubble
                    side={'right'}
                    avatar={''}
                    messages={[
                        "Great! What's about you?",
                        "Great! What's about you?",
                        'Of course I did. Speaking of which check this out',
                    ]}
                />
                <ChatBubble
                    side={'left'}
                    avatar={''}
                    messages={[
                        'Hi Jenny, How r u today?',
                        'Did you train yesterday',
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
                    ]}
                />
                <ChatBubble
                    side={'right'}
                    avatar={''}
                    messages={[
                        "Great! What's about you?",
                        "Great! What's about you?",
                        'Of course I did. Speaking of which check this out',
                    ]}
                />
                <ChatBubble
                    side={'left'}
                    avatar={''}
                    messages={[
                        'Hi Jenny, How r u today?',
                        'Did you train yesterday',
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
                    ]}
                />
                <ChatBubble
                    side={'right'}
                    avatar={''}
                    messages={[
                        "Great! What's about you?",
                        "Great! What's about you?",
                        'Of course I did. Speaking of which check this out',
                    ]}
                />
            </div>
        </ScrollShadow>
    );
};

export default ChatMessages;
