const fs = require('fs');

/** 全局方法 */
const loadNotes = () => {
    try {
        const databuffer = fs.readFileSync('articles.json');
        const dataJSON = databuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        //  无JSON文件
        return []; // 空数组
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('articles.json', dataJSON);
};
////////////////////////////////////////////////////////////////////

/** addNote 模块 */
const addArticle = (title, body, time) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
            time: time,
        });

        saveNotes(notes);
        console.log('New article added!');
    } else {
        console.log('Note title taken!');
    }
};

///////////////////////////////////////////////////////////////

/* removeNote模块 */
const removeArticle = (title) => {
    const notes = loadNotes();
    /*
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title;
    });
    */
   const notesToKeep = notes.filter((note) => note.title !== title);

    if (notesToKeep.length === notes.length) {
        console.log('no article found');
    } else {
        saveNotes(notesToKeep);
        console.log('article removed.');
    }
}
////////////////////////////////////////////////////////////////////////

/** displayList 模块 */
const displayList = () => {
    const notes = loadNotes();
    console.log('Your articles:');
    notes.forEach(note => {
        console.log(note.title);
    });
}
///////////////////////////////////////////////////////////////////////////

/** readNote 模块 */
const readArticle = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log('Title: ' + note.title);
        console.log('Content: ' + note.body);
    } else {
        console.log('no note found!');
    }
}




module.exports = {
    addArticle: addArticle,
    removeNote: removeArticle,
    displayList: displayList,
    readArticle: readArticle,
};
