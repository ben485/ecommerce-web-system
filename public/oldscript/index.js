 //     $(function () {
             
        //     $('#myDiv').floatingWhatsApp({
        //     phone: '0555667719',
        //     popupMessage: 'Hello, welcome to Hale Pharmacy',
        //     showPopup: true,
        //     headerTilte: "Hale Pharmacy Customer Service",
        //     message: "How can we help you today",
        //     position: "right",
        //     });
        
        
        
        // });
        
        var Status
        checkCookie()
        CheckCart(Status)
        CheckStatus(Status)
        
       // alert(Status)

        function CheckStatus(Status){
          if(Status === 'Loggedinuser'){
              CheckOutuserfunction()
              UserHistoryfxn()
          }else{
            CheckOutfxn()
            Historyfxn()  
          }
        }
        document.getElementById('MyCartBtn').addEventListener('click', function(){
         
         })  
        
         document.getElementById('MyCartBtnthree').addEventListener('click', function(){
          //alert('hi')
           Opencartbtn(Status)
         })  
        
         document.getElementById('Checkoutbuttontwo').addEventListener('click', function(event){
          OpenCheckoutbtn(Status)
        
         })  
        
        
         document.getElementById('Historytbuttontwo').addEventListener('click', function(){
            OpenHistoryButton(Status)
         })
         
        function setCookie(cname, cvalue, exdays) {
          const d = new Date();
          d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
          let expires = "expires="+d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        
        function getCookie(cname) {
          let name = cname + "=";
          let ca = document.cookie.split(';');
          for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
            }
          }
          return "";
        }
        
        
        
        function checkCookie() {
          let haleStatus = getCookie("halestatus");
          if (haleStatus !== "" ) {
             Status = getCookie("halestatus")
           // alert(Status);
          } else {
             Status = "quest"
          }
        }
        
        
        $('.Addtocartbtn'). click(function(e){
          if(Status === "Loggedinuser"){
                 let MyID
                 let Identity = getCookie("inputEmail")
                 let cartidone = getCookie("cartID")
                 if(cartidone === ''){
                  
                   let id = () => {
                   return Math.floor((1 + Math.random()) * 0x100000000)
                       .toString(16)
                       .substring(1);
                 }
                     MyID = id()
  
                 }else{
                      MyID = cartidone
                    //  alert(MyID)
                 }
                 
                //  alert(MyID)
        
                    
                  let ProductID = $(this).children().eq(1).text()
                  let Selling_price = $(this).children().eq(2).text()
                  let Product_Name = $(this).children().eq(3).text()
                  let UserName = $(this).children().eq(4).text()
                  let inputEmail = $(this).children().eq(5).text()
                  let md5 = $(this).children().eq(6).text()
                  let filename = $(this).children().eq(7).text()
                  let Quality = 1
                  let Drug_Type= $(this).children().eq(8).text()
                  let Description = $(this).children().eq(9).text()
        
                  let Data = {Product_Name:Product_Name, Selling_price:Selling_price, ProductID:ProductID, UserName:UserName, inputEmail:inputEmail, filename:filename, md5:md5, Quantity:Quality, CartID:MyID, userStatus:Status, Drug_Type:Drug_Type, Description:Description, Identity:Identity, CartNumber:Identity }
                 console.log(Data)
                 alert(ProductID)
        
                  $.ajax({
                          type: 'POST',
                          url: '/Addproducttocartuser',
                          ContentType: 'application/json',
                          data: Data,
                          success: function(data) {
                            alert(`${data.Mes} has been added to your cart`)
                            var CartQty = Number(document.getElementById('CartNumber').textContent) + Quality
                             document.getElementById('CartNumber').textContent = CartQty
                             document.getElementById('Cartmenutwotwo').textContent = CartQty
                           
                             setCookie("cartID", MyID, 365)
                          }
                       })
        
             }
        
            else if(Status === "Visitor"){
              // alert(Status)
        
                  let cartID = getCookie("cartID")
                   let Cartnumber = getCookie("Cartnumber")
        
                   
                  let ProductID = $(this).children().eq(1).text()
                  let Selling_price = $(this).children().eq(2).text()
                  let Product_Name = $(this).children().eq(3).text()
                  let UserName = $(this).children().eq(4).text()
                  let inputEmail = $(this).children().eq(5).text()
                  let md5 = $(this).children().eq(6).text()
                  let filename = $(this).children().eq(7).text()
                  let Quality = 1
                  let Drug_Type= $(this).children().eq(8).text()
                  let Description = $(this).children().eq(9).text()
        
                  let Data = {Product_Name:Product_Name, Selling_price:Selling_price, ProductID:ProductID, UserName:UserName, inputEmail:inputEmail, filename:filename, md5:md5, Quantity:Quality, CartID:cartID, Cartnumber:Cartnumber, userStatus:Status, Drug_Type:Drug_Type, Description:Description, Identity:"Visitor" }
                  //alert(ProductID)
        
                  $.ajax({
                          type: 'POST',
                          url: '/Addproducttocartvisitor',
                          ContentType: 'application/json',
                          data: Data,
                          success: function(data) {
                            alert(`${data.Mes} has been added to your cart`)
                            var CartQty = Number(document.getElementById('CartNumber').textContent) + Quality
                             document.getElementById('CartNumber').textContent = CartQty
                             document.getElementById('Cartmenutwotwo').textContent = CartQty
                            
                          }
                       })
        
             
            }else {
        
          
              let id = () => {
                   return Math.floor((1 + Math.random()) * 0x100000000)
                       .toString(16)
                       .substring(1);
                 }
                 let MyID = id()
                 let Cartnumber = (new Date().getTime()).toString()
                //  alert(MyID)
        

            }
                 
        })
        
          
        
         function CheckCart(Status){
         // alert('checking ....')
          if(Status === "Visitor"){
           
                   let cartID = getCookie("cartID")
                   let Cartnumber = getCookie("Cartnumber")
              
                   let Data = {CartID:cartID, CartNumber:Cartnumber}
                 //  alert(Cartnumber)
                   $.ajax({
                          type: 'POST',
                          url: '/CheckVisitorcart',
                          ContentType: 'application/json',
                          data: Data,
                          success: function(data) {
                           //alert(data.Quantity)
                             document.getElementById('CartNumber').textContent = data.Quantity
                             document.getElementById('Cartmenutwotwo').textContent = data.Quantity
                            
                          }
                       })
        }
         else if(Status === "Loggedinuser"){
          //alert(Status)
          let cartID = getCookie("cartID")
          let Identity =  getCookie("inputEmail")
                   let Data = {CartID:cartID,Identity:Identity }
        
                   $.ajax({
                          type: 'POST',
                          url: '/CheckUserCart',
                          ContentType: 'application/json',
                          data: Data,
                          success: function(data) {
                              document.getElementById('CartNumber').textContent = data.Quantity
                             document.getElementById('Cartmenutwotwo').textContent = data.Quantity
                            
                          }
                       })
        }
         }
        
        
         function CheckOutfxn(){
          let StoreID = getCookie("StoreID")
          if(StoreID != ""){
                let Data = {StoreID:StoreID}
                // alert(StoreID)
                $.ajax({
                      type: 'POST',
                      url: '/CheckVisitorCheckout',
                      ContentType: 'application/json',
                      data: Data,
                      success: function(data) {
                        //alert(data.Quantity)
                          document.getElementById('CheckOutID').textContent = data.Quantity
                        
                        
                      }
                    })
        }
         else {
          
         }
         }
        
  
  
         function CheckOutuserfunction(){
          let Identity =  getCookie("inputEmail")
          if(Identity != ""){
                let Data = {Identity:Identity}
                // alert(StoreID)
                $.ajax({
                      type: 'POST',
                      url: '/CheckCheckoutuser',
                      ContentType: 'application/json',
                      data: Data,
                      success: function(data) {
                        //alert(data.Quantity)
                          document.getElementById('CheckOutID').textContent = data.Quantity
                        
                        
                      }
                    })
        }
         else {
          
         }
         }
        
         function Historyfxn(){
          let StoreID = getCookie("StoreID")
          if(StoreID != ""){
                let Data = {StoreID:StoreID}
                // alert(StoreID)
                $.ajax({
                      type: 'POST',
                      url: '/CheckVisitorOrderhistory',
                      ContentType: 'application/json',
                      data: Data,
                      success: function(data) {
                        //alert(data.Quantity)
                          document.getElementById('HistoryID').textContent = data.Quantity
                        
                        
                      }
                    })
        }
         else {
          
         }
         }
  
  
        
         function UserHistoryfxn(){
          let Identity =  getCookie("inputEmail")
          if(Identity != ""){
                let Data = {Identity:Identity}
                // alert(StoreID)
                $.ajax({
                      type: 'POST',
                      url: '/CheckOrderhistoryUser',
                      ContentType: 'application/json',
                      data: Data,
                      success: function(data) {
                        //alert(data.Quantity)
                          document.getElementById('HistoryID').textContent = data.Quantity
                        
                        
                      }
                    })
        }
         else {
          
         }
         } 
  
     
         
  
         function Opencartbtn(Status){
          alert('weee')
          if(Status === "Visitor"){
              let cartID = (getCookie("cartID")).toString()
              let Cartnumber = getCookie("Cartnumber")
            //  console.log(cartID)
              window.document.location = `/MycartOne?KeyOne=${Cartnumber}&KeyTwo=${cartID}&KeyThree=Halepharmacy`     
        }
         else if(Status === "Loggedinuser"){
          //alert(Status)
            let cartID = getCookie("cartID")
            let Identity =  getCookie("inputEmail")
            window.document.location = `/Mycarttwo?KeyOne=${Identity}&KeyTwo=${cartID}&KeyThree=Halepharmacy`
        
        }else{
          // alert(alert(Status))
        }
         }
        
        
        
         function OpenCheckoutbtn(Status){
              if(Status === 'Loggedinuser'){
                let Identity =  getCookie("inputEmail")
                window.document.location = `/Checkorderpageusers?KeyOne=${Identity}&Keytwo=Halepharmacy`
              }else{
                let StoreID = (getCookie("StoreID")).toString()  
                window.document.location = `/Checkorderpagevisitor?KeyOne=${StoreID}&Keytwo=Halepharmacy`
              }
         }
        
         
        
        
         function OpenHistoryButton(Status){
              if(Status === 'Loggedinuser'){
                let Identity =  getCookie("inputEmail")
                window.document.location = `/Historypageusers?KeyOne=${Identity}&Keytwo=Halepharmacy`
              }else{
                let StoreID = (getCookie("StoreID")).toString()  
                window.document.location = `/Historypagevisitor?KeyOne=${StoreID}&Keytwo=Halepharmacy`
              }
         }
        
         
          