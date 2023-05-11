import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";

export async function Router() {
  const $main = document.getElementById("main");
  //objeto location trae internamente la propiedad de la url
  let { hash } = location;
  console.log(hash);

  $main.innerHTML = null; //para asegurarnos que el contenido previo no este cargado

  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (main) => {
        console.log(main);
        let html = "";
        main.forEach((main) => (html += PostCard(main)));
        document.querySelector(".loader").style.display = "none";
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    $main.innerHTML = "<h2>Sección del buscador</h2>";
  } else if (hash === "#/contacto") {
    $main.innerHTML = "<h2>Sección del contacto</h2>";
  } else {
    $main.innerHTML =
      "<h2>Aqui cargara el contenido del post previamente seleccionado</h2>";
  }
  document.querySelector(".loader").style.display = "none";
}
