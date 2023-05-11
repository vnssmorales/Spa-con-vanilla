export function PostCard(props) {
  let { date, slug, title, _embedded } = props,
    dateFormat = new Date(date).toLocaleString(), //para dar formato a la fecha
    urlPoster = _embedded["wp:featuredmedia"]
      ? _embedded["wp:featuredmedia"][0].source_url //operador ternario para cuando el post no tenga imagen
      : "app/assets/favicon.png";

  return `
  <article class="post-card">
    <img src="${urlPoster}" alt="${title.rendered}" />
    <h2>${title.rendered}</h2>
    <p>
      <time datetime="${date}">${dateFormat}</time>
      <a href="#/${slug}">Ver publicación</a>
    </p>
  </article>`;
}
