<template>
  <div class="messages">
    <div class="page-header">
      <h1>Messages</h1>
      <p class="subtitle">Chat with your agent and other team members</p>
    </div>

    <div class="coming-soon">
      <h2>Coming Soon</h2>
      <p>The messaging feature is being implemented and will be available shortly.</p>
      <p>In the meantime, please contact your agent directly via phone or email.</p>
    </div>
  </div>
</template>

<style scoped>
.messages {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  margin: 0;
  color: #333;
}

.subtitle {
  color: #666;
  margin: 8px 0 0 0;
  font-size: 16px;
}

.coming-soon {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.coming-soon h2 {
  margin: 0 0 16px 0;
  color: #006064;
  font-size: 24px;
}

.coming-soon p {
  margin: 8px 0;
  color: #666;
  font-size: 16px;
  line-height: 1.5;
}
</style>
