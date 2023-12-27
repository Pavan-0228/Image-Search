const key = "appsds9TGzmTv6A6DE19pb2GQSd4FywMrrj_3t28hTg";

var input = document.querySelector("form input");
var button = document.querySelector("form button");
var mainDiv = document.querySelector(".search-result")
var showMore = document.querySelector(".show-more");

var imgData ="";
var page = 1;

async function imgSearch(){
    imgData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${imgData}&client_id=${key}`
    var response = await fetch(url);
    

    var data = await response.json();
    var results = data.results;

    if(results.length == 0){
        
        input.classList.add("error");
        setTimeout(()=>{
            input.classList.remove("error");
        },800);

    }
    else{
        if(page === 1){
            mainDiv.innerHTML = "";
        }

        results.map((dets)=>{

            let div = document.createElement("div");
            div.classList.add("search-img");

            let image = document.createElement("img");
            image.src = dets.urls.small;
            image.alt = dets.alt_description;

            let link = document.createElement("a");
            link.href = dets.links.html;
            link.target = "_blank";
            link.textContent = dets.alt_description;

            function limitString(str, maxLength) {
                if (str.length > maxLength) {
                  return str.substring(0, maxLength);
                }
                return str;
              }
              
            link.textContent = limitString(dets.alt_description, 33);
              
              

            div.appendChild(image);
            div.appendChild(link);
            mainDiv.appendChild(div);
       });

      page++;
      if(page > 1){
           showMore.style.display = "block";
        }
    }
    
}

button.addEventListener("click",(event)=>{
    event.preventDefault();
    page = 1;
    imgSearch();
})

showMore.addEventListener("click",()=>{
    imgSearch();
})
