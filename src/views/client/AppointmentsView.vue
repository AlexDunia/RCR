<template>
  <div class="appointments-container">
    <div v-if="!hasAppointments" class="agent-search-page">
      <div class="page-header">
        <h2>Connect with Agents First</h2>
        <p class="page-description">You need to connect with agents before they can schedule appointments for you. Find and connect with real estate professionals below.</p>
      </div>

      <div class="agent-search-controls">
        <div class="search-container">
          <input type="text" v-model="searchQuery" placeholder="Search agents..." />
          <span class="search-shortcut">⌘ K</span>
        </div>

        <div class="filter-section">
          <div class="filter-tabs">
            <button class="filter-tab" :class="{ active: filterTab === 'network' }" @click="filterTab = 'network'">Your network</button>
            <button class="filter-tab" :class="{ active: filterTab === 'others' }" @click="filterTab = 'others'">Others</button>
          </div>

          <div class="filter-dropdown">
            <select v-model="locationFilter">
              <option value="">All Locations</option>
              <option value="Columbia, USA">Columbia, USA</option>
              <option value="Seattle, USA">Seattle, USA</option>
              <option value="Miami, USA">Miami, USA</option>
            </select>
          </div>

          <div class="filter-dropdown">
            <select v-model="specialtyFilter">
              <option value="">All Specialties</option>
              <option value="Luxury Real Estate">Luxury Real Estate</option>
              <option value="Commercial Properties">Commercial Properties</option>
              <option value="Residential Homes">Residential Homes</option>
            </select>
          </div>

          <div class="filter-dropdown">
            <select v-model="experienceFilter">
              <option value="">Any Experience</option>
              <option value="1+">1+ Years</option>
              <option value="3+">3+ Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>
        </div>
      </div>

      <div class="agents-grid">
        <div v-for="agent in filteredAgents" :key="agent.id" class="agent-card">
          <div class="agent-card-header">
            <div class="agent-avatar">
              <img :src="agent.avatar" :alt="agent.name" />
            </div>
            <button class="btn-favorite" :class="{ active: agent.isFavorite }" @click="toggleFavorite(agent.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          <div class="agent-info">
            <h3 class="agent-name">{{ agent.name }}</h3>
            <p class="agent-experience">{{ agent.experience }} experience</p>

            <div class="agent-meta">
              <div class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ agent.location }}</span>
              </div>
              <div class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>{{ agent.specialty }}</span>
              </div>
              <div class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <span class="rating">{{ agent.rating }} Rating</span>
              </div>
            </div>
          </div>

          <div class="agent-actions">
            <button class="btn-view" @click="viewProfile(agent.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View profile
            </button>
            <button class="btn-connect" v-if="!agent.isConnected" @click="connectWithAgent(agent.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              Connect
            </button>
            <button class="btn-connected" v-else disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Connected
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredAgents.length === 0" class="no-results">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3>No agents found</h3>
        <p>Try adjusting your filters or search query</p>
      </div>
    </div>

    <div v-else>
      <div class="appointments-header">
        <div class="filter-tabs">
          <button
            class="tab-button"
            :class="{ active: appointmentTab === 'upcoming' }"
            @click="changeAppointmentTab('upcoming')"
          >
            Upcoming
          </button>
          <button
            class="tab-button"
            :class="{ active: appointmentTab === 'past' }"
            @click="changeAppointmentTab('past')"
          >
            Past
          </button>
          <button
            class="tab-button"
            :class="{ active: appointmentTab === 'all' }"
            @click="changeAppointmentTab('all')"
          >
            All
          </button>
        </div>
        <div class="current-state">
          <span>Current view: <strong>{{ appointmentTab === 'upcoming' ? 'Upcoming Appointments' : appointmentTab === 'past' ? 'Past Appointments' : 'All Appointments' }}</strong></span>
        </div>
      </div>

      <div v-if="appointments.length === 0" class="no-appointments">
        <div class="notice-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <h3 class="notice-title">No Appointments Found</h3>
        <p class="notice-text">You don't have any upcoming appointments. Connect with agents to schedule property viewings.</p>
        <button class="notice-button" @click="resetSearch">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Find Agents to Connect
        </button>
      </div>

      <div v-else class="appointments-list">
        <div class="appointment-card" v-for="appointment in sortedAppointments" :key="appointment.id">
          <div class="appointment-date">
            <div class="calendar-icon">
              <div class="month">{{ appointment.month }}</div>
              <div class="day">{{ appointment.date }}</div>
            </div>
            <div class="time">{{ appointment.time }}</div>
          </div>
          <div class="appointment-details">
            <h3>{{ appointment.type }}</h3>
            <p class="appointment-address">{{ appointment.address }}</p>
            <p class="appointment-info">
              <span class="info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {{ appointment.agent }} (Agent)
              </span>
              <span class="info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {{ appointment.duration }}
              </span>
            </p>
          </div>
          <div class="appointment-actions">
            <button class="action-button cancel" @click="cancelAppointment(appointment.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add the agent quick profile modal -->
    <div v-if="showQuickProfile" class="quick-profile-overlay" @click.self="showQuickProfile = false">
      <div class="quick-profile-modal">
        <div class="modal-header">
          <h2>Agent Profile</h2>
          <button @click="showQuickProfile = false" class="close-modal-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="profile-content" v-if="selectedAgent">
          <div class="agent-profile-header">
            <div class="profile-avatar">
              <img :src="selectedAgent.avatar" :alt="selectedAgent.name" />
            </div>
            <div class="profile-info">
              <h3>{{ selectedAgent.name }}</h3>
              <p class="profile-experience">{{ selectedAgent.experience }} experience</p>

              <div class="profile-meta">
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{{ selectedAgent.location }}</span>
                </div>
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>{{ selectedAgent.specialty }}</span>
                </div>
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  <span class="rating">{{ selectedAgent.rating }} Rating</span>
                </div>
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span>{{ selectedAgent.transactions }} Transactions</span>
                </div>
              </div>
            </div>

            <div class="profile-actions">
              <button v-if="!selectedAgent.isConnected" class="btn-connect-profile" @click="connectWithAgent(selectedAgent.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                Connect
              </button>
              <button v-else class="btn-connected-profile" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Connected
              </button>
              <button class="btn-message-profile" @click="messageAgent(selectedAgent.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Message
              </button>
            </div>
          </div>

          <div class="agent-about">
            <h4>About</h4>
            <p>{{ selectedAgent.about || 'A dedicated real estate professional with extensive experience in the ' + selectedAgent.specialty + ' market. Based in ' + selectedAgent.location + ' with a track record of successful transactions and satisfied clients.' }}</p>
          </div>

          <div class="agent-listings">
            <h4>Current Listings</h4>
            <div class="listings-grid">
              <div v-for="(listing, index) in agentListings" :key="index" class="listing-card">
                <div class="listing-image">
                  <img :src="listing.image" :alt="listing.address" />
                  <div class="listing-price">${{ listing.price.toLocaleString() }}</div>
                </div>
                <div class="listing-details">
                  <h5>{{ listing.address }}</h5>
                  <div class="listing-specs">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      {{ listing.beds }} bd
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      {{ listing.baths }} ba
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      </svg>
                      {{ listing.sqft.toLocaleString() }} sqft
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useConnectionStore } from '@/stores/connectionStore';
import { useAgentStore } from '@/stores/agentStore';
import { useRouter } from 'vue-router';

