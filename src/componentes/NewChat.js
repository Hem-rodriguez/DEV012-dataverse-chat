import { navigateTo } from "../router.js";
import { chatRequest } from "../Lib/requestAPI.js"
export const chat = () => {
  const chatElement = document.createElement("div");
  // Agregar el contenido al elemento header
  chatElement.innerHTML = `
<div class="contenedor-chat">
    <div class="caja-chat">
    </div>
    <div class="cuadro-de-entrada">
      <input id="mensajeInput" type="text" placeholder="Escribe un mensaje..." />
      <button id="enviarMensaje">Enviar</button>
    </div>
</div>
<button class="boton-chat">Regresar</button>
`;
  const botonRegresar = chatElement.querySelector(".boton-chat");
  botonRegresar.addEventListener("click", () => {
    navigateTo(`/`);
  });
  let apiKey = localStorage.getItem("apiKey")
  function enviarMensaje() {
    const mensajeInput = document.querySelector("#mensajeInput");
    const mensaje = mensajeInput.value.trim();
    if (mensaje !== "") {
      const cajaChat = document.querySelector(".caja-chat");
      const nuevoMensajeUsuario = document.createElement("div");
      nuevoMensajeUsuario.classList.add("message", "saliendo");
      nuevoMensajeUsuario.innerHTML = `<p>${mensaje}</p>`;
      cajaChat.appendChild(nuevoMensajeUsuario);
      mensajeInput.value = ""; // Limpiar el input después de enviar el mensaje
    } 
      // Enviar el mensaje a la API de la IA
      const respuestaIA = chatRequest(apiKey, {
         model: "gpt-3.5-turbo",
          messages: [{ 
        role: "system",
        content: "Tu eres el personaje principal de la pelicula Carrie."
      },
      {
        role: "user",
        content: "Hola, quien eres?"
      }]
     })
     respuestaIA.then(responseIAjs => {

      // if (responseIAjs && responseIAjs.choices && responseIAjs.choices[0] && respuestaIA.choices[0].message) {
      // Mostrar la respuesta de la IA en el chat como 'entrada'
      const nuevoMensajeIA = document.createElement("div");
      nuevoMensajeIA.classList.add("message", "entrada");
      nuevoMensajeIA.innerHTML = `<p>${responseIAjs.choices[0].message.content}</p>`;
      const cajaChat = document.querySelector(".caja-chat");
      cajaChat.appendChild(nuevoMensajeIA);
  
      
      console.log(responseIAjs);
       }  )
    .catch(err=>{
      console.log('2024 ya acabate', err);
    })
  }
    
  chatElement.querySelector("#enviarMensaje").addEventListener("click", enviarMensaje);
  return chatElement;
};