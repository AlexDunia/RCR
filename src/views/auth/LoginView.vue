<template>
  <div class="auth-split-bg">
    <div class="auth-split-left">
      <div class="auth-logo-block">
        <div class="auth-logo">Real City</div>
        <div class="auth-tagline">realty inc brokerage</div>
      </div>
    </div>
    <div class="auth-split-right">
      <div class="auth-form-container">
        <div class="auth-title">Login to your account</div>
        <form class="auth-form" @submit.prevent="onLogin">
          <input type="email" v-model="email" placeholder="Enter your email address here" required aria-label="Email" />
          <input type="password" v-model="password" placeholder="Enter your password here" required aria-label="Password" />
          <button type="submit">Login</button>
        </form>
        <div class="auth-divider">or</div>
        <button class="auth-social-btn" @click="onGoogleLogin">
          <span class="icon-svg">
            <!-- Google SVG icon -->
            <svg width="22" height="22" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.7 20-21 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3c-7.2 0-13 5.8-13 13 0 2.1.5 4.1 1.3 5.7z"/><path fill="#FBBC05" d="M24 44c5.6 0 10.6-1.9 14.5-5.1l-6.7-5.5C29.8 37 24 37 24 37c-5.8 0-10.7-3.1-13.2-7.5l-7 5.4C7.9 41.1 15.4 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.6 4.1-6.1 7.5-11.7 7.5-5.8 0-10.7-3.1-13.2-7.5l-7 5.4C7.9 41.1 15.4 44 24 44c10.5 0 20-7.7 20-21 0-1.3-.1-2.7-.3-4z"/></g></svg>
          </span>
          Login with Google
        </button>
        <button class="auth-social-btn" @click="onYahooLogin">
          <span class="icon-svg"><svg width="22" height="22" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><rect width="32" height="32" rx="16" fill="#5F01D1"/><path d="M10.5 10.5h2.1l3.4 5.7 3.4-5.7h2.1l-4.5 7.5v3.5h-2v-3.5z" fill="#FFF"/></g></svg></span>
          Login with Yahoo
        </button>
        <button class="auth-social-btn" @click="onHotmailLogin">
          <span class="icon-svg"><svg width="22" height="22" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><rect width="32" height="32" rx="16" fill="#0072C6"/><path d="M8 10.5h16v11H8z" fill="#FFF"/><path d="M8 10.5l8 6.5 8-6.5" stroke="#0072C6" stroke-width="1.5" fill="none"/></g></svg></span>
          Login with Hotmail
        </button>
        <div class="auth-bottom-text">
          By continuing you indicate that you read and agreed to the Terms of Use
        </div>
        <div class="auth-link-row">
          <span>Don't have an account?</span>
          <router-link class="auth-link" to="/signup">Sign up!</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

function onLogin() {
  // TODO: Implement login logic
  alert(`Login with ${email.value}`);
}
function onGoogleLogin() {
  // TODO: Implement Google login
  alert('Google login');
}
function onYahooLogin() {
  // TODO: Implement Yahoo login
  alert('Yahoo login');
}
function onHotmailLogin() {
  // TODO: Implement Hotmail login
  alert('Hotmail login');
}
</script>

<style scoped>
.auth-split-bg {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  font-family: 'Poppins', sans-serif;
}
.auth-split-left {
  flex: 1.1;
  background: url('https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png') no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.auth-split-left::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(20, 24, 36, 0.65);
  z-index: 1;
}
.auth-logo-block {
  position: relative;
  z-index: 2;
  margin: 48px 0 0 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.auth-logo {
  font-size: 2.7rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
  font-family: 'Poppins', sans-serif;
  line-height: 1.1;
}
.auth-tagline {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 400;
  opacity: 0.92;
  margin-top: 6px;
  letter-spacing: 0.2px;
}
.auth-split-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
}
.auth-form-container {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 36px rgba(0,0,0,0.13);
  max-width: 420px;
  width: 100%;
  padding: 2.7rem 2.2rem 2.2rem 2.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.auth-title {
  font-size: 1.55rem;
  font-weight: 700;
  color: #003366;
  margin-bottom: 1.7rem;
  text-align: center;
  letter-spacing: -0.5px;
}
.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}
.auth-form input {
  padding: 0.95rem 1.1rem;
  border: 1.5px solid #cfd8dc;
  border-radius: 9px;
  font-size: 1.07rem;
  font-family: 'Poppins', sans-serif;
  background: #f9fafb;
  transition: border 0.2s;
}
.auth-form input:focus {
  border: 1.5px solid #0056a3;
  outline: none;
  background: #fff;
}
.auth-form button {
  padding: 1rem 1rem;
  border: none;
  border-radius: 9px;
  background: #0056a3;
  color: #fff;
  font-size: 1.13rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,86,163,0.08);
}
.auth-form button:hover {
  background: #003366;
}
.auth-divider {
  text-align: center;
  margin: 1.5rem 0 1.1rem 0;
  color: #888;
  position: relative;
  width: 100%;
  font-size: 1.02rem;
}
.auth-divider:before, .auth-divider:after {
  content: '';
  display: inline-block;
  width: 40%;
  height: 1px;
  background: #e0e0e0;
  vertical-align: middle;
  margin: 0 8px;
}
.auth-social-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.7rem;
  background: #f5f5f5;
  color: #222;
  border: 1.5px solid #cfd8dc;
  margin-bottom: 0.7rem;
  border-radius: 9px;
  font-size: 1.07rem;
  font-weight: 500;
  padding: 0.85rem 1.1rem;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.auth-social-btn .icon-svg, .auth-social-btn img {
  width: 22px;
  height: 22px;
  display: inline-block;
}
.auth-social-btn:hover {
  background: #e3f0ff;
  border: 1.5px solid #0056a3;
}
.auth-bottom-text {
  color: #888;
  font-size: 0.97rem;
  margin: 1.2rem 0 0.5rem 0;
  text-align: center;
}
.auth-link-row {
  margin-top: 0.7rem;
  font-size: 1.04rem;
  text-align: center;
}
.auth-link {
  color: #0056a3;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 0.3rem;
  font-weight: 600;
}
.auth-link:focus, .auth-link:hover {
  color: #003366;
}
@media (max-width: 900px) {
  .auth-split-bg {
    flex-direction: column;
  }
  .auth-split-left, .auth-split-right {
    flex: unset;
    width: 100vw;
    min-height: 220px;
  }
  .auth-logo-block {
    margin: 32px 0 0 32px;
  }
  .auth-form-container {
    margin: 32px 0;
  }
}
</style>
