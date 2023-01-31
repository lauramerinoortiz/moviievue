"use strict"
/**
 *	Implementa una vista del menú de navegación.
 */
export class VistaNav{
	/**
	 *	Constructor de la clase.
	 *	@param {HTMLElement} nav Nav de HTML en el que se desplegará la vista.
	 *	@param {Object} controlador Controlador de la vista del administrador.
	 */
	constructor(nav, controlador) {
		this.controlador = controlador
		this.nav = nav
		
		this.liLogo = $('li').eq(0)
		this.liListado = $('li').eq(1)
		this.liNuevo = $('li').eq(2)
		this.liBuscar = $('li').eq(3)
		
		this.liListado.click(this.pulsarListado.bind(this))
		this.liListado.keypress(this.pulsarListado.bind(this))
		this.liNuevo.click(this.pulsarNuevo.bind(this))
		this.liNuevo.keypress(this.pulsarNuevo.bind(this))
		this.liLogo.click(this.pulsarListado.bind(this))
		this.liLogo.keypress(this.pulsarListado.bind(this))
		this.liBuscar.click(this.pulsarBuscar.bind(this))
		this.liBuscar.keypress(this.pulsarBuscar.bind(this))

		$("#dialog").dialog({
			closeText: "X"
	   })
	}

	/**
	 *	Atención a la pulsación sobre el enlace del listado
	 */
	pulsarListado() {
		console.log('pulsando listado')
		this.controlador.pulsarListado()
	}


	/**
	 *	Atención a la pulsación sobre el enlace de nuevo
	 */
	pulsarNuevo() {
		console.log('pulsando nuevo')
		this.controlador.pulsarNavNuevo()
	}

	/**
	 *	Atención a la pulsación sobre el enlace de buscar
	 */
	 pulsarBuscar() {
		console.log('pulsando buscar')
		this.controlador.pulsarNavBuscar()
	}

}