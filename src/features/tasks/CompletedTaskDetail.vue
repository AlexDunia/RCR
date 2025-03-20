<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const taskId = route.params.id;

const task = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data - in a real app, this would be fetched from an API
      task.value = {
        id: parseInt(taskId),
        title: "Property Listing Update",
        completedDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        priority: "high",
        description: "Updated property listing details and photos for the lakefront property at 1234 Lake Drive. Added new professional photos, updated pricing information, and refreshed the property description to highlight recent renovations.",
        client: {
          id: 101,
          name: "Rivera Family",
          phone: "(555) 123-4567",
          email: "rivera@example.com"
        },
        completedBy: {
          id: 201,
          name: "Jane Smith",
          role: "Senior Agent",
          avatar: "https://i.pravatar.cc/150?img=29"
        },
        notes: "Added new professional photos and updated price. Client was very satisfied with the updated listing. Expecting increased interest based on new presentation.",
        startTime: "2023-05-15T09:00:00Z",
        endTime: "2023-05-15T11:30:00Z",
        location: "1234 Lake Drive, Lakeside, CA",
        attachments: [
          { id: 301, name: "Updated Photos.zip", type: "zip", size: "15.2 MB" },
          { id: 302, name: "Price Comparison.pdf", type: "pdf", size: "1.8 MB" },
          { id: 303, name: "Client Approval.pdf", type: "pdf", size: "0.5 MB" }
        ],
        history: [
          { timestamp: "2023-05-15T08:30:00Z", action: "Task created", user: "Jane Smith" },
          { timestamp: "2023-05-15T09:00:00Z", action: "Task started", user: "Jane Smith" },
          { timestamp: "2023-05-15T10:45:00Z", action: "Photos uploaded", user: "Jane Smith" },
          { timestamp: "2023-05-15T11:15:00Z", action: "Price updated", user: "Jane Smith" },
          { timestamp: "2023-05-15T11:30:00Z", action: "Task completed", user: "Jane Smith" }
        ],
        relatedTasks: [
          { id: 4010, title: "Client Follow-up Call", status: "scheduled", dueDate: "2023-05-22T14:00:00Z" },
          { id: 4011, title: "Open House Planning", status: "in-progress", dueDate: "2023-05-20T09:00:00Z" }
        ]
      };
      isLoading.value = false;
    }, 800);
  } catch (err) {
    console.error('Failed to load task details:', err);
    error.value = 'Failed to load task details. Please try again.';
    isLoading.value = false;
  }
});

const goBack = () => {
  router.back();
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (dateString) => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleTimeString(undefined, options);
};

const priorityClass = (priority) => {
  switch (priority) {
    case 'high': return 'priority-high';
    case 'medium': return 'priority-medium';
    case 'low': return 'priority-low';
    default: return '';
  }
};

const priorityLabel = (priority) => {
  switch (priority) {
    case 'high': return 'High Priority';
    case 'medium': return 'Medium Priority';
    case 'low': return 'Low Priority';
    default: return 'Unknown Priority';
  }
};

const formatFileSize = (size) => {
  return size;
};

const downloadAttachment = (attachment) => {
  // In a real app, this would initiate a download
  console.log(`Downloading attachment: ${attachment.name}`);
  alert(`In a real app, this would download: ${attachment.name}`);
};

const viewRelatedTask = (taskId) => {
  // Navigate to the appropriate task detail page based on status
  const task = task.value.relatedTasks.find(t => t.id === taskId);
  if (task) {
    let route = '/tasks/';
    switch (task.status) {
      case 'completed':
        route += 'completed/';
        break;
      case 'in-progress':
        route += 'in-progress/';
        break;
      case 'scheduled':
        route += 'scheduled/';
        break;
      default:
        route += 'all/';
    }
    router.push(`${route}${taskId}`);
  }
};
</script>

