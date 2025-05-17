<template>
  <div class="blog-container">
    <h1>Blog</h1>
    <div class="content">
      <p>Stay updated with the latest news, trends, and insights in real estate.</p>
      <div class="blog-posts">
        <!-- Blog posts will be dynamically loaded here -->
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BlogPage'
});
</script>

<style scoped>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.content {
  margin-top: 2rem;
}

.blog-posts {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
</style>
