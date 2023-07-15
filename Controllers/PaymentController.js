const request = require('request')
const pool = require('../config/databasetwo');


let ReceivePaymentPost = (req, res) => {
 // console.log(req.body)
//  console.log('One Hello')
   let Reference = (req.body.reference).trim()
   let AmountCharge = Number(req.body.Amount)
   let FirstName = req.body.FirstName
   let LastName =  req.body.LastName
   let Address = req.body.Address
   let City =  req.body.City
   let Neighbourhood = req.body.Neighbourhood
   let State =  req.body.State
   let GPSCODE = req.body.GPSCODE
   let Telephone =  req.body.Telephone
   let Mobile = req.body.Mobile
   let Email =  req.body.Email
   let String_Date = req.body.String_Date
   let Word_Date =  req.body.Word_Date
   let Year = req.body.Year
   let Month =  req.body.Month
   let Time =  req.body.Time
   let orderID = new Date().getTime()
   let TotalPaid = AmountCharge
   let Status = 'Pending'
   let emailSent = 'Pending'
   var userID 
   var userEmail
   if(req.user !== undefined){
    userEmail = req.user.inputEmail
    userID = req.user.userID
   }else{
    userEmail = 'visitor'
    userID = (req.body.userID).trim()
   }

   let PaymentData = { FirstName, LastName, Reference, AmountCharge, Address, City, Neighbourhood, State, GPSCODE, Telephone, Mobile, Email, String_Date, Word_Date, Year, Month, Time, orderID, Status, userID, userEmail, emailSent   }

   var options ={
       'method': 'GET',
        'url':  'https://api.paystack.co/transaction/verify/'+ Reference,
        'headers':{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PayStack_Authorization}`
         },
   }  

   request(options, function (error, response) { 
       if (error) {
           console.log(error)
          return res.json({Status:'Failure', ErrorInfo:'ConnectionError'})
       }else{
        console.log('Five')
        // console.log(JSON.parse(response.body))
           let Info = JSON.parse(response.body)
         if(Info.data.status === 'success'){
             let Data = Info.data
             if(Data.currency === 'GHS'){
                 if(Number(Data.amount) >= (TotalPaid)){
                   let sql = `INSERT INTO orders SET ?`;
                   let sqltwo = `UPDATE carts SET status = 'Ordered', orderID = '${orderID}' WHERE userID = ? AND userEmail = ? AND status = ?`;
                   pool.query(sql, PaymentData, (err, result)=> {
                      if(err){
                       console.log(err)
                      }else{
                       pool.query(sqltwo, [userID, userEmail, 'Pending'], (err, result)=> {
                         if(err) {
                           console.log(err)
                         }else{
                           return res.json({Status: 'success'})
                         }
                       })
                      }
                 })

                 }else{
                     console.log('Amount paid is less')
                     let ErrorInfo = 'THE AMOUNT PAID IS LESS THAN THE REQUIRED AMOUNT'
                     let Desc = `You paid  ${Data.currency} ${Data.amount} instead of required amount of GHS ${Amount}`
                       return res.json({Status:'Failure', ErrorInfo:ErrorInfo, Desc:Desc})

                 }
             }else{
                 console.log('wrong Currency')
    
                 let ErrorInfo = 'TransactionError'
                 let Desc = `You made payment in ${Data.currency} instead of GHS` ;
                   return res.json({Status:'Failure', ErrorInfo:ErrorInfo, Desc:Desc})
                
             }
         }else{
            let ErrorInfo = 'TransactionError'
            let Desc = 'Your transaction was not completed.'
            let Status = 'Failure'
           return res.json({ErrorInfo:ErrorInfo, Desc:Desc,  Status:Status})
         }
       }
       
        
     });
}

const PaymentSuccess = (req, res) => {
  res.render('payment-success')
}
module.exports = {
  ReceivePaymentPost,
  PaymentSuccess
}