<template>
  <div class="task-detail">
    <div class="back-button-container">
      <button @click="goBack" class="back-button">
        ← Back to Completed Tasks
      </button>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading task details...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="!task" class="error-message">
      Task not found. The task may have been deleted or you may not have permission to view it.
    </div>

    <div v-else class="task-content">
      <div class="task-header">
        <div class="task-title-section">
          <div class="priority-badge" :class="priorityClass(task.priority)">
            {{ priorityLabel(task.priority) }}
          </div>
          <h1 class="task-title">{{ task.title }}</h1>
        </div>

        <div class="completion-info">
          <div class="completion-date">
            <span class="label">Completed on:</span>
            <span class="value">{{ formatDate(task.completedDate) }}</span>
          </div>

          <div class="completed-by">
            <span class="label">Completed by:</span>
            <div class="user-info">
              <div class="avatar" v-if="task.completedBy.avatar">
                <img :src="task.completedBy.avatar" :alt="task.completedBy.name">
              </div>
              <div class="user-details">
                <div class="name">{{ task.completedBy.name }}</div>
                <div class="role">{{ task.completedBy.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Task Details</h2>

        <div class="details-grid">
          <div class="detail-item">
            <div class="detail-label">Client</div>
            <div class="detail-value">{{ task.client.name }}</div>
          </div>

          <div class="detail-item">
            <div class="detail-label">Client Contact</div>
            <div class="detail-value">
              <div>{{ task.client.phone }}</div>
              <div>{{ task.client.email }}</div>
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-label">Start Time</div>
            <div class="detail-value">
              {{ formatDate(task.startTime) }} at {{ formatTime(task.startTime) }}
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-label">End Time</div>
            <div class="detail-value">
              {{ formatDate(task.endTime) }} at {{ formatTime(task.endTime) }}
            </div>
          </div>

          <div class="detail-item full-width">
            <div class="detail-label">Location</div>
            <div class="detail-value">{{ task.location }}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Description</h2>
        <div class="description">
          {{ task.description }}
        </div>
      </div>

      <div class="section" v-if="task.notes">
        <h2 class="section-title">Completion Notes</h2>
        <div class="notes">
          {{ task.notes }}
        </div>
      </div>

      <div class="section" v-if="task.attachments && task.attachments.length">
        <h2 class="section-title">Attachments</h2>
        <div class="attachments-list">
          <div v-for="attachment in task.attachments" :key="attachment.id" class="attachment-item">
            <div class="attachment-icon" :class="attachment.type">
              <!-- File type icon would go here -->
            </div>
            <div class="attachment-details">
              <div class="attachment-name">{{ attachment.name }}</div>
              <div class="attachment-meta">{{ formatFileSize(attachment.size) }}</div>
            </div>
            <button class="download-btn" @click="downloadAttachment(attachment)">
              Download
            </button>
          </div>
        </div>
      </div>

      <div class="section" v-if="task.history && task.history.length">
        <h2 class="section-title">Task History</h2>
        <div class="history-timeline">
          <div v-for="(event, index) in task.history" :key="index" class="history-item">
            <div class="history-timestamp">
              {{ formatTime(event.timestamp) }}
            </div>
            <div class="history-content">
              <div class="history-action">{{ event.action }}</div>
              <div class="history-user">{{ event.user }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section" v-if="task.relatedTasks && task.relatedTasks.length">
        <h2 class="section-title">Related Tasks</h2>
        <div class="related-tasks-list">
          <div v-for="relatedTask in task.relatedTasks" :key="relatedTask.id" class="related-task-item">
            <div class="related-task-info">
              <div class="related-task-title">{{ relatedTask.title }}</div>
              <div class="related-task-meta">
                <span class="status" :class="relatedTask.status">
                  {{ relatedTask.status === 'in-progress' ? 'In Progress' :
                     relatedTask.status.charAt(0).toUpperCase() + relatedTask.status.slice(1) }}
                </span>
                <span class="due-date">Due: {{ formatDate(relatedTask.dueDate) }}</span>
              </div>
            </div>
            <button class="view-task-btn" @click="viewRelatedTask(relatedTask.id)">
              View Task
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-detail {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.back-button-container {
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: #1976d2;
  font-weight: 600;
  padding: 8px 0;
  cursor: pointer;
  font-size: 0.95rem;
}

.back-button:hover {
  text-decoration: underline;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #1976d2;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  padding: 20px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 8px;
  text-align: center;
}

.task-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.task-header {
  background-color: #f8f9fa;
  padding: 25px;
  border-bottom: 1px solid #eee;
}

.task-title-section {
  margin-bottom: 20px;
}

.priority-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.priority-high {
  background-color: #ffebee;
  color: #c62828;
}

.priority-medium {
  background-color: #fff3e0;
  color: #e65100;
}

.priority-low {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.task-title {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
}

.completion-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.completion-date,
.completed-by {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 5px;
}

.value {
  font-weight: 600;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details .name {
  font-weight: 600;
  color: #333;
}

.user-details .role {
  font-size: 0.85rem;
  color: #666;
}

.section {
  padding: 25px;
  border-bottom: 1px solid #eee;
}

.section:last-child {
  border-bottom: none;
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 1.3rem;
  color: #333;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 5px;
}

.detail-value {
  font-weight: 500;
  color: #333;
}

.description,
.notes {
  line-height: 1.6;
  color: #333;
}

.attachments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.attachment-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.attachment-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 15px;
  background-color: #e9ecef;
}

.attachment-icon.pdf {
  color: #e53935;
}

.attachment-icon.zip {
  color: #f57c00;
}

.attachment-details {
  flex: 1;
}

.attachment-name {
  font-weight: 500;
  margin-bottom: 3px;
}

.attachment-meta {
  font-size: 0.85rem;
  color: #666;
}

.download-btn {
  padding: 6px 12px;
  border-radius: 4px;
  background-color: #e3f2fd;
  color: #1976d2;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.download-btn:hover {
  background-color: #bbdefb;
}

.history-timeline {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.history-item {
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px dotted #eee;
}

.history-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.history-timestamp {
  width: 80px;
  min-width: 80px;
  font-size: 0.85rem;
  color: #666;
}

.history-content {
  flex: 1;
}

.history-action {
  font-weight: 500;
}

.history-user {
  font-size: 0.85rem;
  color: #666;
  margin-top: 3px;
}

.related-tasks-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.related-task-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.related-task-info {
  flex: 1;
}

.related-task-title {
  font-weight: 500;
  margin-bottom: 5px;
}

.related-task-meta {
  display: flex;
  gap: 15px;
  font-size: 0.85rem;
}

.status {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.status.completed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status.in-progress {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status.scheduled {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.due-date {
  color: #666;
}

.view-task-btn {
  padding: 6px 12px;
  border-radius: 4px;
  background-color: #e3f2fd;
  color: #1976d2;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.view-task-btn:hover {
  background-color: #bbdefb;
}

@media (max-width: 768px) {
  .completion-info {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .history-item {
    flex-direction: column;
    gap: 5px;
  }

  .history-timestamp {
    width: auto;
  }

  .related-task-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .view-task-btn {
    align-self: flex-end;
  }
}
</style>
