import axios from 'axios';
// const axios = require('axios').default;
import Notiflix from 'notiflix';
import { refs } from '../index'

export const backendRequest = {
  BASE_URL: 'https://pixabay.com/api/',
  PIXABAY_KEY: '29091734-9e049dbec053396241aa2e5c2',
  pageNumber: 1,
  perPage: 40,
  totalPages: 1,
  numberOfPages: 1,
  
  fetch: async function (name) {
  if (name) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}?key=${this.PIXABAY_KEY}&q=${name}&image_type=photo&page=${this.pageNumber}&per_page=${this.perPage}&orientation=horizontal&safesearch=true`
        );
        this.totalPages = response.data.total / this.perPage;
        this.numberOfPages = Math.ceil(this.totalPages);
        
        
        if (response.data.total !== 0 && this.pageNumber === 1) {
          Notiflix.Notify.success(
            `"Hooray! We found ${response.data.total} images on ${this.numberOfPages} pages."`
            );
          }
          
          if (response.data.total !== 0 && this.pageNumber <= this.numberOfPages) {
            Notiflix.Notify.success(`"Download page ${this.pageNumber} out of ${this.numberOfPages}."`);
            refs.loadMoreBtn.classList.remove('is-hidden');
            if (response.data.total !== 0 && this.pageNumber >= this.totalPages) {
              refs.loadMoreBtn.classList.add('is-hidden');
              Notiflix.Notify.info(
                "We're sorry, but you've reached the end of search results."
                );
                this.pageNumber -= 1;
              } 
        return response.data;
      } else {
        throw new Error('Error fetching data');
      }
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    }
  }
};
  