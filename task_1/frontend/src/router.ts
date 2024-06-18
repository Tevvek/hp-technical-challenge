import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("./views/AlbumsView.vue") }, // lazy for better performance
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
