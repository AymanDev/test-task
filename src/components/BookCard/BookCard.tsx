import React from 'react';

import { BookModel } from '../../stores/models/book';

import styles from './BookCard.module.scss';
import RatingBar from '../RatingBar';

const BookCard: React.FC<BookModel> = ({ name, cover, rating }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>{name}</div>
            <div className={styles.coverContainer}>
                <img className={styles.cover} src={cover} alt="book cover" />
            </div>
            <RatingBar className={styles.rating} value={rating} />
        </div>
    );
};

export default BookCard;
