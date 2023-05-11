import {App} from './App.js';

document.addEventListener('DOMContentLoaded', App); //cargar app en el navegador
window.addEventListener("hashchange", App); //cuando cambia el hash se vuelve a ejecutarb app con la nueva ruta