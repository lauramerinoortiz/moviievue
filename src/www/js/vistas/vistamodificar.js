"use strict" //activo modo estricto
import { Pelicula } from './pelicula.js'
/**
 * Clase VistaNueva que muestra el formulario para una nueva pelicula
 * Gestiona los elementos y métodos de esta Vista
 */
export function VistaModificar (controlador) {
     return VistaModificar=Vue.createApp({
          data(){
               return{
                    controlador:controlador,
                    id:'',
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
          <h1>Editar película</h1>
        <form>
            <div class="caja"><label for="nombreEditar">Nombre*</label>
                <input type="text" value="Nombre de peli" v-model="datos.nombre" id="nombreEditar"><br>
                <label for="descripcionEditar">Descripción*</label>
                <textarea id="descripcionEditar" v-model="datos.descripcion">Descripción precisa de la película*</textarea><br>
                <label for="fechaEditar" >Fecha de estreno*</label>
                <input type="text" v-model="datos.fecha" type="date" id="fechaEditar"><br>
                <label for="duracionEditar">Duración en minutos*</label>
                <input type="number" v-model="datos.duracion" id="duracionEditar" pattern="\d*"><br>
                <label for="vistaEditar">¿Vista?</label>
                <label for="vistaSiEditar"><input type="radio" v-model="datos.vista" id="vistaSiEditar" name="vista" value="Si" >Si</label>
                <label for="vistaNoEditar"><input type="radio" v-model="datos.vista" id="vistaNoEditar" name="vista" value="No" checked>No</label>

            </div>
            <div class="caja"><label for="generoEditar">Género</label>
                <select id="generoEditar"  v-model="datos.genero">
                    <option value="Drama">Drama</option>
                    <option value="Romántica">Romántica</option>
                    <option value="Comedia">Comedia</option>
                    <option value="Misterio">Misterio</option>
                    <option value="Terror">Terror</option>
                    <option value="Histórica">Histórica</option>
                    <option value="Adolescente">Adolescente</option>
                    <option value="Otro">Otro</option>
                </select><br>
                <label for="checkbok">Plataforma disponible:</label>
                <label for="hboEditar"><input type="checkbox" v-model="datos.plataformas" value="Hbo" id="hboEditar" checked>HBO</label>
                <label for="netflixEditar"><input type="checkbox" v-model="datos.plataformas" value="Netflix"  id="netflixEditar">Netflix</label>
                <label for="disneyEditar"><input type="checkbox" v-model="datos.plataformas" value="Disney" id="disneyEditar">Disney+</label><br>
                <label for="amazonEditar"><input type="checkbox" v-model="datos.plataformas" value="Amazon" id="amazonEditar">Amazon Prime</label><br>
                <label for="imagen">URL de imagen <input type="text" v-model="datos.imagen" id="imagenEditar" title="Copia la URL de internet de una foto de esta peli y pégala aqui."></label>
            </div>
        </form>
        <p id="camposrellenosEditar">*Debe rellenar todos los campos con asterico</p>
        <p id="legalEditar">*Recurde aceptar las condiones legales</p>
        <label for="legalesEditar" class="legales"><input type="checkbox" v-model="datos.legales" id="legalesEditar">*Aceptas los términos legales y la ley de protección de datos sin reservas</label><br>
        <button class="btnEliminar" v-on:click="pulsarBorrar">Cancelar</button>
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
                    this.datos.genero=''
                    this.datos.plataformas=[]
                    this.datos.imagen=''
                    this.datos.legales=''
               },

               /**
               * Método para cuando damos al boton aceptar
               */
               pulsarAceptar() {
                    console.log(this.datos)
                    let error=$('#camposrellenosEditar')
                    error.css('display','none')
                    
                    let legal=$('#legalEditar')
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
                         this.controlador.modificarPelicula(this.id,pelicula)
                         this.pulsarBorrar()
                    }

               },
               /**
                * Método que introduce los datos de la pelicula en el objeto datos de Vue, y a su vez en el formulario
                * @param {Object} pelicula 
                */
               mostrarDatos(pelicula){
                    console.log(pelicula)
                    this.datos.nombre=pelicula.nombre
                    this.datos.descripcion=pelicula.descripcion
                    this.datos.fecha=pelicula.fecha
                    this.datos.duracion=pelicula.duracion
                    this.datos.vista=pelicula.vista
                    this.datos.genero=pelicula.genero
                    this.datos.plataformas=pelicula.plataforma
                    this.datos.imagen=pelicula.imagen

                    console.log(this.datos)
               }

          }
     })
}