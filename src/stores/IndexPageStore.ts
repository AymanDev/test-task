import { cast, flow, types } from 'mobx-state-tree';

import Book, { BookSnapshot } from './models/book';
import Loader from './models/Loader';
import { getBooksList } from '../fakeAPI';

const IndexPageStore = types
    .model('IndexPageStore', {
        books: types.optional(types.array(Book), []),
        mainLoader: Loader,
    })
    .actions(self => {
        const setBooksList = (books: BookSnapshot[]) => {
            self.books = cast(books);
        };

        const fetchBooksList = flow(function* () {
            self.mainLoader.setLoading(true);
            setBooksList(yield getBooksList());
            self.mainLoader.setLoading(false);
        });

        return { fetchBooksList };
    });

export default IndexPageStore;
