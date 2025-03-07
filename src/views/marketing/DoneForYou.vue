<template>
  <div class="marketing-tools-container">
    <div class="marketing-cards-container">
      <div class="marketing-card">
        <div class="marketing-card-content">
          <h3 class="marketing-card-title">Done For You Marketing</h3>
          <p class="marketing-card-description">Coming soon! Access pre-made marketing materials and templates here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marketing-tools-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.marketing-cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.marketing-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.marketing-card:hover {
  border-color: #2563EB;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.1);
  transform: translateY(-2px);
}

.marketing-card-content {
  flex: 1;
}

.marketing-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.marketing-card-description {
  font-size: 0.875rem;
  color: #6B7280;
}
</style>
