"use strict" //activo modo estricto
import {Modelo} from '../modelos/modelo.js'
import {VistaNav} from '../vistas/vistanav.js'
import {VistaListado} from '../vistas/vistalistado.js'
import {VistaNueva} from '../vistas/vistanueva.js'
import {VistaDatos} from '../vistas/vistadatos.js'
import {VistaEliminar} from '../vistas/vistaeliminar.js'
import {VistaModificar} from '../vistas/vistamodificar.js'
import {VistaBuscar} from '../vistas/vistabuscar.js'

/**
 * Clase Controlador que administra las vistas
 */
class Controlador {
	/**
	 * Constructor de la clase Controlador
	 * Cuando carga la web ejecuta el método iniciar
	 */
	constructor() {
		$(document).ready(this.iniciar.bind(this))

		this.cookies = () => {
			// Variables
			const seccionCookie =$('section.cookies');
			const cookieSi = $('.cookies__boton--si');
			const cookieNo = $('.cookies__boton--no');
	
			/**
			 * Método que oculta la sección de Cookie para siempre
			 */
			function ocultarCookie() {
				// Oculta la sección de cookies en el HTML
				seccionCookie.empty();
			}
	
			/**
			 * Método que marca las cookies como aceptadas
			 */
			function aceptarCookies() {
				// Oculta el HTML de cookies
				ocultarCookie();
				// Guarda que ha aceptado
				localStorage.setItem('cookie', true);
				// Tu codigo a ejecutar si aceptan las cookies
				ejecutarSiAcepta();
			}
	
			/**
			 * Método que marca las cookies como denegadas
			 */
			function denegarCookies() {
				// Oculta el HTML de cookies
				ocultarCookie();
				// Guarda que ha aceptado
				localStorage.setItem('cookie', false);
			}
			
			/**
			 * Método que según el nombre que reciba busca la cookie y saca su valor
			 * @param {String} cname 
			 * @returns valor de la cookie
			 */
			function getCookie(cname) {
				let name = cname + "=";
				let ca = document.cookie.split(';');
				for(let i = 0; i < ca.length; i++) {
				  let c = ca[i];
				  while (c.charAt(0) == ' ') {
					c = c.substring(1);
				  }
				  if (c.indexOf(name) == 0) {
					return parseInt(c.substring(name.length, c.length));
				  }
				}
				return "";
			}

			/**
			 * Método que ejecuta tu código si aceptan las cookies
			 */
			function ejecutarSiAcepta() {

				document.cookie= "AceptaCookies=Si"
				let ultelement=document.getElementsByTagName('div')
				let id=ultelement[ultelement.length-1].id
				document.cookie="UltimoElemento= "+id

				let valor=getCookie('Veces')
				if(typeof valor=='string'){
					valor=0
				}
				document.cookie="Veces= "+(parseInt(valor)+1)
			}
	
			/**
			 * Método que inicia la lógica
			 */
			function iniciar() {
				console.log('inicial cookies')
				// Comprueba si en el pasado el usuario ha marcado una opción
				if (localStorage.getItem('cookie') !== null) {
					if(localStorage.getItem('cookie') === 'true') {
						// Aceptó
						aceptarCookies();
					} else {
						// No aceptó
						denegarCookies();
					}
				}
			}

	
			//-----------------------------------------------------
			// Eventos
			//-----------------------------------------------------
			cookieSi.click(aceptarCookies );
			cookieNo.click(denegarCookies);
	
			return {
				iniciar: iniciar
			}
		};
	}

	/**
	 * Método iniciar que es el primero en ejecutarse cuando se carga la pantalla
	 */
	iniciar() {
		console.log('¡Bienvenido a Moviie! La diversión te espera fuera de la consola.')
		this.modelo=new Modelo(this, this.iniciar2.bind(this))
	}

	iniciar2(){
		console.log('iniciar 2')
		this.vistaNav=new VistaNav(this).mount('#header')

		this.vistaListado=new VistaListado(this).mount('#inicio')
		

		this.vistaBuscar=new VistaBuscar(this).mount('#buscar')

		this.vistaEliminar=new VistaEliminar(this).mount('#eliminar')

		this.vistaNueva=new VistaNueva(this).mount('#nueva')
    
        this.divdatos=$('#datos')
		this.vistaDatos=new VistaDatos(this.divdatos, this)


        this.vistaModificar=new VistaModificar(this).mount('#modificar')

		
		
        this.ocultarVistas()
		this.pulsarListado()

		// Activa el código de cookies
        this.cookies().iniciar();

	}

