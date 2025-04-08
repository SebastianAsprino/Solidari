<script lang="ts">
	import s from "./styles";
	let panelOpen:boolean = false;
	const togglePanel = () => {
		panelOpen = !panelOpen;
	};
	const closePanel = () => {
		panelOpen = false;
	};
</script>

<div class={s.end.end}>
	<button on:click={togglePanel} class={s.end.menu}>
		MENÚ
		<svg xmlns="http://www.w3.org/2000/svg" class={s.end.svg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round"stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>
</div>

<div class={s.end.panelLateral} class:translate-x-full={!panelOpen}>
	<button on:click={closePanel} class={s.end.menu}>
		MENÚ
		<svg xmlns="http://www.w3.org/2000/svg" class={s.end.svg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
		</svg>
	</button>
	<a href="/solicitud" class={s.end.a}>SIMULADOR DE <br/> CRÉDITO</a>
</div>

<div 
	class={s.end.contenedorInvisible}
	class:hidden={!panelOpen}
	on:click={closePanel}
	role="button"
	tabindex="0"
	on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? closePanel() : null}
	aria-label="Cerrar panel">
</div>