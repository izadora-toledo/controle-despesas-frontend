<template>
  <div>
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>
        <q-btn flat round dense to="/" v-close-popup>
          <q-icon name="home" />
          Home
        </q-btn>
      </q-toolbar-title>

      <q-toolbar-title>
        <q-btn flat round dense to="/listar-usuarios" v-close-popup>
          <q-icon name="account_circle" />
          Usuários
        </q-btn>
      </q-toolbar-title>

      <q-toolbar-title>
        <q-btn flat round dense to="/lista-despesas" v-close-popup>
          <q-icon name="attach_money" />
          Despesas
        </q-btn>
      </q-toolbar-title>
    </q-toolbar>

    <q-table
      :rows="despesas"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[10, 25, 50, 100]"
    >
      <template v-slot:top-left>
        <q-btn
          @click="novaDespesa"
          class="btn-nova-despesa"
          label="Nova Despesa"
          icon="add"
          textColor="white"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="descricao" :props="props">{{ props.row.descricao }}</q-td>
          <q-td key="valor" :props="props">{{ props.row.valor }}</q-td>
          <q-td key="data" :props="props">{{ props.row.data }}</q-td>
          <q-td key="usuario" :props="props">{{ props.row.usuario }}</q-td>
          <q-td key="action" :props="props">
            <q-icon
              name="edit"
              class="cursor-pointer"
              @click="editDespesa(props.row)"
            />
            <q-icon
              name="delete"
              class="cursor-pointer"
              @click="deleteDespesa(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      despesas: [],
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: "id",
          sortable: true,
        },
        {
          name: "descricao",
          required: true,
          label: "NOME DESPESA",
          align: "left",
          field: "descricao",
          sortable: true,
        },
        {
          name: "valor",
          required: true,
          label: "Valor",
          align: "left",
          field: "valor",
          sortable: true,
        },
        {
          name: "data",
          required: true,
          label: "DATA",
          align: "left",
          field: "data",
          sortable: true,
        },
        {
          name: "usuario",
          required: true,
          label: "USUÁRIO",
          align: "left",
          field: "usuario",
          sortable: true,
        },
        {
          name: "action",
          label: "AÇÃO",
          align: "center",
          field: null,
          sortable: false,
        },
      ],
      filter: "",
      showForm: false,
    };
  },
  methods: {
    async fetchDespesas() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token de login não encontrado.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8000/api/despesas/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.despesas = response.data.data;
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    },
    async deleteDespesa(despesaId) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token de login não encontrado.");
        return;
      }

      try {
        await axios.delete(`http://localhost:8000/api/despesas/${despesaId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await this.fetchDespesas();
      } catch (error) {
        console.error(`Erro ao deletar despesa ${despesaId}:`, error);
      }
    },
    editDespesa(despesa) {
      this.$router.push({
        name: "CadastrarEditarDespesas",
        query: {
          modoEdicao: true,
          ...despesa,
        },
      });
    },
    novaDespesa() {
      this.$router.push({
        name: "CadastrarEditarDespesas",
        query: {
          modoEdicao: false,
        },
      });
    },
  },
  created() {
    this.fetchDespesas();
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
.btn-nova-despesa {
  background-color: #ff69b4;
}
</style>
