const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

//added for my post
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

//added for my post
router.use('/posts', postRoutes);

module.exports = router;