	/**
	 * Método que oculta todas las vistas
	 */
	ocultarVistas() {
		this.vistaListado.mostrar(false)
		this.vistaNueva.mostrar(false)
        this.vistaDatos.mostrar(false)
        this.vistaEliminar.mostrar(false)
        this.vistaModificar.mostrar(false)
		this.vistaBuscar.mostrar(false)
	}

	/**
	 * Método pulsarListado que oculta las vistas y muestra la del inicio
	 */
	pulsarNavListado() {
		this.ocultarVistas()
		this.vistaListado.mostrar(true)
		this.vistaNueva.pulsarBorrar()
	}

    /**
	 * Método pulsarNuevo que oculta las vistas y muestra la del formulario de alta
	 */
	pulsarNavNuevo() {
		this.ocultarVistas()
		this.vistaNueva.mostrar(true)
		this.vistaNueva.pulsarBorrar()
	}

	/**
	 * Método pulsarBuscar que oculta las vistas y muestra la del busqueda
	 */
	pulsarNavBuscar() {
		this.ocultarVistas()
		this.vistaBuscar.mostrar(true)
	}

    /**
     * Método cuando pulsamos una pelicula
     */
    pulsarPelicula(nombre){
		this.modelo.buscarNombre(nombre, this.mostrarDatos.bind(this))
    }
	
	/**
	 * Método que manda la pelicula a la vista para mostrar sus datos
	 * @param {Object} pelicula 
	 */
	mostrarDatos(pelicula){
		this.ocultarVistas()
		this.vistaDatos.mostrar(true)
		this.vistaModificar.id=pelicula.id
		this.vistaModificar.mostrarDatos(pelicula)
		this.vistaDatos.mostrarDatos(pelicula)
	}

    /**
     * Método cuando pulsamos un boton cancelar
     */
    pulsarCancelar(){
        this.pulsarNavListado()
    }

    /**
     * Método que muestra la pantalla de confimacion de eliminacion
     */
    mostrarEliminar(id){
        this.ocultarVistas()
		this.vistaEliminar.setId(id)
        this.vistaEliminar.mostrar(true)
    }

	/**
	 * Método que manda un id a la bbdd para borrar el registro asociado
	 * @param {Int} id 
	 */
	eliminar(id){
		this.modelo.eliminar(id, this.eliminado.bind(this))
	}

	eliminado(){
		location.reload();
	}

    /**
     * Método que muestra la pantalla de confimacion de eliminacion
     */
    mostrarModificar(){
        this.ocultarVistas()
		this.vistaModificar.mostrar(true)
    }

	/**
	 * Método para añadir una pelicula a la base de datos
	 * @param {Object} pelicula 
	 */
	nuevaPelicula(pelicula){
		this.modelo.nuevaPelicula( pelicula)
	}

	/**
	 * Método getModelo, devuelve el modelo de la aplicación
	 * @return {Modelo} El modelo de la aplicación
	 **/
	getModelo() {
		return this.modelo
	}

	/**
	 * Método que coge el listado y lo lleva a la vista para que lo muestre
	 */
	pulsarListado(){
		this.vistaListado.lista=this.modelo.pulsarListado()
		console.log('liiiiiiiiiiiiiiistaaaaaaaaaaa ')
		console.log(this.vistaListado.lista)
		this.vistaListado.mostrarListado()
		this.pulsarNavListado()
	}

	/**
	 * Método que llama a la base de datos a que busque
	 * @param {Boolean} vista 
	 * @param {String} genero 
	 */
	pulsarBuscar(vista, genero){
		let lista=this.modelo.buscar(vista, genero, this.mandarLista.bind(this))
		return lista
	}

	/**
	 * Método que manda a la vista la lista de elementos de la bsuqueda
	 * @param {Array} lista 
	 */
	mandarLista(lista){
		this.vistaBuscar.listadoBusqueda=lista
		if(lista==''){
			this.vistaBuscar.vacio=true
			console.log(' vacio listado= '+this.vistaBuscar.listadoBusqueda)
		}
		else{
			this.vistaBuscar.vacio=false
			console.log('relleno listado= '+this.vistaBuscar.listadoBusqueda)
		}
		
	}

	/**
	 * Método que coge el listado y lo lleva a la vista para que lo muestre
	 */
	obtenerListado(nombre){
		let lista=this.modelo.pulsarListado()
		console.log(lista)
		this.vistaListado.mostrarListado(lista)
		this.pulsarPelicula(nombre)
	}

	/**
	 * Método que mandar al modelo los datos de la pelicula modificada y su id
	 * @param {Int} id 
	 * @param {Object} pelicula 
	 */
	modificarPelicula(id, pelicula){
		console.log(id)
		this.modelo.modificarPelicula(id, pelicula, this.obtenerListado.bind(this, pelicula.nombre))
	}

	
}
const app= new Controlador()

