function createtoaster(config) {
    return function(str) {
        let div = document.createElement("div");
        div.textContent = str;
        
        // Sirf Tailwind classes use karo, inline style nahi
        div.className =`inline-block ${config.theme==="dark"? "bg-gray-800 text-white": "bg-gray-100 text-black"}
        px-6 py-3 rounded shadow-lg pointer-events-none`;
        document.querySelector(".parent").appendChild(div);
        if(config.positionX!=="left" || positon!=="top"){
            document.querySelector(".parent").className+=
            `${config.positionX==="right"? "right-5": "left-5"} ${config.positionY==="bottom" ? "bottom-5":"top-5"}`;

        }
        setTimeout(()=>{
            document.querySelector(".parent").removeChild(div);

        },config.duration*1000);
        
        };
    }
     

       


let toaster = createtoaster({
    positionX:"left",
    positionY:"bottom",
    theme:"dark",
    duration:10,     
});

toaster("This is a notification!");
setTimeout(()=>{
    toaster("harsh accepted your request");
},2000);
