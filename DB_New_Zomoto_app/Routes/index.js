const express = require('express');

const route = express.Router();

const locationController = require('../Controllers/locations');
const mealtypeController = require('../Controllers/mealtypes');
const restaurantController = require('../Controllers/restaurant');
const menuItemsController = require('../Controllers/menuItems');
const paymentController = require('../Controllers/payment');
const userscontroller= require('../Controllers/users');
const videocontroller= require('../Controllers/video');
const paycontroller= require('../Controllers/Paydetail');


route.get('/locations', locationController.getLocations);
route.get('/mealtypes', mealtypeController.getMealTypes);
route.get('/restaurants/:locationId', restaurantController.getRestaurantsByLocation);
route.post('/filter', restaurantController.filterRestaurants);
route.get('/restaurant/:resId', restaurantController.getRestaurantsDetailsById);
route.get('/menuitems/:resId', menuItemsController.getMenuItemsByRestaurant);
route.post('/payment', paymentController.payment);
route.post('/callback', paymentController.callback);
route.post('/user', userscontroller.checkuserdetails);
route.post('/signup', userscontroller.Postdetailsofusers);
route.get('/videos', videocontroller.checkvideodetails);
route.get('/videos/:id', videocontroller.checkvideodetailsbyid);
route.post('/video', videocontroller.postvideodetails);
route.delete('/videos/:id', videocontroller.deletevideodetails);
route.post('/PayDetail', paycontroller.postpaydetails);
route.get('/PayDetail/:accid', paycontroller.showorderdetailsbyid);
route.post('/items', menuItemsController.addMenuItems);



module.exports = route;