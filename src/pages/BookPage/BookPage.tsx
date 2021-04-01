import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import { useMountEffect } from '../../hooks';
import { useMst } from '../../stores/RootStore';

import { observer } from 'mobx-react-lite';
import Spinner from '../../components/Spinner';
import RatingBar from '../../components/RatingBar';
import { BookModel, BookSnapshotIn } from '../../stores/models/book';
import Label from '../../components/Label';

import styles from './BookPage.module.scss';
import Button from '../../components/Button';
import { getSnapshot } from 'mobx-state-tree';

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
                <div className={styles.title}>{book?.name || ''}</div>
                <img className={styles.cover} src={book?.cover} alt={`book cover ${book?.name}`} />
                <div className={styles.controls}>
                    <Button onClick={handleOnChangeClick}>Изменить</Button>
                    {areEditing && book && <BookForm book={book} />}
                </div>
                <div className={styles.rating}>
                    <div className={styles.ratingTitle}>{ratingNames[rating - 1]}</div>
                    <RatingBar value={rating} />
                </div>
                <div className={styles.description}>{book?.description}</div>
                <div className={styles.info}>
                    <div className={styles.infoTitle}>Инфо</div>
                    <Label title="Автор: ">{book?.author}</Label>
                    <Label title="Издатель: ">{book?.publisher}</Label>
                    <Label title="Год выхода: ">{book?.releaseYear}</Label>
                    <Label title="Количество страниц: ">{book?.pageCount}</Label>
                    <Label title="ISBN: ">{book?.isbnCode}</Label>
                </div>
            </div>
        </Spinner>
    );
};

type Props = {
    book: BookModel;
};
const BookForm: React.FC<Props> = observer(({ book }) => {
    const {
        bookPageStore: { fetchUpdateBook },
    } = useMst();

    const handleSubmit = async (values: BookSnapshotIn) => {
        console.log(values);
        await fetchUpdateBook(values);
    };

    return (
        <Formik initialValues={{ ...getSnapshot(book) }} onSubmit={handleSubmit}>
            <Form className={styles.form}>
                <Label title="Title">
                    <Field as="input" name="name" type="text" />
                </Label>
                <Label title="Cover">
                    <Field as="input" name="cover" type="text" />
                </Label>
                <Label title="Rating">
                    <Field as="input" name="rating" type="number" />
                </Label>
                <Label title="Description">
                    <Field as="textarea" name="description" />
                </Label>
                <Label title="Author">
                    <Field as="input" name="author" type="text" />
                </Label>
                <Label title="Publisher">
                    <Field as="input" name="publisher" type="text" />
                </Label>
                <Label title="Year">
                    <Field as="input" name="releaseYear" type="number" />
                </Label>
                <Label title="Pages">
                    <Field as="input" name="pageCount" type="number" />
                </Label>
                <Label title="ISBN">
                    <Field as="input" name="isbnCode" type="number" />
                </Label>
                <Button className={styles.submitButton} type="submit">
                    Сохранить
                </Button>
            </Form>
        </Formik>
    );
});

export default observer(BookPage);
