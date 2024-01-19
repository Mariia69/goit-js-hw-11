import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41701983-23ca5d5908e2c78927e8095f2';

const getBaseUrl = () => {
  const url = new URL(BASE_URL);
  url.searchParams.append("key", API_KEY);
  url.searchParams.append("image_type", "photo");
  url.searchParams.append("orientation", "horizontal");
  url.searchParams.append("safesearch", true);

  return url;
}
const lightbox = new SimpleLightbox(".gallery-item");
const fetchImg = (query) => {
  const url = getBaseUrl();
  url.searchParams.append("q", query);

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data.hits)
    .catch((error) => {
      console.error(`Error fetching images:`, error);
      throw error;
    });
};

const renderGallery = (images) => {
  const galleryContainer = document.getElementById("gallery");
  galleryContainer.innerHTML = "";

  images.forEach((image) => {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
    galleryContainer.insertAdjacentHTML('beforeend', `
    <li class="gallery-item">
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}"/>
    <a/>
    <p>Likes: ${likes}<p/>
    <p>view: ${views}<p/>
    <p>comments: ${comments}<p/>
    <p>downloads: ${downloads}<p/>
    </li>
    `
    );
  });

  lightbox.refresh();
};

let loader = document.getElementById("loader");
let searchButton = document.getElementById("search-button");

const showLoadingIndicator = () => {
  loader.style.display = "block";

  searchButton.disabled = true;
};

const hideLoadingIndicator = () => {
  loader.style.display = "none";

  searchButton.disabled = false;
};

const showMessage = (message, type = "info") => {
  iziToast[type]({
    title: message,
    position: "topCenter",
  });
};

const handleSearchFormSubmit = (event) => {
  event.preventDefault();

  const searchInput = document.getElementById("search-input");
  const query = searchInput.value.trim();

  if (query.length < 3) {
    showMessage("Please enter a search query", "warning");
    return;
  }

  showLoadingIndicator();

  fetchImg(query)
    .then((images) => {
      hideLoadingIndicator();
      if (images.length > 0) {
        renderGallery(images);
      } else {
        showMessage("Sorry, there are no images matching your search query. Please try again.", "error");
      }
    })
    .catch((error) => {
      hideLoadingIndicator();
      showMessage("Error fetching images. Pease try again later.", "error");
    });
};

const searchForm = document.getElementById("form");
searchForm.addEventListener("submit", handleSearchFormSubmit);
