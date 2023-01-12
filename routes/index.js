const express = require('express')
const router = express.Router()

const { generations } = require('../controlers/generations')
const { edits } = require('../controlers/edits')
const { variations } = require('../controlers/variations')


// router.get('/', () => console.log('home'))
// router.post('/', () => console.log('home')) //


// router.get('/generations', generations)
router.post('/generations', generations) //
// router.post('/generations', (req, res) => {
//     res.status(200).json(req.body)
// }) //


// router.get('/edits', edits)
// router.post('/edits', edits) //


// router.get('/variations', variations)
// router.post('/variations', variations) //

module.exports = router