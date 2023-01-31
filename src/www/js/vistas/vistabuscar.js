"use strict" //activo modo estricto
import {Vista} from './vista.js'
/**
 * Clase VistaBuscar que muestra el formulario para buscar una pelicula
 * Gestiona los elementos y métodos de esta Vista
 */
export class VistaBuscar extends Vista {

	/**
     * Contructor de la clase VistaBuscar
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador

          this.div=$('#buscar')

          this.aceptar=this.div.find('button').eq(0)
          this.aceptar.click(this.pulsarAceptar.bind(this))
	}

     /**
      * Método para cuando pulsamos el boton aceptar
      */
     pulsarAceptar() {
          let vista
          if($('#vistaSiBuscar').is(':checked')){
               vista=true
          }
          if($('#vistaNoBuscar').is(':checked')){
               vista=false
          }

          let genero=$('#generoBuscar option:selected');
          let opcion=genero.val()
          let lista=this.controlador.pulsarBuscar(vista, opcion)
     }

     /**
      * Método que saca las peliculas según la lista de resultados que recibe
      * @param {Array} lista 
      */
     listar(lista){
          let resul=$('#resul')
          resul.empty()        //vaciamos el div
          let cont=100
          if(lista==''){      //si la lista viene vacia porque no hay coincidencias
               let vacio=$('<h2></h2>')
               vacio.append('No hay datos que coincidan')
               resul.append(vacio)
          }
          else{
               for(let item of lista){
                    let div=$('<div></div>')
                    div.addClass('pelicula')
                    if(item.imagen!=''){
                         div.css('backgroundImage',"url('"+item.imagen+"')")
                    }
                    else{
                         div.css('backgroundImage',"url('assets/recursos/fondo.png')")
                    }

                    let oculto=$('<div></div>')
                    oculto.addClass('oculto')
                    div.append(oculto)

                    let titulo=$('<h2></h2>')
                    div.append(titulo)
                    div.attr("tabindex",cont)
                    div.attr("role","button")
                    titulo.append(item.nombre)
                    resul.append(div)
                    div.click(this.pulsarPelicula.bind(this))
                    div.keypress(this.pulsarPelicula.bind(this))
                    cont++
               }
               
          }
     }

     

     /**
      * Método para cuando damos click a una pelicula
      */
     pulsarPelicula(){
          this.controlador.pulsarPelicula()
     }
}