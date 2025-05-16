<template>
  <div class="blog-page">
    <!-- Header (copied from landing page, keep role-switcher) -->
    <header class="header">
      <div class="container header__container header__container--figma">
        <!-- Logo Left -->
        <div class="header__logo">
          <h2>Real City</h2>
          <span class="header__tagline">realty inc brokerage</span>
        </div>
        <!-- Nav Center -->
        <nav class="header__nav header__nav--center">
          <router-link to="#" class="header__nav-link">Buy</router-link>
          <router-link to="#" class="header__nav-link">Rent</router-link>
          <router-link to="#" class="header__nav-link">Sell</router-link>
          <div class="header__nav-dropdown">
            <router-link to="#" class="header__nav-link">Agent <span class="dropdown-arrow">▼</span></router-link>
          </div>
        </nav>
        <!-- Role Switcher (leave as is) -->
        <div class="role-switcher">
          <!-- Leave your toggle roles button/component here -->
        </div>
        <!-- Auth Buttons Right -->
        <div class="header__auth header__auth--figma">
          <router-link to="/signup" class="header__sign-up header__sign-up--figma">Sign in</router-link>
          <router-link to="/login" class="header__login header__login--figma">Login</router-link>
        </div>
      </div>
    </header>
    <!-- Hero Section with Overlay -->
    <div class="hero">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1>Real City <span>Realty Blogs</span></h1>
        <p>Get the latest information about homes and find an opportunity to make the move.</p>
      </div>
    </div>
    <!-- Main Content -->
    <div class="main-content">
      <div class="tabs-and-posts">
        <!-- Tabs -->
        <div class="tabs">
          <button
            v-for="(cat, idx) in categories"
            :key="cat"
            :class="{ active: selectedCategory === idx }"
            @click="selectedCategory = idx"
          >
            {{ cat }}
          </button>
        </div>
        <!-- Blog Cards Grid -->
        <div class="blog-grid">
          <div
            v-for="(post, i) in filteredPosts"
            :key="i"
            class="blog-card"
          >
            <img :src="post.image" alt="Blog" />
            <div class="card-content">
              <span class="category">{{ post.category }}</span>
              <h3>{{ post.title }}</h3>
              <p class="excerpt">{{ post.excerpt }}</p>
              <div class="author-row">
                <img class="author-img" :src="post.authorImg" alt="author" />
                <span class="author">{{ post.author }}</span>
                <span class="date">{{ post.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="search-box">
          <input type="text" placeholder="Search..." v-model="search" />
        </div>
        <div class="sidebar-categories">
          <button
            v-for="(cat, idx) in categories"
            :key="cat + '-side'"
            :class="{ active: selectedCategory === idx }"
            @click="selectedCategory = idx"
          >
            {{ cat }}
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const categories = [
  'Market updates',
  'Buyer and seller tips',
  'Neighbourhood insights',
  'Investments advise',
];
const selectedCategory = ref(0);
const search = ref('');
const posts = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    category: 'Berita Properti',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    excerpt: 'KONTAN.CO.ID - JAKARTA. PT Bank Tabungan Negara Tbk (BTN) semakin gencar mendorong peningkatan pangsa pasar kredit...',
    author: 'Admin',
    authorImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '10 Juli 2023',
    catIdx: 0,
  },
  {
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    category: 'Berita Properti',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    excerpt: 'KONTAN.CO.ID - JAKARTA. PT Bank Tabungan Negara Tbk (BTN) semakin gencar mendorong peningkatan pangsa pasar kredit...',
    author: 'Admin',
    authorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: '10 Juli 2023',
    catIdx: 0,
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    category: 'Berita Properti',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    excerpt: 'KONTAN.CO.ID - JAKARTA. PT Bank Tabungan Negara Tbk (BTN) semakin gencar mendorong peningkatan pangsa pasar kredit...',
    author: 'Admin',
    authorImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '10 Juli 2023',
    catIdx: 0,
  },
  {
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    category: 'Berita Properti',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    excerpt: 'KONTAN.CO.ID - JAKARTA. PT Bank Tabungan Negara Tbk (BTN) semakin gencar mendorong peningkatan pangsa pasar kredit...',
    author: 'Admin',
    authorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: '10 Juli 2023',
    catIdx: 0,
  },
];
const filteredPosts = computed(() =>
  posts.filter(
    (p) =>
      p.catIdx === selectedCategory.value &&
      (search.value === '' ||
        p.title.toLowerCase().includes(search.value.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.value.toLowerCase()))
  )
);
</script>

<style scoped>
.blog-page {
  font-family: 'Montserrat', Arial, sans-serif;
  background: #f7f7f7;
  min-height: 100vh;
}
.hero {
  background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
  position: relative;
  height: 420px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.overlay {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
  margin-top: 80px;
  text-align: left;
  padding-left: 60px;
}
.hero-content h1 {
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -2px;
}
.hero-content h1 span {
  color: #fff;
}
.hero-content p {
  font-size: 1.1rem;
  font-weight: 400;
  color: #e0e0e0;
}

.main-content {
  display: flex;
  gap: 32px;
  max-width: 1400px;
  margin: -60px auto 0 auto;
  padding: 0 40px 40px 40px;
}
.tabs-and-posts {
  flex: 1 1 0;
}
.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
}
.tabs button {
  background: #f2f6fa;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 500;
  color: #222;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.tabs button.active {
  background: #1a73e8;
  color: #fff;
}
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}
.blog-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
}
.blog-card:hover {
  box-shadow: 0 6px 32px 0 rgba(26,115,232,0.10);
}
.blog-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.card-content {
  padding: 18px 18px 12px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.category {
  color: #1a73e8;
  font-size: 0.95rem;
  font-weight: 600;
}
.card-content h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: #222;
}
.excerpt {
  font-size: 0.98rem;
  color: #666;
  margin-bottom: 8px;
}
.author-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #888;
}
.author-img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}
.sidebar {
  width: 270px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.search-box {
  background: #fff;
  border-radius: 10px;
  padding: 16px 14px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}
.search-box input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
}
.sidebar-categories {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sidebar-categories button {
  background: #f2f6fa;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 500;
  color: #222;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s, color 0.2s;
}
.sidebar-categories button.active {
  background: #1a73e8;
  color: #fff;
}
@media (max-width: 1100px) {
  .main-content {
    flex-direction: column;
    gap: 0;
    padding: 0 10px 40px 10px;
  }
  .sidebar {
    width: 100%;
    flex-direction: row;
    gap: 16px;
    margin-bottom: 24px;
  }
}
@media (max-width: 800px) {
  .hero-content {
    padding-left: 20px;
    margin-top: 40px;
  }
  .main-content {
    padding: 0 0 40px 0;
  }
}
@media (max-width: 600px) {
  .hero {
    height: 260px;
  }
  .hero-content h1 {
    font-size: 2rem;
  }
  .main-content {
    padding: 0 0 24px 0;
  }
  .sidebar {
    flex-direction: column;
    width: 100%;
  }
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
