const express = require('express');
const router = express.Router();

const Article = require('../models/article');


router.put('/', (req, res) => {

    new Article({
        title: req.body.title,
        text: req.body.text,
        owner: req.session.user._id

    }).save()
})
// router.post('/')
// router.delete('/')
router.get('/:articleId', (req, res) => {

    Article.findById(req.params.articleId).populate(owner, {firstName: 1, lastName: 1, avatar: 1})

})
// router.get('/my')
// router.get('/all')







module.exports = router;