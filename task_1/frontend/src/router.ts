import { createRouter, createWebHistory } from "vue-router";
import AlbumsView from "./views/AlbumsView.vue";

const routes = [{ path: "/", component: AlbumsView }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
