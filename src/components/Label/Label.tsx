import React from 'react';

import styles from './Label.module.scss';

export type Props = {
    title: string;
};

const Label: React.FC<Props> = ({ title, children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.label}>{title}</div>
            {children}
        </div>
    );
};

export default Label;
