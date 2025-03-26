<script lang="ts">
  export let onBack: () => void;
</script>

<section>
  <h2>Formulario 2</h2>
  <button class="btn" on:click={onBack}>
    Volver a Formulario 1
  </button>
</section>