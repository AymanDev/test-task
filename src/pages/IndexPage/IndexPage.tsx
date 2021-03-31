import React from 'react';
import { observer } from 'mobx-react-lite';

import BookCard from '../../components/BookCard';
import { useMst } from '../../stores/RootStore';

import styles from './IndexPage.module.scss';

const IndexPage = () => {
    const { books } = useMst();

    return (
        <div className={styles.container}>
            {books.map(b => (
                <BookCard key={b.id} {...b} />
            ))}
        </div>
    );
};

export default observer(IndexPage);
