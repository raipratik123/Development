// let bank=(function(){Module Pattern
//     let bankbalance=12000;

//     function checkBalance(){
//         console.log(bankbalance);
//     }
//     function setBalance(val){
//         bankbalance=val;
//     }
//     function withdraw(val){
//         if(val<=bankbalance){
//             bankbalance-=val;
//             console.log(bankbalance);
//         }
//     }
//     return{
//         checkBalance,
//         setBalance,
//         withdraw,
    

//     };
// })(); 
// bank.checkBalance();
// bank.withdraw(11000);
// bank.checkBalance();
// yaha khatam hua hai
function createProduct(name,price){
let stock=10;
return {
    name,
    price,
    buy(qty){
        if(qty<=stock){
            stock-=qty;
            console.log(`${qty} picesbooked-${stock} pices left.`);
        }
        else{
            console.error(`We only have ${stock} pices left`);
        }
    },
    refill(qty){
        stock+=qty;
        console.log(`refiled the stock-${stock}pices now`);
    }

}
}
let iphone=createProduct("iphone",7000);
iphone.buy(6);
let kitkat=createProduct("kitkat",10);
kitkat.buy(4);
<h1>Hello guys</h1>