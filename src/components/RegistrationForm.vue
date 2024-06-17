<template>
    <form @submit.prevent="registerUser">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="user.firstName" required>
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="user.lastName" required>
      </div>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="user.userName" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required>
      </div>
      <button type="submit">Register</button>
    </form>
</template>
  
<script>
  export default {
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: ''
        }
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await this.$axios.post('http://localhost:5010/api/Users/Registration', this.user);
          alert(response.data);
          this.$router.push('/login');
        } catch (error) {
          alert('Registration failed. Please try again.');
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