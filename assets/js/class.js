//Se define la clase padre Animal  con un constructor que recibe nombre, edad, imagen, comentarios y sonido como parámetros.
//Esta clase tiene getters y setters para acceder y modificar los atributos de la clase.
//
class Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    this._nombre = nombre; 
    this._edad = edad; 
    this._img = img; 
    this._comentarios = comentarios; 
    this._sonido = sonido; 
  }
  get nombre() {
    return this._nombre;
  }
  get edad() {
    return this._edad;
  }
  get img() {
    return this._img;
  }
  get comentarios() {
    return this._comentarios;
  }
  set comentarios(comentarios) {
    this._comentarios = comentarios;
  }
  get sonido() {
    return this._sonido;
  }
}
//Se  definen clases hijas de Animal como León, Lobo, Oso, Serpiente y Aguila; que heredan los atributos y métod sde la clase Animal.
//Cada una de estas clases hijas tiene un método relacionado con el sonido que emiten.
class Leon extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }
  rugir() {
    return this.sonido;
  }
}

class Lobo extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }
  aullar() {
    return this.sonido;
  }
}

class Oso extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }
  grunir() {
    return this.sonido;
  }
}

class Serpiente extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }
  sisear() {
    return this.sonido;
  }
}

class Aguila extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }
  chillar() {
    return this.sonido;
  }
}
//Se exportan las clases Aguila, Serpiente, Oso, Lobo, León para que puedan ser utilizadas en otros archivos.
export { Aguila, Serpiente, Oso, Lobo, Leon };
