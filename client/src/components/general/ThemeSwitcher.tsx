import React from 'react';
import { Switch } from '@nextui-org/react';
import { MoonIcon } from '../../assets/general/MoonIcon';
import { SunIcon } from '../../assets/general/SunIcon';
import useDarkMode from 'use-dark-mode';

const ThemeSwitcher = (props: { size: 'sm' | 'md' | 'lg' }) => {
    const darkMode = useDarkMode(true);

    return (
        <Switch
            size={props.size}
            color="secondary"
            isSelected={darkMode.value}
            thumbIcon={({ isSelected, className }) =>
                !isSelected ? (
                    <SunIcon className={className} />
                ) : (
                    <MoonIcon className={className} />
                )
            }
            onValueChange={darkMode.toggle}
        />
    );
};

export default ThemeSwitcher;
