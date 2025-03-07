<template>
  <div class="completed-task-container">
    <div class="completed-task-card">
      <!-- Title and Expand Toggle -->
      <div class="card-header">
        <h2 class="task-title">{{ task.name }}</h2>
        <button class="expand-toggle" @click="isExpanded = !isExpanded">
          {{ isExpanded ? 'Less' : 'More' }}
        </button>
      </div>

      <!-- Default Details (Always Visible) -->
      <div class="default-details">
        <div class="date-label">
          Created by you on {{ formatDate(task.createdAt) }}
        </div>
        <div class="date-label">
          Ended on {{ formatDate(task.endDate) }}
        </div>
      </div>

      <!-- Expanded Details (Visible when "More" is clicked) -->
      <div v-if="isExpanded" class="expanded-details">
        <!-- Description Section -->
        <div v-if="task.description && task.description.length > 0" class="description-section">
          <h3 class="section-heading">Description</h3>
          <p class="task-description" v-for="(line, index) in task.description" :key="index">
            - {{ line }}
          </p>
        </div>

        <!-- Other Task Details -->
        <div class="details-section">
          <!-- Agents -->
          <div v-if="task.agentDetails && task.agentDetails.length > 0" class="detail-item">
            <span class="detail-label">Agents:</span>
            <span class="detail-value">{{ task.agentDetails.map(agent => agent.name).join(', ') }}</span>
          </div>

          <!-- Clients -->
          <div v-if="task.clientDetails && task.clientDetails.length > 0" class="detail-item">
            <span class="detail-label">Clients:</span>
            <span class="detail-value">{{ task.clientDetails.map(client => client.name).join(', ') }}</span>
          </div>

          <!-- Attachments -->
          <div v-if="task.attachments && task.attachments.length > 0" class="detail-item">
            <span class="detail-label">Attachments:</span>
            <span class="detail-value">{{ task.attachments.map(att => att.name).join(', ') }}</span>
          </div>

          <!-- Additional Details -->
          <div class="detail-item">
            <span class="detail-label">Started:</span>
            <span class="detail-value">{{ formatDate(task.startDate) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Priority:</span>
            <span class="detail-value">{{ task.priority }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Total Time:</span>
            <span class="detail-value">{{ task.totalTime ? `${task.totalTime / 1000} seconds` : 'N/A' }}</span>
          </div>
        </div>
      </div>

      <!-- Checkbox and Action (Always Visible) -->
      <div class="action-row">
        <label class="checkbox-container">
          <input type="checkbox" v-model="isCompleted" class="custom-checkbox" disabled />
          <span class="checkmark"></span>
          <span class="action-text">Mark as completed</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

// Define props for task data
const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      name: 'Ad campaign for Real Estate',
      status: 'completed',
      startDate: '2024-12-01T10:00:00Z',
      endDate: '2024-12-15T19:00:00Z',
      createdAt: '2024-12-15T10:00:00Z',
      description: [
        'Plan marketing strategy',
        'Design ad visuals',
        'Launch campaign'
      ],
      agentDetails: [
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/avatar1.jpg' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/avatar2.jpg' }
      ],
      clientDetails: [
        { id: 1, name: 'Real Estate Co.', email: 'contact@realestate.com', avatar: '/client1.jpg' }
      ],
      attachments: [
        { id: 1, name: 'Strategy-Pitch-Final.pptx', url: '/path/to/file' }
      ],
      priority: 'Medium',
      totalTime: 3600000 // Example: 1 hour in milliseconds
    })
  }
});

// Toggle state for expand/collapse
const isExpanded = ref(false);
const isCompleted = ref(true); // Default to checked since it's completed

// Format date function to match image format
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
</script>

<style scoped>
.completed-task-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #F8F9FA; /* Light gray background */
  min-height: 100vh; /* Full height to respect sidebar */
  box-sizing: border-box;
}

