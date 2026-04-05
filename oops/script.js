//constructor function
// function CreatePencil(name,color,price){
// this.name=name;
// this.color=color;
// this.price=price;
// }
// CreatePencil.prototype.write=function(text){
//     let h1=document.createElement("h1");
//     h1.textContent=text;
//     h1.style.color=this.color;
//     document.body.append(h1);
// }
// CreatePencil.prototype.company="Shryansh";//shared memory
//  let fnc=new CreatePencil("Ruler pencil","Red",5); 
//  let pencil2=new CreatePencil("ruler","Black",10);
//class yeaha se chalu
// class CreatePencil{
//     constructor(name,company,price,color){
//         this.name=name;
//         this.company=company;
//         this.price=price;
//         this.color=color;
//     }
//      erase(){
//         document.body.querySelectorAll("h1").forEach((elem)=>{
//             if(elem.style.color===this.color){
//                     elem.remove();
//             }
//         });
//      }
//     write(text){
//      let h1=document.createElement("h1");
//      h1.textContent=text;
//      h1.style.color=this.color;
//      document.body.append(h1);
//     }
// }
// let p1= new CreatePencil("natraj","apsara",10,"black");
// let p2=new CreatePencil("natraj","golgotia",20,"red");
// extend and super 
// class User{
//     constructor(name,adress,username,email,color){
//         this.name=name;
//         this.adress=adress;
//         this.username=username;
//         this.email=email;
//         this.role="user";
//     }
//     checkRole(){
//         console.log(`you are a ${this.role}`);//dynamic
//     }
//     write(text){
//         let h1=document.createElement("h1");
//         h1.textContent=text;
//         h1.style.color=this.color;
//         document.body.append(h1);
//     }

// }
 
// class Admin extends User{
//     constructor(name,address,username,email){
//         super(name,address,username,email );
//         this.role="admin";
//     }
//     remove(){
//         document.querySelectorAll("h1").forEach(function(elem){
//             elem.remove();
//         });
//     }
// }
// let u1=new User("harsh","bhopal", "asyn@123","heyhayee","red");
// let u2=new User("harshitaa","bhopal", "asyn@123","heyhayee","black");
// let a1=new Admin("harsh","bhopal","jkcgdig","kuuguige","blue"); 
//prototypal inheritence
// let coffee={
//     color:"dark",
//     drink:function(){
//     console.log("gut gut gut");
//     }
// };
// let arabiataCoffee=Object.create(coffee);
// console.log(arabiataCoffee);
// arabiataCoffee.taste="bitter";
// arabiataCoffee.drink();
//call back 
// function kuchderbaadchalega(fnc){
//     setTimeout(fnc,Math.floor(Math.random()*20)*1000);
// }
// kuchderbaadchalega(function(){
//     console.log("hey");
// });
// function profilelekaraao(username,cb){//cb-->call back yeah cheez library me likhi rehti hai
//     setTimeout(()=>{
//         console.log(`profile fetched of ${username}`);
//         cb({_id:121121,username ,age:26,email:"huhuii@gmail.com"});
//     },2000);
// }
// function saarePostLekarAao(id,cb){
//     setTimeout()
// }

// profilelekaraao("harsh",function(profiledata){
//     // console.log(profiledata);
//    profilelekaraaoidse(data._id, function(posts){
//     console.log(posts);
//    })
// });
let pr=new Promise(function(res,rej){
    setTimeout(()=>{
    let rn=Math.floor(Math.random()*10);// it gives us random value between 0 to 9
    if(rn>5) res(rn+"res");
    else rej(rn+"rej");
    },3000);
});
pr
.then(function(val){
    console.log(val);
})
.catch(function(val){
    console.log(val);
});