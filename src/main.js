import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41701983-23ca5d5908e2c78927e8095f2';

const getBaseUrl = () => {
  const url = new URL(BASE_URL);
  url.searchParams.append("key", API_KEY)

  return url;
}

const url = getBaseUrl();
url.searchParams.append("q", "wolf");

fetch(url)
  .then(res => res.json())
  .then(images => {
    document.body.insertAdjacentHTML("beforeend", `
    <img src="${images.hits[0].largeImageURL}"/>
    `)
  })
  