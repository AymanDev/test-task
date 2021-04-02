import React from 'react';

import { ReviewModel } from '../../stores/models/Book';

import styles from './ReviewCard.module.scss';
import { DateTime } from 'luxon';

const ReviewCard: React.FC<ReviewModel> = ({ author, text, timestamp }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {author}
                <div className={styles.info}>
                    {DateTime.fromJSDate(timestamp).toLocaleString(DateTime.DATETIME_FULL)}
                </div>
            </div>
            <div className={styles.text}>{text}</div>
        </div>
    );
};

export default ReviewCard;
