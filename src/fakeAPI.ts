import { getTimedResponse } from './helper';
import { BookSnapshot } from './stores/models/book';

export let BOOKS: BookSnapshot[] = [
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
    },
];

export const getBooksList = async () => {
    return await getTimedResponse(BOOKS);
};

export const getBookById = async (id: number) => {
    return await getTimedResponse(BOOKS.find(b => b.id === id));
};

export const updateBook = async (book: BookSnapshot) => {
    BOOKS = await getTimedResponse(BOOKS.map(b => (b.id === book.id ? book : b)));
    saveData();
    return book;
};

const saveData = () => {
    localStorage.setItem('api', JSON.stringify(BOOKS));
};
const restoreData = () => {
    const item = localStorage.getItem('api');
    if (!item) {
        return;
    }
    BOOKS = JSON.parse(item);
};
restoreData();
