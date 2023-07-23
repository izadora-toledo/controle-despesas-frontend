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
      :rows="usuarios"
      :columns="columns"
      row-key="id"
      :rows-per-page="25"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="action" :props="props">
            <q-icon
              name="edit"
              class="cursor-pointer"
              @click="editUsuario(props.row)"
            />
            <q-icon
              name="delete"
              class="cursor-pointer"
              @click="deleteUsuario(props.row.id)"
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
      usuarios: [],
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
          name: "name",
          required: true,
          label: "NOME USUARIO",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "email",
          required: true,
          label: "E-MAIL",
          align: "left",
          field: "email",
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
    async fetchUsuarios() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token de login não encontrado.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.usuarios = response.data.data;
      } catch (error) {
        console.error("Erro ao buscar usuarios:", error);
      }
    },
    async deleteUsuario(usersId) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token de login não encontrado.");
        return;
      }

      try {
        await axios.delete(`http://localhost:8000/api/users/${usersId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await this.fetchUsuarios();
      } catch (error) {
        console.error(`Erro ao deletar usuario ${usersId}:`, error);
      }
    },
    editUsuario(usuario) {
      this.$router.push({
        name: "CadastrarEditarUsuarios",
        query: {
          modoEdicao: true,
          ...usuario,
        },
      });
    },
  },
  created() {
    this.fetchUsuarios();
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
.btn-novo-usuario {
  background-color: #ff69b4;
}
</style>
