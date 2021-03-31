import {Instance, onSnapshot, types} from 'mobx-state-tree';
import Book from './models/book';
import { createContext, useContext } from 'react';

const RootModel = types.model({
    books: types.optional(types.array(Book), []),
});

let initialState = RootModel.create({
    books: [
        {
            id: 0,
            name: 'Sword Art Online: Progressive Volume 002',
            cover: 'https://static.zerochan.net/Sword.Art.Online%3A.Progressive.full.1926062.jpg',
            description: '',
            author: 'Reki Kawahara',
            publisher: 'Истари Комикс',
            isbnCode: 9780316383776,
            releaseYear: 2014,
            pageCount: 180,
            rating: 4,
        },
        {
            id: 1,
            name: 'Форма голоса',
            cover: 'https://nyaa.shikimori.one/system/mangas/original/56805.jpg?1574925967',
            description: '',
            author: 'Yoshitoki Ooima',
            publisher: 'Истари Комикс',
            isbnCode: 9781632360564,
            releaseYear: 2015,
            pageCount: 192,
            rating: 5,
        },
    ],
});

const data = localStorage.getItem('rootState');
if (data) {
    const json = JSON.parse(data);
    if (RootModel.is(json)) {
        initialState = RootModel.create(json);
    }
}

export const rootStore = initialState;

onSnapshot(rootStore, snapshot => {
    console.log("Snapshot: ", snapshot);
    localStorage.setItem('rootState', JSON.stringify(snapshot));
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error('Store cannot be null, please add a context provider');
    }
    return store;
}
