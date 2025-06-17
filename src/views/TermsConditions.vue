<template>
  <div class="terms-page">
    <div class="terms-header">
      <div class="boxed-container">
        <h1 class="terms-title">Terms & Conditions</h1>
        <p class="terms-subtitle">Last updated: March 15, 2024</p>
      </div>
    </div>

    <div class="terms-content boxed-container">
      <section class="terms-section">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using Real City's website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.</p>
      </section>

      <section class="terms-section">
        <h2>2. Real Estate Services</h2>
        <p>Real City provides an online platform connecting real estate agents, buyers, sellers, and renters. Our services include but are not limited to:</p>
        <ul>
          <li>Property listings and searches</li>
          <li>Agent directory and connections</li>
          <li>Real estate market information</li>
          <li>Property valuation tools</li>
        </ul>
      </section>

      <section class="terms-section">
        <h2>3. User Accounts</h2>
        <p>To access certain features of our platform, you must register for an account. You agree to:</p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Notify us immediately of any unauthorized access</li>
          <li>Take responsibility for all activities under your account</li>
        </ul>
      </section>

      <section class="terms-section">
        <h2>4. Property Listings</h2>
        <p>All property listings on our platform must:</p>
        <ul>
          <li>Contain accurate and current information</li>
          <li>Comply with fair housing laws and regulations</li>
          <li>Include only authorized images and content</li>
          <li>Be updated or removed when no longer available</li>
        </ul>
      </section>

      <section class="terms-section">
        <h2>5. Agent Services</h2>
        <p>Real estate agents using our platform must:</p>
        <ul>
          <li>Maintain current licensing and credentials</li>
          <li>Provide accurate professional information</li>
          <li>Respond to client inquiries promptly</li>
          <li>Adhere to professional standards and ethics</li>
        </ul>
      </section>

      <section class="terms-section">
        <h2>6. Intellectual Property</h2>
        <p>All content on the Real City platform, including but not limited to text, images, logos, and software, is protected by copyright and other intellectual property laws. Users may not copy, modify, or distribute this content without explicit permission.</p>
      </section>

      <section class="terms-section">
        <h2>7. Limitation of Liability</h2>
        <p>Real City provides information and services "as is" without any warranties. We are not liable for any damages arising from the use of our platform or services, including but not limited to direct, indirect, incidental, or consequential damages.</p>
      </section>

      <section class="terms-section">
        <h2>8. Modifications</h2>
        <p>Real City reserves the right to modify these Terms and Conditions at any time. Users will be notified of significant changes, and continued use of our services constitutes acceptance of the modified terms.</p>
      </section>

      <section class="terms-section">
        <h2>9. Contact Information</h2>
        <p>For questions about these Terms and Conditions, please contact us at:</p>
        <div class="contact-info">
          <p>Real City Realty Inc.</p>
          <p>Email: legal@realcity.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'TermsConditions'
});
</script>

<style scoped>
.terms-page {
  background: #f8fafc;
  min-height: 100vh;
}

.terms-header {
  background: #0052a5;
  color: #fff;
  padding: 64px 0;
  margin-bottom: 48px;
}

.terms-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  font-family: 'Poppins', sans-serif;
}

.terms-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.terms-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.terms-section {
  margin-bottom: 48px;
}

.terms-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0052a5;
  margin-bottom: 24px;
  font-family: 'Poppins', sans-serif;
}

.terms-section p {
  font-size: 1rem;
  line-height: 1.7;
  color: #334155;
  margin-bottom: 16px;
}

.terms-section ul {
  list-style-type: disc;
  padding-left: 24px;
  margin-bottom: 16px;
}

.terms-section li {
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
  .terms-header {
    padding: 48px 0;
    margin-bottom: 32px;
  }

  .terms-title {
    font-size: 2rem;
  }

  .terms-subtitle {
    font-size: 1rem;
  }

  .terms-section h2 {
    font-size: 1.25rem;
  }

  .terms-content {
    padding: 0 16px 48px;
  }
}
</style>
