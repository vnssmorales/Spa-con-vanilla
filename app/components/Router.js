import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";

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
  } else if (hash.includes("#/search")) {
    $main.innerHTML = "<h2>Sección del buscador</h2>";
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
