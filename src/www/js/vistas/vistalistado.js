"use strict" //activo modo estricto
/**
 * Clase VistaListado que muestra el CRUD de categorías y subcategorías
 * Gestiona los elementos y métodos de esta Vista
 */
export function VistaListado(controlador) {
     return VistaListado=Vue.createApp({
          data(){
               return{
                    controlador:controlador,
                    lista:'',
                    estado:'inactivo',
                    vacio: 'inactivo'
               }
          },
          template:`<div id="listado" :class=estado>
          <h1 :class=vacio>'No hay datos aún. Dale ya a "Nueva" y añade una película.</h1>
          <h1>Listado de películas</h1>
          <div v-for="peli in lista" class="pelicula" v-on:click="pulsarPeli(peli.nombre)" v-bind:style="{ 'background-image': 'url(' + peli.imagen + '), url(assets/logo/logosimple.png)'}"><div class="oculto"></div><h2>{{peli.nombre}}</h2></div>
          </div>`,
          methods: {
                /**
                * Método para cuando damos click a una pelicula
                */
               pulsarPelicula(nombre){
                    this.controlador.pulsarPelicula(nombre)
               },
               /**
                * Método que muestra u oculta la vista
                * @param {Boolean} estado 
                */
               mostrar(estado){
                    if(estado){
                         this.estado='activo'
                         console.log(this.lista)
                    }
                    else{
                         this.estado='inactivo'
                    }
               },

               /**
                * Método que saca el listado de peliculas guardadas en la base de datos
                * @param {Array} lista 
                */
               mostrarListado(){
                    //this.listado.empty()       vaciamos el div
                    if(this.lista==''){
                         console.log('vaciooooooooo')
                         this.vacio='activo'
                    }
                    else{
                         this.vacio='inactivo'
                         console.log(this.lista)
                    }
               },
               /**
                * Método que se ejecutaal hacer click en un apelicula y llama al controlador para que muestra sus datos
                * @param {String} nombre 
                */
               pulsarPeli(nombre){
                    this.controlador.pulsarPelicula(nombre)
               }
          }
     })
}