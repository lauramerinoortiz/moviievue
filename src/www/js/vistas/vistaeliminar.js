"use strict" //activo modo estricto
/**
 * Clase VistaNueva que muestra el mensaje de confirmacion para eliminar
 * Gestiona los elementos y métodos de esta Vista
 */
export function VistaEliminar (controlador) {
	return VistaEliminar=Vue.createApp({
          data(){
               return{
                    controlador:controlador,
                    id:'',
                    estado:'inactivo'
               }
          },
          template:`<div :class=estado>
                    <h1>¿Seguro que quieres eliminar esta película?</h1>
                    <p>Esta acción no se puede deshacer.</p>
                    <button class="btnEliminar" v-on:click="pulsarCancelar">Cancelar</button>
                    <button class="btnModificar" v-on:click="pulsarAceptar">Aceptar</button>
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
                * Método para cuando pulsamos el boton cancelar
                */
               pulsarCancelar() {
                    this.controlador.pulsarCancelar()
               },

               /**
                * Método para cuando pulsamos el boton aceptar
                */
               pulsarAceptar() {
                    this.controlador.eliminar(this.id)
               },

               /**
                * Método que setea el id
                * @param {Int} id 
                */
               setId(id){
                    this.id=id
               }
          }
     })

	}

    
