<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/edit-user">Edit User</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/camps">All Camps</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/camp/create">Create Camp</router-link></li>
          <li v-if="isLoggedIn" @click="logout">Logout</li>
          <li v-if="isLoggedIn"><router-link to="/delete-account">Delete Account</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      isLoggedIn() {
        return localStorage.getItem('token') !== null;
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$router.push('/login');
      }
    }
  };
</script>

<style scoped>
  header {
    background-color: #f4f4f4;
    padding: 10px;
  }

  nav ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  nav li {
    margin-right: 10px;
  }

  nav a {
    text-decoration: none;
    color: #333;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 5px;
  }

  nav a.router-link-active {
    background-color: #007bff;
    color: white;
  }
</style>