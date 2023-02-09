"use strict" //activo modo estricto
import { Pelicula } from './pelicula.js'
/**
 * Clase VistaNueva que muestra el formulario para una nueva pelicula
 * Gestiona los elementos y métodos de esta Vista
 */
export function VistaNueva (controlador) {
     return VistaNueva=Vue.createApp({
          data(){
               return{
                    controlador:controlador,
                    estado:'inactivo',
                    datos:{
                         nombre:'',
                         descripcion:'',
                         fecha:'',
                         duracion:'',
                         vista:'',
                         genero:'',
                         plataformas:[],
                         imagen:'',
                         legales:''
                    }
               }
          },
          template: `<div :class=estado>
          <h1>Nueva película</h1>
          <form>
              <div class="caja"><label for="nombre">Nombre*</label>
                  <input type="text" id="nombre" v-model="datos.nombre"><br>
                  <label for="descripcion">Descripción*</label>
                  <textarea id="descripcion" v-model="datos.descripcion"></textarea><br>
                  <label for="fecha">Fecha de estreno*</label>
                  <input type="date" id="fecha" v-model="datos.fecha"><br>
                  <label for="duracion">Duración en minutos*</label>
                  <input type="number" id="duracion" min="0" pattern="\d*" v-model="datos.duracion"><br>
                  <label for="vista">¿Vista?</label>
                  <label for="vistaSi"><input type="radio" v-model="datos.vista" id="vistaSi" name="vista" value="Si">Si</label>
                  <label for="vistaNo"><input type="radio" v-model="datos.vista" id="vistaNo" name="vista" value="No" checked>No</label>
  
              </div>
              <div class="caja"><label for="genero">Género</label>
                  <select id="genero" v-model="datos.genero">
                      <option value="Drama">Drama</option>
                      <option value="Romántica">Romántica</option>
                      <option value="Comedia">Comedia</option>
                      <option value="Misterio">Misterio</option>
                      <option value="Terror">Terror</option>
                      <option value="Histórica">Histórica</option>
                      <option value="Adolescente">Adolescente</option>
                      <option value="Otro">Otro</option>
                  </select><br>
                  <label>Plataforma disponible:</label>
                  <input type="checkbox" v-model="datos.plataformas" value="HBO" id="hbo"><label for="hbo">HBO</label>
                  <input type="checkbox" v-model="datos.plataformas" value="Netflix" id="netflix"><label for="netflix">Netflix</label>
                  <input type="checkbox" v-model="datos.plataformas" value="Disney" id="disney"><label for="disney">Disney+</label><br>
                  <input type="checkbox" v-model="datos.plataformas" value="Amazon" id="amazon"><label for="amazon">Amazon Prime</label><br>
                  <label for="imagen" >URL de imagen <input type="text" id="imagen" v-model="datos.imagen" title="Copia la URL de internet de una foto de esta peli y pégala aqui."></label>
              </div>  
          </form>
          <p id="camposrellenos">*Debe rellenar todos los campos con asterico</p>
          <p id="insertado">Insertado correctamente</p>
          <p id="legalNueva">*Recuerde aceptar las condiones legales</p>
          <label for="legales" class="legales"><input type="checkbox" v-model="datos.legales" id="legales">Aceptas los términos legales y la ley de protección de datos sin reservas</label><br>
          <button class="btnEliminar" v-on:click="pulsarBorrar">Borrar</button>
          <button class="btnModificar" v-on:click="pulsarAceptar">Enviar</button>
          </div>`,
          methods:{
               /**
               * Método que muestra u oculta la vista
               * @param {Boolean} estado 
               */
               mostrar(estado){
                    if(estado){
                         this.estado='activo'
                    }
                    else{
                         this.estado='inactivo'
                    }
               },
               /**
                * Método para cuando damos al boton borrar que limpia el formulario
                */
               pulsarBorrar() {
                    this.datos.nombre=''
                    this.datos.descripcion=''
                    this.datos.fecha=''
                    this.datos.duracion=''
                    this.datos.vista='No'
                    this.datos.genero='Drama'
                    this.datos.plataformas=[]
                    this.datos.imagen=''
                    this.datos.legales=''
               },

               /**
               * Método para cuando damos al boton aceptar
               */
               pulsarAceptar() {
                    console.log(this.datos)
                    let error=$('#camposrellenos')
                    error.css('display','none')
                    
                    let insertado=$('#insertado')
                    insertado.css('display','none')
                    let legal=$('#legalNueva')
                    legal.css('display','none')

                    
                    if(this.datos.nombre==''){
                         error.css('display', 'block')
                    }
                    else if(this.datos.descripcion==''){
                         error.css('display', 'block')
                    }
                    else if(this.datos.fecha==''){
                         error.css('display', 'block')
                    }
                    else if(this.datos.duracion==''){
                         error.css('display', 'block')
                    }
                    else if(this.datos.legales=='' ){
                         legal.css('display', 'block')
                    }
                    else{   
                         let pelicula= new Pelicula()
                         pelicula.setNombre(this.datos.nombre)
                         pelicula.setDescripcion(this.datos.descripcion)
                         pelicula.setFecha(this.datos.fecha)
                         pelicula.setDuracion(this.datos.duracion)
                         pelicula.setVista(this.datos.vista)
                         pelicula.setGenero(this.datos.genero)
                         pelicula.setPlataforma(this.datos.plataformas)
                         pelicula.setImagen(this.datos.imagen)
                         this.controlador.nuevaPelicula(pelicula)
                         //this.pulsarBorrar()
                         insertado.css('display','block')
                    }
               }
          }
     })
}

     