const connectionStore = useConnectionStore();
const agentStore = useAgentStore();
const router = useRouter();

// Mock client ID for demo purposes
const clientId = 1;

// Get connected agents
const connectedAgents = ref([]);

// Current filter tab for appointments
const appointmentTab = ref('upcoming');

// Mock appointments data with status
const allAppointments = ref([
  {
    id: 1,
    date: '12',
    month: 'JUN',
    time: '2:00 PM',
    type: 'Property Viewing',
    address: '123 Lake View Drive, Lakeside, CA',
    agent: 'John Smith',
    duration: '1 hour',
    status: 'upcoming',
    appointmentDate: new Date('2023-06-12T14:00:00')
  },
  {
    id: 2,
    date: '18',
    month: 'JUN',
    time: '10:30 AM',
    type: 'Final Walk-through',
    address: '456 Downtown Ave, Suite 12B, Metro City',
    agent: 'John Smith',
    duration: '45 minutes',
    status: 'upcoming',
    appointmentDate: new Date('2023-06-18T10:30:00')
  },
  {
    id: 3,
    date: '05',
    month: 'JUN',
    time: '3:15 PM',
    type: 'Initial Consultation',
    address: '789 Hillside Lane, Mountain View, CA',
    agent: 'Sarah Johnson',
    duration: '1 hour',
    status: 'past',
    appointmentDate: new Date('2023-06-05T15:15:00')
  },
  {
    id: 4,
    date: '28',
    month: 'MAY',
    time: '11:00 AM',
    type: 'Property Viewing',
    address: '321 Ocean Blvd, Seaside, FL',
    agent: 'Michael Chen',
    duration: '1 hour',
    status: 'past',
    appointmentDate: new Date('2023-05-28T11:00:00')
  }
]);

