import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Spinner.module.scss';
import cn from 'classnames';

export type Props = {
    loading: boolean;
};
const Spinner: React.FC<Props> = ({ loading, children }) => {
    const hiddenClassName = cn({ [styles.hidden]: !loading });
    return (
        <div className={styles.container}>
            <div className={cn(styles.cover, hiddenClassName)}>
                <FontAwesomeIcon className={cn(styles.spinner, hiddenClassName)} icon={faSpinner} spin={loading} size="5x" />
            </div>

            {children}
        </div>
    );
};

export default Spinner;
