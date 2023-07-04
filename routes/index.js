let express = require('express')
let router = express.Router();

const {FetchProductListForIndexPage, CheckIfUserIsLoggedIn} = require('../Controllers/IndexController');
const {SavedVistorCartInfo, SavedUserCartInfo, FetchCartNuberForUsers, FetchCartNuberForVisitors, DetermineUserTypeForRedirect, CartItemsListForUser, CartItemsListForVisitor, UpdateCartsItemsMinus, UpdateCartsItemsPlus, DeleteItemFromDB} = require('../Controllers/CartController')

/////////////index page route/////////////////
router.get('/', FetchProductListForIndexPage);

/////////////////route for checking if a user is loggedin or not
router.post('/check-loggedin-status' , CheckIfUserIsLoggedIn)

////////////////////Carts routes////////////////////////
///////////////adding a new item to carts for guest and users////////////
router.post('/carts-add-item-vistor', SavedVistorCartInfo);
router.post('/carts-add-item-user', SavedUserCartInfo);
///////////////////Fetching the cart number for quest and users
router.post('/fetch-cart-number-for-visitors', FetchCartNuberForVisitors)
router.post('/fetch-cart-number-for-users', FetchCartNuberForUsers)
////////////////////Opening the cart page////////////////////
router.get('/my-cart-test/:userID', DetermineUserTypeForRedirect);
router.get('/user-cart-details', CartItemsListForUser);
router.get('/visitor-cart-details/:userID', CartItemsListForVisitor)
////////////////////////updating carts items quantity/////////
router.post('/update-carts-quantity-minus', UpdateCartsItemsMinus)
router.post('/update-carts-quantity-plus', UpdateCartsItemsPlus)
/////////////////////deleting items from carts//////////////////
router.post('/delete-items-from-carts', DeleteItemFromDB)


module.exports = router;
