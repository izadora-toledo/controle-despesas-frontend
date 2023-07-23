const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },

  {
    path: "/lista-despesas",
    component: () => import("components/ListaDespesas.vue"),
  },

  {
    path: "/listar-usuarios",
    component: () => import("components/ListarUsuarios.vue"),
  },

  {
    path: "/cadastrar-editar-despesas",
    name: "CadastrarEditarDespesas",
    component: () => import("components/CadastrarEditarDespesas.vue"),
  },

  {
    path: "/cadastrar-editar-usuarios",
    name: "CadastrarEditarUsuarios",
    component: () => import("components/CadastrarEditarUsuarios.vue"),
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
