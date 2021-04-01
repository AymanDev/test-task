import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export const Review = types.model('Review', {
    id: types.identifierNumber,
    author: types.string,
    text: types.string,
});
export type ReviewModel = Instance<typeof Review>;

export const Note = types.model('Note', {
    id: types.identifierNumber,
    text: types.string,
});
export type NoteModel = Instance<typeof Note>;

const Book = types.model('Book', {
    id: types.identifierNumber,
    name: types.string,
    cover: types.optional(types.string, 'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png'),
    description: types.string,
    author: types.string,
    publisher: types.string,
    isbnCode: types.number,
    releaseYear: types.number,
    pageCount: types.maybeNull(types.number),
    rating: types.optional(types.number, 0),
    reviewIds: types.optional(types.array(Review), []),
    noteIds: types.optional(types.array(Note), []),
});
export type BookModel = Instance<typeof Book>;
export type BookSnapshot = BookSnapshotIn | BookSnapshotOut;
export type BookSnapshotIn = SnapshotIn<typeof Book>;
export type BookSnapshotOut = SnapshotOut<typeof Book>;

export default Book;
