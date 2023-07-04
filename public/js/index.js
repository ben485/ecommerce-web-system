CheckifUserIsLoggedIn()
$('.Addtocartbtn'). click(function(e){
    let ProductID = $(this).children().eq(1).text()
    let Selling_price = $(this).children().eq(2).text()
    let Product_Name = $(this).children().eq(3).text()
    let fileID= $(this).children().eq(4).text()
    let userProductstId = $(this).children().eq(5).text()

    let NameID = $(this).children().eq(6).text()
    let BrandID = $(this).children().eq(7).text()

    let Quantity = 1

    let storedDatastring = localStorage.getItem('halecommerce');
    let storedData = JSON.parse(storedDatastring);
    let Data = {ProductID, Selling_price, Product_Name, fileID, userProductstId, Quantity, userID:(storedData.userID).trim(), NameID, BrandID}

    if(storedData.userType === 'User'){
        $.ajax({
            type: 'POST',
            url: '/carts-add-item-user',
            ContentType: 'application/json',
            data: Data,
            success: function(data) {
              // alert('item added to cart for user')
               document.getElementById('CartNumber').textContent = Number(document.getElementById('CartNumber').textContent) + 1
              
            }
         })
    }else{
        $.ajax({
            type: 'POST',
            url: '/carts-add-item-vistor',
            ContentType: 'application/json',
            data: Data,
            success: function(data) {
               // alert('item added to cart for visitor')
                document.getElementById('CartNumber').textContent = Number(document.getElementById('CartNumber').textContent) + 1
         
              
            }
         })
    }    
})


document.getElementById('MyCartBtn').addEventListener('click', function(e){
    e.preventDefault()
    OpenCartPage()
})

function CheckIfUserDataExist(){
    const storedData = localStorage.getItem('halecommerce');
    if(storedData){
       FetchCartInfoForVisitors()
    }else{
        let todayString = (new Date().getTime()).toString()
        let uniqueID = GenerateIndex()
         let userID = uniqueID+''+todayString;
       
         let userData = {userType : 'Vistor',  userID : userID}
         localStorage.setItem('halecommerce', JSON.stringify(userData));
    }
}

function CheckifUserIsLoggedIn(){
    $.ajax({
        type: 'POST',
        url: '/check-loggedin-status',
        ContentType: 'application/json',
        data: {Ben: 'Ben'},
        success: function(data) {
         if(data.Status === 'isLoggedIn'){
            let userData = {userType : 'User',  userID : data.userID}
            localStorage.setItem('halecommerce', JSON.stringify(userData));
            FetchCartInfoForUsers()
         }else{
            //alert('visitor')
            CheckIfUserDataExist()
         }
          
        }
     })
}


function FetchCartInfoForUsers(){
    $.ajax({
        type: 'POST',
        url: '/fetch-cart-number-for-users',
        ContentType: 'application/json',
        data: {Ben:'Ben'},
        success: function(data) {
         // alert('Fetched cart Number')
          document.getElementById('CartNumber').textContent = Number(data)
        }
     })
}

function FetchCartInfoForVisitors(){
    let storedDatastring = localStorage.getItem('halecommerce');
    let storedData = JSON.parse(storedDatastring);
    let Data = {userID:(storedData.userID).trim()}
    $.ajax({
        type: 'POST',
        url: '/fetch-cart-number-for-visitors',
        ContentType: 'application/json',
        data: Data,
        success: function(data) {
          //alert('Fetched cart Number')
          document.getElementById('CartNumber').textContent = Number(data)
        }
     })
}

function OpenCartPage(){
    let storedDatastring = localStorage.getItem('halecommerce');
    let storedData = JSON.parse(storedDatastring);
    let userID = storedData.userID
    window.location = `/my-cart-test/${userID}`
}




function GenerateIndex(){
    const min = 1000000000;
    const max = 9999999999;
   return Math.floor(Math.random() * (max - min + 1) + min);
  }