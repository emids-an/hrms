const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const dataLoadController = require('../controllers/dataLoadController');
const searchController = require('../controllers/searchController');
const qaController = require('../controllers/qaController');

// Data loading endpoint
router.post('/load-data', upload.single('file'), dataLoadController.loadData);

// Search endpoints
router.get('/search', searchController.search);

// Q&A endpoint
router.post('/ask', qaController.askQuestion);

module.exports = router;