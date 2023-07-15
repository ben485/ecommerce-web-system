const {insertIntoDB, findSumOfItemsInDB,fetchItemsFromDB,upDateItemsinDB, deleteItemFromDB} = require('../Models/mainModel')

const SavedVistorCartInfo = async(req, res) => {
   let ProductID = (req.body.ProductID).trim()
   let Selling_price = Number(req.body.Selling_price)
   let Product_Name = (req.body.Product_Name).trim()
   let fileID = (req.body.fileID).trim()
   let userProductstId = (req.body.userProductstId).trim()
   let NameID = (req.body.NameID).trim()
   let BrandID = (req.body.BrandID).trim()
   let Quantity = Number(req.body.Quantity)
   let rowID = new Date().getTime()
   let userType = 'visitor'
   let userEmail = 'visitor'
   let userID = (req.body.userID).trim()
   let Data = {Product_Name, ProductID, Selling_price, fileID, userProductstId, Quantity, rowID, userType, userEmail, userID, BrandID, NameID, status:'Pending', orderID:''}
   let sql = `INSERT INTO carts SET ?`;
   await insertIntoDB(sql, Data);
   res.status(200).json({Mes:'Success'})
}


const SavedUserCartInfo = async(req, res) => {
    let ProductID = (req.body.ProductID).trim()
    let Selling_price = Number(req.body.Selling_price)
    let Product_Name = (req.body.Product_Name).trim()
    let fileID = (req.body.fileID).trim()
    let userProductstId = (req.body.userProductstId).trim()
    let NameID = (req.body.NameID).trim()
    let BrandID = (req.body.BrandID).trim()
    let Quantity = Number(req.body.Quantity)
    let rowID = new Date().getTime()
    let userType = 'user'
    let userEmail = req.user.inputEmail
    let userID = (req.user.userID).trim()
    let Data = {Product_Name, ProductID, Selling_price, fileID, userProductstId, Quantity, rowID, userType, userEmail, userID, BrandID, NameID, status:'Pending', orderID:''}
    let sql = `INSERT INTO carts SET ?`;
    await insertIntoDB(sql, Data);
    res.status(200).json({Mes:'Success'})
 }


 const FetchCartNuberForUsers = async(req, res) => {
    let userID = (req.user.userID).trim()
    let userEmail = (req.user.inputEmail).trim()
    let sql = `SELECT SUM(Quantity) AS Total FROM carts WHERE userID = ? AND userEmail = ? AND status = ?`;
    let values = [userID, userEmail, 'Pending'];
    let Sum = await findSumOfItemsInDB(sql, values);
    res.status(200).json(Sum.Total)
 }

 const FetchCartNuberForVisitors = async(req, res) => {
    let userID = (req.body.userID).trim()
    let sql = `SELECT SUM(Quantity) AS Total FROM carts WHERE userID = ? AND status = ?`;
    let values = [userID, 'Pending'];
    let Sum = await findSumOfItemsInDB(sql, values);
    res.status(200).json(Sum.Total)
 }

 const DetermineUserTypeForRedirect = (req, res) => {
    if(req.user){
        return res.redirect('/user-cart-details')
    }else{
        let userID = (req.params.userID).trim()
        return res.redirect(`/visitor-cart-details/${userID}`)
    }
 }

 const CartItemsListForUser = async(req, res) => {
    let userEmail = req.user.inputEmail
    let userID = (req.user.userID).trim()
    let sql = `SELECT * FROM carts WHERE userEmail = ? AND userID = ? AND status = ?`;
    let values = [userEmail, userID, 'Pending'];
    let results = await fetchItemsFromDB(sql, values);
    res.render('cartlist-user', {results})
 }


 const CartItemsListForVisitor = async(req, res) => {
    let userID = (req.params.userID).trim()
    let sql = `SELECT * FROM carts WHERE userID = ? AND status = ?`;
    let values = [userID, 'Pending'];
    let results = await fetchItemsFromDB(sql, values);
    res.render('cartlist-visitor', {results})
 }

 const UpdateCartsItemsMinus = async(req, res) => {
   let rowID = (req.body.rowID).trim()
   let userID = (req.body.userID).trim()
   let ProductID = (req.body.ProductID).trim()
   let sql = `UPDATE carts SET Quantity = Quantity - 1 WHERE rowID = ? AND userID = ? AND ProductID = ?`
   let values = [rowID, userID, ProductID];
   await upDateItemsinDB(sql, values)
   res.status(200).json({Mes:'Success'})
 }

 const UpdateCartsItemsPlus = async(req, res) => {
    let rowID = (req.body.rowID).trim()
    let userID = (req.body.userID).trim()
    let ProductID = (req.body.ProductID).trim()
    let sql = `UPDATE carts SET Quantity = Quantity + 1 WHERE rowID = ? AND userID = ? AND ProductID = ?`
    let values = [rowID, userID, ProductID];
    await upDateItemsinDB(sql, values)
    res.status(200).json({Mes:'Success'})
  }

  const DeleteItemFromDB = async(req, res) => {
    let rowID = (req.body.rowID).trim()
    let userID = (req.body.userID).trim()
    let ProductID = (req.body.ProductID).trim()
    let sql = `DELETE FROM carts WHERE rowID = ? AND userID = ? AND ProductID = ?`
    let values = [rowID, userID, ProductID];
    await deleteItemFromDB(sql, values)
    res.status(200).json({Mes:'Success'})
  }





module.exports = {
    SavedVistorCartInfo,
    SavedUserCartInfo,
    FetchCartNuberForUsers,
    FetchCartNuberForVisitors,
    DetermineUserTypeForRedirect,
    CartItemsListForUser,
    CartItemsListForVisitor,
    UpdateCartsItemsMinus,
    UpdateCartsItemsPlus,
    DeleteItemFromDB
}