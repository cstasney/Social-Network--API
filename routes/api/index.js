const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', studentRoutes);

module.exports = router;
