const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

//added for my post
const postRoutes = require('./postRoutes');

//added for comments
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

//added for my post
router.use('/posts', postRoutes);

//added for comments
router.use('/comments', commentRoutes);

module.exports = router;
