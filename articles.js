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

/** add article */
const addArticle = (title, body) => {
    const notes = loadArticles();
    const time = new Date().toLocaleString();
    notes.push({
        title: title,
        content: body,
        time: time,
    });
    saveArticle(notes);
    console.log('New article added!');
};

///////////////////////////////////////////////////////

/* remove article */
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

/** read article */
const readArticle = title => {
    const notes = loadArticles();
    const note = notes.find(note => note.title === title);
    return note;
};

///////////////////////////////////////////////////////

/** edit article */
const editArticle = (new_title, new_content) => {
    const articles = loadArticles();
    const old_article = articles.find(article => article.title === new_title);
    removeArticle(old_article.title);
    addArticle(new_title, new_content);
};

module.exports = {
    loadArticles: loadArticles,
    addArticle: addArticle,
    removeNote: removeArticle,
    readArticle: readArticle,
    editArticle: editArticle,
};
