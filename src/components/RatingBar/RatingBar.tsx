import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './RatingBar.module.scss';

export type Props = {
    value: number;
    className?: string;
};

const maxRating = 5;

const RatingBar: React.FC<Props> = ({ className, value }) => {
    const classNames = cn(className, styles.container);
    return (
        <div className={classNames}>
            {[...Array(maxRating)].map((_, i) => {
                const starClassName = cn(styles.star, { [styles.active]: i < value });
                return <FontAwesomeIcon className={starClassName} key={i} icon={faStar} />;
            })}
        </div>
    );
};

export default RatingBar;
