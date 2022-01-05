const router = require('express').Router();
const categoryRoutes = require('./');
const productRoutes = require('./');
const tagRoutes = require('./');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;