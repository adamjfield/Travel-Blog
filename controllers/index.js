const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const blogRoutes = require('./blog-routes.js');
const imageRoutes = require('./apiRoutes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/blog', blogRoutes);
router.use('/api', apiRoutes);
router.use('/image', imageRoutes);

module.exports = router;
