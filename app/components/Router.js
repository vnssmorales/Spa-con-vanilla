import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";

export async function Router() {
  const $main = document.getElementById("main");
  //objeto location trae internamente la propiedad de la url
  let { hash } = location;
  console.log(hash);

  $main.innerHTML = null; //para asegurarnos que el contenido previo no este cargado

  if (!hash || hash === "#/") {
    await ajax({
        url: api.POSTS,
      cbSuccess: (posts) => {
       // console.log(posts);
        let html = "";
        posts.forEach((post) => (html += PostCard(post)));
        $main.innerHTML = html;
      },
    });
    //console.log(api.POST)
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch"); //lo que selecciona el usuario

    if(!query) {  
        document.querySelector(".loader").style.display = "none"; //cuando el query no exista oculta el loader
        return false; //sale de router
    }

    await ajax({ //si existe hacer peticion al endpoint de search
        url: `${api.SEARCH}${query}`,
        cbSuccess: (search) => {
            console.log(search);
            let html = "";
            if(search.length === 0){ //si el arreglo viene vacio renderizar este error
               html = `<p class="error">
               No existem resultados de búsqueda para el término.
               <mark>${query}</mark>
               </p>`
            }else{  //si trae contenido renderizar esto
              search.forEach(post => html += SearchCard(post));
            }
            $main.innerHTML = html;
        }
    })
    
  } else if (hash === "#/contacto") {
    $main.innerHTML = "<h2>Sección del contacto</h2>";
  } else {

      await ajax({
        url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
        cbSuccess: (post) => {
          console.log(post);
          $main.innerHTML = Post(post);
        },
      });
  }
  document.querySelector(".loader").style.display = "none";
}
