<template>
  <div class="blog-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Real City Realty Blogs</h1>
        <p class="hero-subtitle">Get the latest information about homes and find an opportunity to make the move.</p>
      </div>
    </div>

    <!-- Navigation Section -->
    <div class="navigation-section">
      <div class="nav-content">
        <div class="categories">
          <button class="category-btn active">Market updates</button>
          <button class="category-btn">Buyer and seller tips</button>
          <button class="category-btn">Neighbourhood insights</button>
          <button class="category-btn">Investments advise</button>
        </div>
        <div class="search-container">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            class="search-input"
          >
          <span class="search-shortcut">⌘ K</span>
        </div>
      </div>
    </div>

    <!-- Blog Content Section -->
    <div class="blog-content">
      <div class="content-wrapper">
        <!-- Main Content -->
        <div class="main-content">
          <h2 class="section-title">Latest</h2>
          <div class="blog-grid">
            <div v-for="post in blogPosts" :key="post.id" class="blog-card" @click="navigateToBlog(post.id)">
              <img :src="post.image" :alt="post.title" class="blog-image">
              <div class="blog-card-content">
                <span class="blog-category">{{ post.category }}</span>
                <h3 class="blog-title">{{ post.title }}</h3>
                <p class="blog-excerpt">{{ post.excerpt }}</p>
                <div class="blog-meta">
                  <div class="author-info">
                    <img :src="post.author.avatar" :alt="post.author.name" class="author-avatar">
                    <span class="author-name">{{ post.author.name }}</span>
                  </div>
                  <span class="blog-date">{{ post.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="sidebar">
          <h3 class="sidebar-title">Topics</h3>
          <div class="topic-list">
            <button
              v-for="topic in topics"
              :key="topic.id"
              :class="['topic-btn', { active: topic.isActive }]"
              @click="filterByTopic(topic.id)"
            >
              {{ topic.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const topics = ref([
  { id: 1, name: 'Market updates', isActive: true },
  { id: 2, name: 'Buyer and seller tips', isActive: false },
  { id: 3, name: 'Neighbourhood insights', isActive: false },
  { id: 4, name: 'Investments advise', isActive: false },
  { id: 5, name: 'Property Management', isActive: false },
  { id: 6, name: 'Real Estate News', isActive: false },
]);

const blogPosts = ref([
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    excerpt: 'KONTAN.CO.ID - JAKARTA. PT Bank Tabungan Negara Tbk (BTN) semakin gencar mendorong peningkatan pangsa pasar kredit...',
    image: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png',
    category: 'Berita Properti',
    author: {
      name: 'Admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin'
    },
    date: '10 Juli 2023'
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    excerpt: 'KONTAN.CO.ID - JAKARTA. PT Bank Tabungan Negara Tbk (BTN) semakin gencar mendorong peningkatan pangsa pasar kredit...',
    image: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png',
    category: 'Berita Properti',
    author: {
      name: 'Admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin'
    },
    date: '10 Juli 2023'
  },
  // Add more dummy posts as needed
]);

const navigateToBlog = (id) => {
  router.push(`/blog/${id}`);
};

const filterByTopic = (topicId) => {
  topics.value = topics.value.map(topic => ({
    ...topic,
    isActive: topic.id === topicId
  }));
  // Add filtering logic here
};
</script>

<style scoped>
.blog-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
}

.hero-section {
  position: relative;
  height: 60vh;
  width: 100%;
  background-image: url('https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0;
  margin-bottom: 0;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4));
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: left;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  max-width: 600px;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
  line-height: 1.5;
  max-width: 500px;
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
}

.navigation-section {
  width: 100%;
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.nav-content {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
}

.categories {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 100px;
  font-size: 0.9375rem;
  cursor: pointer;
  background: #f3f4f6;
  color: #4b5563;
  transition: all 0.2s ease;
  font-weight: 500;
  font-family: 'Inter', system-ui, sans-serif;
  white-space: nowrap;
}

.category-btn.active {
  background: #e6f0ff;
  color: #0066cc;
  font-weight: 600;
}

.category-btn:hover {
  background: #e6f0ff;
  color: #0066cc;
  transform: translateY(-1px);
}

.search-container {
  position: relative;
  min-width: 320px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9375rem;
  color: #374151;
  background: #f9fafb;
  font-family: 'Inter', system-ui, sans-serif;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-shortcut {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #6b7280;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  user-select: none;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }

  .nav-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
    padding: 1rem 0;
  }

  .search-container {
    width: 100%;
  }
}

.blog-content {
  padding: 2rem 0;
  background-color: #f9fafb;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2rem;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.blog-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.blog-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.blog-card-content {
  padding: 1.5rem;
}

.blog-category {
  display: inline-block;
  font-size: 0.875rem;
  color: #0066cc;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.blog-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.blog-excerpt {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.author-name {
  color: #374151;
  font-weight: 500;
}

.blog-date {
  color: #6b7280;
}

.sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
}

.topic-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.topic-btn {
  padding: 0.75rem 1rem;
  text-align: left;
  border: none;
  border-radius: 8px;
  background: white;
  color: #4b5563;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.topic-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.topic-btn.active {
  background: #e6f0ff;
  color: #0066cc;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    margin-top: 2rem;
  }
}
</style>
