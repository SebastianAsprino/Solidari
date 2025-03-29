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
	<h1 class={s.SectionIzquierdoH1}>
		Simulador de Crédito
	</h1>
	<h2 class={s.SectionIzquierdoH2TipoCliente}>
		¿Qué tipo de cliente eres?
	</h2>
	<div class={s.SectionIzquierdoDivButtons}>
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





<p class="text-[1.5vw] font-semibold  mb-[1.5vw]">
	{formatodinero($solicitudStore.monto)}
</p>



























	<div class="w-1/2 flex flex-col items-center mb-[1.5vw] relative">
    <!-- Range input -->
    <div class="w-full flex items-center relative">
        <!-- Punto inicial - posicionado absolutamente a la izquierda -->
        <div class="absolute left-0 w-[0.5vw] h-[0.5vw] bg-black rounded-full transform -translate-x-[0.25vw]"></div>
        
        <input
            type="range"
            min="200000"
            max={$solicitudStore.cliente && $solicitudStore.llave ? 2000000 : 500000}
            step="5000"
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












	<h2 class="text-[1.4vw] mb-[1vw]">¿En cuántas cuotas?</h2>












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
        <span class="transform -translate-x-[-0.1vw]">3</span>
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






<section class="w-1/2 h-full flex flex-col justify-start items-center relative overflow-hidden p-[3%] box-border">
  <div class="bg-black text-white w-[70%] p-[0.5vw] mb-[0.6vw]">
    <h1 class="text-[2.2vw] mb-4 font-bold text-center">Detalle costos</h1>

    <div class="grid grid-cols-2 gap-y-[1vw] text-[1.4vw]">
      <!-- Cuota a capital -->
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
    </div>
  </div>
  
  <button class="bg-black text-white py-[1.4%] px-[3%] rounded text-[1.2vw] transition-all duration-300 hover:shadow-lg hover:brightness-90 hover:bg-gray-800 mt-4" on:click={onBack}>
    Solicítalo YA
  </button>
</section>







<!-- 

      <h2 class="text-left">Intereses</h2>
      <div class="relative group">
        <h2 class="text-right flex items-center justify-end">
          {formatodinero($detallesStore.interes)}
          <span class="inline-flex items-center justify-center w-[1.2vw] h-[1.2vw] rounded-full bg-gray-300 text-black text-[1vw] ml-[0.6vw]">i</span>

          <span class="tooltip-text leftt-tooltip">Coste financiero del préstamo calculado sobre saldos</span>
        </h2>
      </div>


      <h2 class="text-left">Fondo de garantías</h2>
      <div class="relative group">
        <h2 class="text-right flex items-center justify-end">
          {formatodinero($detallesStore.fondo)}
          <span class="inline-flex items-center justify-center w-[1.2vw] h-[1.2vw] rounded-full bg-gray-300 text-black text-[1vw] ml-[0.6vw]">i</span>

          <span class="tooltip-text leftt-tooltip">Seguro que cubre impagos, calculado sobre el saldo</span>
        </h2>
      </div>


      <h2 class="text-left">Cuota administrativa</h2>
      <div class="relative group">
        <h2 class="text-right flex items-center justify-end">
          {formatodinero($detallesStore.administracion)}
          <span class="inline-flex items-center justify-center w-[1.2vw] h-[1.2vw] rounded-full bg-gray-300 text-black text-[1vw] ml-[0.6vw]">i</span>

          <span class="tooltip-text leftt-tooltip">Costo fijo por administración del crédito</span>
        </h2>
      </div>

      <h2 class="text-left">IVA</h2>
      <div class="relative group">
        <h2 class="text-right flex items-center justify-end">
          {formatodinero($detallesStore.iva)}
          <span class="inline-flex items-center justify-center w-[1.2vw] h-[1.2vw] rounded-full bg-gray-300 text-black text-[1vw] ml-[0.6vw]">i</span>

          <span class="tooltip-text leftt-tooltip">Impuesto al Valor Agregado sobre intereses y comisiones</span>
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
  </div> -->