<template>
  <div>
    <p>Are you sure you want to delete your account?</p>
    <button @click="deleteUser">Delete Account</button>
  </div>
</template>

<script>
  export default {
    methods: {
      async deleteUser() {
        try {
          const response = await this.$axios.delete('http://localhost:5010/api/Users/DeleteUser', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          alert(response.data);

          localStorage.removeItem('token');
          localStorage.removeItem('user');

          this.$router.push('/login');
        } catch (error) {
          alert('Failed to delete user.');
          console.error(error);
        }
      }
    }
  };
</script>

<style scoped>
  button {
    padding: 0.5rem;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>