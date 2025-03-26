import { writable } from "svelte/store";

export const mostrarEtapa1 = writable<boolean>(true);





export interface Solicitud {
  cliente: boolean; //nuevo false, miembro del club true
	monto:number;
	cuotas:number;
	llave:boolean;

// 	tipo de cliente (nuevo o miembro del club) 
// 	cantidad de dinero minimo 200.000 maximo 500.000 cliente nuevo
// 	cantidad de dinero minimo 200000 maximo 2.000.000 cliente miembro del club
// 	cuotas 1,3,6 cliente
// contraseña miebro del club
}