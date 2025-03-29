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

const calcularDetallesIniciales = (solicitud: Solicitud): Detalles => {
	const esClienteNuevo = !solicitud.cliente;
	const porcentajeTotal = esClienteNuevo ? 0.20 : 0.15;
	const totalAPagar = solicitud.monto * (1 + porcentajeTotal);
	const totalPorCuota = totalAPagar / solicitud.cuotas;
	const cuotaPrincipal = solicitud.monto / solicitud.cuotas;
	const administracionPorCuota = 8000;
	const ivaPorCuota = 1520;
	const fondoPorCuota = (solicitud.monto * porcentajeTotal) / solicitud.cuotas;
	const interesPorCuota = solicitud.monto * 0.019;

	return {
		cuota: cuotaPrincipal,
		interes: interesPorCuota,
		fondo: fondoPorCuota,
		administracion: administracionPorCuota,
		iva: ivaPorCuota,
		total: totalPorCuota
	};
};

const detallesIniciales: Detalles = JSON.parse(sessionStorage.getItem('detalles') || 'null') || calcularDetallesIniciales(solicitudCredito);
const detallesStore = writable<Detalles>(detallesIniciales);

solicitudStore.subscribe(solicitud => {
	sessionStorage.setItem('solicitud', JSON.stringify(solicitud));
	const nuevosDetalles = calcularDetallesIniciales(solicitud);
	detallesStore.set(nuevosDetalles);
	sessionStorage.setItem('detalles', JSON.stringify(nuevosDetalles));
});

export { solicitudStore, detallesStore, mostrarEtapa1 };
