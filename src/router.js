import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from './components/RegistrationForm.vue';
import LoginForm from './components/LoginForm.vue';
import EditUserForm from './components/EditUserForm.vue';
import CampList from './components/CampList.vue';
import CampDetail from './components/CampDetail.vue';
import CampForm from './components/CampForm.vue';
import DeleteAccountForm from './components/DeleteAccountForm.vue';

const routes = [
  { path: '/register', component: RegistrationForm },
  { path: '/login', component: LoginForm },
  { path: '/edit-user', component: EditUserForm, meta: { requiresAuth: true } },
  { path: '/camps', component: CampList, meta: { requiresAuth: true } },
  { path: '/camp/create', component: CampForm, meta: { requiresAuth: true } },
  { path: '/camp/:id', component: CampDetail, meta: { requiresAuth: true } },
  { path: '/camp/:id/edit', component: CampForm, meta: { requiresAuth: true } },
  { path: '/delete-account', component: DeleteAccountForm, meta: { requiresAuth: true } },
  { path: '/', redirect: '/register' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login');
  } else {
    next();
  }
});

export default router;