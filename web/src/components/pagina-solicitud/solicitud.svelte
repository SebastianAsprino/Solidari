<script lang="ts">
	import { onMount } from "svelte";
	import { mostrarEtapa1 } from "../../services/storage/store";
	import Simulador from "./etapa-1/simulador.svelte";
	import DatosUsuario from "./etapa-2/datos_usuario.svelte";
	import s from "./styles";

	onMount(() => {
		document.getElementById("fallback")?.remove();
	});
	let showDatosUsuario = false;
	$: if (!$mostrarEtapa1) showDatosUsuario = true;
	const cambiarFormulario = () => mostrarEtapa1.update(prev => !prev);
</script>

<!-- <main class={s.main}> -->
	<!-- {#if $mostrarEtapa1} -->
		<!-- <Simulador onBack={cambiarFormulario}/> -->
		<Simulador/>
	<!-- {:else if showDatosUsuario} -->
		<!-- <DatosUsuario onBack={cambiarFormulario}/> -->
	<!-- {/if} -->
<!-- </main> -->