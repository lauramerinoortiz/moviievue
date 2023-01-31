"use strict" //activo modo estricto
import {Vista} from './vista.js'
/**
 * Clase VistaDatos que muestra el formulario para una nueva pelicula
 * Gestiona los elementos y métodos de esta Vista
 */
export class VistaDatos extends Vista {

	/**
     * Contructor de la clase VistaDatos
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador

          this.div=$('#datos')
          this.eliminar=this.div.find('button').eq(0)
          this.modificar=this.div.find('button').eq(1)

          this.modificar.click(this.pulsarModificar.bind(this))

	}
     /**
      * Método que muestra en la tabla de datos, los datos de la pelicula
      * @param {Object} pelicula 
      */
     mostrarDatos(pelicula){
          //Buscamos los datos
          let nombre=$("#datosNombre")
          let descripcion=$("#datosDescripcion")
          let fecha=$("#datosFecha")
          let duracion=$("#datosDuracion")
          let plataformas=$("#datosPlataformas")
          let genero=$("#datosGenero")
          let vista=$("#datosVista")
          //Borramos el contenido que pudiera haber anteriormente
          nombre.empty()
          descripcion.empty()
          fecha.empty()
          duracion.empty()
          plataformas.empty()
          genero.empty()
          vista.empty()
          //Metemos los datos de la pelicula
          nombre.append(pelicula.nombre)
          descripcion.append(pelicula.descripcion)
          fecha.append(pelicula.fecha)
          duracion.append(pelicula.duracion)
          let plat=''
          for(let item of pelicula.plataforma){
               plat+=item+'; '
          }
          plataformas.append(plat)
          genero.append(pelicula.genero)
          if(pelicula.vista){
               vista.append('Si')
          }
          else{
               vista.append('No')
          }

          this.eliminar.click(this.pulsarEliminar.bind(this, pelicula.id))
     }

     /**
      * Método para cuando damos al boton eliminar
      */
     pulsarEliminar(id){
          this.controlador.ocultarVistas()
          this.controlador.mostrarEliminar(id)
     }

     /**
      * Método para cuando damos al boton modificar
      */
     pulsarModificar(){
          this.controlador.ocultarVistas()
          this.controlador.mostrarModificar()
     }
}