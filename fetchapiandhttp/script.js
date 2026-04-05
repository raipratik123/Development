// fetch("https://randomuser.me/api/")//promises based  hota hai
// .then(function(rowdata){
//     // console.log(rowdata); 
//     return rowdata.json();
// })
// .then((rowdata)=>{
//     console.log(rowdata.results[0]);
// })
// .catch(err=>{
//     console.log(err);
// });
// fetch("https://randomuser.me/api/?results=5")//promises based  hota hai
// .then(function(rowdata){
//     // console.log(rowdata); 
//     return rowdata.json();
// })
// .then((rowdata)=>{
//     console.log(rowdata.results);
// })
// .catch(err=>{
//     console.log(err);
// });

fetch("https://randomuser.me/api/?results=3")
.then((raw)=>{
    return raw.json();
})
.then((data)=>{
    data.results.forEach(function(user){
        const card = document.createElement("div");
        card.className = "bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-sm";

        // Header
        const header = document.createElement("div");
        header.className = "h-32 bg-gradient-to-r from-blue-600 to-purple-700";

        // Content
        const content = document.createElement("div");
        content.className = "px-6 pb-6";

        // Profile Image Wrapper
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "flex justify-center -mt-16 mb-4";

        const img = document.createElement("img");
        img.src = user.picture.large;
        img.alt = "User";
        img.className = "w-32 h-32 rounded-full border-4 border-gray-800 shadow-lg object-cover";

        imgWrapper.appendChild(img);

        // User Info
        const userInfo = document.createElement("div");
        userInfo.className = "text-center mb-4";

        const name = document.createElement("h2");
        name.className = "text-2xl font-bold text-white";
        name.textContent = `${user.name.first} ${user.name.last}`;

        const role = document.createElement("p");
        role.className = "text-gray-400 text-sm";
        role.textContent = "Product Designer";

        const location = document.createElement("p");
        location.className = "text-gray-500 text-xs mt-1";
        location.textContent = `${user.location.city}, ${user.location.country}`;

        userInfo.append(name, role, location);

        // Bio
        const bio = document.createElement("p");
        bio.className = "text-center text-gray-400 text-sm mb-6";
        bio.textContent = "Creative designer passionate about building beautiful and functional digital products.";

        // Stats
        const stats = document.createElement("div");
        stats.className = "flex justify-around mb-6 border-t border-b border-gray-700 py-4";

        function createStat(value, label) {
            const stat = document.createElement("div");
            stat.className = "text-center";

            const val = document.createElement("p");
            val.className = "text-2xl font-bold text-blue-400";
            val.textContent = value;

            const lab = document.createElement("p");
            lab.className = "text-gray-400 text-xs";
            lab.textContent = label;

            stat.append(val, lab);
            return stat;
        }

        stats.append(
            createStat("1.2K", "Followers"),
            createStat("856", "Following"),
            createStat("48", "Posts")
        );

        // Buttons
        const btnWrapper = document.createElement("div");
        btnWrapper.className = "flex gap-3";

        const followBtn = document.createElement("button");
        followBtn.className = "flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold";
        followBtn.textContent = "Follow";

        const msgBtn = document.createElement("button");
        msgBtn.className = "flex-1 border-2 border-blue-600 text-blue-400 py-2 rounded-lg hover:bg-gray-700 transition font-semibold";
        msgBtn.textContent = "Message";

        btnWrapper.append(followBtn, msgBtn);

        // Assemble everything
        content.append(imgWrapper, userInfo, bio, stats, btnWrapper);
        card.append(header, content);

        // Finally add to body
        document.querySelector(".users").appendChild(card);
    })
});