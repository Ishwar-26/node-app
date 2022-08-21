const express = require('express')

const router = express.Router()
const accountController = require('../controllers/accountController');
const { check, body } = require('express-validator');

router.post('/register',
    body('username')
        .isLength({ min: 3 })
        .withMessage("Username must be of 3 characters")
        .isAlphanumeric()
        .withMessage("Username must Alphanumeric only")
        .trim()
    , body('firstname')
        .isLength({ min: 3 })
        .trim()
        .withMessage("Firstname must be of 3 characters"),
    accountController.register
)

module.exports = router;