<script lang="ts">
	import { solicitudStore, detallesStore } from "../../../services/storage/store";
	import type { Solicitud, Detalles } from "../../../types/solicitud";
	import config from "../../../../web_config";
	
	let llaveInput:string = "";


  // Arrow function para manejar cambios en el tipo de cliente
  const tipoCliente = (isMiembro: boolean) => {
    $solicitudStore = {
      ...$solicitudStore,
      cliente: isMiembro,
      // Reset monto si cambia el tipo de cliente
      monto: isMiembro ? 200000 : 200000,
			llave: false
    };
		llaveInput = ""; // Limpiar input
  };

	const validarCodigo = () => {
		$solicitudStore.llave = (llaveInput === config.llave);
	};

	const formatodinero = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

	// Arrow function para actualizar monto desde el range input
	const actualizarMonto = (event: Event) => {
		$solicitudStore.monto = parseInt((event.target as HTMLInputElement).value);
	};

	// Arrow function para actualizar cuotas desde el range input
	const updateCuotas = (event: Event) => {
		const valor = parseInt((event.target as HTMLInputElement).value);
		
		switch (valor) {
			case 1:
				$solicitudStore.cuotas = 1;
				break;
			case 2:
				$solicitudStore.cuotas = 3;
				break;
			case 3:
				$solicitudStore.cuotas = 6;
				break;
		}
	};



	export let onBack: () => void;
</script>

<section>
	<h1>Simulador de Crédito</h1>
	<h2>¿Qué tipo de cliente eres?</h2>
	<button class="btn btn-neutral" on:click={() => tipoCliente(false)}>Nuevo</button>
	<button class="btn btn-neutral" on:click={() => tipoCliente(true)}>Miembro del Club</button>
	
	{#if $solicitudStore.cliente}
		<div>
			<h2>Contraseña</h2>
			<input
				type="text"
				bind:value={llaveInput}
				on:input={validarCodigo} 
				class:error={!$solicitudStore.llave && llaveInput.length > 0}
				class="input border-t-0 border-l-0 border-r-0 border-b-2 border-black focus:outline-none"
			/>
			{#if !$solicitudStore.llave && llaveInput.length !== 0}
				<p class="text-red-500 mt-1">✖ Contraseña no válida</p>
			{/if}
		</div>
	{/if}
	
	<h2>¿Cuánto dinero quieres recibir?</h2>
	<p>{formatodinero($solicitudStore.monto)}</p>
	
	<div>
		<!-- Range input para monto -->
		<input
			type="range"
			min="200000"
			max={$solicitudStore.cliente && $solicitudStore.llave ? 2000000 : 500000}
			step="1000"
			value={$solicitudStore.monto}
			on:input={actualizarMonto}
		/>
		<div>
			<span>{formatodinero(200000)}</span>
			<span>{formatodinero($solicitudStore.cliente && $solicitudStore.llave ? 2000000 : 500000)}</span>
		</div>
	</div>

	<h2>¿En cuántas cuotas?</h2>
	<div>
		<!-- Range input con snaps a posiciones fijas -->
		<input
			type="range"
			min="1"
			max="3"
			value={$solicitudStore.cuotas === 1 ? 1 : $solicitudStore.cuotas === 3 ? 2 : 3}
			on:input={updateCuotas}
			step="1"
			list="cuotas-markers"
		/>
		
		<!-- Marcadores para las 3 posiciones -->
		<datalist id="cuotas-markers">
			<option value="1" label="1 mes"></option>
			<option value="2" label="3 meses"></option>
			<option value="3" label="6 meses"></option>
		</datalist>
		
		<!-- Visualización de puntos fijos -->
		<div>
			<span>1</span>
			<span>3</span>
			<span>6</span>
		</div>
	</div>
</section>

<style>
	.error {
		border-color: red;
		background-color: #fff0f0;
	}
</style>

<section>

	<h1>Detalle costos</h1>
	<h2>Cuota a capital</h2>
	<h2>{$detallesStore.cuota}</h2>
	<h2>Intereses</h2>
	<h2>{$detallesStore.interes}</h2>

	<h2>Fondo de garantias</h2>
	<h2>{$detallesStore.fondo}</h2>

	<h2>Cuota administrativa</h2>
	<h2>{$detallesStore.administracion}</h2>

	<h2>IVA</h2>
	<h2>{$detallesStore.iva}</h2>

	<h2>una linea negra que los separa</h2>
	<h2>total a pagar</h2>
	<h2>{$detallesStore.total}</h2>





<button class="btn" on:click={onBack}>
	Solicitalo YA
</button>
</section>



<button class="btn btn-neutral">Neutral</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>