import React from 'react';
import { cn, Avatar } from '@nextui-org/react';

interface ChatBubblePropsProps {
    avatar: string;
    messages: string[];
    side: 'left' | 'right';
    GridContainerProps?: Record<string, any>;
    GridItemProps?: Record<string, any>;
    AvatarProps?: Record<string, any>;
    getTypographyProps?: (
        msg: string,
        index: number,
        props: ChatBubblePropsProps,
    ) => Record<string, any>;
}

const ChatBubble: React.FC<ChatBubblePropsProps> = ({
    avatar,
    messages,
    side,
    GridContainerProps = {},
    GridItemProps = {},
    AvatarProps = {},
    getTypographyProps = () => ({}),
}: ChatBubblePropsProps) => {
    const attachClass = (index: number) => {
        if (messages.length <= 1) {
            return '';
        }
        if (index === 0) {
            return side === 'left' ? 'rounded-bl' : 'rounded-br';
        }
        if (index === messages.length - 1) {
            return side === 'left' ? 'rounded-tl' : 'rounded-tr';
        }
        return side === 'left'
            ? 'rounded-bl rounded-tl'
            : 'rounded-br rounded-tr';
    };

    return (
        <div
            className={cn(
                'grid',
                'grid-flow-col',
                'auto-cols-max',
                'space-x-1',
                'gap-2',
                'pb-10',
                { 'justify-start': side === 'left' },
                { 'justify-end': side === 'right' },
            )}
            {...GridContainerProps}
        >
            {side === 'left' && (
                <div {...GridItemProps}>
                    <Avatar
                        src={avatar}
                        {...AvatarProps}
                        className={cn('hidden md:block', AvatarProps.className)}
                    />
                </div>
            )}
            <div>
                {messages.map((msg, i) => {
                    const TypographyProps = getTypographyProps(msg, i, {
                        avatar,
                        messages,
                        side,
                        GridContainerProps,
                        GridItemProps,
                        AvatarProps,
                        getTypographyProps,
                    });
                    return (
                        <div
                            key={i}
                            className={cn(
                                'p-0.5',
                                { 'text-left': side === 'left' },
                                { 'text-right': side === 'right' },
                            )}
                        >
                            <div
                                {...TypographyProps}
                                className={cn(
                                    'p-2 rounded-2xl inline-block break-words',
                                    {
                                        'bg-primary text-white':
                                            side === 'right',
                                        'bg-secondary text-white':
                                            side === 'left',
                                    },
                                    attachClass(i),
                                    TypographyProps.className,
                                )}
                            >
                                {msg}
                            </div>
                        </div>
                    );
                })}
            </div>
            {side === 'right' && (
                <div className="flex items-end ml-2" {...GridItemProps}>
                    <Avatar
                        src={avatar}
                        {...AvatarProps}
                        className={cn('hidden md:block', AvatarProps.className)}
                    />
                </div>
            )}
        </div>
    );
};

ChatBubble.defaultProps = {
    avatar: '',
    messages: [],
    side: 'left',
    GridContainerProps: {},
    GridItemProps: {},
    AvatarProps: {},
    getTypographyProps: () => ({}),
};

export default ChatBubble;
