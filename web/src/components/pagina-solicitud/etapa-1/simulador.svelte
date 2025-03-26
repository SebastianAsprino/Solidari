<script lang="ts">
  export let onBack: () => void;
</script>

<section>
  <h2>Formulario 1</h2>
  <button class="btn" on:click={onBack}>
    Ir a Formulario 2
  </button>
</section>