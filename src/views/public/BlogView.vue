<template>
  <div class="blogs-page">
    <GlobalHeader />

    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="blog-hero__overlay"></div>
      <div class="container blog-hero__container">
        <h1 class="blog-hero__title">Real City Realty Blogs</h1>
        <p class="blog-hero__subtitle">Get the latest information about homes and find an opportunity to make the move.</p>
      </div>
    </section>

    <div class="main-container">
      <!-- Blog Categories -->
      <section class="blog-categories">
        <div class="container">
          <div class="blog-categories__list">
            <button class="blog-category-item blog-category-item--active">Market updates</button>
            <button class="blog-category-item">Buyer and seller tips</button>
            <button class="blog-category-item">Neighbourhood insights</button>
            <button class="blog-category-item">Investments advise</button>

            <!-- Search Bar -->
            <div class="blog-search">
              <span class="search-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#94A3B8" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <input type="text" placeholder="Search..." class="blog-search__input">
              <span class="blog-search__shortcut">⌘K</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest Posts Section -->
      <section class="blog-posts">
        <div class="container">
          <h2 class="blog-posts__title">Latest</h2>
          <!-- Blog posts grid will go here -->
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
</script>

<style scoped>
.blogs-page {
  min-height: 100vh;
  background: #fff;
}

/* Hero Section */
.blog-hero {
  position: relative;
  height: 480px;
  background-image: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  color: #fff;
}

.blog-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6));
  z-index: 1;
}

.blog-hero__container {
  position: relative;
  z-index: 2;
  text-align: center;
}

.blog-hero__title {
  font-size: 72px;
  font-weight: 700;
  margin: 0 0 1rem 0;
  font-family: 'Poppins', sans-serif;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.blog-hero__subtitle {
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  line-height: 1.5;
}

/* Blog Categories */
.blog-categories {
  background: #fff;
  padding: 1.5rem 0;
  margin-top: -1px;
}

.blog-categories__list {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.blog-category-item {
  font-size: 1rem;
  color: #64748b;
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.blog-category-item--active {
  color: #0066cc;
  background: #EBF5FF;
}

/* Search Bar */
.blog-search {
  margin-left: auto;
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.blog-search__input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 2.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #1e293b;
  transition: all 0.2s;
  background: #fff;
}

.blog-search__input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
}

.blog-search__shortcut {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: #94a3b8;
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

/* Blog Posts Section */
.blog-posts {
  padding: 3rem 0;
}

.blog-posts__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .blog-hero__title {
    font-size: 48px;
  }

  .blog-categories__list {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .blog-search {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
