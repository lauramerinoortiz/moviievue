"use strict" //activo modo estricto
import {Vista} from './vista.js'
/**
 * Clase VistaListado que muestra el CRUD de categorías y subcategorías
 * Gestiona los elementos y métodos de esta Vista
 */
export class VistaListado extends Vista {

	/**
     * Contructor de la clase VistaListado
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador

          this.listado=$('#listado')
          this.peliculas
          
	}


     /**
      * Método para cuando damos click a una pelicula
      */
     pulsarPelicula(nombre){
          this.controlador.pulsarPelicula(nombre)
     }

     /**
      * Método que saca el listado de peliculas guardadas en la base de datos
      * @param {Array} lista 
      */
     mostrarListado(lista){
          this.listado.empty()       //vaciamos el div
          if(lista==''){
               let vacio=$('<h1></h1>')
               vacio.append('No hay datos aún. Dale ya a "Nueva" y añade una película.')
               this.listado.append(vacio)
          }
          else{
               let cabezado=$('<h1></h1>')
               cabezado.append('Listado de películas')
               this.listado.append(cabezado)
               let cont=5
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
                    this.listado.append(div)
                    div.click(this.pulsarPelicula.bind(this, item.nombre))
                    div.keypress(this.pulsarPelicula.bind(this, item.nombre))
                    cont++
               }
          }
     }
}