"use strict" //activo modo estricto
import { Pelicula } from './pelicula.js'
import {Vista} from './vista.js'
/**
 * Clase VistaModificar que muestra el formulario para una nueva pelicula
 * Gestiona los elementos y métodos de esta Vista
 */
export class VistaModificar extends Vista {

	/**
     * Contructor de la clase VistaModificar
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador
          this.div=$('#modificar')

          this.nombre=$('#nombreEditar').autocomplete({
               source: [ "Titanic", "Harry Potter", "Mamma Mia", "Shrek", "Friends", "The Walking Dead", "Dune", "Avatar", "Simpsons", "Avengers", "Spiderman" ],
               
          })
          this.descripcion=$('#descripcionEditar')
          this.fecha=$('#fechaEditar').datepicker( {
               dateFormat: "dd/mm/yy",
               changeMonth: true,
               changeYear: true,
               monthNamesShort: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
               'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
               prevText: "⃖",  //flecha izquierda
               nextText: "⃗",  //flecha derecha
               dayNamesMin: [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab" ],
               yearRange: "1895:2045"
             })
          this.duracion=$('#duracionEditar')
          this.imagen=$('#imagenEditar')

          this.netflix=$('#netflixEditar').checkboxradio()
          this.netflix.click(this.anadirPlataforma.bind(this,'Netflix'))

          this.hbo=$('#hboEditar').checkboxradio()
          this.hbo.click(this.anadirPlataforma.bind(this, 'Hbo'))

          this.disney=$('#disneyEditar').checkboxradio()
          this.disney.click(this.anadirPlataforma.bind(this, 'Disney'))

          this.amazon=$('#amazonEditar').checkboxradio()
          this.amazon.click(this.anadirPlataforma.bind(this,'Amazon'))

          this.cancelar=this.div.find('button')[0]
          this.cancelar.click(this.pulsarCancelar.bind(this))

          this.plataformas=new Set()  //Set para guardar los datos introducidos
	}

     /**
      * Método para cuando damos click a Cancelar
      */
     pulsarCancelar() {
          this.controlador.pulsarCancelar()
     }

     /**
      * Método para cuando damos click a Aceptar
      */
     pulsarAceptar(id) {
          let error=$('#camposrellenosEditar')
          console.log(id)
          if(this.nombre.val()==undefined){
               error.css('display','block')
               this.nombre.css('borderColor',"red")
          }
          else if(this.descripcion.val()==undefined){
               error.css('display','block')
               this.descripcion.css('borderColor',"red")
          }
          else if(this.fecha.val()==undefined){
               error.css('display','block')
               this.fecha.css('borderColor',"red")
          }
          else if(this.duracion.val()==undefined){
               error.css('display','block')
               this.duracion.css('borderColor',"red")
          }
          else{
               //Coger los datos del formulario
               let peliculaNueva=new Pelicula()
               peliculaNueva.setNombre(this.nombre.val())
               peliculaNueva.setDescripcion(this.descripcion.val())
               peliculaNueva.setFecha(this.fecha.val())
               peliculaNueva.setDuracion(this.duracion.val())
               peliculaNueva.setImagen(this.imagen.val())
               peliculaNueva.setPlataforma(this.plataformas)

               let vista=null
               if($('#vistaSiEditar').is(':checked')){
                    vista=true
               }
               if($('#vistaNoEditar').is(':checked')){
                    vista=false
               }

               let genero=$('#generoEditar option:selected');
               let opcion=genero.val()
               peliculaNueva.setVista(vista)
               peliculaNueva.setGenero(opcion)

               this.controlador.modificarPelicula(id, peliculaNueva)
          }
     }

     /**
      * Método para cuando damos al boton borrar que limpia el formulario
      */
     pulsarBorrar() {
          this.nombre.val('')
          this.descripcion.val('')
          this.fecha.val('')
          this.duracion.val('')
          this.imagen.val('')
          $('select').eq(0).val('Drama')
     
          
          this.netflix.prop("checked", false)
          this.hbo.prop("checked", false)
          this.disney.prop("checked", false)
          this.amazon.prop("checked", false)
          this.plataformas.clear()
          let error=$('#camposrellenosEditar')
          error.css('display','none')
          this.nombre.css('borderColor',"#808080")
          this.descripcion.css('borderColor',"#808080")
          this.fecha.css('borderColor',"#808080")
          this.duracion.css('borderColor',"#808080")
     }

     /**
      * Método que muestra los datos de la pelicula introducidos en el formulario
      * @param {Oject} pelicula 
      */
     mostrarDatos(pelicula){
          this.pulsarBorrar()
          console.log(pelicula.nombre)
          this.nombre.val(pelicula.nombre)
          this.descripcion.val(pelicula.descripcion)
          this.fecha.val(pelicula.fecha)
          this.duracion.val(pelicula.duracion)
          this.imagen.val(pelicula.imagen)
          for(let item of pelicula.plataforma){
               this.plataformas.add(item)
          }
          $('#generoEditar').val(pelicula.genero)
          if(this.plataformas.has('Netflix')){
               this.netflix.prop("checked", true)
          }
          if(this.plataformas.has('Hbo')){
               this.hbo.prop("checked", true)
          }
          if(this.plataformas.has('Amazon')){
               this.amazon.prop("checked", true)
          }
          if(this.plataformas.has('Disney')){
               this.disney.prop("checked", true)
          }

          this.aceptar=this.div.find('button').eq(1)
          console.log(this.aceptar)
          this.aceptar.click(this.pulsarAceptar.bind(this, pelicula.id))
          
     }

     
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

     }
}