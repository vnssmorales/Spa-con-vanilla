import api from "./wp_api.js";
import { ajax } from "./ajax.js";
import { SearchCard } from "../components/SearchCard.js";
import { PostCard } from "../components/PostCard.js";

export async function InfiniteScroll() {
  let query = localStorage.getItem("wpSearch"),
    apiURL,
    Component; //High Order Component

  window.addEventListener("scroll", async (e) => {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement, //destructurar etiqueta html mediante document.documentElement
      { hash } = window.location;

    //console.log(scrollTop,clientHeight,scrollHeight,hash);

    if (scrollTop + clientHeight >= scrollHeight) {
      api.page++; //si se cumplen las condiciones aumentamos en 1 api.page

      if (!hash || hash === "#/") {
        apiURL = `${api.POSTS}&page=${api.page}`; //y este va a ser el valor de la url
        Component = PostCard; //si estamos en el home el,valor de Component va a ser Card
      } else if (hash.includes("#/search")) {
        apiURL = `${api.SEARCH}${query}&page=${api.page}`;
        Component = SearchCard;
      } else {
        return false;
      }

      document.querySelector(".loader").style.display = "block";

      await ajax({
        url: apiURL,
        cbSuccess: (posts) => {
            //console.log(post);
            let html = "";
            posts.map(post => (html += Component(post)));
            document.getElementById("main").insertAdjacentHTML("beforeend",html);
            document.querySelector(".loader").style.display = "none";
        }
      });
    }
  });
}
