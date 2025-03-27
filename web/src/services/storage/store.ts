import { get, writable } from "svelte/store";
import type { Solicitud, Detalles } from "../../types/solicitud";
import config from "../../../web_config";

const mostrarEtapa1 = writable<boolean>(true);

// Obtener solicitud desde sessionStorage o establecer valores por defecto
const solicitudCredito: Solicitud = JSON.parse(sessionStorage.getItem('solicitud') || 'null') || {
	cliente: false,
	monto: config.monto,
	cuotas: 1,
	llave: false
};

const solicitudStore = writable<Solicitud>(solicitudCredito);

// Función para calcular los detalles financieros
function calcularDetallesIniciales(solicitud: Solicitud): Detalles {
	const esClienteNuevo = !solicitud.cliente;
	const porcentajeFondo = esClienteNuevo ? 0.15 : 0.20;
	const cuota = solicitud.monto / solicitud.cuotas
	const interes = solicitud.monto * 0.019;
	const administracion = 8000;
	const iva = 1520;

	// Calcular el fondo de garantías correctamente
	const fondoBruto = solicitud.monto * porcentajeFondo;
	const fondo = Math.max(fondoBruto - (interes + administracion + iva), 0);

	const total = cuota + interes+ fondo + administracion + iva;

	return {
		cuota,
		interes,
		fondo,
		administracion,
		iva,
		total
	};
}

// Obtener detalles desde sessionStorage o calcularlos
const detallesIniciales: Detalles = JSON.parse(sessionStorage.getItem('detalles') || 'null') || 
	calcularDetallesIniciales(solicitudCredito);

const detallesStore = writable<Detalles>(detallesIniciales);

// Unificar la suscripción a solicitudStore
solicitudStore.subscribe(solicitud => {
	// Guardar solicitud en sessionStorage
	sessionStorage.setItem('solicitud', JSON.stringify(solicitud));

	// Actualizar y guardar detalles
	const nuevosDetalles = calcularDetallesIniciales(solicitud);
	detallesStore.set(nuevosDetalles);
	sessionStorage.setItem('detalles', JSON.stringify(nuevosDetalles));
});

// Exportaciones al final
export { solicitudStore, detallesStore, mostrarEtapa1 };
