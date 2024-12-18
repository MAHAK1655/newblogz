// nav background
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})

//Filter
$(document).ready(function () {
    $(".filter-item").click(function () {
        const value = $(this).attr("data-filter");
        if (value == "all"){
            $(".post-box").show("1000")
        } else{
            $(".post-box")
                .not("." + value)
                .hide(1000);
            $(".post-box")
            .filter("." + value)
            .show("1000")
        }
    });
    $(".filter-item").click(function () {
        $(this).addClass("active-filter").siblings().removeClass("active-filter")
    });
});

// new updation for experiment // 

// document.getElementById("postForm").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const postData = {
//         category: document.getElementById("category").value,
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         image: document.getElementById("image").value,
//     };

//     fetch("http://localhost:5000/addPost", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(postData),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             alert(data.message);
//             document.getElementById("postForm").reset();
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//             alert("Error adding post");
//         });
// });


fetch("http://localhost:5000/getPosts")
    .then((response) => response.json())
    .then((data) => {
        const postContainer = document.querySelector(".post.container");
        postContainer.innerHTML = ""; // Clear existing posts
        data.forEach((post) => {
            postContainer.innerHTML += `
                <div class="post-box ${post.category}">
                    <img src="${post.image}" alt="" class="post-img">
                    <h2 class="category">${post.category}</h2>
                    <a href="#" class="post-title">${post.title}</a>
                    <span class="post-date">${new Date().toLocaleDateString()}</span>
                    <p class="post-description">${post.description}</p>
                </div>
            `;
        });
    })
    .catch((error) => console.error("Error:", error));


// experiment end here//