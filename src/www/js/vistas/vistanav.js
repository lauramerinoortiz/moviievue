"use strict"
/**
 *	Implementa una vista del menú de navegación.
 */
export function VistaNav (controlador) {
	return VistaNav = Vue.createApp({		
		data() {
			return {
				controlador: controlador
			}
		},
		template: `<nav><ul><li id="li1" tabindex="1" @click=pulsarListado><img src="assets/logo/logo.svg" alt="Moviie logo de la web con el nombre" id="logo" ></li><li tabindex="2" @click=pulsarListado>Listado</li><li tabindex="3" @click=pulsarNuevo>Nueva</li><li tabindex="4" @click=pulsarBuscar><img src="assets/iconos/busqueda.png" alt="Icono de búsqueda para buscar un elemento concreto" id="icono"></li></ul></nav>`,
		methods: {
			pulsarListado(){
				this.controlador.pulsarListado()
			},
			pulsarNuevo(){
				this.controlador.pulsarNavNuevo()
			},
			pulsarBuscar(){
				this.controlador.pulsarNavBuscar()
			}
		}
	})	
}