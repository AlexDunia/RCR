<template>
  <div class="admin-task-view">
    <!-- Enhanced Header -->
    <header class="task-header-section">
      <div class="header-container">
        <!-- Back Button -->
        <div class="back-button" @click="goBack">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Back</span>
        </div>

        <!-- Task Status Banner -->
        <div class="task-status-banner" :class="task?.status">
          <div class="status-content">
            <div class="status-indicator" :class="task?.status"></div>
            <h1 class="task-title">{{ task?.title }}</h1>
            <div class="task-meta">
              <span class="task-id">#{{ task?.id }}</span>
              <span class="task-status">{{ formatStatus(task?.status) }}</span>
              <span class="task-priority" :class="task?.priority?.toLowerCase()">
                {{ task?.priority }} Priority
              </span>
            </div>
          </div>

          <!-- Admin Actions -->
          <div class="admin-actions">
            <button class="action-btn edit" @click="editTask" v-if="canEdit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Edit Task
            </button>
            <button class="action-btn delete" @click="confirmDelete" v-if="canDelete">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="task-content">
      <div class="content-container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading task details...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="!task" class="error-state">
          <div class="error-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h2>Task Not Found</h2>
          <p>We couldn't find the task you're looking for. It may have been deleted or moved.</p>
          <button class="primary-button" @click="goBack">Return to Tasks</button>
        </div>

        <!-- Task Content Grid -->
        <div v-else class="task-grid">
          <!-- Left Column -->
          <div class="task-main-column">
            <!-- Task Summary -->
            <section class="task-section task-summary">
              <div class="summary-grid">
                <div class="summary-item">
                  <div class="summary-icon created">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="summary-content">
                    <div class="summary-label">Created</div>
                    <div class="summary-value">{{ formatDate(task.createdAt) }}</div>
                  </div>
                </div>
                <div class="summary-item">
                  <div class="summary-icon scheduled">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="summary-content">
                    <div class="summary-label">Scheduled</div>
                    <div class="summary-value">{{ formatDate(task.startDate) }}</div>
                  </div>
                </div>
                <div class="summary-item" v-if="task.startedAt">
                  <div class="summary-icon started">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3V7M19 3V7M3 11H21M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 15H12.01M16 15H16.01M8 15H8.01M12 19H12.01M16 19H16.01M8 19H8.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="summary-content">
                    <div class="summary-label">Started</div>
                    <div class="summary-value">{{ formatDate(task.startedAt) }}</div>
                  </div>
                </div>
                <div class="summary-item" v-if="task.completedAt">
                  <div class="summary-icon completed">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="summary-content">
                    <div class="summary-label">Completed</div>
                    <div class="summary-value">{{ formatDate(task.completedAt) }}</div>
                  </div>
                </div>
                <div class="summary-item" v-if="task.startedAt && task.completedAt">
                  <div class="summary-icon duration">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="summary-content">
                    <div class="summary-label">Duration</div>
                    <div class="summary-value">{{ calculateDuration(task.startedAt, task.completedAt) }}</div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Description Section -->
            <section class="task-section">
              <h2 class="section-title">Description</h2>
              <div class="description-content" v-if="task.description && task.description.length > 0">
                <ul class="description-list">
                  <li v-for="(item, index) in task.description" :key="index" class="description-item">
                    {{ item.replace(/^- /, '') }}
                  </li>
                </ul>
              </div>
              <div v-else class="empty-state">
                No description provided for this task.
              </div>
            </section>

            <!-- Activity Timeline -->
            <section class="task-section">
              <h2 class="section-title">Activity Timeline</h2>
              <div class="timeline">
                <div v-for="(activity, index) in taskActivities" :key="index" class="timeline-item">
                  <div class="timeline-icon" :class="activity.type">
                    <component :is="getActivityIcon(activity.type)" />
                  </div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <span class="activity-title">{{ activity.title }}</span>
                      <span class="activity-time">{{ formatDate(activity.timestamp) }}</span>
                    </div>
                    <p class="activity-description">{{ activity.description }}</p>
                    <div v-if="activity.metadata" class="activity-metadata">
                      <component :is="getActivityMetadata(activity)" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Column -->
          <div class="task-sidebar">
            <!-- People Involved -->
            <section class="task-section people-section">
              <div class="section-header">
                <h2 class="section-title">People Involved</h2>
              </div>

              <!-- Agents Subsection -->
              <div class="subsection">
                <div class="subsection-header">
                  <h3 class="subsection-title">Assigned Agents</h3>
                  <button class="add-person-btn" @click="openAgentModal">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Add Agent
                  </button>
                </div>
                <div class="people-list" v-if="task.agentDetails && task.agentDetails.length > 0">
                  <div v-for="agent in task.agentDetails" :key="agent.id" class="person-card">
                    <div class="person-info">
                      <div class="person-avatar agent" :class="{ 'has-image': agent.avatar }" :data-name="agent.name">
                        <img v-if="agent.avatar" :src="agent.avatar" :alt="agent.name" @error="handleAvatarError">
                        <template v-else>{{ getInitials(agent.name) }}</template>
                      </div>
                      <div class="person-details">
                        <div class="person-name">{{ agent.name }}</div>
                        <div class="person-email">{{ agent.email || 'No email provided' }}</div>
                      </div>
                    </div>
                    <div class="person-actions">
                      <button class="action-icon" @click="viewAgentProfile(agent.id)" title="View Profile">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      <button class="action-icon" @click="removeAgent(agent.id)" title="Remove">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else class="empty-state">
                  No agents assigned to this task
                </div>
              </div>

              <!-- Clients Subsection -->
              <div class="subsection">
                <div class="subsection-header">
                  <h3 class="subsection-title">Assigned Clients</h3>
                  <button class="add-person-btn" @click="openClientModal">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Add Client
                  </button>
                </div>
                <div class="people-list" v-if="task.clientDetails && task.clientDetails.length > 0">
                  <div v-for="client in task.clientDetails" :key="client.id" class="person-card">
                    <div class="person-info">
                      <div class="person-avatar client" :class="{ 'has-image': client.avatar }" :data-name="client.name">
                        <img v-if="client.avatar" :src="client.avatar" :alt="client.name" @error="handleAvatarError">
                        <template v-else>{{ getInitials(client.name) }}</template>
                      </div>
                      <div class="person-details">
                        <div class="person-name">{{ client.name }}</div>
                        <div class="person-email">{{ client.email || 'No email provided' }}</div>
                      </div>
                    </div>
                    <div class="person-actions">
                      <button class="action-icon" @click="viewClientProfile(client.id)" title="View Profile">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      <button class="action-icon" @click="removeClient(client.id)" title="Remove">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else class="empty-state">
                  No clients assigned to this task
                </div>
              </div>
            </section>

            <!-- Attachments Section -->
            <section class="task-section attachments-section" v-if="task.attachments && task.attachments.length > 0">
              <div class="section-header">
                <h2 class="section-title">Attachments</h2>
                <button class="add-attachment-btn" @click="addAttachment">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Add File
                </button>
              </div>
              <div class="attachments-list">
                <div v-for="(file, index) in task.attachments" :key="index" class="attachment-item">
                  <div class="attachment-info">
                    <div class="attachment-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 21C5.89543 21 5 20.1046 5 19V3C5 1.89543 5.89543 1 7 1H14L19 6V19C19 20.1046 18.1046 21 17 21H7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13 1V7H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="attachment-details">
                      <span class="attachment-name">{{ file.name }}</span>
                      <span class="attachment-size">{{ formatFileSize(file.size) }}</span>
                    </div>
                  </div>
                  <div class="attachment-actions">
                    <button class="action-icon" @click="downloadAttachment(file)" title="Download">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <button class="action-icon" @click="deleteAttachment(file.id)" title="Delete">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Action Buttons -->
    <div class="bottom-actions">
      <div class="action-container">
        <button class="cancel-btn" @click="goBack">Cancel</button>
        <button class="save-btn" :class="{ 'has-changes': hasChanges }" @click="saveTask" :disabled="!isFormValid">
          Save Changes
        </button>
      </div>
    </div>

    <!-- Modals -->
    <teleport to="body">
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-content delete-confirmation">
            <h3>Delete Task</h3>
            <p>Are you sure you want to delete this task? This action cannot be undone.</p>
            <div class="modal-actions">
              <button class="cancel-btn" @click="showDeleteModal = false">Cancel</button>
              <button class="delete-btn" @click="deleteTask">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Agent Modal -->
      <div v-if="showAgentModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Add Agent</h3>
              <button class="close-btn" @click="showAgentModal = false">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <!-- Add agent form content here -->
          </div>
        </div>
      </div>

      <!-- Add Client Modal -->
      <div v-if="showClientModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Add Client</h3>
              <button class="close-btn" @click="showClientModal = false">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <!-- Add client form content here -->
          </div>
        </div>
      </div>

      <!-- Remove Agent Confirmation Modal -->
      <div v-if="showRemoveAgentModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-content delete-confirmation">
            <h3>Remove Agent</h3>
            <p>Are you sure you want to remove this agent from the task?</p>
            <div class="modal-actions">
              <button class="cancel-btn" @click="showRemoveAgentModal = false">Cancel</button>
              <button class="delete-btn" @click="confirmRemoveAgent">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Remove Client Confirmation Modal -->
      <div v-if="showRemoveClientModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-content delete-confirmation">
            <h3>Remove Client</h3>
            <p>Are you sure you want to remove this client from the task?</p>
            <div class="modal-actions">
              <button class="cancel-btn" @click="showRemoveClientModal = false">Cancel</button>
              <button class="delete-btn" @click="confirmRemoveClient">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLayoutStore } from '@/stores/layout';
