const express = require('express');
const router = express.Router();
const { isAuth, generateSendJWT } = require('../service/auth');
const upload = require('../service/image')

const uploads = require('../controllers/upload')
router.post('/', isAuth, upload, uploads.uploadFile);

module.exports = router;