// Get the status of an appointment based on its date
const getAppointmentStatus = (appointmentDate) => {
  const now = new Date();
  return appointmentDate > now ? 'upcoming' : 'past';
};

// Filtered appointments based on current tab
const appointments = computed(() => {
  if (appointmentTab.value === 'all') {
    return allAppointments.value;
  } else {
    return allAppointments.value.filter(app => {
      const status = getAppointmentStatus(app.appointmentDate);
      return status === appointmentTab.value;
    });
  }
});

// Sort appointments by date
const sortedAppointments = computed(() => {
  return [...appointments.value].sort((a, b) => {
    if (appointmentTab.value === 'upcoming') {
      return a.appointmentDate - b.appointmentDate; // Ascending for upcoming
    } else {
      return b.appointmentDate - a.appointmentDate; // Descending for past
    }
  });
});

// State for the agent search
const searchQuery = ref('');
const filterTab = ref('others');
const locationFilter = ref('');
const specialtyFilter = ref('');
const experienceFilter = ref('');

// Quick profile state
const showQuickProfile = ref(false);
const selectedAgent = ref(null);
const agentListings = ref([]);

// Enhanced mock agents for demo with additional info
const agents = ref([
  {
    id: 5,
    name: 'James T. Whitfield',
    experience: '5+ Yr',
    location: 'Columbia, USA',
    specialty: 'Luxury Real Estate',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isConnected: false,
    isFavorite: true,
    rating: 4.9,
    transactions: 53,
    about: 'Specializing in luxury properties with a focus on waterfront homes and estates. I believe in providing exceptional service and creating lasting relationships with my clients.'
  },
  {
    id: 8,
    name: 'Sarah Johnson',
    experience: '8+ Yr',
    location: 'Miami, USA',
    specialty: 'Commercial Properties',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isConnected: true,
    isFavorite: false,
    rating: 4.7,
    transactions: 122,
    about: 'With over 8 years in commercial real estate, I help businesses find the perfect locations to thrive. My background in business administration gives me unique insights into my clients\' needs.'
  },
  {
    id: 10,
    name: 'Michael Chen',
    experience: '3+ Yr',
    location: 'Seattle, USA',
    specialty: 'Residential Homes',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    isConnected: false,
    isFavorite: false,
    rating: 4.6,
    transactions: 36
  },
  {
    id: 12,
    name: 'Lisa R. Thompson',
    experience: '10+ Yr',
    location: 'Columbia, USA',
    specialty: 'Luxury Real Estate',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    isConnected: false,
    isFavorite: false,
    rating: 4.9,
    transactions: 198,
    about: 'A top producer with over a decade of experience in luxury real estate. I specialize in high-end properties and have a network of exclusive clients throughout the region.'
  },
  {
    id: 15,
    name: 'Robert Davis',
    experience: '4+ Yr',
    location: 'Seattle, USA',
    specialty: 'Commercial Properties',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    isConnected: false,
    isFavorite: false,
    rating: 4.5,
    transactions: 45
  },
  {
    id: 18,
    name: 'Jennifer Wilson',
    experience: '7+ Yr',
    location: 'Miami, USA',
    specialty: 'Residential Homes',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    isConnected: false,
    isFavorite: false,
    rating: 4.8,
    transactions: 89
  }
]);

