<template>
  <div>
    <div class="q-pa-md">
      <listar-usuarios @usuarioSalvo="fetchUsuarios" />
    </div>
  </div>
</template>

<script>
import ListarUsuarios from "../components/ListarUsuarios.vue";

export default {
  name: "UsuariosPage",
  components: {
    ListarUsuarios,
  },
};
</script>
