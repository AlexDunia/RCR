
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
        <div class="auth-title">Create your account</div>
        <div v-if="error" class="auth-error">{{ error }}</div>
        <form class="auth-form" @submit.prevent="handleSignUp">
          <!-- Name Field -->
          <div class="form-group">
            <input
              type="text"
              v-model="form.name"
              placeholder="Enter your full name"
              :class="{ 'error': validationErrors.name }"
              @input="clearError('name')"
              required
            />
            <span v-if="validationErrors.name" class="error-message">{{ validationErrors.name[0] }}</span>
          </div>

          <!-- Email Field -->
          <div class="form-group">
            <input
              type="email"
              v-model="form.email"
              placeholder="Enter your email address"
              :class="{ 'error': validationErrors.email }"
              @input="clearError('email')"
              required
            />
            <span v-if="validationErrors.email" class="error-message">{{ validationErrors.email[0] }}</span>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <input
              type="password"
              v-model="form.password"
              placeholder="Enter your password"
              :class="{ 'error': validationErrors.password || passwordError }"
              @input="clearError('password'); validatePassword()"
              required
            />
            <span v-if="validationErrors.password" class="error-message">{{ validationErrors.password[0] }}</span>
            <span v-else-if="passwordError" class="error-message">{{ passwordError }}</span>
            <div class="password-requirements">
              Password must be at least 8 characters, include uppercase, lowercase, and numbers
            </div>
          </div>

          <!-- Role Selection (Uncommented) -->
          <!-- <div class="form-group">
            <div class="role-selector">
              <label>
                <input
                  type="radio"
                  v-model="form.role"
                  value="client"
                  @change="clearError('role')"
                />
                <span>Client</span>
              </label>
              <label>
                <input
                  type="radio"
                  v-model="form.role"
                  value="agent"
                  @change="clearError('role')"
                />
                <span>Agent</span>
              </label>
            </div>
            <span v-if="validationErrors.role" class="error-message">{{ validationErrors.role[0] }}</span>
          </div> -->

          <button type="submit" :disabled="isLoading || passwordError">
            {{ isLoading ? 'Creating Account...' : 'Sign up' }}
          </button>
        </form>

        <div class="auth-divider">or</div>

        <button class="auth-social-btn" @click="handleGoogleSignUp" :disabled="isLoading">
          <span class="icon-svg">
            <svg width="22" height="22" viewBox="0 0 48 48">
              <g>
                <path
                  fill="#4285F4"
                  d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.7 20-21 0-1.3-.1-2.7-.3-4z"
                />
              </g>
            </svg>
          </span>
          {{ isLoading ? 'Connecting to Google...' : 'Sign up with Google' }}
        </button>

        <button class="auth-social-btn" @click="handleYahooSignUp" :disabled="isLoading">
          <span class="icon-svg">
            <svg width="22" height="22" viewBox="0 0 48 48">
              <g>
                <path
                  fill="#4B0082"
                  d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2.73 28.5h-5.46v-2.73h5.46v2.73zm0-5.46h-5.46V12.73h5.46v14.54z"
                />
              </g>
            </svg>
          </span>
          {{ isLoading ? 'Connecting to Yahoo...' : 'Sign up with Yahoo' }}
        </button>

        <div class="auth-bottom-text">
          By continuing you indicate that you read and agreed to the Terms of Use
        </div>
        <div class="auth-link-row">
          <span>Have an account?</span>
          <router-link class="auth-link" to="/login">Login!</router-link>
        </div>
      </div>
    </div>
  </div>



</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import authService from '@/services/authService';




const router = useRouter();
const authStore = useAuthStore();
const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'client',
  device_name: 'web'
});
const error = ref('');
const validationErrors = ref({});
const isLoading = ref(false);
const passwordError = ref('');