// Mock property listings
const mockListings = {
  luxury: [
    {
      id: 101,
      address: '123 Oceanfront Drive, Miami Beach',
      price: 2450000,
      beds: 4,
      baths: 3.5,
      sqft: 3200,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 102,
      address: '456 Highland Avenue, Beverly Hills',
      price: 3750000,
      beds: 5,
      baths: 4.5,
      sqft: 4100,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 103,
      address: '789 Summit Ridge, Aspen',
      price: 5250000,
      beds: 6,
      baths: 5.5,
      sqft: 5300,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    }
  ],
  commercial: [
    {
      id: 201,
      address: '100 Downtown Plaza, Seattle',
      price: 1850000,
      beds: 0,
      baths: 2,
      sqft: 3800,
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 202,
      address: '200 Business Park Way, Miami',
      price: 1200000,
      beds: 0,
      baths: 1,
      sqft: 2600,
      image: 'https://images.unsplash.com/photo-1554469384-e58fac937bb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    }
  ],
  residential: [
    {
      id: 301,
      address: '555 Maple Street, Portland',
      price: 685000,
      beds: 3,
      baths: 2,
      sqft: 1850,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 302,
      address: '321 Oak Avenue, Seattle',
      price: 875000,
      beds: 4,
      baths: 2.5,
      sqft: 2150,
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 303,
      address: '147 Sunset Road, Columbia',
      price: 525000,
      beds: 3,
      baths: 2,
      sqft: 1700,
      image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    }
  ]
};

// Filtered agents based on search and filters
const filteredAgents = computed(() => {
  let result = agents.value;

  // Filter by network/others tab
  if (filterTab.value === 'network') {
    result = result.filter(agent => agent.isConnected);
  } else if (filterTab.value === 'others') {
    result = result.filter(agent => !agent.isConnected);
  }

  // Filter by location
  if (locationFilter.value) {
    result = result.filter(agent => agent.location === locationFilter.value);
  }

  // Filter by specialty
  if (specialtyFilter.value) {
    result = result.filter(agent => agent.specialty === specialtyFilter.value);
  }

  // Filter by experience
  if (experienceFilter.value) {
    const minExperience = parseInt(experienceFilter.value);
    result = result.filter(agent => {
      const agentExperience = parseInt(agent.experience);
      return agentExperience >= minExperience;
    });
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(agent =>
      agent.name.toLowerCase().includes(query) ||
      agent.specialty.toLowerCase().includes(query) ||
      agent.location.toLowerCase().includes(query)
    );
  }

  return result;
});

// Action functions
const toggleFavorite = (agentId) => {
  const agent = agents.value.find(a => a.id === agentId);
  if (agent) {
    agent.isFavorite = !agent.isFavorite;
  }
};

// Show quick profile when viewing agent
const viewProfile = (agentId) => {
  selectedAgent.value = agents.value.find(a => a.id === agentId);

  if (selectedAgent.value) {
    // Set agent listings based on their specialty
    if (selectedAgent.value.specialty.includes('Luxury')) {
      agentListings.value = mockListings.luxury;
    } else if (selectedAgent.value.specialty.includes('Commercial')) {
      agentListings.value = mockListings.commercial;
    } else {
      agentListings.value = mockListings.residential;
    }

    showQuickProfile.value = true;
  }
};

const connectWithAgent = (agentId) => {
  const agent = agents.value.find(a => a.id === agentId);
  if (agent) {
    agent.isConnected = true;
    // In a real app, this would call the connectionStore to create a connection
    console.log(`Connection request sent to agent ${agentId}`);
  }
};

// Add a messaging function
const messageAgent = (agentId) => {
  router.push(`/client-messages?agentId=${agentId}`);
};

// Load connected agents
onMounted(async () => {
  // Simulate fetch delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get connected agents
  const connections = connectionStore.getConnectionsByClient(clientId);
  connectedAgents.value = connections.map(conn => {
    const agentId = conn.fromType === 'agent' ? conn.fromId : conn.toId;
    return agentStore.getAgentById(agentId);
  }).filter(Boolean);
});

// Computed property to check if client has any appointments
const hasAppointments = computed(() => allAppointments.value.length > 0);

// Cancel an appointment
const cancelAppointment = (appointmentId) => {
  // Show confirmation dialog
  if (confirm('Are you sure you want to cancel this appointment?')) {
    // Remove the appointment from the list
    allAppointments.value = allAppointments.value.filter(app => app.id !== appointmentId);
  }
};

// Function to manually reset hasAppointments for testing
const resetSearch = () => {
  // This would be handled by routing in a real app,
  // but for demo purposes we'll clear the appointments array
  allAppointments.value = [];
  // After a brief delay, set hasAppointments to false directly
  setTimeout(() => {
    // Force re-render to show the agent search interface
    // In a real app, this would likely be handled by router navigation
    window.location.reload();
  }, 300);
};

// Change the appointment tab
const changeAppointmentTab = (tab) => {
  appointmentTab.value = tab;
};
</script>

<style scoped>
.appointments-container {
  padding: 32px 40px;
  max-width: 90%;
  margin: 0 auto;
}

h1 {
  margin-bottom: 10px;
  color: #1a4189;
  font-size: 26px;
}

.subtitle {
  color: #555;
  margin-bottom: 20px;
  font-size: 15px;
}

.subtitle-container {
  margin-bottom: 32px;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 8px;
}

.page-description {
  color: #666;
  line-height: 1.5;
  font-size: 15px;
}

.agent-search-controls {
  margin-bottom: 32px;
}

.search-container {
  position: relative;
  margin-bottom: 16px;
}

.search-container input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: border-color 0.2s;
}

