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

        <!-- Error Alert -->
        <div v-if="error" class="auth-error" role="alert">
          {{ error }}
        </div>

        <form class="auth-form" @submit.prevent="onLogin">
          <!-- Email Field -->
          <div class="form-group">
            <input
              type="email"
              v-model="form.email"
              placeholder="Enter your email address"
              :class="{ 'error': validationErrors.email }"
              @input="clearError('email')"
              required
              :disabled="isLoading"
              aria-label="Email"
            />
            <span v-if="validationErrors.email" class="error-message">{{ validationErrors.email[0] }}</span>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <div class="password-input-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="Enter your password"
                :class="{ 'error': validationErrors.password }"
                @input="clearError('password')"
                required
                :disabled="isLoading"
                aria-label="Password"
              />
              <button
                type="button"
                class="toggle-password"
                @click="togglePassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <span v-if="validationErrors.password" class="error-message">{{ validationErrors.password[0] }}</span>
          </div>

          <!-- Remember Me -->
          <div class="form-group-checkbox">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="form.remember"
                :disabled="isLoading"
              >
              <span>Remember me</span>
            </label>
            <router-link to="/forgot-password" class="forgot-password">
              Forgot Password?
            </router-link>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="login-button"
          >
            <span v-if="isLoading" class="spinner"></span>
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div class="auth-divider">or</div>

        <!-- Social Login Buttons -->
        <button
          class="auth-social-btn"
          @click="onGoogleLogin"
          :disabled="isLoading"
        >
          <span class="icon-svg">
            <svg width="22" height="22" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.7 20-21 0-1.3-.1-2.7-.3-4z"/></g></svg>
          </span>
          {{ isLoading ? 'Connecting to Google...' : 'Login with Google' }}
        </button>

        <button
          class="auth-social-btn"
          @click="onYahooLogin"
          :disabled="isLoading"
        >
          <span class="icon-svg">
            <svg width="22" height="22" viewBox="0 0 48 48"><g><path fill="#4B0082" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2.73 28.5h-5.46v-2.73h5.46v2.73zm0-5.46h-5.46V12.73h5.46v14.54z"/></g></svg>
          </span>
          {{ isLoading ? 'Connecting to Yahoo...' : 'Login with Yahoo' }}
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
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useRoleStore } from '@/stores/roleStore';
import authService from '@/services/authService';
import { validateEmail } from '@/utils/validators';

const router = useRouter();
const authStore = useAuthStore();
const roleStore = useRoleStore();

const isLoading = ref(false);
const error = ref(null);
const validationErrors = ref({});
const showPassword = ref(false);

const form = reactive({
  email: '',
  password: '',
  remember: false,
  device_name: ''
});

// Handle OAuth redirect on mount
onMounted(async () => {
  try {
    form.device_name = await authService.generateFingerprint();
  } catch (err) {
    console.error('Failed to generate device fingerprint:', err);
    form.device_name = navigator.userAgent;
  }

  const query = router.currentRoute.value.query;
  if (query.token && query.user) {
    try {
      isLoading.value = true;
      const userData = JSON.parse(decodeURIComponent(query.user));
      authStore.setToken(query.token);
      authStore.setUser(userData);
      roleStore.setRole(userData.role);
      sessionStorage.setItem('user_data', JSON.stringify(userData));
      if (userData.role) {
        localStorage.setItem('userRole', userData.role);
      }

      // Redirect based on role
      const redirectPath = query.redirect || (userData.role === 'admin' ? '/admin/dashboard' :
                                             userData.role === 'agent' ? '/agent-dashboard' :
                                             userData.role === 'client' ? '/client/dashboard' : '/');
      await router.push(redirectPath);
    } catch (err) {
      console.error('Failed to process OAuth redirect:', err);
      error.value = 'Failed to process login. Please try again.';
      setTimeout(() => {
        router.push('/login?error=Failed to process OAuth redirect');
      }, 2000);
    } finally {
      isLoading.value = false;
    }
  } else if (query.error) {
    error.value = decodeURIComponent(query.error);
    setTimeout(() => {
      error.value = null;
    }, 5000);
  }
});

function clearError(field) {
  if (validationErrors.value[field]) {
    delete validationErrors.value[field];
  }
  error.value = null;
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function validateForm() {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = ['Email is required'];
  } else if (!validateEmail(form.email)) {
    errors.email = ['Please enter a valid email address'];
  }

  if (!form.password) {
    errors.password = ['Password is required'];
  }

  return errors;
}

async function onLogin() {
  try {
    error.value = null;
    validationErrors.value = {};

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      validationErrors.value = errors;
      return;
    }

    isLoading.value = true;
    await authService.initializeAuth();
    const response = await authService.login({
      email: form.email,
      password: form.password,
      device_name: form.device_name
    });

    authStore.setToken(response.token);
    authStore.setUser(response.user);
    roleStore.setRole(response.user.role);

    const redirectPath = router.currentRoute.value.query.redirect ||
                        (response.user.role === 'admin' ? '/admin/dashboard' :
                         response.user.role === 'agent' ? '/agent-dashboard' :
                         response.user.role === 'client' ? '/client/dashboard' : '/');
    await router.push(redirectPath);
  } catch (err) {
    console.error('Login error:', err);
    if (err.status === 422) {
      validationErrors.value = err.errors;
    } else {
      error.value = err.message || 'An error occurred during login.';
    }
    isLoading.value = false;
  }
}

async function onGoogleLogin() {
  try {
    isLoading.value = true;
    error.value = '';
    await authService.googleLogin();
  } catch (err) {
    console.error('Google login error:', err);
    error.value = err.message || 'Failed to initiate Google login.';
    setTimeout(() => {
      router.push('/login?error=Failed to initiate Google login');
    }, 2000);
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
}

async function onYahooLogin() {
  try {
    isLoading.value = true;
    error.value = '';
    await authService.yahooLogin();
  } catch (err) {
    console.error('Yahoo login error:', err);
    error.value = err.message || 'Failed to initiate Yahoo login.';
    setTimeout(() => {
      router.push('/login?error=Failed to initiate Yahoo login');
    }, 2000);
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
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

/* New styles for enhanced security and UX */
.auth-error {
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
}

.form-group {
  position: relative;
  margin-bottom: 1rem;
}

.error-message {
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

input.error {
  border-color: #ef4444;
}

.password-input-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0;
}

.form-group-checkbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.forgot-password {
  color: #0056a3;
  text-decoration: none;
  font-size: 0.875rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #0056a3;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Enhance social login button */
.auth-social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  background-color: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 500;
  color: #1f2937;
  transition: all 0.2s;
}

.auth-social-btn:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.auth-social-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
