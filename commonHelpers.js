import{S as L,i as g}from"./assets/vendor-9310f15c.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();const C="https://pixabay.com/api",y=document.querySelector(".gallery"),c=document.querySelector(".loader");document.addEventListener("DOMContentLoaded",function(){document.querySelector(".form").addEventListener("submit",function(i){i.preventDefault(),c.style.display="block";const r=document.querySelector(".input").value;E(r)})});function E(i){const r={key:"41947244-850f91172df29bd29838458db",q:i,image_type:"photo",orientation:"horizontal",safesearch:"true"};fetch(`${C}/?${new URLSearchParams(r)}`).then(n=>{if(!n.ok)throw new Error(n.status);return n.json()}).then(n=>{c.style.display="none",c.classList.remove("loader--active"),d(n.hits)}).catch(()=>{c.style.display="none",c.classList.remove("loader--active"),b()});function d(n){if(y.innerHTML="",n.length>0){const e=n.map(o=>{const l=document.createElement("div");l.classList.add("card");const a=document.createElement("a");a.href=o.largeImageURL,a.dataset.lightbox="gallery",a.setAttribute("data-title",o.tags);const u=document.createElement("img");u.src=o.webformatURL,u.alt=o.tags,a.appendChild(u),l.appendChild(a);const s=document.createElement("div");s.classList.add("details");const m=document.createElement("p");m.textContent=`Likes: ${o.likes}`,s.appendChild(m);const f=document.createElement("p");f.textContent=`Views: ${o.views}`,s.appendChild(f);const p=document.createElement("p");p.textContent=`Comments: ${o.comments}`,s.appendChild(p);const h=document.createElement("p");return h.textContent=`Downloads: ${o.downloads}`,s.appendChild(h),l.appendChild(s),l});y.append(...e),new L(".gallery a",{}).refresh()}else v()}}function b(){g.error({title:"Error",message:"An error occurred. Please try again later."})}function v(){g.info({title:"No Images Found",message:"Sorry, there are no images matching your search query. Please try again!"})}
//# sourceMappingURL=commonHelpers.js.map
