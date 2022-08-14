
import { backendRequest } from './js/backendRequest';
import photoCardTpl from './templates/photo-card.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export let pageNumber;
export const perPage = 40;

export const refs = {
  searchForm: document.querySelector('#search-form'),
  inputForm: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.btn'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

refs.searchForm.addEventListener('submit', searchFn);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function searchFn(e) {
  e.preventDefault();
  pageNumber = 1;
  refs.gallery.innerHTML = '';
  onLoadMore();
}

async function onLoadMore() {
  const searchQery = refs.inputForm.value.trim();
  const backendFeedback = await backendRequest(searchQery, pageNumber);
  renderPhotoCards(backendFeedback); 
  scrollBy();
  pageNumber += 1;
  await lightbox.refresh();
}

function renderPhotoCards(cards) {
  refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(cards));
}

function scrollBy() { 
  const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}