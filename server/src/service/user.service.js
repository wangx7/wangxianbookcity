const connection = require('../app/database');

class UserService {
    async create(user) {
        const { name, password } = user;
        const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
        const result = await connection.execute(statement, [name, password]);

        return result[0];
    }

    async getUserByName(name) {
        const statement = `SELECT * FROM user WHERE name = ?;`;
        const result = await connection.execute(statement, [name]);

        return result[0];
    }

    async updateAvatarUrlById(avatarUrl, userId) {
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result;
    }

    async updateUserInfoById(userInfo, user) {
        if (!(user.id && Object.keys(userInfo).length > 0)) {
            return Promise.resolve('未修改');
        }
        let statement = `UPDATE user SET `;
        let values = [];
        let i = 0;

        for (let key in user) {
            if (['id', 'creteAt', 'updateAt'].some(item => item !== 'key') && userInfo[key] && userInfo[key] !== user[key]) {
                if (i > 0) {
                    statement += ' , ';
                }
                statement += key + ' = ?';

                values.push(userInfo[key]);
                i++;
            }
        }
        statement += ' WHERE id = ?;';
        values.push(user.id);

        if (values.length === 1) {
            return Promise.resolve('未修改');
        }

        // const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, values);
        return result;
    }
}

module.exports = new UserService();
