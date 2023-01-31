"use strict" //activo modo estricto
import { Pelicula } from './pelicula.js'
import {Vista} from './vista.js'
/**
 * Clase VistaNueva que muestra el formulario para una nueva pelicula
 * Gestiona los elementos y métodos de esta Vista
 */
export class VistaNueva extends Vista {

	/**
     * Contructor de la clase VistaNueva
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador
          this.div=$('#nueva')

          this.nombre=$('#nombre').autocomplete({
               source: [ "Titanic", "Harry Potter", "Mamma Mia", "Shrek", "Friends", "The Walking Dead", "Dune", "Avatar", "Simpsons", "Avengers", "Spiderman" ],
               
          })
          this.descripcion=$('#descripcion')
          this.fecha=$('#fecha').datepicker( {
               dateFormat: "dd/mm/yy",
               changeYear: true,
               changeMonth: true,
               monthNamesShort: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
               'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
               prevText: "⃖",  //flecha izquierda
               nextText: "⃗",  //flecha derecha
               dayNamesMin: [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab" ],
               yearRange: "1895:2045"
          })
          this.duracion=$('#duracion')
          this.imagen=$('#imagen').tooltip()

          this.borrar=this.div.find('button').eq(0)
          console.log(this.borrar)
          this.borrar.click(this.pulsarBorrar.bind(this))

          this.aceptar=this.div.find('button').eq(1)
          this.aceptar.click(this.pulsarAceptar.bind(this))

          this.netflix=$('#netflix').checkboxradio()
          this.netflix.click(this.anadirPlataforma.bind(this,'Netflix'))

          this.hbo=$('#hbo').checkboxradio()
          this.hbo.click(this.anadirPlataforma.bind(this, 'Hbo'))

          this.disney=$('#disney').checkboxradio()
          this.disney.click(this.anadirPlataforma.bind(this, 'Disney'))

          this.amazon=$('#amazon').checkboxradio()
          this.amazon.click(this.anadirPlataforma.bind(this,'Amazon'))

          this.plataformas=new Set()
	}

     /**
      * Método para cuando damos al boton borrar que limpia el formulario
      */
     pulsarBorrar() {
          console.log('borrando')
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
          let error=$('#camposrellenos')
          error.css('display','none')
          let insertado=$('#insertado')
          insertado.css('display','none')
          this.nombre.css('borderColor',"#808080")
          this.descripcion.css('borderColor',"#808080")
          this.fecha.css('borderColor',"#808080")
          this.duracion.css('borderColor',"#808080")
     }

     /**
      * Método para cuando damos al boton aceptar
      */
     pulsarAceptar() {
          let error=$('#camposrellenos')
          error.css('display','none')
          let insertado=$('#insertado')
          insertado.css('display','none')
          this.nombre.css('borderColor',"#808080")
          this.descripcion.css('borderColor',"#808080")
          this.fecha.css('borderColor',"#808080")
          this.duracion.css('borderColor',"#808080")

          let nombre=this.nombre.val()

          let descripcion=this.descripcion.val()
          
          let fecha=this.fecha.val()
          
          let duracion=this.duracion.val()

          let imagen=this.imagen.val()

          let vista=null
          if($('#vistaSi').is(':checked')){
               vista=true
          }
          if($('#vistaNo').is(':checked')){
               vista=false
          }

          let genero=$('#genero option:selected');
          let opcion=genero.val()
          
          if(nombre==''){
               error.css('display', 'block')
               this.nombre.css('borderColor',"red")
          }
          else if(descripcion==''){
               error.css('display', 'block')
               this.descripcion.css('borderColor',"red")
          }
          else if(fecha==''){
               error.css('display', 'block')
               this.fecha.css('borderColor',"red")
          }
          else if(duracion==''){
               error.css('display', 'block')
               this.duracion.css('borderColor',"red")
          }
          else{
               let pelicula= new Pelicula()
               pelicula.setNombre(nombre)
               pelicula.setDescripcion(descripcion)
               pelicula.setFecha(fecha)
               pelicula.setDuracion(duracion)
               pelicula.setVista(vista)
               pelicula.setGenero(opcion)
               pelicula.setPlataforma(this.plataformas)
               pelicula.setImagen(imagen)
               
               this.controlador.nuevaPelicula(pelicula)
               this.pulsarBorrar()
               insertado.css('display','block')
          }

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

          console.log(this.plataformas)
     }

}