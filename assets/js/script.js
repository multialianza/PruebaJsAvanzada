// Se importan las clases de cada animal desde class.js
import { Aguila, Serpiente, Oso, Lobo, Leon } from "./class.js";
//Se crea un objeto que asocia cada nombre de animal con su respectiva clase.
const nombreClaseAsociacion = {
  leon: Leon,
  lobo: Lobo,
  oso: Oso,
  serpiente: Serpiente,
  aguila: Aguila,
};
let nombreClase = null;//Define una variable nombreClase inicializada en null.
//Crea una función asincrónica llamada CargarData que carga datos de un archivo Json llamado animales.json y los asigna a un objeto objConClase.
//Este objeto contiene información sobre cada animal , incluyendo la clase del animal (obtenida del nombre ClaseAsociacion), la imagen y el sonido del animal.
(async function cargarData() {
  try {
    const responseObject = await fetch("./animales.json");
    const { animales } = await responseObject.json();
    let objConClase = {};

    animales.forEach((elem) => {
      objConClase[elem.name] = {
        clase: nombreClaseAsociacion[elem.name],
        img: `./assets/imgs/${elem.imagen}`,
        sound: `./assets/sounds/${elem.sonido}`,
      };
    });
    //Finanlmente asigna el objeto objConClase a la variable nombreClase.En caso de algún error durante la carga de datos, se captura el error y se muestra en la consola.
    nombreClase = objConClase;
  } catch (error) {
    console.log(error);
  }
})();
//Utiliza la libreria de JQuery para seleccionar los elementos del DOM y asignarlos a variables.
//Se seleccionan los elementos del formulario mendiente sus IDs y se asignan a variables: formTag, selectAnimal, selectEdad y textAreaComentarios.
//Luego se agrega un evento de envío de formulario, el cual evita que se recargue la página al enviar el formulario.
//Dentro de este evento se intenta crear un nuevo objeto de una clase especifica, obteniendo los valores de los campos del formulario.
//Se llama una función para resetear el formulario, otra para mostrar el animal agregado, otra para controlar la eliminación del animal, reproducir el sonido y cargar un modal con la información del animal agregado.
$(function () {
  const formTag = $("#form");
  const selectAnimal = $("#animal");
  const selectEdad = $("#edad");
  const textAreaComentarios = $("#comentarios");

  formTag.submit(function (eventObj) {
    eventObj.preventDefault();
    try {
      const { clase, img, sound } = nombreClase[selectAnimal.val()];
      const objeto = new clase(
        selectAnimal.val(),
        selectEdad.val(),
        img,
        textAreaComentarios.val(),
        sound
      );
      resetearFormulario(selectAnimal, selectEdad, textAreaComentarios);
      const elementoAgregado = mostrarAnimalAgregado(objeto);
      controlEliminarAnimal(elementoAgregado);
      reproducirSonido(elementoAgregado);
      cargarModal(elementoAgregado, objeto);
    } catch (error) {
      console.log(error);
    }
  });
//Se agrega un evento de cambio en el select de animales, donde se carga la imagen correspondiente al animal seleccionado en el select. en caso que ocurra algún error, este se imprime en la consola.
  selectAnimal.change(function () {
    try {
      const { img } = nombreClase[selectAnimal.val()];
      cargarImagen(img);
    } catch (error) {
      console.log(error);
    }
  });
});
//Se define la función cargarImagen que retorna una función asincrona para cargar una nueva imagen. 
//Se crea una promesa que se resuelve cuando la imagen se carga correctamente y se rechaza en caso de error.
//En caso de producirse algún error durante la ejecución de las funciones , estos se capturan y se muestran en la consola.
const cargarImagen = (() => {
  return async function (srcImage) {
    const promesaDeCarga = new Promise((resolve, reject) => {
      const img = $("#preview");
      img.attr("src", srcImage);
      img.on("load", () => {
        resolve("Imagen Cargada");
      });
      img.on("error", () => {
        reject("Ha ocurrido un error en la carga de la imagen");
      });
    });
    try {
      const resultado = await promesaDeCarga;
      //console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  };
})();
//La función mostrarAnimalAgregado se encarga de agregar un nuevo animal al contenedor de animales en la página web.
//Recibe como parámetro un objeto objetoAnimal que contiene información del animal, como la imagen, el nombre y el sonido.
//La función crea un nuevo elemento <div>que representa al animal, le asigna una clase animal_insertado y le agrega contenido HTml con la imagen del animal, un botón para reproducir el sonido y un botón para eliminar el elemento.
//Finalmente agrega este nuevo elemento al contenedor de animales y lo devuelve.
function mostrarAnimalAgregado(objetoAnimal) {
  const imagenAnimal = objetoAnimal.img;
  const contenedorAnimales = $(".contenedor_animales");
  const contenedorAnimal = $("<div>");
  contenedorAnimal.addClass("animal_insertado");
  const contenido = `
      <div class="animal_insertado_close" title='Haz click aquí para eliminar el elemento'>
        <i class="fa-solid fa-circle-xmark"></i>
      </div>
      <img src=${imagenAnimal} alt=${objetoAnimal.nombre} title='Haz click aquí para mostrar un modal'/>
      <button class="boton_sonido" type="button" title="Haz click aquí para reproducir el sonido" data-sonido=${objetoAnimal.sonido}>
        <i class="fa-solid fa-volume-high"></i>
      </button>
  `;
  contenedorAnimal.html(contenido);
  contenedorAnimales.append(contenedorAnimal);
  return contenedorAnimal;
}
//La función , reproducirSonido se encarga de reproducir el sonido del animal cuando se hace clic en el botón  de reproducción.
//Recibe como parámetro el elemento Html del animal que se agregó anteriormente.
//Obtiene el botón de sonido dentro de ese elemento, le asigna un evento de clic que carga y se reproduce el sonido correspondiente al animal.
const reproducirSonido = (elementoAgregado) => {
  const botonSonido = elementoAgregado.find(".boton_sonido");

  botonSonido.on("click", function () {
    const audioTag = $("#player");
    audioTag.html(`<source src=${$(this).attr(
      "data-sonido"
    )} type="audio/mpeg">  
      Tu navegador no soporta la etiqueta de audio.
      `);
    audioTag[0].load();
    audioTag.on("loadedmetadata", () => {
      audioTag[0].play();
    });
  });
};
//La función resetearFormuario toma 3 parámetros selectAnimal, selectEdad y textAreaComentarios, que son objetos JQuery que representan elementos de formulario.
//La función establece los valores de los elementos de formulario en blanco y cambia la imagen de vista previa a /assets/lmgs/lion.svg
//
function resetearFormulario(selectAnimal, selectEdad, textAreaComentarios) {
  selectAnimal.val("");
  selectEdad.val("");
  textAreaComentarios.val("");
  const img = $("#preview");
  img.attr("src", "./assets/imgs/lion.svg");
}
//La función controlEliminarAnimal toma un parámetro (elemento agregado) que es un elemento JQuery que contiene un botón de cierre para eliminar un elemento animal.
//Cuando se hace clic en el botón de cierre , se elimina el elemento animal.
const controlEliminarAnimal = (elementoAgregado) => {
  const botonClose = elementoAgregado.find(".animal_insertado_close");
  botonClose.on("click", () => {
    elementoAgregado.remove();
  });
};
//La función cargaModal toma 2 parámetros (elemento agregado y objeto)que son un elemento JQuery qure contiene una imagen  y un objeto que contiene información sobre un animal.
//La función muestra un modal con la imagen del animal, su edad y comentarios asociados cuando se hace clic en la imagen del animal.
function cargarModal(elementoAgregado, objeto) {
  const imgTag = elementoAgregado.find("img");
  imgTag.on("click", function () {
    const modalTag = $("#Modal");

    modalTag.find(".modal-body").html(`
    <img src=${imgTag.attr("src")} alt='imagen animal'>
    <p>Edad: ${objeto.edad}</p>
    <h3 class='modal-body_comentarios_titulo'>Comentarios</h3>
    <p class='modal-body_comentarios_contenido'>${objeto.comentarios}</p>
    `);

    const modalObj = new bootstrap.Modal(modalTag[0]);
    modalObj.show();
  });
}
