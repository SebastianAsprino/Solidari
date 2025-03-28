export interface Solicitud {
  cliente?:boolean;
	monto:number;
	cuotas:number;
	llave:boolean;
}

export interface Detalles {
	cuota:number;
	interes:number;
	fondo:number;
	administracion:number;
	iva:number;
	total:number;
} 