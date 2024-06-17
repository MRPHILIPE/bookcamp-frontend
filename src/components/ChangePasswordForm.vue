<template>
    <form @submit.prevent="changePassword">
      <div>
        <label for="currentPassword">Current Password:</label>
        <input type="password" id="currentPassword" v-model="passwords.currentPassword" required>
      </div>
      <div>
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" v-model="passwords.newPassword" required>
      </div>
      <button type="submit">Change Password</button>
    </form>
</template>
  
<script>
  export default {
    data() {
      return {
        passwords: {
          currentPassword: '',
          newPassword: ''
        }
      };
    },
    methods: {
      async changePassword() {
        try {
          const response = await this.$axios.post('http://localhost:5010/api/Users/ChangePassword', this.passwords, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          alert(response.data);
        } catch (error) {
          alert('Failed to change password. Please check your credentials.');
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