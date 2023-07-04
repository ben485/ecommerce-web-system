ChangeSubTotalPrice()

$('.minus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    if(value > 2){
        value = value - 1;
        let ParentElement =  $this.closest('.item').children()
        let rowID = (ParentElement[6].children[0].textContent)
        let userID = (ParentElement[6].children[1].textContent)
        let ProductID = (ParentElement[6].children[2].textContent)
        let Data = {rowID:rowID.trim(), userID:userID.trim(), ProductID:ProductID.trim()}
        Minus(Data)
        
    }else{
        value = 1;
    }
   
    $input.val(value);
    ChangeSubTotalPrice()
    })


    $('.plus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    if(value < 100){
        value = value + 1;
        let ParentElement =  $this.closest('.item').children()
        let rowID = (ParentElement[6].children[0].textContent)
        let userID = (ParentElement[6].children[1].textContent)
        let ProductID = (ParentElement[6].children[2].textContent)
        let Data = {rowID:rowID.trim(), userID:userID.trim(), ProductID:ProductID.trim()}
        Plus(Data)
    }else{
        value = 100;
    }
   
    $input.val(value);

    ChangeSubTotalPrice()

    
    })


    $('.delete-btn').on('click', function(e){
        e.preventDefault();
        var $this = $(this);
        let ParentElement =  $this.closest('.item').children()
        let rowID = (ParentElement[6].children[0].textContent)
        let userID = (ParentElement[6].children[1].textContent)
        let ProductID = (ParentElement[6].children[2].textContent)
        let Data = {rowID:rowID.trim(), userID:userID.trim(), ProductID:ProductID.trim()}
        
        $this.closest('.item').remove()
        ChangeSubTotalPrice()
        DeleteItem(Data)
        
       
    })

    

    function ChangeSubTotalPrice(){
       var itemList = document.getElementsByClassName('item')
       var Total = 0
       for(let i = 0; i < itemList.length; i++){
          let quantity = itemList[i].children[3].children[1].value
          let Selling_price = itemList[i].children[4].children[1].textContent
          let subtotal = Number(quantity)*Number(Selling_price)
          Total = Total + subtotal
          itemList[i].children[5].children[1].textContent = subtotal
       }
       document.getElementById('TotalDue').textContent = Total.toFixed(2)
    }

    function Minus(Data){
        $.ajax({
            type: 'POST',
            url: '/update-carts-quantity-minus',
            ContentType: 'application/json',
            data: Data,
            success: function(data) {
              // alert('cart Upadted')
            }
         })
    }


    function Plus(Data){
        //console.log(Data)
        $.ajax({
            type: 'POST',
            url: '/update-carts-quantity-plus',
            ContentType: 'application/json',
            data: Data,
            success: function(data) {
               //alert('cart Upadted')
            }
         })
    }
    

    function DeleteItem(Data){
        $.ajax({
            type: 'POST',
            url: '/delete-items-from-carts',
            ContentType: 'application/json',
            data: Data,
            success: function(data) {
              // alert('cart Upadted')
            }
         })
    }