<template>
  <q-page class="flex flex-center">
    <LoginUsuario />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import LoginUsuario from "src/components/LoginUsuario.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    LoginUsuario,
  },
});
</script>
