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
router.get('/:commentId', (req, res) => {

    Comment.findById(req.params.commentId).populate({ 
        path: 'article',
        select: 'title',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar'
        } 
     })

})
// router.get('/my')
// router.get('/all')







module.exports = router;