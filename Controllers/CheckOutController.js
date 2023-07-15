const {findSumOfItemsInDB} = require('../Models/mainModel')

const CheckOutUserType = async(req, res) => {
    let userID = (req.params.userID).trim()
    
    if(req.user !== undefined){
     res.redirect(`/user-check-out-page`)
    }else{
     res.redirect(`/visitors-check-out-page/${userID}`)
    }

 }


 const UserCheckOutPage = async(req, res) => {
  let userEmail = (req.user.inputEmail).trim()
  let userID = (req.user.userID).trim()
  let Data = {userEmail, userID}
  let sql = `SELECT SUM(Selling_price * Quantity) AS Total FROM carts WHERE userEmail = ? AND userID = ? AND status = ?`;
  let values = [userEmail, userID, 'Pending']
  let Sum = await findSumOfItemsInDB(sql, values)
  res.render('payment_visitor', {Total:Sum.Total, Data:Data})
 }


 const visitorCheckOutPage = async(req, res) => {
    let userID = (req.params.userID).trim()
    let Data = {userID}
    let sql = `SELECT SUM(Selling_price * Quantity) AS Total FROM carts WHERE userID = ? AND status = ?`;
    let values = [userID, 'Pending']
    let Sum = await findSumOfItemsInDB(sql, values)
    res.render('payment_visitor', {Total:Sum.Total, Data:Data})
   }

   


 module.exports = {
    CheckOutUserType,
    UserCheckOutPage,
    visitorCheckOutPage
 }