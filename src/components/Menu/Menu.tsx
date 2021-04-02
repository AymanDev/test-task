import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Menu.module.scss';

const Menu = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>Book store</div>
            </div>
            <div className={styles.itemsContainer}>
                <Link className={styles.item} to="/">
                    Список книг
                </Link>
                <Link className={styles.item} to="/add-book">
                    Добавить книгу
                </Link>
            </div>
        </div>
    );
};

export default Menu;
