const auth = '563492ad6f9170000100000164cdfc904d3e4f0f857634668a62200e';
const gallery = document.querySelector('.pics')
const searchInput = document.querySelector('.search')
const form = document.querySelector('.search-form')
let searchValue;


//
searchInput.addEventListener('input', updateInput)
form.addEventListener('submit', (event) => {
    event.preventDefault();
    searchPics(searchValue);
})

function updateInput(event) {
    searchValue = event.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    })
    return dataFetch.json()
}

function generatePics(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img')
        galleryImg.innerHTML = `<img src=${photo.src.large}></img> 
        <div class='pics-info'>
        <p>${photo.photographer}</p>
        <a href='${photo.src.original}'>View</a>
        </div>`;
        gallery.appendChild(galleryImg)
    });
}


async function curatedPics() {
    const data = await fetchApi('https://api.pexels.com/v1/curated?per_page=20&page=1')

    generatePics(data)
}

async function searchPics(query) {
    clear()
    const data = await fetchApi(`https://api.pexels.com/v1/search/?page=1&per_page=&query=${query}`)

    generatePics(data)
    console.log(data)
}

function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}

curatedPics()