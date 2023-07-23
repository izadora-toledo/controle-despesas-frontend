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
                  v-model="despesa.descricao"
                  label="Descrição"
                  type="text"
                  @keyup.enter="salvarDespesa"
                />
                <q-input
                  filled
                  v-model.number="despesa.valor"
                  label="Valor"
                  type="number"
                  @keyup.enter="salvarDespesa"
                />
                <q-input
                  filled
                  v-model="despesa.data"
                  label="Data"
                  type="date"
                  @keyup.enter="salvarDespesa"
                />
                <q-btn
                  color="primary"
                  label="Salvar"
                  @click="salvarDespesa"
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
      despesa: {
        descricao: "",
        valor: 0,
        data: null,
      },
      modoEdicao: false,
      tituloTabela: "",
    };
  },
  methods: {
    async salvarDespesa() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token de login não encontrado.");
        return;
      }

      try {
        if (this.modoEdicao) {
          await axios.put(
            `http://localhost:8000/api/despesas/${this.despesa.id}`,
            this.despesa,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          await axios.post(
            "http://localhost:8000/api/despesas/",
            this.despesa,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        this.$router.push("/lista-despesas");
      } catch (error) {
        console.error("Erro ao salvar despesa:", error);
      }
    },
  },
  created() {
    const modoEdicao = this.$route.query.modoEdicao;
    const despesaSelecionada = {
      id: this.$route.query.id,
      descricao: this.$route.query.descricao || "",
      valor: this.$route.query.valor || 0,
      data: this.$route.query.data || null,
    };

    this.modoEdicao = modoEdicao === "true";
    this.tituloTabela = this.modoEdicao
      ? "Editar Despesa"
      : "Cadastrar Despesa";

    if (this.modoEdicao) {
      this.despesa = { ...despesaSelecionada };
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
