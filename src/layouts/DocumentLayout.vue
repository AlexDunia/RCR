<template>
  <div class="document-layout">
    <div class="header-section">
      <div class="header-content">
        <h1 class="header-title">Document Manangement</h1>
        <p class="header-description">Manage your real estate docs in one place.</p>
      </div>
      <div class="nav-container">
        <nav class="nav-tabs">
          <router-link to="/receipts-docs/buyer-rep" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
            Buyer Rep
          </router-link>
          <router-link to="/receipts-docs/seller-rep" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
            Seller Rep
          </router-link>
          <router-link to="/receipts-docs/mls" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
            </svg>
            MLS
          </router-link>
          <router-link to="/receipts-docs/view-docs" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
            </svg>
            View Docs
          </router-link>
        </nav>
      </div>
    </div>

    <div class="document-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.document-layout {
  padding: 1.5rem;
}

.header-section {
  background-color: #E7F0EA;
  border-radius: 0.75rem;
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
}

.header-content {
  margin-bottom: 1.5rem;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.header-description {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

.nav-container {
  display: flex;
  justify-content: flex-end;
}

.nav-tabs {
  display: flex;
  gap: 0.75rem;
  padding: 0;
  margin: 0;
  border-bottom: none;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  color: #64748B;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  background: white;
  border-radius: 0.375rem;
  transition: all 0.2s;
  border: none;
  white-space: nowrap;
}

.nav-link:hover {
  color: #334155;
}

.nav-link.router-link-active {
  color: #2563EB;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.nav-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.document-content {
  width:100%;
   /* padding: 1rem; */
}
</style>
