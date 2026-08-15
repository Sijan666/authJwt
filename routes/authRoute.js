const express = require('express');
const router = express.Router();
const checkAccess = require('../middleware/authMiddleware');
const { registerUser, loginUser, getPrivateData } = require('../controllers/authController'); 

router.post('/registration', registerUser);
router.post('/login', loginUser);
router.get("/privatedata", checkAccess, getPrivateData);

module.exports = router;

module.exports = router