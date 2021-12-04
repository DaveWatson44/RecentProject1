const pg = require('../db/postgresquery');

module.exports = class User{
    constructor(id){
        this.id = id;
    }

    getUserByID(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM users WHERE user_id = $1'
            let values = [this.id]
            pg.query(sql, values).then(resp => {
                resolve(resp.rows[0])
            }).catch(err => reject(err))

        })
    }
}