import React from 'react';

import styles from './Label.module.scss';
import cn from 'classnames';

export type Props = {
    title: string;
    className?: string;
};

const Label: React.FC<Props> = ({ title, children, className }) => {
    return (
        <div className={cn(styles.container, className)}>
            <div className={styles.label}>{title}</div>
            {children}
        </div>
    );
};

export default Label;
