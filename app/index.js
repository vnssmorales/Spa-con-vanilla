import api from "./helpers/wp_api.js"
import {App} from './App.js';

document.addEventListener('DOMContentLoaded', App); //cargar app en el navegador
window.addEventListener("hashchange", () => { //cuando cambia el hash se vuelve a ejecutarb app con la nueva ruta
    api.page = 1; //volver a la pagina 1 al cambiar de ruta
    App()
}); 