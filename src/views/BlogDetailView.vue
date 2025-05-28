<template>
  <div class="blog-detail">
    <GlobalHeader />
    <div class="blog-header">
      <div class="header-content">
        <div class="category-date">
          <span class="category">Berita Properti</span>
          <span class="date">10 Juli 2023</span>
        </div>
        <h1 class="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
        <div class="author-info">
          <img src="https://ui-avatars.com/api/?name=Admin" alt="Admin" class="author-avatar">
          <div class="author-details">
            <span class="author-name">Admin</span>
            <span class="read-time">5 min read</span>
          </div>
        </div>
      </div>
    </div>

    <div class="blog-content">
      <img
        src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png"
        alt="Blog header image"
        class="blog-image"
      >

      <div class="content-wrapper">
        <article class="article-content">
          <p>KONTAN.CO.ID - JAKARTA. PT Bank Tabungan Negara Tbk (BTN) semakin gencar mendorong peningkatan pangsa pasar kredit pemilikan rumah (KPR) di Indonesia. Hal tersebut dilakukan seiring dengan upaya perseroan untuk mewujudkan visi sebagai The Best Mortgage Bank in Southeast Asia pada 2025.</p>

          <p>Direktur Utama BTN Haru Koesmahargyo mengatakan, BTN terus memperkuat positioning sebagai bank spesialis KPR dengan berbagai inovasi produk dan layanan yang disesuaikan dengan kebutuhan masyarakat.</p>

          <h2>Subtitle Example</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <blockquote>
            "Real estate cannot be lost or stolen, nor can it be carried away. Purchased with common sense, paid for in full, and managed with reasonable care, it is about the safest investment in the world."
            <cite>- Franklin D. Roosevelt</cite>
          </blockquote>

          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        </article>

        <div class="share-section">
          <h3>Share this article</h3>
          <div class="share-buttons">
            <button class="share-btn facebook">Facebook</button>
            <button class="share-btn twitter">Twitter</button>
            <button class="share-btn linkedin">LinkedIn</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
// Component logic will go here
</script>

<style scoped>
/* Add these new styles at the top */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-image {
  height: 32px;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.logo-subtext {
  font-size: 0.75rem;
  color: #6b7280;
}

.main-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #111827;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dropdown {
  cursor: pointer;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.btn-sign-in {
  padding: 0.5rem 1rem;
  border: none;
  background: white;
  color: #111827;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
}

.btn-login {
  padding: 0.5rem 1rem;
  border: none;
  background: #0066cc;
  color: white;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
}

/* Adjust the blog-detail to account for fixed header */
.blog-detail {
  padding-top: 72px; /* Height of the fixed header */
}

.blog-header {
  background: white;
  padding: 4rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.category-date {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.category {
  color: #0066cc;
  font-weight: 500;
}

.date {
  color: #6b7280;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
  margin-bottom: 2rem;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 500;
  color: #111827;
}

.read-time {
  color: #6b7280;
  font-size: 0.875rem;
}

.blog-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.blog-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin: 3rem 0;
}

.article-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
}

.article-content p {
  margin-bottom: 1.5rem;
}

.article-content h2 {
  font-size: 1.875rem;
  font-weight: 600;
  color: #111827;
  margin: 2.5rem 0 1.5rem;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}

.article-content blockquote {
  border-left: 4px solid #0066cc;
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: #4b5563;
}

blockquote cite {
  display: block;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.share-section {
  margin: 4rem 0;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.share-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.share-buttons {
  display: flex;
  gap: 1rem;
}

.share-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.share-btn.facebook {
  background: #1877f2;
  color: white;
}

.share-btn.twitter {
  background: #1da1f2;
  color: white;
}

.share-btn.linkedin {
  background: #0a66c2;
  color: white;
}

.share-btn:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .main-nav {
    display: none; /* Hide navigation on mobile */
  }

  .auth-buttons {
    display: none; /* Hide auth buttons on mobile */
  }

  .logo-subtext {
    display: none; /* Hide subtext on mobile */
  }

  .blog-header {
    padding: 2rem 0;
  }

  .title {
    font-size: 2rem;
  }

  .blog-image {
    height: 300px;
    margin: 2rem 0;
  }

  .share-buttons {
    flex-direction: column;
  }
}
</style>