.completed-task-card {
  background-color: #FFFFFF; /* White card */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 24px; /* Matching image padding */
  width: 100%;
  max-width: 600px; /* Matches typical task detail/card width */
  margin-left: 240px; /* Assumed sidebar width (adjust based on your sidebar) */
  box-sizing: border-box;
}

/* Card Header (Title and Expand Toggle) */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px; /* Spacing below title */
}

.task-title {
  font-size: 20px; /* Bold, larger font */
  font-weight: 600;
  color: #111827; /* Dark gray */
  margin: 0;
  line-height: 1.2;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.expand-toggle {
  font-size: 14px; /* Readable size */
  color: #6B7280; /* Gray */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

.expand-toggle:hover {
  color: #2563EB; /* Blue on hover */
}

/* Default Details (Always Visible) */
.default-details {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Space between date labels */
  margin-bottom: 16px; /* Space below */
}

.date-label {
  background-color: #E5E7EB; /* Light gray pill */
  color: #6B7280; /* Gray text */
  font-size: 12px; /* Small font */
  padding: 4px 12px; /* Matching image padding */
  border-radius: 16px; /* Pill shape */
  display: inline-block;
}

/* Expanded Details (Visible when "More" is clicked) */
.expanded-details {
  margin-bottom: 24px; /* Increased spacing below expanded section */
}

/* Description Section */
.description-section {
  margin-bottom: 24px; /* Increased spacing below description */
}

.section-heading {
  font-size: 16px; /* Slightly larger for heading */
  font-weight: 600;
  color: #111827; /* Dark gray */
  margin-bottom: 8px;
}

.task-description {
  font-size: 14px; /* Readable sans-serif */
  color: #6B7280; /* Gray */
  line-height: 1.6; /* Increased line height */
  margin: 0;
  padding-left: 16px; /* Align with "-" */
}

/* Other Task Details */
.details-section {
  display: flex;
  flex-direction: column;
  gap: 12px; /* Increased spacing between items */
}

.detail-item {
  display: flex;
  gap: 12px; /* Increased gap between label and value */
}

.detail-label {
  font-size: 14px; /* Increased font size */
  color: #6B7280;
  font-weight: 500;
}

.detail-value {
  font-size: 14px; /* Increased font size */
  color: #111827;
}

/* Checkbox and Action Row */
.action-row {
  display: flex;
  align-items: center;
  gap: 8px; /* Space between checkbox and text */
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox {
  display: none; /* Hide default checkbox */
}

.checkmark {
  width: 16px;
  height: 16px;
  background-color: #FFFFFF;
  border: 2px solid #D1D5DB; /* Light border */
  border-radius: 4px;
  display: inline-block;
  position: relative;
  margin-right: 8px;
  transition: background-color 0.2s;
}

.custom-checkbox:checked + .checkmark {
  background-color: #10B981; /* Green when checked */
  border-color: #10B981;
}

.custom-checkbox:checked + .checkmark:after {
  content: '';
  position: absolute;
  left: 4px;
  top: 0;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.action-text {
  font-size: 14px;
  color: #10B981; /* Green text */
  font-weight: 500;
  margin: 0;
}

/* Responsiveness */
@media (max-width: 768px) {
  .completed-task-card {
    margin-left: 0; /* Remove sidebar margin on mobile */
    max-width: 90%; /* Adjust width for smaller screens */
    padding: 16px; /* Reduce padding on mobile */
  }

  .task-title {
    font-size: 18px; /* Slightly smaller on mobile */
  }

  .date-label {
    font-size: 11px; /* Smaller font on mobile */
    padding: 3px 10px;
  }

  .section-heading {
    font-size: 15px;
  }

  .task-description {
    font-size: 13px;
  }

  .detail-label,
  .detail-value {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .completed-task-card {
    max-width: 100%; /* Full width on very small screens */
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .expand-toggle {
    align-self: flex-end;
  }

  .default-details {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
