<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="q-pa-md">
          <q-card class="q-mx-auto" style="max-width: 600px">
            <q-card-section>
              <h5 class="q-mb-md titulo-tabela">{{ tituloTabela }}</h5>
              <q-form class="q-gutter-md">
                <q-input
                  filled
                  v-model="usuario.name"
                  label="Nome"
                  type="text"
                  @keyup.enter="salvarUsuario"
                />
                <q-input
                  filled
                  v-model="usuario.email"
                  label="E-mail"
                  type="text"
                  @keyup.enter="salvarUsuario"
                />
                <q-input
                  filled
                  v-if="!modoEdicao"
                  v-model="usuario.password"
                  label="Senha"
                  type="password"
                  @keyup.enter="salvarUsuario"
                />
                <q-btn
                  color="primary"
                  label="Salvar"
                  @click="salvarUsuario"
                  class="q-mt-md"
                />
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      usuario: {
        name: "",
        email: "",
        password: "",
      },
      modoEdicao: false,
    };
  },
  methods: {
    async salvarUsuario() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token de login não encontrado.");
        return;
      }

      try {
        if (this.modoEdicao) {
          await axios.put(
            `http://localhost:8000/api/users/${this.usuario.id}`,
            this.usuario,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.$router.push("/listar-usuarios");
        } else {
          await axios.post("http://localhost:8000/api/register", this.usuario);
          this.$router.push("/");
        }
      } catch (error) {
        console.error(
          "Erro ao salvar usuario, você só pode editar o seu próprio usuário:",
          error
        );
      }
    },
  },
  created() {
    const modoEdicao = this.$route.query.modoEdicao;
    const usuarioSelecionado = {
      id: this.$route.query.id,
      name: this.$route.query.name || "",
      email: this.$route.query.email || "",
    };

    this.modoEdicao = modoEdicao === "true";
    this.tituloTabela = this.modoEdicao
      ? "Editar Usuario"
      : "Cadastrar Usuario";
    if (this.modoEdicao) {
      this.usuario = { ...usuarioSelecionado };
    }
  },
};
</script>

<style>
.q-card-section {
  padding: 20px;
}
.titulo-tabela {
  text-align: center;
  margin-bottom: 50px;
}
</style>
