const express = require('express');
const routes = express.Router();
const adminCtrl = require('../controllers/adminController');
const AdminModel = require('../models/AdminModel');
const passport = require('passport')

// LOGIN
routes.get('/signIn', adminCtrl.signIn);
routes.post('/checkSignIn', passport.authenticate('local', { failureRedirect: '/signIn' }), adminCtrl.checkSignIn);

routes.get("/myProfile", passport.checkAuthUser, adminCtrl.myProfile);
routes.get("/signOut", adminCtrl.signOut);




routes.get('/dashboard', passport.checkAuthUser, adminCtrl.dashboard);
routes.get('/dashboard2', passport.checkAuthUser, adminCtrl.dashboard2);
routes.get('/dashboard3', passport.checkAuthUser, adminCtrl.dashboard3);
routes.get('/AddAdmin', passport.checkAuthUser, adminCtrl.AddAdmin);
routes.post('/insertAdmin', AdminModel.uploadImageFile, adminCtrl.insertAdmin);
routes.get('/ViewAdmin',  passport.checkAuthUser,adminCtrl.ViewAdmin);

routes.get('/deleteAdmin/:id', adminCtrl.deleteAdmin);
routes.get('/updateAdmin/:id', adminCtrl.updateAdmin);
routes.post('/editAdmin', AdminModel.uploadImageFile, adminCtrl.editAdmin);

routes.get('/checkEmail', (req, res) => {
    return res.render('checkEmail');
})


routes.post('/verifyEmail', adminCtrl.verifyEmail);
routes.get('/checkOtp', adminCtrl.checkOtp);
routes.post('/verifyOtp', adminCtrl.verifyOtp);
routes.get('/forgotPass', adminCtrl.forgotPass);
routes.post('/verifyPass', adminCtrl.verifyPass);
routes.post('/deleteMultipleAddmin',adminCtrl.deleteMultipleAddmin)


routes.post('/insertCategory', AdminModel.uploadImageFile, adminCtrl.insertCategory);
routes.use('/', require('./userPanelRoutes'))
module.exports = routes;