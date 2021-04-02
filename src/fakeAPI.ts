import { getTimedResponse } from './helper';
import { BookSnapshot, NoteModel, ReviewModel } from './stores/models/Book';
import { DateTime } from 'luxon';

const initialReviews: ReviewModel[] = [
    {
        id: 0,
        author: 'Александр',
        text: 'Очень интересно читать',
        timestamp: DateTime.now().minus({ month: 1 }).toJSDate(),
    },
    {
        id: 1,
        author: 'Алексей',
        text: 'Интересная история',
        timestamp: DateTime.now().minus({ month: 2 }).toJSDate(),
    },
];
const initialNotes: NoteModel[] = [
    {
        id: 0,
        text: 'Классна штука',
        timestamp: DateTime.now().minus({ day: 5 }).toJSDate(),
    },
    {
        id: 1,
        text: 'Классный момент на 56 страницe',
        timestamp: DateTime.now().minus({ day: 1 }).toJSDate(),
    },
    {
        id: 2,
        text: 'Остановился на 32 страницe',
        timestamp: DateTime.now().minus({ day: 2 }).toJSDate(),
    },
];

const initialBooks: BookSnapshot[] = [
    {
        id: 0,
        name: 'Sword Art Online: Progressive Volume 002',
        cover: 'https://static.zerochan.net/Sword.Art.Online%3A.Progressive.full.1926062.jpg',
        description:
            '«Sword Art Online: Progressive» — шестая манга-адаптация вселенной Рэки Кавахары. Покрывает действия серии лайт-новелов «Sword Art Online Progressive», которая описывает прохождения Айнкрада, начиная с первого уровня, описывая преимущественно каждый уровень.',
        author: 'Reki Kawahara',
        publisher: 'Истари Комикс',
        isbnCode: 9780316383776,
        releaseYear: 2014,
        pageCount: 180,
        rating: 4,
        notes: [initialNotes[0], initialNotes[1]],
        reviews: [initialReviews[0]],
    },
    {
        id: 1,
        name: 'Форма голоса',
        cover: 'https://nyaa.shikimori.one/system/mangas/original/56805.jpg?1574925967',
        description:
            'Сёя Иcида — мальчик, который постоянно ищет, чем бы себя занять и как победить скуку — находит в лице переведенной глухой одноклассницы Сёко Нисимии новую цель для насмешек и издевательств. День за днем он пристает и смеется над ней, при этом не осознавая, какой вред наносит своими бездумными действиями. Наконец, он узнает цену боли, которую причинил ей, когда она уходит из школы, а его одноклассники начинают задирать и насмехаться над ним вместо нее.\n' +
            'Спустя пять лет главный герой снова встречает Сёко. Так начинается история молодого человека об искуплении грехов и прощении.',
        author: 'Yoshitoki Ooima',
        publisher: 'Истари Комикс',
        isbnCode: 9781632360564,
        releaseYear: 2015,
        pageCount: 192,
        rating: 5,
        notes: [initialNotes[2]],
        reviews: [initialReviews[1]],
    },
];

let DATA = {
    books: initialBooks,
};

export const getBooksList = async () => {
    return await getTimedResponse(DATA.books);
};

export const getBookById = async (id: number) => {
    return await getTimedResponse(DATA.books.find(b => b.id === id));
};

export const updateBook = async (book: BookSnapshot) => {
    DATA.books = await getTimedResponse(DATA.books.map(b => (b.id === book.id ? book : b)));
    saveData();
    return book;
};

export const createBook = async (book: BookSnapshot) => {
    const index = DATA.books.push({ ...book, id: DATA.books[DATA.books.length - 1].id + 1 });
    saveData();

    return await getTimedResponse(DATA.books[index]);
};

const saveData = () => {
    localStorage.setItem('api', JSON.stringify(DATA));
};
const restoreData = () => {
    const item = localStorage.getItem('api');
    if (!item) {
        return;
    }
    DATA = JSON.parse(item);
};
restoreData();
