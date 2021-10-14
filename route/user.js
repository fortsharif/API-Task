const express = require('express')
const UserController = require('../controller/user')


const router = express.Router()


router.post('/add', UserController.addUser)

router.get('/', UserController.getUser)

router.delete('/delete/:id', UserController.deleteUser)

router.put('/update/:id', UserController.updateUser)

module.exports = router