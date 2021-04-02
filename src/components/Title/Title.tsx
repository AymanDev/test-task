import React from 'react';
import cn from 'classnames';

import styles from './Title.module.scss';

export type Props = {
    className?: string;
};

const Title: React.FC<Props> = ({ className, children }) => {
    return <div className={cn(styles.title, className)}>{children}</div>;
};

export default Title;
