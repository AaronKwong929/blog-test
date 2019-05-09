const fs = require('fs');

const loadArticles = () => {
    try {
        const databuffer = fs.readFileSync('articles.json');
        const dataJSON = databuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        //  无JSON文件
        return []; // 空数组
    }
};

const saveArticle = article => {
    const dataJSON = JSON.stringify(article);
    fs.writeFileSync('articles.json', dataJSON);
};
///////////////////////////////////////////////////////

/** addArticle */
const addArticle = (title, body, time) => {
    const notes = loadArticles();
    notes.push({
        title: title,
        content: body,
        time: time
    });
    saveArticle(notes);
    console.log('New article added!');
};

///////////////////////////////////////////////////////

/* removeArticle */
const removeArticle = title => {
    const notes = loadArticles();
    const notesToKeep = notes.filter(note => note.title !== title);

    if (notesToKeep.length === notes.length) {
        console.log('no article found');
    } else {
        saveArticle(notesToKeep);
        console.log('article removed.');
    }
};
///////////////////////////////////////////////////////

/** getArticles */
const getArticles = () => {
    const notes = loadArticles();
    return notes;
};
///////////////////////////////////////////////////////

/** readArticle */
const readArticle = title => {
    const notes = loadArticles();
    const note = notes.find(note => note.title === title);
    return note;
};

const editArticle = (new_title, new_content, new_time) => {
    const articles = loadArticles();
    const old_article = articles.find(article => article.title === new_title);
    removeArticle(old_article.title);
    addArticle(new_title, new_content, new_time);
};

module.exports = {
    addArticle: addArticle,
    removeNote: removeArticle,
    getArticles: getArticles,
    readArticle: readArticle,
    editArticle: editArticle
};
