import api from "../helpers/wp_api.js";
export function Title(){
    //creo un nodo h1 con createElement
    const $h1 = document.createElement("h1"); //variabes que hacen referencia a elementos DOM van con signo $
    $h1.innerHTML = `
    <a href="${api.DOMAIN}" target="_blank" rel="noopener">
     ${api.NAME.toUpperCase()}
    </a>
    `;
    return $h1; //retorno el nodo h1
}