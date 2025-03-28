<script lang="ts">
	import { solicitudStore, detallesStore } from "../../../services/storage/store";
	import config from "../../../../web_config";
	import s from "./styles";
	let llaveInput:string = "";

	const tipoCliente = (isMiembro: boolean) => {
		$solicitudStore = {
			...$solicitudStore,
			cliente: isMiembro,
			monto: isMiembro ? 200000 : 200000,
			llave: false
		};
		llaveInput = "";
	};

	const validarCodigo = () => {
		$solicitudStore.llave = (llaveInput === config.llave);
	};

	const formatodinero = (value: number) => {
		let parse:number =  Math.round(value);
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0
		}).format(parse);
	};

	const actualizarMonto = (event: Event) => {
		$solicitudStore.monto = parseInt((event.target as HTMLInputElement).value);
	};

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



















































<section class={s.SectionIzquierdo}>
	<h1 class="text-[2.2vw] font-bold tracking-wider mb-[2vw]">
		Simulador de Crédito
	</h1>
	<h2 class="text-[1.5vw] mb-[1.2vw]">
		¿Qué tipo de cliente eres?
	</h2>
	<div class="flex w-1/2 justify-around mb-[1.5vw]">
		<button class="bg-black text-white py-[1.4%] px-[3%] no-underline rounded text-[1.2vw] transition-all duration-300  hover:shadow-lg hover:brightness-90 hover:bg-gray-800" on:click={() => tipoCliente(false)}>
			Nuevo
		</button>
		<button class="bg-black text-white py-[1.4%] px-[3%] no-underline rounded text-[1.2vw] transition-all duration-300  hover:shadow-lg hover:brightness-90 hover:bg-gray-800" on:click={() => tipoCliente(true)}>
			Miembro del Club
		</button>
	</div>

	{#if $solicitudStore.cliente}
		<div class="flex flex-col items-center w-1/2 mb-[2.2vw]">
			<h2 class="text-[1.4vw] mb-[1vw]">Contraseña</h2>
			<input
				type="text"
				bind:value={llaveInput}
				on:input={validarCodigo} 
				class:border-red-500={!$solicitudStore.llave && llaveInput.length > 0}
				class="w-full border-b-2 border-black text-[1.2vw] outline-none  transition-all"
			/>

			{#if !$solicitudStore.llave && llaveInput.length !== 0}
				<p class="text-red-500 mt-1">✖ Contraseña no válida</p>
			{/if}
		</div>
	{/if}

	{#if ($solicitudStore.cliente === false) || ($solicitudStore.cliente && $solicitudStore.llave)}
	<h2 class="text-[1.4vw] mb-[1.2vw]">¿Cuánto dinero quieres recibir?</h2>
	<p class="bg-black text-white py-[1.2%] px-[3%] no-underline rounded text-[1.2vw] mb-[1.5vw]">{formatodinero($solicitudStore.monto)}</p>
	
	<div class="w-1/2 flex flex-col items-center mb-[1vw] relative">
    <!-- Range input -->
    <div class="w-full flex items-center relative">
        <!-- Punto inicial - posicionado absolutamente a la izquierda -->
        <div class="absolute left-0 w-[0.5vw] h-[0.5vw] bg-black rounded-full transform -translate-x-[0.25vw]"></div>
        
        <input
            type="range"
            min="200000"
            max={$solicitudStore.cliente && $solicitudStore.llave ? 2000000 : 500000}
            step="1000"
            value={$solicitudStore.monto}
            on:input={actualizarMonto}
            class="w-full appearance-none bg-transparent cursor-pointer 
                   [&::-webkit-slider-runnable-track]:bg-black 
                   [&::-webkit-slider-runnable-track]:h-[2px] 
                   [&::-moz-range-track]:bg-black 
                   [&::-moz-range-track]:h-[2px] 
                   [&::-webkit-slider-thumb]:appearance-none 
                   [&::-webkit-slider-thumb]:w-[1vw] 
                   [&::-webkit-slider-thumb]:h-[1vw] 
                   [&::-webkit-slider-thumb]:bg-black 
                   [&::-webkit-slider-thumb]:rounded-full 
                   [&::-webkit-slider-thumb]:-mt-[0.5vw] 
                   [&::-webkit-slider-thumb]:border-none 
                   [&::-webkit-slider-thumb]:outline-none 
                   [&::-moz-range-thumb]:w-[1vw] 
                   [&::-moz-range-thumb]:h-[1vw] 
                   [&::-moz-range-thumb]:bg-black 
                   [&::-moz-range-thumb]:rounded-full 
                   [&::-moz-range-thumb]:border-none"
        />
        
        <!-- Punto final - posicionado absolutamente a la derecha -->
        <div class="absolute right-0 w-[0.5vw] h-[0.5vw] bg-black rounded-full transform translate-x-[0.25vw]"></div>
    </div>
    
    <!-- Límites del rango - alineados con los puntos -->
    <div class="flex justify-between w-full mt-auto text-[1vw]">
        <span class="transform -translate-x-[2.5vw]">{formatodinero(200000)}</span>
        <span class="transform translate-x-[2.5vw]">{formatodinero($solicitudStore.cliente && $solicitudStore.llave ? 2000000 : 500000)}</span>
    </div>
</div>












	<h2>¿En cuántas cuotas?</h2>












<div class="w-1/2 flex flex-col items-center mb-[1vw] relative">
    <!-- Range input -->
    <div class="w-full flex items-center relative">
        <!-- Punto inicial - posicionado absolutamente a la izquierda -->
        <div class="absolute left-0 w-[0.5vw] h-[0.5vw] bg-black rounded-full transform -translate-x-[0.25vw]"></div>
        
        <input
            type="range"
            min="1"
            max="3"
            value={$solicitudStore.cuotas === 1 ? 1 : $solicitudStore.cuotas === 3 ? 2 : 3}
            on:input={updateCuotas}
            step="1"
            list="cuotas-markers"
            class="w-full appearance-none bg-transparent cursor-pointer 
                   [&::-webkit-slider-runnable-track]:bg-black 
                   [&::-webkit-slider-runnable-track]:h-[2px] 
                   [&::-moz-range-track]:bg-black 
                   [&::-moz-range-track]:h-[2px] 
                   [&::-webkit-slider-thumb]:appearance-none 
                   [&::-webkit-slider-thumb]:w-[1vw] 
                   [&::-webkit-slider-thumb]:h-[1vw] 
                   [&::-webkit-slider-thumb]:bg-black 
                   [&::-webkit-slider-thumb]:rounded-full 
                   [&::-webkit-slider-thumb]:-mt-[0.5vw] 
                   [&::-webkit-slider-thumb]:border-none 
                   [&::-webkit-slider-thumb]:outline-none 
                   [&::-moz-range-thumb]:w-[1vw] 
                   [&::-moz-range-thumb]:h-[1vw] 
                   [&::-moz-range-thumb]:bg-black 
                   [&::-moz-range-thumb]:rounded-full 
                   [&::-moz-range-thumb]:border-none"
        />
        
        <!-- Punto medio -->
        <div class="absolute left-1/2 w-[0.5vw] h-[0.5vw] bg-black rounded-full transform -translate-x-1/2"></div>
        
        <!-- Punto final - posicionado absolutamente a la derecha -->
        <div class="absolute right-0 w-[0.5vw] h-[0.5vw] bg-black rounded-full transform translate-x-[0.25vw]"></div>
    </div>
    
    <!-- Límites del rango - alineados con los puntos -->
    <div class="flex justify-between w-full mt-1/2 text-[1vw]">
        <span class="transform -translate-x-[0.2vw]">1</span>
        <span class="transform -translate-x-[0vw]">3</span>
        <span class="transform translate-x-[0.2vw]">6</span>
    </div>
    
    <!-- Marcadores para las 3 posiciones (opcional, ya que tenemos los puntos visuales) -->
    <datalist id="cuotas-markers">
        <option value="1" label="1"></option>
        <option value="2" label="3"></option>
        <option value="3" label="6"></option>
    </datalist>
</div>




	{/if}
</section>





















































<div class="absolute left-1/2 top-1/2 h-[60%] w-[0.14vw] bg-black transform -translate-x-1/2 -translate-y-1/2"></div>

<section class="w-1/2 h-full flex flex-col justify-start items-center relative overflow-hidden  p-[5%] box-border bg-green-500">

	<h1 class="text-[1.8vw] mb-[2%]  font-bold">Detalle costos</h1>
	<h2>Cuota a capital</h2>
	<h2>{formatodinero($detallesStore.cuota)}</h2>
	<h2>Intereses</h2>
	<h2>{formatodinero($detallesStore.interes)}</h2>

	<h2>Fondo de garantias</h2>
	<h2>{formatodinero($detallesStore.fondo)}</h2>

	<h2>Cuota administrativa</h2>
	<h2>{formatodinero($detallesStore.administracion)}</h2>

	<h2>IVA</h2>
	<h2>{formatodinero($detallesStore.iva)}</h2>

	<h2>una linea negra que los separa</h2>
	<h2>total a pagar</h2>
	<h2>{formatodinero($detallesStore.total)}</h2>
	<h2>esto es lo que se pagaria en {$solicitudStore.cuotas}, total: {formatodinero($detallesStore.total * $solicitudStore.cuotas)}</h2>

<button class="btn" on:click={onBack}>
	Solicitalo YA
</button>
</section>


