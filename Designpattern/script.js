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
// function createProduct(name,price){// factory function pattern
// let stock=10;
// return {
//     name,
//     price,
//     buy(qty){
//         if(qty<=stock){
//             stock-=qty;
//             console.log(`${qty} picesbooked-${stock} pices left.`);
//         }
//         else{
//             console.error(`We only have ${stock} pices left`);
//         }
//     },
//     refill(qty){
//         stock+=qty;
//         console.log(`refiled the stock-${stock}pices now`);
//     }

// }
// }
// let iphone=createProduct("iphone",7000);
// iphone.buy(6);
// let kitkat=createProduct("kitkat",10);
// kitkat.buy(20); yaha hai khatam hogya hai 

// class  YoutubeChannel{
//     constructor(){
//         this.subscribers=[];
       
         
//     }
//     subscribe(user){
//         this.subscribers.push(user);
//          user.update(`${user.name} you have subscribed the channel`);
//     }
//     unsubscribe(user){
//    this.subscribers=this.subscribers.filter((sub)=> sub!==user);
//     user.update(`you have un-subscibed the youtube channel`);
//     }
//     notify(message){
//         this.subscribers.forEach((sub)=>sub.update(message));
          
//     }
// }
// class User{
//     constructor(name){
//         this.name=name;
//     }
//     update(data){
//         console.log(`${this.name}, ${data}`);
//     }
    
// }
// let sheryians=new YoutubeChannel();
// // let user1=new User("Harsh");
// // let user2=new User("Amit");
// // sheryians.subscribe(user1);
// // sheryians.subscribe(user2);
// // // sheryians.unsubscribe(user1);
// // sheryians.notify("new vedio uploaded");
// class YoutubeChannel{
//     constructor(){
//         this.subscribers=[];

//     }
//     subscribe(users){
//         this.subscribers.push(users);
//         users.update("You have subcribed the you tube channel");
//     }
//     notify(message){
//         this.subscribers.forEach((sub)=>sub.update(message));
//     }
// }
// class User{
//     constructor(name){
//         this.name=name
//     }
//     update(message){
//         console.log(`${this.name},${message}`);
//     }
// }
// let sheriyansh=new YoutubeChannel();
// let user1=new User("Harsh");
// sheriyansh.subscribe(user1);
// sheriyansh.notify("New vedio is uploaded");
class EmailService{
    constructor(){
        this.email=[];
    }
    register(users){
        this.email.push(users);
        users.update(`you got a new email`);
    }
    notify(message){
        this.email.forEach((em)=>em.update(message));
    }
}
class User{
    constructor(name){
        this.name=name;
    }
    update(data){
        console.log(`${this.name},${data}`);
    }

}
let sheriyans=new EmailService();
let user1=new User("harsh");
sheriyans.register(user1);