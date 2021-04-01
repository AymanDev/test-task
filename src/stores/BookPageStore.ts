import { cast, flow, types } from 'mobx-state-tree';

import Book, { BookSnapshot } from './models/book';
import Loader from './models/Loader';

import { getBookById, updateBook } from '../fakeAPI';

const BookPageStore = types
    .model('BookPageStore', {
        book: types.maybe(Book),
        mainLoader: Loader,
    })
    .actions(self => {
        const setBook = (book: BookSnapshot) => {
            self.book = cast(book);
        };

        const fetchGetBook = flow(function* (id: number) {
            self.mainLoader.setLoading(true);
            setBook(yield getBookById(id));
            self.mainLoader.setLoading(false);
        });

        const fetchUpdateBook = flow(function* (book: BookSnapshot) {
            self.mainLoader.setLoading(true);
            setBook(cast(yield updateBook(book)));
            self.mainLoader.setLoading(false);
        });

        return { fetchGetBook, fetchUpdateBook };
    });

export default BookPageStore;
