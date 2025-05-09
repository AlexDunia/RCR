<template>
  <div class="appointments-container">
    <h1>Appointments</h1>

    <div class="appointments-header">
      <div class="filter-tabs">
        <button class="tab-button active">Upcoming</button>
        <button class="tab-button">Past</button>
        <button class="tab-button">All</button>
      </div>
      <button class="schedule-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        Schedule Viewing
      </button>
    </div>

    <div class="appointments-list">
      <div class="appointment-card">
        <div class="appointment-date">
          <div class="calendar-icon">
            <div class="month">JUN</div>
            <div class="day">12</div>
          </div>
          <div class="time">2:00 PM</div>
        </div>
        <div class="appointment-details">
          <h3>Property Viewing</h3>
          <p class="appointment-address">123 Lake View Drive, Lakeside, CA</p>
          <p class="appointment-info">
            <span class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              John Smith (Agent)
            </span>
            <span class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              1 hour
            </span>
          </p>
        </div>
        <div class="appointment-actions">
          <button class="action-button reschedule">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Reschedule
          </button>
          <button class="action-button cancel">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            Cancel
          </button>
        </div>
      </div>

      <div class="appointment-card">
        <div class="appointment-date">
          <div class="calendar-icon">
            <div class="month">JUN</div>
            <div class="day">18</div>
          </div>
          <div class="time">10:30 AM</div>
        </div>
        <div class="appointment-details">
          <h3>Final Walk-through</h3>
          <p class="appointment-address">456 Downtown Ave, Suite 12B, Metro City</p>
          <p class="appointment-info">
            <span class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              John Smith (Agent)
            </span>
            <span class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              45 minutes
            </span>
          </p>
        </div>
        <div class="appointment-actions">
          <button class="action-button reschedule">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Reschedule
          </button>
          <button class="action-button cancel">
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
</template>

<script setup>
// Appointments view logic could go here
</script>

<style scoped>
.appointments-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.appointments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.filter-tabs {
  display: flex;
  gap: 16px;
}

.tab-button {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.2s;
}

.tab-button.active {
  background-color: #e6f7ff;
  color: #1890ff;
}

.schedule-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #1a4189;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.schedule-button:hover {
  background-color: #133267;
}

.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.appointment-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 16px;
}

.appointment-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.calendar-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.month {
  background-color: #1a4189;
  color: white;
  font-size: 12px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  padding: 4px 0;
}

.day {
  background-color: white;
  color: #333;
  font-size: 22px;
  font-weight: 600;
  padding: 8px 0;
  width: 100%;
  text-align: center;
}

.time {
  margin-top: 8px;
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

.appointment-details {
  flex: 1;
}

.appointment-details h3 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.appointment-address {
  margin: 0 0 8px;
  font-size: 14px;
  color: #666;
}

.appointment-info {
  display: flex;
  gap: 16px;
  margin: 0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #555;
}

.appointment-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-button.reschedule {
  background-color: #e6f7ff;
  color: #1890ff;
}

.action-button.reschedule:hover {
  background-color: #bae7ff;
}

.action-button.cancel {
  background-color: #fff1f0;
  color: #f5222d;
}

.action-button.cancel:hover {
  background-color: #ffccc7;
}

/* Media Queries */
@media (max-width: 992px) {
  .action-button {
    padding: 8px;
  }

  .action-button span {
    display: none;
  }
}

@media (max-width: 768px) {
  .appointments-container {
    padding: 16px;
  }

  .appointments-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .filter-tabs {
    width: 100%;
    justify-content: space-between;
  }

  .schedule-button {
    width: 100%;
    justify-content: center;
  }

  .appointment-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .appointment-date {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 0;
    margin-bottom: 16px;
    width: 100%;
  }

  .calendar-icon {
    margin-right: 16px;
  }

  .appointment-details {
    margin-bottom: 16px;
    width: 100%;
  }

  .appointment-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .action-button span {
    display: inline;
  }
}
</style>
