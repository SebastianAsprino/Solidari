<!-- src/components/Counter.svelte -->
 <!-- <script>
	let count = Number(sessionStorage.getItem("count")) || 0;

	function increment() {
		count += 1;
		sessionStorage.setItem("count", count);
	}
</script>

<button on:click={increment}>
	Haz clic aquí
</button>

<main>
	<section>
	<h1>Simulador de Crédito</h1>
	<h2>¿Qué tipo de cliente eres ?</h2>
	<button>Nuevo</button>
	<button>Miembro del Club</button>
	<h2>¿Cuánto dinero quieres recibir</h2>
	<p>$200.000</p>
	<p>slider de valor minimo a valor maximo</p>
	<h2>¿En cuantas cuotas?</h2>
	<p>slider de las cuotas 3 opciones 1,3,6</p>




</section>
</main>
<p>El contador es: {count}</p> -->




<!-- 
 <script>
	// Recuperar datos de sessionStorage
	let user = JSON.parse(sessionStorage.getItem("user")) || { 
		nombre: "", 
		edad: null, 
		correo: "" 
	};

	// Guardar en sessionStorage cuando los datos cambien
	function actualizarUsuario() {
		sessionStorage.setItem("user", JSON.stringify(user));
	}
</script>

<input type="text" bind:value={user.nombre} on:input={actualizarUsuario} placeholder="Nombre">
<input type="number" bind:value={user.edad} on:input={actualizarUsuario} placeholder="Edad">
<input type="email" bind:value={user.correo} on:input={actualizarUsuario} placeholder="Correo"> -->




<script lang="ts">
  import { mostrarEtapa1 } from "../../services/storage/store";
	import Simulador from "./etapa-1/simulador.svelte";
  import DatosUsuario from "./etapa-2/datos_usuario.svelte";

  const cambiarFormulario = () => mostrarEtapa1.update(prev => !prev);
</script>

<main>
  {#if $mostrarEtapa1}
		<Simulador onBack={cambiarFormulario} />
  {:else}
    <DatosUsuario onBack={cambiarFormulario} />
  {/if}
</main>

