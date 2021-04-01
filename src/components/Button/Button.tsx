import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

export type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
const Button: React.FC<Props> = ({ className, children, ...rest }) => {
    return (
        <button className={cn(styles.button, className)} {...rest}>
            {children}
        </button>
    );
};

export default Button;
