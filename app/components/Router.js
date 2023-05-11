import api from "../helpers/wp_api.js";
import {ajax} from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";

export function Router() {
    //objeto location trae internamente la propiedad de la url
    let {hash} = location;
     console.log(hash);

if(!hash || hash === "#/"){
    document.getElementById("posts").innerHTML = "<h2>Sección del home</h2>";
}else if(hash.includes("#/search")) {
    document.getElementById("posts").innerHTML = "<h2>Sección del buscador</h2>";
}else if(hash === "#/contacto"){
    document.getElementById("posts").innerHTML = "<h2>Sección del contacto</h2>"
}else{
    document.getElementById("posts").innerHTML = "<h2>Aqui cargara el contenido del post previamente seleccionado</h2>"
}

    ajax({
        url: api.POSTS,
        cbSuccess: (posts) => {
          console.log(posts);
          let html = "";
          posts.forEach((post) => html += PostCard(post));
          document.querySelector(".loader").style.display = "none";
          document.getElementById("posts").innerHTML = html;
        }
      })
}