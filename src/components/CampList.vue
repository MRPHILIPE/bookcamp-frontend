<template>
  <div>
    <h2>All Camps</h2>
    <div>
      <label for="minPrice">Min Price:</label>
      <input type="number" id="minPrice" v-model="priceRange.min">
      <label for="maxPrice">Max Price:</label>
      <input type="number" id="maxPrice" v-model="priceRange.max">
      <button @click="fetchCamps">Filter</button>
    </div>
    <ul>
      <li v-for="camp in filteredCamps" :key="camp.campId">
        <router-link :to="'/camp/' + camp.campId">{{ camp.name }}</router-link>
        <p>Price: ${{ camp.price }}</p>
        <p>Created by: {{ camp.createdByEmail }}</p>
        <span v-if="camp.createdByEmail === currentUserEmail">
          <button @click="deleteCamp(camp.campId)">Delete</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        camps: [],
        currentUserEmail: '',
        priceRange: {
          min: 0,
          max: Infinity
        }
      };
    },
    created() {
      this.currentUserEmail = JSON.parse(localStorage.getItem('user')).email;
      this.fetchCamps();
    },
    computed: {
      filteredCamps() {
        return this.camps.filter(camp => camp.price >= this.priceRange.min && camp.price <= this.priceRange.max);
      }
    },
    methods: {
      async fetchCamps() {
        try {
          const response = await this.$axios.get('http://localhost:5010/api/Camps/GetCamps');
          this.camps = response.data;
        } catch (error) {
          console.error('Failed to fetch camps', error);
        }
      },
      async deleteCamp(campId) {
        try {
          const response = await this.$axios.delete(`http://localhost:5010/api/Camps/DeleteCamp/${campId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          alert(response.data);
          this.fetchCamps();
        } catch (error) {
          alert('Failed to delete camp.');
          console.error(error);
        }
      }
    }
  };
</script>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>