// console.log(this);
// function abcd(){
// console.log(this);
// }
// abcd();
// let obj={
//     name:"Harshita",
//     sayName: function(){
//         console.log(this.name);
//     },
// };
// obj.sayName();
// let h=document.querySelector("h1");
// h.addEventListener("click",function(){
//     console.log((this.style.color="red"));
// })

// let obj={
//     name:"harsh",
    
// }
// function abcd(){
//     console.log(this);
// }
// abcd.call(obj);

let obj={
    name:"harsh",
    age:26,

}
function abcd(){
   console.log(this);
}
let fnc=abcd.bind(obj);
fnc();