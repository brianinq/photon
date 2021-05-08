const auth = '563492ad6f9170000100000164cdfc904d3e4f0f857634668a62200e';
const gallery = document.querySelector('.pics')
const searchInput = document.querySelector('.search')
const form = document.querySelector('.search-form')
let searchValue;
const more = document.querySelector('.more')
let page = 1;
let fetchLink;
let currentSearch;
//
searchInput.addEventListener('input', updateInput)
form.addEventListener('submit', (event) => {
    event.preventDefault();
    searchPics(searchValue);
    currentSearch = searchValue;
})
more.addEventListener('click', loadMore)

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
        galleryImg.classList.add('pics-img')
        galleryImg.innerHTML = `<img src=${photo.src.large}></img> 
        <div class='pics-info'>
        <p>${photo.photographer}</p>
        <a href='${photo.src.original}'>View</a>
        </div>`;
        gallery.appendChild(galleryImg)
    });
}


async function curatedPics() {
    fetchLink = 'https://api.pexels.com/v1/curated?per_page=&page=1'
    const data = await fetchApi(fetchLink)

    generatePics(data)
}

async function searchPics(query) {
    clear()
    fetchLink = `https://api.pexels.com/v1/search/?page=1&per_page=&query=${query}`
    const data = await fetchApi(fetchLink)

    generatePics(data)
}

function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search/?page=${page}&per_page=&query=${currentSearch}`
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=&page=${page}`
    }


    const data = await fetchApi(fetchLink)
    generatePics(data)
}
curatedPics()