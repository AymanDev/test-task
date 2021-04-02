import { NoteModel } from '../../stores/models/Book';
import React from 'react';
import Label from '../Label';
import { DateTime } from 'luxon';

const Note: React.FC<NoteModel> = ({ text, timestamp }) => {
    const title = DateTime.fromJSDate(timestamp).toLocaleString(DateTime.DATETIME_FULL);
    return <Label title={title}>{text}</Label>;
};

export default Note;
