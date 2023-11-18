import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import UserPreview from './UserPreview';

const mockChat = [
    {
        id: '1',
        name: 'John Doe 1',
        createdAt: new Date(),
    },
    {
        id: '2',
        name: 'Jane Doe 2',
        createdAt: new Date(),
    },
    {
        id: '3',
        name: 'Jane Doe 3',
        createdAt: new Date(),
    },
];

const TopSideBar = () => {
    return (
        <Listbox
            aria-label="Select a chat"
            onAction={(item) => {
                console.log(item);
            }}
            itemClasses={{
                base: 'text-lg p-3',
            }}
        >
            {mockChat.map((user) => {
                return (
                    <ListboxItem key={user.id}>
                        <UserPreview user={user} />
                    </ListboxItem>
                );
            })}
        </Listbox>
    );
};

export default TopSideBar;
