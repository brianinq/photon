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

async function curatedPics() {
    const dataFetch = await fetch('https://api.pexels.com/v1/curated?per_page=20&page=1', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });

    const data = await dataFetch.json()
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img')
        galleryImg.innerHTML = `<img src=${photo.src.large}></img> 
        <p>${photo.photographer}</p>`
        gallery.appendChild(galleryImg)
    });
}

async function searchPics(query) {
    const dataFetch = await fetch(`https://api.pexels.com/v1/search/?page=1&per_page=&query=${query}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });

    const data = await dataFetch.json()
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img')
        galleryImg.innerHTML = `<img src=${photo.src.large}></img> 
        <p>${photo.photographer}</p>`
        gallery.appendChild(galleryImg)
    });
}

curatedPics()