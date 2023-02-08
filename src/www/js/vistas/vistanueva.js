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
                    plataformas:new Set(),
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
                  <input type="text" id="fecha" v-model="datos.fecha"><br>
                  <label for="duracion">Duración en minutos*</label>
                  <input type="number" id="duracion" min="0" pattern="\d*" v-model="datos.duracion"><br>
                  <label for="vista">¿Vista?</label>
                  <label for="vistaSi"><input type="radio" v-model="datos.vista" id="vistaSi" name="vista" value="Si">Si</label>
                  <label for="vistaNo"><input type="radio" v-model="datos.vista" id="vistaNo" name="vista" value="No" checked>No</label>
  
              </div>
              <div class="caja"><label for="genero">Género</label>
                  <select id="genero" v-model="datos.genero">
                      <option>Drama</option>
                      <option>Romántica</option>
                      <option>Comedia</option>
                      <option>Misterio</option>
                      <option>Terror</option>
                      <option>Histórica</option>
                      <option>Adolescente</option>
                      <option>Otro</option>
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
                    // let error=$('#camposrellenos')
                    // let legal=$('#legalNueva')
                    // error.css('display','none')
                    // let insertado=$('#insertado')
                    // insertado.css('display','none')
                    // this.nombre.css('borderColor',"#808080")
                    // this.descripcion.css('borderColor',"#808080")
                    // this.fecha.css('borderColor',"#808080")
                    // this.duracion.css('borderColor',"#808080")

                    // let nombre=this.nombre.val()

                    // let descripcion=this.descripcion.val()
                    
                    // let fecha=this.fecha.val()
                    
                    // let duracion=this.duracion.val()

                    // let imagen=this.imagen.val()

                    // let legales=$('#legales')

                    // let vista=null
                    // if($('#vistaSi').is(':checked')){
                    //      vista=true
                    // }
                    // if($('#vistaNo').is(':checked')){
                    //      vista=false
                    // }

                    // let genero=$('#genero option:selected');
                    // let opcion=genero.val()
                    
                    // if(nombre==''){
                    //      error.css('display', 'block')
                    //      this.nombre.css('borderColor',"red")
                    // }
                    // else if(descripcion==''){
                    //      error.css('display', 'block')
                    //      this.descripcion.css('borderColor',"red")
                    // }
                    // else if(fecha==''){
                    //      error.css('display', 'block')
                    //      this.fecha.css('borderColor',"red")
                    // }
                    // else if(duracion==''){
                    //      error.css('display', 'block')
                    //      this.duracion.css('borderColor',"red")
                    // }
                    // else if(!legales.prop('checked') ){
                    //      legal.css('display', 'block')
                    //      legales.css('borderColor',"red")
                    // }
                    // else{
                    //      let pelicula= new Pelicula()
                    //      pelicula.setNombre(nombre)
                    //      pelicula.setDescripcion(descripcion)
                    //      pelicula.setFecha(fecha)
                    //      pelicula.setDuracion(duracion)
                    //      pelicula.setVista(vista)
                    //      pelicula.setGenero(opcion)
                    //      pelicula.setPlataforma(this.plataformas)
                    //      pelicula.setImagen(imagen)
                         
                    //      this.controlador.nuevaPelicula(pelicula)
                    //      this.pulsarBorrar()
                    //      insertado.css('display','block')
                    // }

               },

               /**
               * Método que se ejecuta al pulsar cualquier checkbox, eliminandolo del Set si existe o añadiendolo
               */
               anadirPlataforma(elemento){
                    if(this.plataformas.has(elemento)){
                         this.plataformas.delete(elemento)
                    }
                    else{
                         this.plataformas.add(elemento)
                    }
                    console.log(this.plataformas)
               }

          }
     })
		
          // this.div=$('#nueva')

          // this.nombre=$('#nombre').autocomplete({
          //      source: [ "Titanic", "Harry Potter", "Mamma Mia", "Shrek", "Friends", "The Walking Dead", "Dune", "Avatar", "Simpsons", "Avengers", "Spiderman" ]
          // })
          // this.descripcion=$('#descripcion')
          // this.fecha=$('#fecha').datepicker( {
          //      dateFormat: "dd/mm/yy",
          //      changeYear: true,
          //      changeMonth: true,
          //      monthNamesShort: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
          //      'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
          //      prevText: "⃖",  //flecha izquierda
          //      nextText: "⃗",  //flecha derecha
          //      dayNamesMin: [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab" ],
          //      yearRange: "1895:2045"
          // })
          // this.duracion=$('#duracion')
          // this.imagen=$('#imagen').tooltip()

          

          
         
	}

     
