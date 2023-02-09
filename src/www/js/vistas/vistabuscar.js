"use strict" //activo modo estricto
import {Vista} from './vista.js'
/**
 * Clase VistaBuscar que muestra el formulario para buscar una pelicula
 * Gestiona los elementos y métodos de esta Vista
 */
export function VistaBuscar (controlador) {
     return VistaBuscar=Vue.createApp({
          data(){
               return{
                    controlador:controlador,
                    estado:'inactivo',
                    listadoBusqueda:'',
                    vacio: false
               }
          },
          template: `<div :class=estado><h1>Añade estado y género</h1>
               <form>
               <label for="vistaBuscar">¿Vista?</label>
               <label for="vistaSiBuscar"><input type="radio" id="vistaSiBuscar" name="vista" value="Si">Si</label>
               <label for="vistaNoBuscar"><input type="radio" id="vistaNoBuscar" name="vista" value="No" checked>No</label><br>
     
               <label for="generoBuscar">Género</label>
                    <select id="generoBuscar">
                         <option>Drama</option>
                         <option>Romántica</option>
                         <option>Comedia</option>
                         <option>Misterio</option>
                         <option>Terror</option>
                         <option>Histórica</option>
                         <option>Adolescente</option>
                         <option>Otro</option>
                    </select>
               </form>
               <button class="btnModificar" v-on:click="pulsarAceptar">Enviar</button>
               
               <div id="resul">
                    <div class="pelicula" v-for="peli in listadoBusqueda" v-on:click="pulsarPeli(peli.nombre)" v-bind:style="{ 'background-image': 'url(' + peli.imagen + '), url(assets/logo/logosimple.png)'}">
                    <div class="oculto"></div>
                    <h2>{{peli.nombre}}</h2>
                    </div>
                    <h2 v-if="vacio">No hay datos que coincidan</h2>
               </div>
               
               </div>`,
          methods:{
               /**
                * Método que muestra u oculta la vista
                * @param {Boolean} estado 
                */
                mostrar(estado){
                    if(estado){
                         this.estado='activo'
                    }
                    else{
                         this.estado='inactivo'
                    }
               },
               /**
                * Método para cuando pulsamos el boton aceptar
                */
               pulsarAceptar() {
                    let vista
                    if($('#vistaSiBuscar').is(':checked')){
                         vista='Si'
                    }
                    if($('#vistaNoBuscar').is(':checked')){
                         vista='No'
                    }

                    let genero=$('#generoBuscar option:selected');
                    let opcion=genero.val()
                    let lista=this.controlador.pulsarBuscar(vista, opcion)
               },

               
               /**
                * Método para cuando damos click a una pelicula
                */
               pulsarPeli(nombre){
                    this.controlador.pulsarPelicula(nombre)
               }
          }
     })
}

     
     


