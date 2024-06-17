<template>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="login.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="login.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
</template>
  
<script>
  export default {
    data() {
      return {
        login: {
          email: '',
          password: ''
        }
      };
    },
    methods: {
      async loginUser() {
        try {
          const response = await this.$axios.post('http://localhost:5010/api/Users/Login', this.login);
          const { token, user } = response.data;
  
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
  
          this.$router.push('/edit-user');
        } catch (error) {
          alert('Login failed. Please check your credentials.');
          console.error(error);
        }
      }
    }
  };
</script>
  
<style scoped>
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  div {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>