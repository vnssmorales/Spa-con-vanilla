export function PostCard(props) {
  let { date, id, slug, title, _embedded } = props,
    dateFormat = new Date(date).toLocaleString(), //para dar formato a la fecha
    urlPoster = _embedded["wp:featuredmedia"]
      ? _embedded["wp:featuredmedia"][0].source_url //operador ternario para cuando el post no tenga imagen
      : "app/assets/favicon.png";

      //evento a un elemento que aun no existe 
      //se desencadena al darle click a un enlace que esta dentro de una post-card
   document.addEventListener("click", (e) => {
    if(!e.target.matches(".post-card a")) return false; //el e.target se convierte en el enlace // si el elemento que origina click no esta en post-card retorna false
     localStorage.setItem("wpPostId", e.target.dataset.id); //si es true, accede a local storage/ estabalece propiedad wpPostId y guarda como valor e.target
   });   

  return `
  <article class="post-card">
    <img src="${urlPoster}" alt="${title.rendered}" />
    <h2>${title.rendered}</h2>
    <p>
      <time datetime="${date}">${dateFormat}</time>
      <a href="#/${slug}" data-id=${id}>Ver publicación</a>
    </p>
  </article>`;
}
