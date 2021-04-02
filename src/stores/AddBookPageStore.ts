import { flow, types } from 'mobx-state-tree';

import Loader from './models/Loader';
import { BookSnapshot } from './models/Book';

import { createBook } from '../fakeAPI';

const AddBookPageStore = types
    .model('AddBookPageStore', {
        mainLoader: Loader,
    })
    .actions(self => {
        const fetchCreateBook = flow(function* (book: BookSnapshot) {
            self.mainLoader.setLoading(true);
            yield createBook(book);
            self.mainLoader.setLoading(false);
        });

        return { fetchCreateBook };
    });

export default AddBookPageStore;
