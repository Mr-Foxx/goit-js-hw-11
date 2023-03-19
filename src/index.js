import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const inputElement = document.querySelector('input[name="searchQuery"]');
const btn = document.querySelector('button');
const container = document.querySelector('.gallery');

const URL = 'https://pixabay.com/api/';
const KEY = '34551974-263ab9c7e5b8efeaa679c471a';

form.addEventListener('submit', handleSearch);

async function handleSearch(evt) {
  evt.preventDefault();

  const inputValue = inputElement.value.toLowerCase().trim();

  const picturesData = await fetchPictures(inputValue);
  renderPictures(picturesData.hits);
}

async function fetchPictures(inputValue) {
  const response = await fetch(
    `${URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`
  );

  if (!response.ok) {
    Notiflix.Notify.failure(error);
  }

  const result = await response.json();
  return result;
}

function renderPictures(picturesData) {
  console.log(picturesData);
  const pictur = picturesData
    .map(elem => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = elem;
      return `
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes <span class="span">${likes}</span> </b>
    </p>
    <p class="info-item">
      <b>Views <span class="span">${views}</span> </b>
    </p>
    <p class="info-item">
      <b>Coments <span class="span">${comments}</span> </b>
    </p>
    <p class="info-item">
      <b>Downloads <span class="span">${downloads}</span> </b>
    </p>
  </div>
</div>
      `;
    })
    .join('');

  container.innerHTML = pictur;
}

// ================================

// const form = document.querySelector('.search-form');
// const inputElement = document.querySelector('input[name="searchQuery"]');
// const btn = document.querySelector('button');
// const container = document.querySelector('.gallery');

// const URL = 'https://pixabay.com/api/';
// const KEY = '34551974-263ab9c7e5b8efeaa679c471a';

// form.addEventListener('submit', heandleSearch);

// function heandleSearch(evt) {
//   evt.preventDefault();

//   const inputValue = inputElement.value.toLowerCase().trim();

//   fetchPictures(inputValue)
//     .then(data => {
//       renderPictures(data.hits);
//     })
//     .catch(error => console.log(error));
// }

// function fetchPictures(inputValue) {
//   return fetch(
//     `${URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`
//   )
//     .then(response => response.json())
//     .then(data => {
//       // тут можна обробити отримані дані
//       console.log(data);
//       return data;
//     });
// }

// function renderPictures(picturesData) {
//   console.log(picturesData);

//   const pictur = picturesData
//     .map(elem => {
//       const {
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       } = elem;
//       return `
//     <div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>${downloads}</b>
//     </p>
//   </div>
// </div>
//       `;
//     })
//     .join('');

//   container.innerHTML = pictur;
// }

// ===================
