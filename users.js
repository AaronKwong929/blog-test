const fs = require('fs');

const loadUsers = () => {
    try {
        const databuffer = fs.readFileSync('users.json');
        const dataJSON = databuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        //  无JSON文件
        return []; // 空数组
    }
};

const saveUser = article => {
    const dataJSON = JSON.stringify(article);
    fs.writeFileSync('users.json', dataJSON);
};

///////////////////////////////////////////////////////

/** add user */
const addUser = (name, password) => {
    const users = loadUsers();
    const duplicateUser = users.find((user) => user.name === name);
    if (!duplicateUser) {
        users.push({
            name: name,
            password: password,
            isAdmin: false,
        });
        saveUser(users);
    }
};

const findUser = (name) => {
    const users = loadUsers();
    return users.find((user) => user.name === name);
}

const varifyUser = (name ,password) => {
    const users = loadUsers();
    return users.find((user) => {
        return user.name === name && user.password === password;
    });
};

module.exports = {
    loadUsers: loadUsers,
    findUser: findUser,
    addUser: addUser,
    varifyUser: varifyUser,
};