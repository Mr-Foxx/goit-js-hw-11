import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import $ from 'jquery';

const form = document.querySelector('.search-form');
const inputElement = document.querySelector('input[name="searchQuery"]');

const container = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

const URL = 'https://pixabay.com/api/';
const KEY = '34551974-263ab9c7e5b8efeaa679c471a';

let page = 1;

loadMore.classList.add('is-hidden');

form.addEventListener('submit', handleSearch);
loadMore.addEventListener('click', heandleLoadMorePictures);

infiniteІcroll();

async function handleSearch(evt) {
  evt.preventDefault();

  const inputValue = inputElement.value.toLowerCase().trim();

  try {
    const picturesData = await fetchPictures(inputValue);
    clearForm();
    renderPictures(picturesData.hits);

    loadMore.classList.remove('is-hidden');

    if (picturesData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMore.classList.add('is-hidden');
    } else {
      Notiflix.Notify.success(
        `Hooray! We found ${picturesData.totalHits} images.`
      );
    }
  } catch (error) {
    Notiflix.Notify.failure(error);
    throw error;
  }
}

async function heandleLoadMorePictures() {
  const inputValue = inputElement.value.toLowerCase().trim();

  try {
    const resultData = await fetchPictures(inputValue);

    renderPictures(resultData.hits);

    page += 1;

    if (resultData.hits.length === resultData.totalHits) {
      loadMore.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    pageScrolling();
  } catch (error) {
    Notiflix.Notify.failure(error);
    throw error;
  }
}

async function fetchPictures(inputValue) {
  try {
    const response = await axios.get(`${URL}`, {
      params: {
        key: KEY,
        q: inputValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(error);
    throw error;
  }
}

function renderPictures(picturesData) {
  console.log(picturesData);

  const newPictures = picturesData
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
        <a href="${largeImageURL}" class="photo-card">
          <img class='img' src="${webformatURL}" alt="${tags}" loading="lazy" data-src="${largeImageURL}" />
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
        </a>
      `;
    })
    .join('');

  container.insertAdjacentHTML('beforeend', newPictures);

  const lightbox = new simpleLightbox('.gallery a');
}

function pageScrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function clearForm() {
  container.innerHTML = '';
}

function infiniteІcroll() {
  $(window).on('scroll', function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
      heandleLoadMorePictures();
    }
  });
}

// ================================
