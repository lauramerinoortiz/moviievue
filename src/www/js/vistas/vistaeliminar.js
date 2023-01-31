"use strict" //activo modo estricto
import {Vista} from './vista.js'
/**
 * Clase VistaNueva que muestra el mensaje de confirmacion para eliminar
 * Gestiona los elementos y métodos de esta Vista
 */
export class VistaEliminar extends Vista {

	/**
     * Contructor de la clase VistaEliminar
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.id
          this.controlador = controlador

          this.div=$('#eliminar')
          this.cancelar=this.div.find('button').eq(0)
          this.cancelar.click(this.pulsarCancelar.bind(this))

          this.aceptar=this.div.find('button').eq(1)
          this.aceptar.click(this.pulsarAceptar.bind(this))

	}

     /**
      * Método para cuando pulsamos el boton cancelar
      */
     pulsarCancelar() {
          this.controlador.pulsarCancelar()
     }

     /**
      * Método para cuando pulsamos el boton aceptar
      */
     pulsarAceptar() {
          this.controlador.eliminar(this.id)
     }

     /**
      * Método que setea el id
      * @param {Int} id 
      */
     setId(id){
          this.id=id
     }
}