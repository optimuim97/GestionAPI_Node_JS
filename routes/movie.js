const express = require('express')
const router = express.Router()

const MovieController = require('../controllers/MovieController')
const upload = require('../middleware/upload')

router.get('/', MovieController.index)
router.post('/show', MovieController.show)
router.post('/store', upload.single('image'), MovieController.store)
router.post('/update', MovieController.update)
router.post('/delete', MovieController.destroy)

module.exports = router  