.search-container input:focus {
  border-color: #1a4189;
  outline: none;
}

.search-shortcut {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  color: #666;
  font-size: 12px;
}

.filter-section {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
  margin: 20px 0;
}

.filter-tabs {
  display: flex;
  gap: 12px;
}

.filter-tab {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.filter-tab.active {
  background: #1a4189;
  color: white;
  border-color: #1a4189;
}

.filter-dropdown select {
  padding: 7px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 13px;
  background: white;
  cursor: pointer;
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;
  margin: 32px 0;
}

.agent-card {
  border-radius: 12px;
  border: 1px solid #eee;
  overflow: hidden;
  background: white;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.agent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.agent-card-header {
  padding: 20px 16px 12px;
  position: relative;
  background: linear-gradient(to right, #f7f9fe, #eef2f9);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.agent-avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
}

.agent-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.agent-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.agent-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  text-align: center;
}

.agent-experience {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
}

.agent-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.meta-item svg {
  color: #1a4189;
  min-width: 16px;
}

.agent-actions {
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #eee;
  margin-top: auto;
}

.btn-view, .btn-connect, .btn-connected {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
}

.btn-view {
  background: #f5f7fa;
  color: #333;
  border: 1px solid #ddd;
}

.btn-connect {
  background: #1a4189;
  color: white;
  border: none;
}

.btn-connected {
  background: #eef2f9;
  color: #1a4189;
  border: 1px solid #c5d0e6;
  cursor: not-allowed;
}

.no-results {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.no-results svg {
  color: #aaa;
  margin-bottom: 16px;
}

.no-results h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
}

.no-results p {
  color: #666;
}

/* Appointments Header */
.appointments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-tabs {
  display: flex;
  gap: 8px;
}

.tab-button {
  padding: 7px 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.tab-button.active {
  background: #1a4189;
  color: white;
  border-color: #1a4189;
}

.current-state {
  font-size: 14px;
  color: #666;
}

.current-state strong {
  color: #333;
}

/* Appointment Cards */
.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
}

.appointment-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  border-radius: 12px;
  background: white;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.appointment-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.calendar-icon {
  width: 58px;
  height: 58px;
  border-radius: 8px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.month {
  background: #1a4189;
  color: white;
  width: 100%;
  text-align: center;
  padding: 2px 0;
  font-size: 12px;
  font-weight: 500;
}

.day {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.time {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.appointment-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.appointment-details h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 0;
}

.appointment-address {
  font-size: 13px;
  color: #666;
}

.appointment-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #666;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.action-button.cancel {
  color: #e63946;
  background: #fff5f5;
  border: 1px solid #ffcdd2;
}

.connection-notice {
  background: #f9f9fa;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 24px;
}

.notice-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #eef2f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.notice-icon svg {
  color: #1a4189;
}

.notice-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.notice-text {
  color: #666;
  margin-bottom: 20px;
  max-width: 450px;
  line-height: 1.5;
  font-size: 15px;
}

.notice-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #1a4189;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.notice-button:hover {
  background: #15356f;
}

@media (max-width: 768px) {
  .appointments-container {
    padding: 24px;
    max-width: 95%;
  }

  .agents-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

/* Quick Profile Modal Styles */
.quick-profile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
    justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.quick-profile-modal {
  width: 85%;
  max-width: 800px;
  max-height: 80vh;
  background-color: white;
  border-radius: 12px;
  overflow-y: auto;
  display: flex;
    flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

.modal-header {
    display: flex;
  justify-content: space-between;
    align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a4189;
}

.close-modal-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-modal-btn:hover {
  background-color: #f3f4f6;
  color: #333;
}

.profile-content {
  padding: 20px;
}

.agent-profile-header {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-avatar img {
    width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-info h3 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px;
}

.profile-experience {
  font-size: 16px;
  color: #666;
    margin-bottom: 16px;
}

.profile-meta {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}

.btn-connect-profile, .btn-connected-profile, .btn-message-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  width: 180px;
}

.btn-connect-profile {
  background: #1a4189;
  color: white;
  border: none;
}

.btn-connected-profile {
  background: #eef2f9;
  color: #1a4189;
  border: 1px solid #c5d0e6;
  cursor: not-allowed;
}

.btn-message-profile {
  background: white;
  color: #333;
  border: 1px solid #ddd;
}

.agent-about {
  margin-bottom: 24px;
}

.agent-about h4, .agent-listings h4 {
  font-size: 18px;
  color: #333;
  margin: 0 0 12px;
}

.agent-about p {
  color: #555;
  line-height: 1.6;
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.listing-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.listing-card:hover {
  transform: translateY(-4px);
}

.listing-image {
  height: 180px;
  position: relative;
}

.listing-image img {
    width: 100%;
  height: 100%;
  object-fit: cover;
}

.listing-price {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.listing-details {
  padding: 12px;
}

.listing-details h5 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.listing-specs {
  display: flex;
  gap: 12px;
}

.listing-specs span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
}

@media (max-width: 768px) {
  .agent-profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-info {
    width: 100%;
  }

  .profile-meta {
    justify-content: center;
  }

  .profile-actions {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .listings-grid {
    grid-template-columns: 1fr;
  }
}

/* No Appointments State */
.no-appointments {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #f9f9fa;
  border-radius: 12px;
  padding: 32px 20px;
  margin: 32px auto;
  max-width: 80%;
}

.no-appointments .notice-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #eef2f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.no-appointments .notice-text {
  color: #666;
  margin-bottom: 20px;
  max-width: 450px;
  line-height: 1.5;
  font-size: 15px;
}

.no-appointments .notice-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #1a4189;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.no-appointments .notice-button:hover {
  background: #15356f;
}

.btn-favorite {
  position: absolute;
  top: 16px;
  right: 16px;
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.btn-favorite.active {
  color: #ff3b5c;
}

.rating {
  font-weight: 500;
  color: #ffa41b;
}
</style>
