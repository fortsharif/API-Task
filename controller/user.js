const UserModule = require('../modules/user')
const dbName = 'parkit.db'



module.exports = class UserController {
    static async addUser(req, res, next) {

        const email = req.body.email
        const firstName = req.body.firstName
        const surname = req.body.surname

        if (firstName.length <= 0 && surname.length <= 0) {
            return res.status(500).json({ error: 'name length is not enough' })
        }




        const User = await new UserModule(dbName)

        let success = await User.addUser(email, firstName, surname)

        if (success) {
            return res.status(200).json({ status: "success" })
        }

        return res.status(500).json({ error: 'user was not added' })

    }

    static async getUser(req, res, next) {
        const User = await new UserModule(dbName)

        let users = await User.getUser()

        if (users) {
            res.status(200).json(users)
        }
    }

    static async updateUser(req, res, next) {
        const User = await new UserModule(dbName)
        const id = req.params.id
        const newEmail = req.body.email

        console.log(id, newEmail)

        let update = await User.updateUser(id, newEmail)

        if (update) {
            return res.status(200).json({ status: "success" })
        }

        return res.status(500).json({ error: 'user was not updated' })
    }

    static async deleteUser(req, res, next) {
        const User = await new UserModule(dbName)
        const id = req.params.id

        let deleted = await User.deleteUser(id)
        if (deleted) {
            return res.status(200).json({ status: "success" })
        }
        return res.status(500).json({ error: 'user was not deleted' })
    }
}