import { useTaskStore } from '@/stores/taskStore';

const route = useRoute();
const router = useRouter();
const layoutStore = useLayoutStore();
const taskStore = useTaskStore();

const task = ref(null);
const loading = ref(true);
const clientId = ref(null);
const showDeleteModal = ref(false);
const showAgentModal = ref(false);
const showClientModal = ref(false);
const showRemoveAgentModal = ref(false);
const showRemoveClientModal = ref(false);
const selectedAgentId = ref(null);
const selectedClientId = ref(null);
const hasChanges = ref(false);
const originalTask = ref(null);

// Computed properties for permissions
const canEdit = computed(() => {
  return task.value && !['completed', 'cancelled'].includes(task.value.status);
});

const canDelete = computed(() => {
  return task.value && !['completed', 'cancelled'].includes(task.value.status);
});

// Mock task activities - replace with real data
const taskActivities = ref([
  {
    type: 'created',
    title: 'Task Created',
    description: 'Task was created by John Doe',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  {
    type: 'assigned',
    title: 'Agent Assigned',
    description: 'Jane Smith was assigned to the task',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    metadata: {
      agent: {
        id: 1,
        name: 'Jane Smith',
        avatar: '/path/to/avatar.jpg'
      }
    }
  },
  {
    type: 'status_changed',
    title: 'Status Updated',
    description: 'Task status changed from "Draft" to "In Progress"',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  // Add more activities as needed
]);

// Reset layout when component is unmounted
onBeforeUnmount(() => {
  layoutStore.setLayout({
    hideSidebar: false,
    hideHeader: false,
    background: '#F9FAFB'
  });
});

// Navigation functions
const goBack = () => {
  router.back();
};

const editTask = () => {
  router.push(`/admin/client-task/${task.value.id}/edit?clientId=${clientId.value}`);
};

const confirmDelete = () => {
  showDeleteModal.value = true;
};

const deleteTask = async () => {
  try {
    await taskStore.deleteTask(task.value.id);
    router.push(`/clients/${clientId.value}?tab=tasks`);
  } catch (error) {
    console.error('Error deleting task:', error);
    // Handle error (show notification, etc.)
  }
};

// Modal functions
const openAgentModal = () => {
  showAgentModal.value = true;
};

const openClientModal = () => {
  showClientModal.value = true;
};

const removeAgent = (agentId) => {
  selectedAgentId.value = agentId;
  showRemoveAgentModal.value = true;
};

const confirmRemoveAgent = async () => {
  if (!task.value || !selectedAgentId.value) return;

  task.value.agents = task.value.agents.filter(id => id !== selectedAgentId.value);
  task.value.agentDetails = task.value.agentDetails.filter(agent => agent.id !== selectedAgentId.value);

  showRemoveAgentModal.value = false;
  selectedAgentId.value = null;
  hasChanges.value = checkForChanges();
};

const removeClient = (clientId) => {
  selectedClientId.value = clientId;
  showRemoveClientModal.value = true;
};

const confirmRemoveClient = async () => {
  if (!task.value || !selectedClientId.value) return;

  task.value.clients = task.value.clients.filter(id => id !== selectedClientId.value);
  task.value.clientDetails = task.value.clientDetails.filter(client => client.id !== selectedClientId.value);

  showRemoveClientModal.value = false;
  selectedClientId.value = null;
  hasChanges.value = checkForChanges();
};

// Profile navigation
const viewAgentProfile = (agentId) => {
  router.push(`/agent/${agentId}`);
};

const viewClientProfile = (clientId) => {
  router.push(`/clients/${clientId}`);
};

// Attachment functions
const addAttachment = () => {
  // Implement file upload logic
};

const downloadAttachment = async (file) => {
  try {
    const response = await fetch(file.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

const deleteAttachment = async (fileId) => {
  try {
    await taskStore.deleteTaskAttachment(task.value.id, fileId);
    // Refresh task data
    task.value = await taskStore.getTaskById(task.value.id);
  } catch (error) {
    console.error('Error deleting attachment:', error);
    // Handle error
  }
};

// Utility functions
const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', '');
};

const formatStatus = (status) => {
  if (!status) return '';
  const formatted = status.replace('_', ' ');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return 'N/A';

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end - start;

  // If less than a minute
  if (diffMs < 60000) {
    return 'Less than a minute';
  }

  // If less than an hour
  if (diffMs < 3600000) {
    const minutes = Math.floor(diffMs / 60000);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }

  // If less than a day
  if (diffMs < 86400000) {
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : ''}`;
  }

  // If more than a day
  const days = Math.floor(diffMs / 86400000);
  const hours = Math.floor((diffMs % 86400000) / 3600000);
  return `${days} day${days !== 1 ? 's' : ''} ${hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''}` : ''}`;
};

const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const handleAvatarError = (event) => {
  const target = event.target;
  const parentDiv = target.parentElement;
  const name = parentDiv.getAttribute('data-name');

  // Remove the img element
  target.remove();

  // Add initials
  parentDiv.textContent = getInitials(name);
  parentDiv.classList.remove('has-image');
};

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const getActivityIcon = (type) => {
  // Return appropriate icon component based on activity type
  const icons = {
    created: 'PlusCircleIcon',
    assigned: 'UserPlusIcon',
    status_changed: 'RefreshIcon',
    // Add more icon mappings
  };
  return icons[type] || 'CircleIcon';
};

const getActivityMetadata = (activity) => {
  // Return appropriate metadata component based on activity type
  switch (activity.type) {
    case 'assigned':
      return 'AssignedAgentMetadata';
    // Add more metadata components
    default:
      return null;
  }
};

// Add this function to check for changes
const checkForChanges = () => {
  if (!originalTask.value || !task.value) return false;

  // Compare the current task with the original task
  const currentTask = JSON.stringify({
    title: task.value.title,
    status: task.value.status,
    priority: task.value.priority,
    startDate: task.value.startDate,
    endDate: task.value.endDate,
    startTime: task.value.startTime,
    endTime: task.value.endTime,
    agents: task.value.agents,
    clients: task.value.clients,
    agentDetails: task.value.agentDetails,
    clientDetails: task.value.clientDetails,
    attachments: task.value.attachments
  });

  const originalTaskStr = JSON.stringify({
    title: originalTask.value.title,
    status: originalTask.value.status,
    priority: originalTask.value.priority,
    startDate: originalTask.value.startDate,
    endDate: originalTask.value.endDate,
    startTime: originalTask.value.startTime,
    endTime: originalTask.value.endTime,
    agents: originalTask.value.agents,
    clients: originalTask.value.clients,
    agentDetails: originalTask.value.agentDetails,
    clientDetails: originalTask.value.clientDetails,
    attachments: originalTask.value.attachments
  });

  return currentTask !== originalTaskStr;
};

// Update the watch to use the new check function
watch(task, () => {
  hasChanges.value = checkForChanges();
}, { deep: true });

// Update the saveTask function
const saveTask = async () => {
  if (!task.value || !hasChanges.value) return;

  try {
    // Save the task
    await taskStore.updateTask(task.value.id, task.value);

    // Update the original task after successful save
    originalTask.value = JSON.parse(JSON.stringify(task.value));
    hasChanges.value = false;

    // Show success message or notification (if you have a notification system)
    // router.back() to go back to previous page
    router.back();
  } catch (error) {
    console.error('Error saving task:', error);
    // Handle error (show error message)
  }
};

// Add isFormValid computed property
const isFormValid = computed(() => {
  if (!task.value) return false;
  return (
    task.value.title &&
    task.value.startDate &&
    task.value.endDate &&
    task.value.startTime &&
    task.value.endTime
  );
});

onMounted(() => {
  // Set layout to hide header and sidebar after a slight delay
  setTimeout(() => {
    layoutStore.setLayout({
      hideSidebar: true,
      hideHeader: true,
      background: '#f9fafb'
    });
  }, 50);

  loading.value = true;

  // Get client ID if available
  if (route.query.clientId) {
    clientId.value = parseInt(route.query.clientId);
  }

  setTimeout(() => {
    const taskId = route.params.id;
    task.value = taskStore.getTaskById(taskId);
    // Store the original task state
    originalTask.value = JSON.parse(JSON.stringify(task.value));
    loading.value = false;
  }, 500);
});
</script>

<style scoped>
.admin-task-view {
  padding-bottom: 5rem;
}

.task-header-section {
  background-color: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 1.5rem 0;
  margin-bottom: 2rem;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
  margin-bottom: 1rem;
}

.back-button:hover {
  color: #333;
  background: #f5f5f5;
}

.back-button svg {
  width: 20px;
  height: 20px;
}

.back-button span {
  font-weight: 500;
}

.task-status-banner {
  background-color: white;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.status-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-indicator {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.task-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6B7280;
}

.admin-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.action-btn {
  background-color: #3B82F6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #2563EB;
}

.task-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.task-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .task-grid {
    grid-template-columns: 1fr;
  }
}

.task-main-column {
  margin-bottom: 2rem;
}

.task-summary {
  background-color: #F9FAFB;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summary-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.summary-content {
  text-align: center;
}

.summary-label {
  font-size: 0.75rem;
  color: #6B7280;
  margin-bottom: 0.25rem;
}

.summary-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-top: 0;
  margin-bottom: 1rem;
}

.task-section {
  margin-bottom: 2rem;
}

.description-content {
  margin-bottom: 1rem;
}

.description-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.description-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #4B5563;
}

.description-item::before {
  content: "•";
  position: absolute;
  left: 0.5rem;
  color: #6B7280;
}

.empty-state {
  text-align: center;
  color: #6B7280;
  font-style: italic;
}

.task-sidebar {
  margin-left: 2rem;
}

.people-section {
  background-color: #F9FAFB;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
}

.subsection {
  margin-bottom: 1.5rem;
}

.subsection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.subsection-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.add-person-btn {
  background: none;
  border: none;
  color: #4B5563;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
}

.people-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.person-card {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: #F9FAFB;
  border-radius: 0.375rem;
  border: 1px solid #E5E7EB;
}

.person-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.person-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  flex-shrink: 0;
}

.person-avatar.agent {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.person-avatar.client {
  background-color: #E0F2FE;
  color: #075985;
}

.person-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.person-avatar.has-image {
  color: transparent;
}

.person-details {
  flex: 1;
}

.person-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.person-email {
  font-size: 0.75rem;
  color: #6B7280;
}

.person-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-icon {
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 0;
}

.attachments-section {
  background-color: #F9FAFB;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.add-attachment-btn {
  background: none;
  border: none;
  color: #4B5563;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
}

.attachments-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.attachment-item {
  display: flex;
  align-items: center;
  background-color: #F9FAFB;
  padding: 0.625rem 0.875rem;
  border-radius: 0.375rem;
  border: 1px solid #E5E7EB;
}

.attachment-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.attachment-icon {
  color: #6B7280;
}

.attachment-details {
  flex: 1;
}

.attachment-name {
  font-size: 0.875rem;
  color: #374151;
}

.attachment-size {
  font-size: 0.75rem;
  color: #6B7280;
}

.attachment-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-icon {
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  padding: 2rem;
  border-radius: 0.375rem;
  max-width: 400px;
  width: 100%;
  position: relative;
  z-index: 1001;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-content {
  margin-bottom: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-btn {
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 0;
}

.delete-confirmation {
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  border: 1.5px solid #666;
  color: #666;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: transparent;
  border-color: #333;
  color: #333;
}

.delete-btn {
  background-color: #B91C1C;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #E5E7EB;
  padding: 1rem 0;
  z-index: 100;
}

.action-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.save-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  background: #2563eb;
  border: 1.5px solid #2563eb;
  color: white;
  transition: all 0.2s;
  opacity: 0.7;
}

.save-btn.has-changes {
  opacity: 1;
}

.save-btn:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

.save-btn:disabled {
  background: #93c5fd;
  border-color: #93c5fd;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
