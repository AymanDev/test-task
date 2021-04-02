import * as Yup from 'yup';
import { BookModel, BookSnapshotIn, placeholderBook } from '../../../stores/models/Book';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../../stores/RootStore';
import { getSnapshot } from 'mobx-state-tree';
import { Field, Form, Formik } from 'formik';
import styles from '../../../pages/BookPage/BookPage.module.scss';
import Label from '../../Label';
import Button from '../../Button';

const BookSchema = Yup.object().shape({
    name: Yup.string().required(),
    cover: Yup.string(),
    description: Yup.string().required(),
    author: Yup.string().required(),
    publisher: Yup.string().required(),
    isbnCode: Yup.number().required(),
    releaseYear: Yup.number().required(),
    pageCount: Yup.number().nullable(),
    rating: Yup.number().default(0),
    reviewIds: Yup.array(Yup.number()).default([]),
    noteIds: Yup.array(Yup.number()).default([]),
});

type Props = {
    initialBook?: BookModel;
};
const BookForm: React.FC<Props> = observer(({ initialBook }) => {
    const {
        bookPageStore: { fetchUpdateBook },
        addBookPageStore: { fetchCreateBook },
    } = useMst();

    const handleSubmit = async (values: BookSnapshotIn) => {
        if (initialBook) {
            await fetchUpdateBook(values);
            return;
        }

        await fetchCreateBook(values);
    };

    const initialValues = initialBook ? { ...getSnapshot(initialBook) } : placeholderBook;
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={BookSchema}
            validateOnChange
            validateOnBlur
        >
            <Form className={styles.form}>
                <Label title="Title">
                    <Field as="input" name="name" type="text" required />
                </Label>
                <Label title="Cover">
                    <Field as="input" name="cover" type="text" />
                </Label>
                <Label title="Rating">
                    <Field as="input" name="rating" type="number" required min={0} max={5} />
                </Label>
                <Label title="Description">
                    <Field as="textarea" name="description" required />
                </Label>
                <Label title="Author">
                    <Field as="input" name="author" type="text" required />
                </Label>
                <Label title="Publisher">
                    <Field as="input" name="publisher" type="text" required />
                </Label>
                <Label title="Year">
                    <Field as="input" name="releaseYear" type="number" required />
                </Label>
                <Label title="Pages">
                    <Field as="input" name="pageCount" type="number" />
                </Label>
                <Label title="ISBN">
                    <Field as="input" name="isbnCode" type="number" required />
                </Label>
                <Button className={styles.submitButton} type="submit">
                    Сохранить
                </Button>
            </Form>
        </Formik>
    );
});

export default BookForm;
