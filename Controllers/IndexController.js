const {fetchItemsFromDB} = require('../Models/mainModel');

let FetchProductListForIndexPage = async(req, res) => {
    let sql = `SELECT * FROM products ORDER BY Sales DESC LIMIT 3`;
     let values = []
    let results = await fetchItemsFromDB(sql, values)
    res.render('index', {results})
}


const CheckIfUserIsLoggedIn = (req, res) => {
   // console.log(req.user)
    if(req.user){
        return res.status(200).json({Status:'isLoggedIn', userID:req.user.userID})
    }else{
        return res.status(200).json({Status:'Visitor'})
    }
}

module.exports = {
    FetchProductListForIndexPage,
    CheckIfUserIsLoggedIn
}