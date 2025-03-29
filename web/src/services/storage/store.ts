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

const calcularDetallesIniciales = (solicitud: Solicitud): Detalles => {
	const esClienteNuevo = !solicitud.cliente;
	const porcentajeTotal = esClienteNuevo ? 0.20 : 0.15;

	// Total a pagar y componentes base
	const totalAPagar = solicitud.monto * (1 + porcentajeTotal);
	const totalPorCuota = totalAPagar / solicitud.cuotas;
	const cuotaPrincipal = solicitud.monto / solicitud.cuotas;

	// Componentes fijos por cuota (excepto interés)
	const administracionPorCuota = 8000;
	const ivaPorCuota = 1520;

	// Fondo fijo como porcentaje del monto por cuota
	const fondoPorCuota = (solicitud.monto * porcentajeTotal) / solicitud.cuotas;

	// Calcula el interés necesario para alcanzar el total
	const interesPorCuota = Math.max(
			totalPorCuota - cuotaPrincipal - administracionPorCuota - ivaPorCuota - fondoPorCuota,
			0 // Evita interés negativo
	);

	return {
			cuota: cuotaPrincipal,
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
