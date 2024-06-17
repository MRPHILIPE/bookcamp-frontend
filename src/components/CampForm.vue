<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="form.name" required>
    </div>
    <div>
      <label for="location">Location:</label>
      <input type="text" id="location" v-model="form.location" required>
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea id="description" v-model="form.description" required></textarea>
    </div>
    <div>
      <label for="price">Price:</label>
      <input type="number" id="price" v-model="form.price" required>
    </div>
    <button type="submit">{{ isEditing ? 'Update Camp' : 'Create Camp' }}</button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          location: '',
          description: '',
          price: 0
        },
        isEditing: false,
        campId: null
      };
    },
    created() {
      if (this.$route.params.id) {
        this.isEditing = true;
        this.campId = this.$route.params.id;
        this.fetchCamp();
      }
    },
    methods: {
      async fetchCamp() {
        try {
          const response = await this.$axios.get(`http://localhost:5010/api/Camps/GetCamp/${this.campId}`);
          this.form = response.data;
        } catch (error) {
          console.error('Failed to fetch camp for editing', error);
        }
      },
      async handleSubmit() {
        try {
          if (this.isEditing) {
            await this.editCamp();
          } else {
            await this.createCamp();
          }
        } catch (error) {
          console.error('Failed to save camp', error);
        }
      },
      async createCamp() {
        try {
          const response = await this.$axios.post('http://localhost:5010/api/Camps/CreateCamp', this.form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          alert(response.data);
          this.$router.push('/camps');
        } catch (error) {
          alert('Failed to create camp.');
          console.error(error);
        }
      },
      async editCamp() {
        try {
          const response = await this.$axios.put(`http://localhost:5010/api/Camps/EditCamp/${this.campId}`, this.form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          alert(response.data);
          this.$router.push('/camps');
        } catch (error) {
          alert('Failed to update camp.');
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

  input[type="text"],
  textarea,
  input[type="number"] {
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