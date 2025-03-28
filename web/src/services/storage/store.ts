import { writable } from "svelte/store";
import type { Solicitud, Detalles } from "../../types/solicitud";
import config from "../../../web_config";

const mostrarEtapa1 = writable<boolean>(true);

const solicitudCredito: Solicitud = JSON.parse(sessionStorage.getItem('solicitud') || 'null') || {
	cliente: undefined,
	monto: config.monto,
	cuotas: 1,
	llave: false
};

const solicitudStore = writable<Solicitud>(solicitudCredito);

// const calcularDetallesIniciales = (solicitud: Solicitud): Detalles => {
// 	const esClienteNuevo = !solicitud.cliente;
// 	const porcentajeFondo = esClienteNuevo ? 0.15 : 0.20;
// 	const cuota = solicitud.monto / solicitud.cuotas;
// 	const interes = solicitud.monto * 0.019;
// 	const administracion = 8000;
// 	const iva = 1520;
// 	const fondoBruto = solicitud.monto * porcentajeFondo;
// 	const fondo = Math.max(fondoBruto - (interes + administracion + iva), 0);
// 	const total = cuota + interes + fondo + administracion + iva;

// 	return {
// 		cuota,
// 		interes,
// 		fondo,
// 		administracion,
// 		iva,
// 		total
// 	};
// };

//  re hacer esta formula todos lso costos deben ser el 20% del total
const calcularDetallesIniciales = (solicitud: Solicitud): Detalles => {
	const esClienteNuevo = !solicitud.cliente;
	const porcentajeFondo = esClienteNuevo ? 0.20 : 0.15;
	
	const cuota = solicitud.monto / solicitud.cuotas;
	const interesPorCuota = solicitud.monto * 0.019;
	const administracionPorCuota = 8000;
	const ivaPorCuota = 1520;

	const totalInteres = interesPorCuota * solicitud.cuotas;
	const totalAdministracion = administracionPorCuota * solicitud.cuotas;
	const totalIva = ivaPorCuota * solicitud.cuotas;
	const fondoBruto = solicitud.monto * porcentajeFondo;

	const fondoNeto = Math.max(fondoBruto - (totalInteres + totalAdministracion + totalIva), 0);
	const fondoPorCuota = fondoNeto / solicitud.cuotas;

	const totalPorCuota = cuota + interesPorCuota + administracionPorCuota + ivaPorCuota + fondoPorCuota;

	return {
			cuota,
			interes: interesPorCuota,
			fondo: fondoPorCuota,
			administracion: administracionPorCuota,
			iva: ivaPorCuota,
			total: totalPorCuota
	};
};










// const calcularDetallesIniciales = (solicitud: Solicitud): Detalles => {
// 	const esClienteNuevo = !solicitud.cliente;
// 	const porcentajeFondo = esClienteNuevo ? 0.15 : 0.20;
	
// 	const cuota = solicitud.monto / solicitud.cuotas;
// 	const interesPorCuota = solicitud.monto * 0.019;
// 	const administracionPorCuota = 8000;
// 	const ivaPorCuota = 1520;
// 	const fondoPorCuota = (solicitud.monto * porcentajeFondo) / solicitud.cuotas; // Fijo

// 	const totalPorCuota = cuota + interesPorCuota + administracionPorCuota + ivaPorCuota + fondoPorCuota;

// 	return {
// 			cuota,
// 			interes: interesPorCuota,
// 			fondo: fondoPorCuota,
// 			administracion: administracionPorCuota,
// 			iva: ivaPorCuota,
// 			total: totalPorCuota
// 	};
// };



















const detallesIniciales: Detalles = JSON.parse(sessionStorage.getItem('detalles') || 'null') || calcularDetallesIniciales(solicitudCredito);
const detallesStore = writable<Detalles>(detallesIniciales);

solicitudStore.subscribe(solicitud => {
	sessionStorage.setItem('solicitud', JSON.stringify(solicitud));
	const nuevosDetalles = calcularDetallesIniciales(solicitud);
	detallesStore.set(nuevosDetalles);
	sessionStorage.setItem('detalles', JSON.stringify(nuevosDetalles));
});

export { solicitudStore, detallesStore, mostrarEtapa1 };
