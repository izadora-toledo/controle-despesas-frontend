<template>
  <div>
    <div class="q-pa-md">
      <lista-despesas @despesaSalva="fetchDespesas" />
    </div>
  </div>
</template>

<script>
import ListaDespesas from "../components/ListaDespesas.vue";

export default {
  name: "DespesasPage",
  components: {
    ListaDespesas,
  },
};
</script>
