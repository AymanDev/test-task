import React from 'react';

import Title from '../../components/Title';
import BookForm from '../../components/forms/BookForm';

import styles from './AddBookPage.module.scss';
import { observer } from 'mobx-react-lite';
import Spinner from '../../components/Spinner';
import { useMst } from '../../stores/RootStore';

const AddBookPage = () => {
    const {
        addBookPageStore: { mainLoader },
    } = useMst();
    return (
        <Spinner loading={mainLoader.loading}>
            <div className={styles.container}>
                <Title className={styles.title}>Добавить новую книгу</Title>
                <BookForm />
            </div>
        </Spinner>
    );
};

export default observer(AddBookPage);
