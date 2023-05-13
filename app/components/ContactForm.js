export function ContactForm() {
  const $form = document.createElement("form"),
    $styles = document.getElementById("dynamic-styles");

  $form.classList.add("contact-form");

  $styles.innerHTML = `
     .contact-form{
        --form-ok-color: #4caf50;
        --form-error-color: #f44336;
        margin-left: auto;
        margin-right: auto;
        width:80%;
     }
     .contact-form >* {
        padding: 0.5rem;
        margin: 1rem auto;
        display: block;
        width: 100%;
     }
     .contact-form textarea{
        resize: none;
     }
     .contact-form legend,
     .contact-form-response {
        font-size: 1.5rem;
        font-weght: bold;
        text-align: center;
     }
     .contact-form input,
     .contact-form textarea {
        font-size: 1rem;
        font-family: sans-serif;
     }
     contact-form input[type="submit"] {
        width: 50%;
        font-weght: bold;
        cursor: pointer;
     }
     .contact-form *::placeholder{
        color: #000;
     }
     .contact-form [required]:valid {
        border: thin solid var(--form-ok-color);
     }
     .contact-form [required]:invalid {
        border: thin solid var(--form-error-color);
     }
     .contact-form-error {
        margin-top: -1rem;
        font-size: 80%;
        background-color: var(--form-error-color);
        color: #fff;
        transition: all 800ms ease;
     }
     .contact-form-error.is-active {
        display: block;
        animation: show-message 1s 1 normal 0s ease-out both;
     }
     .contact-form-loader {
        text-align: center;
     }
     .none {
        display: none;
     }

     @keyframes show-message {
        0% {
            visibility: hidden;
            opacity: 0;
        }
        100% {
            visibility: visible;
            opacity: 1;
        }
     }
    `;

  $form.innerHTML = `
     <legend>Envíanos tus comentarios</legend>
     <input type="text" name="name" placeholder="Escribe tu nombre"
     title="Nombre solo acepta letras y espacios en blanco" pattern="^
     [A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" required>
     <input type="email" name="email" placeholder="Escribe tu email"title="Email incorrecto" 
     pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required>
     <input type="text" name="subject" placeholder="Asunto a tratar" title="El asunto es requerido" required>
     <textarea name="comments" cols="50" rows="5" placeholder="Escribe tus comentarios"
     title="Tu comentario no debe exceder los 255 caracteres" data-pattern="^.{1,255}$"
     required></textarea>
     <input type="submit" value="Enviar">
     <div class="contact-form-loader none">
      <img src="app/assets/loader.svg" alt="cargando" >
     </div>
     <div class="contact-form-response none">
      <p>Los datos han sido enviados</p>
     </div>
    `;

  function validationsForm() {
    const $inputs = document.querySelectorAll(".contact-form [required]");

    $inputs.forEach((input) => {
      const $span = document.createElement("span");
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add("contact-form-error", "none");
      input.insertAdjacentElement("afterend", $span);
    });

    document.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;
        //console.log($input, pattern);
        if (pattern && $input.value !== "") {
          //console.log("el input tiene patron");
          let regex = new RegExp(pattern);
          return !regex.exec($input.value)
            ? document.getElementById($input.name).classList.add("is-active")
            : document
                .getElementById($input.name)
                .classList.remove("is-active");
        }

        if (!pattern) {
          //console.log("el input no tiene patron");
          return $input.value === ""
            ? document.getElementById($input.name).classList.add("is-active")
            : document
                .getElementById($input.name)
                .classList.remove("is-active");
        }
      }
    });

    document.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Enviando formulario");

      const $loader = document.querySelector(".contact-form-loader"),
        $response = document.querySelector(".contact-form-response");

      $loader.classList.remove("none");

      fetch("", {
        method: "POST",
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          console.log(json);
          $loader.classList.add("none");
          $response.classList.remove("none");
          $response.innerHTML = `<p>${json.message}</p>`;
          $form.reset();
        })
        .catch((err) => {
          console.log(err);
          let message =
            err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
          $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
        })
        .finally(() =>
          setTimeout(() => {
            $response.classList.add("none");
            $response.innerHTML = "";
          }, 3000)
        );
    });
  }
 //para evitar errores de interaccion en la programacion de elementos que estan cargando dinamicamente
 // usar un setTimeout

 setTimeout(() => validationsForm(), 100);

  return $form;
}
