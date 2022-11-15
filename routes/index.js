let express = require('express');
const router = express.Router();
let controllerIndex = require('../controllers/index');

// Routes
router.get('/', controllerIndex.home);

module.exports = router;