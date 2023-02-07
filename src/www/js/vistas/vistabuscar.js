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
                    listadoBusqueda:''
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
                    <div v-for="peli in lista" v-on:click="pulsarPeli(peli.nombre)" v-bind:style="{ 'background-image': 'url(' + peli.imagen + '), url(assets/logo/logosimple.png)'}">
                    <div class="oculto"></div>
                    <h2>{{peli.nombre}}</h2>
                    </div>
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
                         vista=true
                    }
                    if($('#vistaNoBuscar').is(':checked')){
                         vista=false
                    }

                    let genero=$('#generoBuscar option:selected');
                    let opcion=genero.val()
                    let lista=this.controlador.pulsarBuscar(vista, opcion)
               },

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
               },
               /**
                * Método para cuando damos click a una pelicula
                */
               pulsarPelicula(){
                    this.controlador.pulsarPelicula()
               }
          }
     })
}

     
     


