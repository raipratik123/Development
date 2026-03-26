let form=document.querySelector(".form-card");
const userManager={
    user:[],
    init:function(){
        form.addEventListener("submit",this.submitForm.bind(this));

    },
    submitForm:function(e){
        e.preventDefault();
    console.log(this.submit
    );
    },  
  addUser: function() {},
  removeUser: function() {},
};
userManager.init();
// let obj={
//     name:"Pratik",
//     age:23,

// };
// function abcd(a,b,c){
//     conole.log(this,a,b,c);
// }
// let fnc=abcd.bind(obj,1,2,3);
// fnc();
