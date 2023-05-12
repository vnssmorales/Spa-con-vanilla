//objeto con variables para conectarse a la api
//https://developer.wordpress.org/rest-api/

const NAME = "malvestida",
  DOMAIN = `https://${NAME}.com`,
  SITE = `${DOMAIN}/wp-json`,
  API_WP = `${SITE}/wp/v2`,
  PER_PAGE = 9,
  POSTS = `${API_WP}/posts?_embed&per_page=${PER_PAGE}`, //?_embed para que traiga toda la info del post
  POST = `${API_WP}/posts`,
  SEARCH = `${API_WP}/search?_embed&per_page=${PER_PAGE}&search=`; //para que el buscador funcione con los parametros ingresados por el usuario en la pagina

let page = 1;

export default {
  NAME,
  DOMAIN,
  SITE,
  API_WP,
  PER_PAGE,
  POSTS,
  POST,
  SEARCH,
  page,
};
