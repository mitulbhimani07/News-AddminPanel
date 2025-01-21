const express = require('express');
const routes = express.Router()
const UserCtr = require('../controllers/userPanelController');

routes.get('/',UserCtr.home)

module.exports = routes