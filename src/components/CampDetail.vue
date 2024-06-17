<template>
  <div v-if="camp">
    <h2>{{ camp.name }}</h2>
    <p><strong>Location:</strong> {{ camp.location }}</p>
    <p><strong>Description:</strong> {{ camp.description }}</p>
    <p><strong>Price:</strong> ${{ camp.price }}</p>
    <p v-if="camp.isBooked">Status: <strong>Booked</strong></p>
    <p v-else>Status: <strong>Available</strong></p>
    <span v-if="camp.createdByEmail === currentUserEmail">
      <router-link :to="'/camp/' + camp.campId + '/edit'">Edit</router-link>
      <button @click="deleteCamp(camp.campId)">Delete</button>
      <button v-if="camp.isBooked" @click="unbookCamp(camp.campId)">Unbook</button>
    </span>
    <button v-if="!camp.isBooked" @click="bookCamp(camp.campId)">Book Camp</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        camp: null,
        currentUserEmail: ''
      };
    },
    created() {
      this.currentUserEmail = JSON.parse(localStorage.getItem('user')).email; // Get current user email
      this.fetchCamp();
    },
    methods: {
      async fetchCamp() {
        try {
          const campId = this.$route.params.id;
          const response = await this.$axios.get(`http://localhost:5010/api/Camps/GetCamp/${campId}`);
          this.camp = response.data;
        } catch (error) {
          console.error('Failed to fetch camp', error);
        }
      },
      async deleteCamp(campId) {
        try {
          const response = await this.$axios.delete(`http://localhost:5010/api/Camps/DeleteCamp/${campId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          alert(response.data); // Camp deleted successfully
          this.$router.push('/camps'); // Redirect to camps list after deletion
        } catch (error) {
          alert('Failed to delete camp.');
          console.error(error);
        }
      },
      async bookCamp(campId) {
        try {
          const response = await this.$axios.post(`http://localhost:5010/api/Camps/BookCamp/${campId}`, null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          alert(response.data); // Camp booked successfully
          this.fetchCamp(); // Refresh camp data after booking
        } catch (error) {
          alert('Failed to book camp.');
          console.error(error);
        }
      },
      async unbookCamp(campId) {
        try {
          const response = await this.$axios.post(`http://localhost:5010/api/Camps/UnbookCamp/${campId}`, null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          alert(response.data); // Camp unbooked successfully
          this.fetchCamp(); // Refresh camp data after unbooking
        } catch (error) {
          alert('Failed to unbook camp.');
          console.error(error);
        }
      }
    }
  };
</script>

<style scoped>
  button {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>