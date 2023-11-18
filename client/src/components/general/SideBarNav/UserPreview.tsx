import React from 'react';
import { User as UserNextUI } from '@nextui-org/react';
import { type User } from '../../../api/collections/auth';

export interface UserPreviewProps {
    user: User;
}

const UserPreview = (props: UserPreviewProps) => {
    return (
        <UserNextUI
            name={props.user.name}
            description={props.user.createdAt?.toISOString() ?? 'No date'}
        />
    );
};

export default UserPreview;
