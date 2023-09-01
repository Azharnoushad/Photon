const auth = "LIaozI8RRrHlei1hYrHmIXF3rTot4MBevGG0toAIIUXkAXebhtwcKhgY";

const galleryEl = document.querySelector(".gallery");
const searchInputEl = document.querySelector(".search-input");
const formEl = document.querySelector(".search-form");
const moreBtnEl=document.querySelector(".more");

let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

function updateInput(e) {
  searchValue = e.target.value;
}

searchInputEl.addEventListener("input", updateInput);
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch= searchValue
  searchPhotos(searchValue);
});


moreBtnEl.addEventListener("click",loadMore)


async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json", Authorization: auth },
      })
      const data = await dataFetch.json();
      return data
}
function generatePhotos(data){
    data.photos.forEach((photo) => {
        console.log("photo", photo);
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        
        `;
        galleryEl.appendChild(galleryImg);
      });
}


async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?page=1&per_page=15"
    const data = await fetchApi(fetchLink)
    generatePhotos(data)
  };page=1



async function searchPhotos(query) {
    clear()
    fetchLink=`https://api.pexels.com/v1/search?query=${query}?page=1&per_page=15`
    const data =await fetchApi(fetchLink)
    generatePhotos(data)
}

function clear(){
    galleryEl.innerHTML=""
    searchInputEl.value = ""
}

async function loadMore () {
    page++;
    if(currentSearch){
       fetchLink =  `https://api.pexels.com/v1/search?query=${currentSearch}+query&page=${page}&per_page=15`
    }else{
        fetchLink =`https://api.pexels.com/v1/curated?page=${page}&per_page=15`
    }
    const data =  await fetchApi(fetchLink)
    generatePhotos(data)

}

curatedPhotos();
