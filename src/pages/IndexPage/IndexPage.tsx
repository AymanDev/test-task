import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import BookCard from '../../components/BookCard';
import { useMst } from '../../stores/RootStore';

import styles from './IndexPage.module.scss';
import { useMountEffect } from '../../hooks';
import Spinner from '../../components/Spinner';
import { BookCardPlaceholder } from '../../components/BookCard/BookCard';

const IndexPage = () => {
    const {
        indexPageStore: { books, fetchBooksList, mainLoader },
    } = useMst();

    useMountEffect(() => fetchBooksList());

    return (
        <Spinner loading={mainLoader.loading}>
            <div className={styles.container}>
                {books.map(b => (
                    <Link className={styles.link} to={`/book/${b.id}`} key={b.id}>
                        <BookCard {...b} />
                    </Link>
                ))}
                {mainLoader.loading && [...Array(5)].map((_, i) => <BookCardPlaceholder key={i} />)}
            </div>
        </Spinner>
    );
};

export default observer(IndexPage);
