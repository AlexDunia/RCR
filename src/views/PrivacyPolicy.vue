<template>
  <div class="privacy-page">
    <div class="privacy-header">
      <div class="boxed-container">
        <h1 class="privacy-title">Privacy Policy</h1>
        <p class="privacy-subtitle">Last updated: March 15, 2024</p>
      </div>
    </div>

    <div class="privacy-content boxed-container">
      <section class="privacy-section">
        <h2>1. Introduction</h2>
        <p>At Real City, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. Please read this policy carefully to understand our practices regarding your personal data.</p>
      </section>

      <section class="privacy-section">
        <h2>2. Information We Collect</h2>
        <h3>2.1 Personal Information</h3>
        <p>We may collect the following types of personal information:</p>
        <ul>
          <li>Name, email address, and contact information</li>
          <li>Property preferences and search history</li>
          <li>Financial information for transactions</li>
          <li>Professional credentials (for real estate agents)</li>
          <li>Communication history with agents or other users</li>
        </ul>

        <h3>2.2 Automatically Collected Information</h3>
        <p>We also collect certain information automatically:</p>
        <ul>
          <li>Device and browser information</li>
          <li>IP address and location data</li>
          <li>Usage patterns and preferences</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section class="privacy-section">
        <h2>3. How We Use Your Information</h2>
        <p>We use the collected information for:</p>
        <ul>
          <li>Providing and improving our services</li>
          <li>Matching buyers/renters with properties and agents</li>
          <li>Processing transactions and communications</li>
          <li>Personalizing your experience</li>
          <li>Marketing and promotional purposes (with consent)</li>
          <li>Analytics and service optimization</li>
        </ul>
      </section>

      <section class="privacy-section">
        <h2>4. Information Sharing</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>Real estate agents and property managers</li>
          <li>Service providers and partners</li>
          <li>Legal authorities when required by law</li>
          <li>Other users as part of our services</li>
        </ul>
      </section>

      <section class="privacy-section">
        <h2>5. Data Security</h2>
        <p>We implement appropriate security measures to protect your information, including:</p>
        <ul>
          <li>Encryption of sensitive data</li>
          <li>Secure server infrastructure</li>
          <li>Regular security audits</li>
          <li>Access controls and authentication</li>
        </ul>
      </section>

      <section class="privacy-section">
        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Data portability</li>
        </ul>
      </section>

      <section class="privacy-section">
        <h2>7. Cookies Policy</h2>
        <p>We use cookies and similar technologies to enhance your experience. You can control cookie settings through your browser preferences. For more information, please see our Cookies Policy.</p>
      </section>

      <section class="privacy-section">
        <h2>8. Children's Privacy</h2>
        <p>Our services are not intended for children under 13. We do not knowingly collect or maintain information from children under 13 years of age.</p>
      </section>

      <section class="privacy-section">
        <h2>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.</p>
      </section>

      <section class="privacy-section">
        <h2>10. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at:</p>
        <div class="contact-info">
          <p>Real City Realty Inc.</p>
          <p>Email: privacy@realcity.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'PrivacyPolicy'
});
</script>

<style scoped>
.privacy-page {
  background: #f8fafc;
  min-height: 100vh;
}

.privacy-header {
  background: #0052a5;
  color: #fff;
  padding: 64px 0;
  margin-bottom: 48px;
}

.privacy-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  font-family: 'Poppins', sans-serif;
}

.privacy-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.privacy-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.privacy-section {
  margin-bottom: 48px;
}

.privacy-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0052a5;
  margin-bottom: 24px;
  font-family: 'Poppins', sans-serif;
}

.privacy-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 16px;
  margin-top: 24px;
  font-family: 'Poppins', sans-serif;
}

.privacy-section p {
  font-size: 1rem;
  line-height: 1.7;
  color: #334155;
  margin-bottom: 16px;
}

.privacy-section ul {
  list-style-type: disc;
  padding-left: 24px;
  margin-bottom: 16px;
}

.privacy-section li {
  font-size: 1rem;
  line-height: 1.7;
  color: #334155;
  margin-bottom: 8px;
}

.contact-info {
  background: #f1f5f9;
  padding: 24px;
  border-radius: 8px;
  margin-top: 16px;
}

.contact-info p {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .privacy-header {
    padding: 48px 0;
    margin-bottom: 32px;
  }

  .privacy-title {
    font-size: 2rem;
  }

  .privacy-subtitle {
    font-size: 1rem;
  }

  .privacy-section h2 {
    font-size: 1.25rem;
  }

  .privacy-section h3 {
    font-size: 1.1rem;
  }

  .privacy-content {
    padding: 0 16px 48px;
  }
}
</style>
