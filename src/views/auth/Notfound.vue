<template>
  <div class="not-found-container">
    <div class="content">
      <div class="error-code">
        <span class="digit">4</span>
        <div class="zero-container">
          <div class="zero"></div>
        </div>
        <span class="digit">4</span>
      </div>
      <h1 class="title">Oops! Page Not Found</h1>
      <p class="message">The page you're looking for doesn't exist or has been moved.</p>

      <div class="search-container">
        <input
          type="text"
          placeholder="Search for something else..."
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        >
        <button @click="handleSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <div class="actions">
        <router-link to="/" class="btn primary">
          <i class="fas fa-home"></i>
          Back to Home
        </router-link>
        <button class="btn secondary" @click="goBack">
          <i class="fas fa-arrow-left"></i>
          Go Back
        </button>
      </div>

      <div class="suggestions">
        <h3>Popular Pages</h3>
        <ul>
          <li v-for="(page, index) in popularPages" :key="index">
            <router-link :to="page.path">{{ page.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      searchQuery: '',
      popularPages: [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Profile', path: '/profile' },
        { name: 'Settings', path: '/settings' },
        { name: 'Help Center', path: '/help' }
      ]
    }
  },
  methods: {
    handleSearch() {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
}

.content {
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.error-code {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 8rem;
  font-weight: bold;
  color: #2c3e50;
}

.digit {
  animation: bounce 2s infinite;
}

.zero-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 1rem;
}

.zero {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 8px solid #2c3e50;
  border-radius: 50%;
  animation: rotate 4s infinite linear;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.message {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.search-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.search-container input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-container input:focus {
  outline: none;
  border-color: #3498db;
}

.search-container button {
  padding: 0.8rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-container button:hover {
  background: #2980b9;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.btn.primary {
  background: #3498db;
  color: white;
  border: none;
}

.btn.primary:hover {
  background: #2980b9;
}

.btn.secondary {
  background: transparent;
  color: #2c3e50;
  border: 2px solid #2c3e50;
}

.btn.secondary:hover {
  background: #2c3e50;
  color: white;
}

.suggestions {
  text-align: left;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.suggestions h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.suggestions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions li {
  margin-bottom: 0.5rem;
}

.suggestions a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s;
}

.suggestions a:hover {
  color: #2980b9;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 6rem;
  }

  .zero-container {
    width: 80px;
    height: 80px;
  }

  .title {
    font-size: 2rem;
  }

  .actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
