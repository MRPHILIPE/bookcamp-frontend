<template>
    <form @submit.prevent="editUser">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="editUserForm.firstName" required>
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="editUserForm.lastName" required>
      </div>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="editUserForm.userName" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editUserForm.email" required>
      </div>
      <button type="submit">Save Changes</button>
    </form>
</template>
  
<script>
  export default {
    data() {
      return {
        editUserForm: {
          firstName: '',
          lastName: '',
          userName: '',
          email: ''
        }
      };
    },
    mounted() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No token found');
          }
  
          const response = await this.$axios.get('http://localhost:5010/api/Users/GetUser', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          const userData = response.data;
          this.editUserForm.firstName = userData.firstName;
          this.editUserForm.lastName = userData.lastName;
          this.editUserForm.userName = userData.userName;
          this.editUserForm.email = userData.email;
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      },
      async editUser() {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No token found');
          }
  
          const response = await this.$axios.put('http://localhost:5010/api/Users/EditUser', this.editUserForm, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          alert(response.data);
          this.fetchUserData();
        } catch (error) {
          alert('Failed to update user details. Please try again.');
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