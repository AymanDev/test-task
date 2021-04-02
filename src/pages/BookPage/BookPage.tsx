import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useMountEffect } from '../../hooks';
import { useMst } from '../../stores/RootStore';

import Spinner from '../../components/Spinner';
import RatingBar from '../../components/RatingBar';
import Label from '../../components/Label';
import Button from '../../components/Button';
import BookForm from '../../components/forms/BookForm';
import Title from '../../components/Title';
import Note from '../../components/Note';
import ReviewCard from '../../components/ReviewCard';

import styles from './BookPage.module.scss';

const ratingNames = ['Очень плохо', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

const BookPage = () => {
    const [areEditing, setAreEditing] = useState(false);

    const {
        bookPageStore: { mainLoader, fetchGetBook, book },
    } = useMst();
    const { id } = useParams<{ id: string }>();

    useMountEffect(() => fetchGetBook(Number(id)));

    const rating = book?.rating || 0;

    const handleOnChangeClick = () => setAreEditing(areEditing => !areEditing);

    return (
        <Spinner loading={mainLoader.loading}>
            <div className={styles.container}>
                <Title className={styles.title}>{book?.name || ''}</Title>
                <img className={styles.cover} src={book?.cover} alt={`book cover ${book?.name}`} />
                <div className={styles.controls}>
                    <Button onClick={handleOnChangeClick}>Изменить</Button>
                    {areEditing && book && <BookForm initialBook={book} />}
                </div>
                <div className={styles.rating}>
                    <div className={styles.title}>{ratingNames[rating - 1]}</div>
                    <RatingBar value={rating} />
                </div>
                <div className={styles.description}>{book?.description}</div>
                <div className={styles.info}>
                    <div className={styles.title}>Инфо</div>
                    <Label title="Автор: ">{book?.author}</Label>
                    <Label title="Издатель: ">{book?.publisher}</Label>
                    <Label title="Год выхода: ">{book?.releaseYear}</Label>
                    {book.pageCount && <Label title="Количество страниц: ">{book.pageCount}</Label>}
                    <Label title="ISBN: ">{book?.isbnCode}</Label>
                    {book.notes.length > 0 && (
                        <Label title="Заметки:">
                            {book.notes.map(n => (
                                <Note key={n.id} {...n} />
                            ))}
                        </Label>
                    )}
                </div>

                {book.reviews.length > 0 && (
                    <div className={styles.reviews}>
                        <Label className={styles.title} title="Отзывы" />
                        {book.reviews.map(r => (
                            <ReviewCard key={r.id} {...r} />
                        ))}
                    </div>
                )}
            </div>
        </Spinner>
    );
};

export default observer(BookPage);
