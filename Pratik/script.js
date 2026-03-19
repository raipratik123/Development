// function abcd(){

//     let a=12;
//     return function() {
//         console.log(a);
//     }
// }
// let fnc=abcd();
// fnc();
function countforme(){
    let c=0;
    return function(){
        c++;
        console.log(c);
    };
}
// countforme();
let countFunction = countforme();
countFunction();
countFunction();
countFunction();
let countFunction2 = countforme();
countFunction2();
countFunction2();
countFunction2();
countFunction();