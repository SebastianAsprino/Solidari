<!-- <script lang="ts">
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
</script> -->














<!-- <main class="flex h-screen overflow-hidden">
<section class="w-1/2 h-full flex flex-col justify-start items-center relative overflow-hidden p-[2%] box-border">
	<h1 class="text-[2.2vw] font-bold tracking-wider mb-[2vw]">
		Simulador de Crédito
	</h1>
	<h2 class="text-[1.5vw] mb-[1.2vw]">
		¿Qué tipo de cliente eres?
	</h2>
	<div class="flex w-1/2 justify-around mb-[1.5vw]">
		<button class="bg-black text-white py-[2.5%] px-[4.5%] no-underline rounded-full text-[1.2vw] transition-all duration-300  hover:shadow-lg hover:brightness-90 hover:bg-gray-800" on:click={() => tipoCliente(false)}>
				Nuevo
		</button>
		<button class="bg-black text-white py-[2.5%] px-[4.5%] no-underline rounded-full text-[1.2vw] transition-all duration-300  hover:shadow-lg hover:brightness-90 hover:bg-gray-800" on:click={() => tipoCliente(true)}>
			Miembro del Club
		</button>
	</div>

	{#if $solicitudStore.cliente}
		<div class="flex flex-col items-center w-1/2 mb-[2.2vw]">
			<h2 class="text-[1.4vw] mb-[1vw]">
				Contraseña
			</h2>
			<input
				type="text"
				bind:value={llaveInput}
				on:input={validarCodigo} 
				class:border-red-500={!$solicitudStore.llave && llaveInput.length > 0}
				class="w-full border-b-2 border-black text-[1.2vw] outline-none  transition-all"
			/>

			{#if !$solicitudStore.llave && llaveInput.length !== 0}
				<p class="text-red-500 mt-1 text-[1vw]">✖ Contraseña no válida</p>
			{/if}
		</div>
	{/if}

	{#if ($solicitudStore.cliente === false) || ($solicitudStore.cliente && $solicitudStore.llave)}
	<h2 class="text-[1.4vw] mb-[1.2vw]">
		¿Cuánto dinero quieres recibir?
	</h2>
	<p class="text-[1.5vw] font-semibold  mb-[1.5vw]">
		{formatodinero($solicitudStore.monto)}
	</p>
	<div class="w-1/2 flex flex-col items-center mb-[1.5vw] relative">
		<div class="w-full flex items-center relative">
			<div class="absolute left-0 w-[0.5vw] h-[0.5vw] bg-black rounded-full transform -translate-x-[0.25vw]"></div>
			<input
				type="range"
				min="200000"
				max={$solicitudStore.cliente && $solicitudStore.llave ? 2000000 : 500000}
				step="5000"
				value={$solicitudStore.monto}
				on:input={actualizarMonto}
				class="w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:bg-black [&::-webkit-slider-runnable-track]:h-[2px] [&::-moz-range-track]:bg-black [&::-moz-range-track]:h-[2px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[1vw] [&::-webkit-slider-thumb]:h-[1vw] [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-[0.5vw] [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:outline-none [&::-moz-range-thumb]:w-[1vw] [&::-moz-range-thumb]:h-[1vw] [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none"/>
			<div class="absolute right-0 w-[0.5vw] h-[0.5vw] bg-black rounded-full transform translate-x-[0.25vw]"></div>
		</div>
		<div class="flex justify-between w-full mt-auto text-[1vw]">
			<span class="transform -translate-x-[2.5vw]">{formatodinero(200000)}</span>
			<span class="transform -translate-x-[2.5vw]">{formatodinero($solicitudStore.cliente && $solicitudStore.llave ? 2000000 : 500000)}</span>
		</div>
	</div>
	<h2 class="text-[1.4vw] mb-[1vw]">
		¿En cuántas cuotas?
	</h2>
	<div class="w-1/2 flex flex-col items-center mb-[1vw] relative">

<div class="w-full flex items-center relative">

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

<div class="absolute left-1/2 w-[0.5vw] h-[0.5vw] bg-black rounded-full transform -translate-x-1/2"></div>


<div class="absolute right-0 w-[0.5vw] h-[0.5vw] bg-black rounded-full transform translate-x-[0.25vw]"></div>
</div>


<div class="flex justify-between w-full mt-1/2 text-[1vw]">
<span class="transform -translate-x-[0.2vw]">1</span>
<span class="transform -translate-x-[-0.1vw]">3</span>
<span class="transform translate-x-[0.2vw]">6</span>
</div>


<datalist id="cuotas-markers">
<option value="1" label="1"></option>
<option value="2" label="3"></option>
<option value="3" label="6"></option>
</datalist>
</div>
{/if}
</section> -->





















































<!-- <div class="absolute left-1/2 top-1/2 h-[60%] w-[0.14vw] bg-black transform -translate-x-1/2 -translate-y-1/2"></div> -->






<!-- <section class="w-1/2 h-full flex flex-col justify-start items-center relative overflow-hidden p-[3%] box-border">
<div class="bg-black text-white w-[70%] p-[0.5vw] mb-[0.6vw]">
<h1 class="text-[2.2vw] mb-4 font-bold text-center">Detalle costos</h1>

<div class="grid grid-cols-2 gap-y-[1vw] text-[1.4vw]">

	<h2 class="text-left">Cuota a capital</h2>
<div class="relative group">
<h2 class="text-right flex items-center justify-end">
{formatodinero($detallesStore.cuota)}
<span class="inline-flex items-center justify-center w-[1.2vw] h-[1.2vw] rounded-full bg-gray-300 text-black text-[1vw] ml-[0.6vw] relative group">
i
<span class="absolute right-[110%] top-1/2 -translate-y-1/2 bg-white text-black text-[0.9vw] p-[0.5vw] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[12vw] text-center">
Monto principal del préstamo que se amortiza cada mes
<span class="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-white"></span>
</span>
</span>
</h2>
</div>





<h2 class="text-left">Intereses</h2>
<div class="relative group">
<h2 class="text-right flex items-center justify-end">
	{formatodinero($detallesStore.interes)}
<span class="inline-flex items-center justify-center w-[1.2vw] h-[1.2vw] rounded-full bg-gray-300 text-black text-[1vw] ml-[0.6vw] relative group">
i
<span class="absolute right-[110%] top-1/2 -translate-y-1/2 bg-white text-black text-[0.9vw] p-[0.5vw] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[12vw] text-center">
	Coste financiero del préstamo calculado sobre saldos
<span class="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-white"></span>
</span>
</span>
</h2>
</div>



<h2 class="text-left">Fondo de garantías</h2>
<div class="relative group">
<h2 class="text-right flex items-center justify-end">
	{formatodinero($detallesStore.fondo)}
<span class="inline-flex items-center justify-center w-[1.2vw] h-[1.2vw] rounded-full bg-gray-300 text-black text-[1vw] ml-[0.6vw] relative group">
i
<span class="absolute right-[110%] top-1/2 -translate-y-1/2 bg-white text-black text-[0.9vw] p-[0.5vw] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[12vw] text-center">
	Seguro que cubre impagos, calculado sobre el saldo
<span class="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-white"></span>
</span>
</span>
</h2>
</div>







<h2 class="text-left">Cuota administrativa</h2>
<div class="relative group">
<h2 class="text-right flex items-center justify-end">
	{formatodinero($detallesStore.administracion)}

<span class="inline-flex items-center justify-center w-[1.2vw] h-[1.2vw] rounded-full bg-gray-300 text-black text-[1vw] ml-[0.6vw] relative group">
i
<span class="absolute right-[110%] top-1/2 -translate-y-1/2 bg-white text-black text-[0.9vw] p-[0.5vw] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[12vw] text-center">
	Costo fijo por administración del crédito
<span class="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-white"></span>
</span>
</span>
</h2>
</div>






<h2 class="text-left">IVA</h2>
<div class="relative group">
<h2 class="text-right flex items-center justify-end">
	{formatodinero($detallesStore.iva)}

<span class="inline-flex items-center justify-center w-[1.2vw] h-[1.2vw] rounded-full bg-gray-300 text-black text-[1vw] ml-[0.6vw] relative group">
i
<span class="absolute right-[110%] top-1/2 -translate-y-1/2 bg-white text-black text-[0.9vw] p-[0.5vw] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[12vw] text-center">
	Impuesto al Valor Agregado sobre intereses y comisiones
<span class="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-white"></span>
</span>
</span>
</h2>
</div>




<div class="col-span-2 border-t border-white my-2"></div>


<h2 class="text-left font-bold">Total a pagar</h2>
<div class="relative group">
	<h2 class="text-right font-bold">
		{formatodinero($detallesStore.total)}
	</h2>
</div>

</div>
</div>

<button class="bg-black text-white py-[1.4%] px-[3%] rounded text-[1.2vw] transition-all duration-300 hover:shadow-lg hover:brightness-90 hover:bg-gray-800 mt-4" on:click={onBack}>
Solicítalo YA
</button>
</section> -->

<!-- </main> -->






















<script>
  import { onMount } from 'svelte';
	import { solicitudStore, detallesStore } from "../../../services/storage/store";

  let y = 0;
  let isReady = false;

  const visibleTab = 40;

  // 70% visible
  const drawerHeightRatio = 0.7; // 70%

  const CLOSED_POSITION = () => window.innerHeight - visibleTab;
  const OPEN_POSITION = () => window.innerHeight * (1 - drawerHeightRatio); // e.g. 30% desde arriba

  let startY = 0;
  let endY = 0;
  let isTouch = false;

  function handleStart(e) {
    startY = isTouchEvent(e) ? e.touches[0].clientY : e.clientY;
  }

  function handleEnd(e) {
    endY = isTouchEvent(e) ? e.changedTouches[0].clientY : e.clientY;
    const delta = endY - startY;

    const threshold = 30;

    if (delta < -threshold) {
      y = OPEN_POSITION();
    } else if (delta > threshold) {
      y = CLOSED_POSITION();
    }
  }

  function isTouchEvent(e) {
    return e.type.startsWith('touch');
  }

  function handleResize() {
    y = CLOSED_POSITION();
  }

  onMount(() => {
    y = CLOSED_POSITION();
    isReady = true;

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

{#if isReady}
  <div
    role="button"
    tabindex="0"
    on:touchstart={handleStart}
    on:touchend={handleEnd}
    on:mousedown={handleStart}
    on:mouseup={handleEnd}
    class="fixed left-0 right-0 mx-auto max-w-[500px] bg-red-600 text-white rounded-t-4xl shadow-[0_-4px_12px_rgba(0,0,0,0.3)] flex flex-col items-center p-4 touch-none cursor-ns-resize overflow-hidden transition-[top] ease-in-out duration-300"
    style="top: {y}px; height: {window.innerHeight * drawerHeightRatio}px;"
  >

	<div class="w-12 h-1.5 bg-white/60 rounded-full mb-2"></div>

    <div class="overflow-y-auto w-full h-full px-2 text-sm">
			<h1 class="text-[2.2vw] my-4 font-bold text-center">Detalle costos</h1>
			
    </div>
  </div>
{/if}




<!-- 
 <section class="w-1/2 h-full flex flex-col justify-start items-center relative overflow-hidden p-[3%] box-border">
			<div class="bg-black text-white w-[70%] p-[1.5vw] pb-[2vw] mb-[0.6vw] rounded-3xl">
			<h1 class="text-[2.2vw] my-4 font-bold text-center">Detalle costos</h1>
			
			<div class="grid grid-cols-2 gap-y-[1vw] text-[1.4vw]">
			
				<h2 class="text-left">Cuota a capital</h2>
			<div class="relative group">
			<h2 class="text-right flex items-center justify-end">
			1
			<span class="inline-flex items-center justify-center w-[1.2vw] h-[1.2vw] rounded-full bg-gray-300 text-black text-[1vw] ml-[0.6vw] relative group">
			i
			<span class="absolute right-[110%] top-1/2 -translate-y-1/2 bg-white text-black text-[0.9vw] p-[0.5vw] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[12vw] text-center">
			Monto principal del préstamo que se amortiza cada mes
			<span class="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-white"></span>
			</span>
			</span>
			</h2>
			</div>
			
			<div class="col-span-2 border-t border-white my-2"></div>
			
			
			<h2 class="text-left font-bold">Total a pagar</h2>
			<div class="relative group">
				<h2 class="text-right font-bold">
					1
				</h2>
			</div>
			
			</div>
			<div class="flex flex-col justify-start items-center">
				<button class="bg-black text-white py-[1.4%] px-[3%] border-2 border-white rounded-full text-[1.2vw] transition-all duration-300 hover:shadow-lg hover:brightness-90 hover:bg-gray-800 mt-4" on:click={onBack}>
					Solicítalo YA
					</button>
			</div>

			</div>
			

			</section>
 -->
