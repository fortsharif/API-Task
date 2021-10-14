const sqlite = require('sqlite-async')
const utils = require('../utils/utils')

module.exports = class User {
    constructor(dbName) {
        return (async () => {
            this.db = await sqlite.open(dbName)

            const sql = 'CREATE TABLE IF NOT EXISTS "User" ("Id" INTEGER PRIMARY KEY AUTOINCREMENT, "Email" TEXT, "GivenName" TEXT, "FamilyName" TEXT, "Created" TEXT)'

            await this.db.run(sql)
            return this
        })()
    }

    async addUser(email, firstName, surname) {
        try {

            if (!utils.emailChecker(email)) {
                throw new Error(`email format is incorrect`)
            }



            const dateCreated = new Date().toDateString()
            firstName = utils.capitalizer(firstName)
            surname = utils.capitalizer(surname)

            firstName = utils.spaceRemover(firstName)
            surname = utils.spaceRemover(surname)


            let sql = `INSERT INTO User(Email, GivenName, FamilyName, Created) VALUES('${email}', '${firstName}', '${surname}', '${dateCreated}');`

            await this.db.run(sql)

            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async getUser() {
        try {
            let sql = `SELECT * FROM User`
            let data = await this.db.all(sql)
            return data
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async updateUser(id, newEmail) {
        try {

            if (!utils.emailChecker(newEmail)) {
                throw new Error(`email format is incorrect`)
            }

            let sql = `SELECT * FROM User WHERE Id = '${id}'`
            const data = await this.db.all(sql)

            if (data.length > 0) {
                sql = `UPDATE User SET Email = '${newEmail}' WHERE Id = '${id}';`

                await this.db.run(sql)

                return true
            }

            throw new Error(`id doesnt exist`)



        } catch (err) {
            console.log(err)
            return false
        }
    }

    async deleteUser(id) {
        try {

            let sql = `DELETE FROM User WHERE Id = '${id}';`

            await this.db.run(sql)

            return true

        } catch (err) {
            return false
        }
    }
}