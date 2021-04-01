import { Instance, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import IndexPageStore from './IndexPageStore';
import BookPageStore from './BookPageStore';

const RootModel = types.model({
    indexPageStore: IndexPageStore,
    bookPageStore: BookPageStore,
});

const initialState = RootModel.create({
    indexPageStore: { mainLoader: {} },
    bookPageStore: { mainLoader: {} },
});

export const rootStore = initialState;

// onSnapshot(rootStore, snapshot => {
//     console.log('Snapshot: ', snapshot);
//     localStorage.setItem('rootState', JSON.stringify(snapshot));
// });

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

//@ts-ignore
window.store = rootStore;
