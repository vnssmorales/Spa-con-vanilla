import api from './helpers/wp_ap.js';
import { ajax } from './helpers/ajax.js';

export function App() {
  document.getElementById(
    "root"
  ).innerHTML = `<h1>Spa con Vanilla</h1>`;

  ajax({
    url: api.POSTS,
    cbSuccess: (posts) =>{
        console.log(posts);
    }
  })
  console.log(api)
}
