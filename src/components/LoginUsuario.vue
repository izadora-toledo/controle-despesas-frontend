<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-form">
        <h4>Controle de Despesas</h4>
        <div class="form-field">
          <label for="email">E-mail:</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Digite seu email"
          />
        </div>
        <div class="form-field">
          <label for="password">Senha:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Digite sua senha"
          />
        </div>
        <p class="register-text">
          É seu primeiro acesso?
          <router-link to="/cadastrar-editar-usuarios" @click="registrarUsuario"
            >Registre-se aqui</router-link
          >
        </p>
      </div>
      <button class="login-button" @click="login">Entrar</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LoginUsuario",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const url = "http://localhost:8000/api/login"; // Substitua pela URL correta da sua API
      const credentials = { email: this.email, password: this.password };

      axios
        .post(url, credentials)
        .then((response) => {
          // Lógica para tratamento de sucesso do login
          console.log("Login realizado com sucesso!");
          const token = response.data.token; // Obtém o token da resposta da API
          console.log(token);

          // Armazena o token em localStorage ou Vuex, para acesso posterior
          // Exemplo usando localStorage:
          localStorage.setItem("token", token); // Resposta da API (pode variar dependendo da implementação no Laravel)

          // Redirecionar para a página ListaDespesa.vue após o login
          this.$router.push("/lista-despesas");
        })
        .catch((error) => {
          // Lógica para tratamento de erro no login
          console.error("Erro no login:", error);
        });
    },
    registrarUsuario() {
      console.log("oi");
      this.$router.push({
        name: "CadastrarEditarUsuarios",
        query: {
          modoEdicao: false,
        },
      });
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.login-card {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  width: 800px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

h4 {
  margin-bottom: 20px;
  text-align: center;
}

.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.register-text {
  margin-bottom: 10px;
  text-align: center;
}

.register-text a {
  color: #ff69b4;
  text-decoration: none;
}

.register-text a:hover {
  text-decoration: underline;
}

button.login-button {
  background-color: #ff69b4;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
  width: 200px;
}

button.login-button:hover {
  background-color: #e85a9d;
}

button.login-button:active {
  background-color: #d34d8a;
}
</style>