async function handleSignUp() {
  isLoading.value = true;
  validationErrors.value = {};
  error.value = '';
  passwordError.value = '';

  if (!validatePassword()) {
    isLoading.value = false;
    return;
  }

  try {
    const response = await authService.register(form.value);
    authStore.setToken(response.data.token);
    authStore.setUser(response.data.user);
    router.push(response.data.user.role === 'agent' ? '/agent-dashboard' : '/client-dashboard');
  } catch (err) {
    if (err.status === 422) {
      validationErrors.value = err.errors || {};
      error.value = 'Please correct the form errors.';
    } else {
      error.value = err.message || 'An error occurred during sign-up.';
    }
    console.error('Sign-up failed:', err);
  } finally {
    isLoading.value = false;
  }
}

async function handleGoogleSignUp() {
  isLoading.value = true;
  error.value = '';

  try {
    await authService.googleLogin();
  } catch (err) {
    error.value = err.message || 'Failed to initiate Google sign-up.';
    console.error('Google sign-up failed:', err);
    setTimeout(() => {
      router.push('/login?error=Failed to initiate Google sign-up');
    }, 2000);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
}

async function handleYahooSignUp() {
  isLoading.value = true;
  error.value = '';

  try {
    await authService.yahooLogin();
  } catch (err) {
    error.value = err.message || 'Failed to initiate Yahoo sign-up.';
    console.error('Yahoo sign-up failed:', err);
    setTimeout(() => {
      router.push('/login?error=Failed to initiate Yahoo sign-up');
    }, 2000);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
}

function clearError(field) {
  if (validationErrors.value[field]) {
    validationErrors.value[field] = null;
  }
  if (field === 'password') {
    validatePassword();
  }
}

function validatePassword() {
  const password = form.value.password;
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!minLength || !hasUppercase || !hasLowercase || !hasNumber) {
    passwordError.value = 'Password must be at least 8 characters, include uppercase, lowercase, and numbers';
    return false;
  }
  passwordError.value = '';
  return true;
}
</script>

<style scoped>
.auth-split-bg {
  display: flex;
  min-height: 100vh;
  width: 100vw;
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
  font-size: 2.4rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
  font-family: 'Poppins', sans-serif;
}
.auth-tagline {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 400;
  opacity: 0.92;
  margin-top: 4px;
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
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.12);
  max-width: 420px;
  width: 100%;
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.auth-title {
  font-size: 1.45rem;
  font-weight: 700;
  color: #003366;
  margin-bottom: 1.5rem;
  text-align: center;
}
.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.auth-form input {
  padding: 0.8rem 1rem;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  font-size: 1rem;
}
.auth-form button {
  padding: 0.9rem 1rem;
  border: none;
  border-radius: 8px;
  background: #0056a3;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}
.auth-form button:hover {
  background: #003366;
}
.auth-divider {
  text-align: center;
  margin: 1.5rem 0 1rem 0;
  color: #888;
  position: relative;
  width: 100%;
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
  justify-content: center;
  gap: 0.7rem;
  background: #f5f5f5;
  color: #222;
  border: 1px solid #cfd8dc;
  margin-bottom: 0.7rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.auth-social-btn:hover {
  background: #e3f0ff;
}
.auth-bottom-text {
  color: #888;
  font-size: 0.95rem;
  margin: 1.2rem 0 0.5rem 0;
  text-align: center;
}
.auth-link-row {
  margin-top: 0.7rem;
  font-size: 1rem;
  text-align: center;
}
.auth-link {
  color: #0056a3;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 0.3rem;
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

.form-group {
  width: 100%;
  margin-bottom: 1rem;
}

.error {
  border-color: #dc2626 !important;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.auth-error {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.password-requirements {
  color: #64748b;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.role-selector {
  display: flex;
  gap: 1.5rem;
  margin: 0.5rem 0;
}

.role-selector label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.role-selector input[type="radio"] {
  width: 1rem;
  height: 1rem;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-form input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.auth-form input:focus {
  outline: none;
  border-color: #0056a3;
}
</style>
