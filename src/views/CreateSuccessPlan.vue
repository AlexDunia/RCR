<template>
  <div class="admin-form-container">
    <h1>Create Marketing Plan</h1>

    <form @submit.prevent="savePlan">
      <!-- Plan Header Details -->
      <section>
        <h2>Plan Header Details</h2>
        <div class="form-group">
          <label for="plan-title">Plan Title</label>
          <input id="plan-title" v-model="plan.title" placeholder="e.g., Marketing Strategy for Williams" maxlength="100" required />
        </div>
        <div class="form-group">
          <label for="creation-date">Creation Date</label>
          <input id="creation-date" type="datetime-local" v-model="plan.creationDate" required />
        </div>
      </section>

      <!-- Strategy Overview -->
      <section>
        <h2>Strategy Overview</h2>
        <div class="form-group">
          <label for="strategy-overview">Strategy Overview</label>
          <textarea id="strategy-overview" v-model="plan.strategyOverview" maxlength="500" required placeholder="Provide a brief overview..."></textarea>
        </div>
      </section>

      <!-- Target Audience -->
      <section>
        <h2>Target Audience Segments</h2>
        <div v-for="(audience, index) in plan.targetAudiences" :key="index" class="audience-item">
          <div class="form-group">
            <label :for="'audience-title-' + index">Audience Title</label>
            <input :id="'audience-title-' + index" v-model="audience.title" placeholder="Audience Title" maxlength="50" required />
          </div>
          <div class="form-group">
            <label :for="'audience-description-' + index">Audience Description</label>
            <textarea :id="'audience-description-' + index" v-model="audience.description" maxlength="200" required placeholder="Audience Description"></textarea>
          </div>
          <div class="form-group">
            <label :for="'audience-icon-' + index">Audience Icon</label>
            <div class="custom-select-wrapper">
              <select :id="'audience-icon-' + index" v-model="audience.icon" required>
                <option value="" disabled>Select an icon</option>
                <option value="user-group">User Group</option>
                <option value="briefcase">Briefcase</option>
                <option value="users">Users</option>
                <option value="building">Building</option>
                <option value="chart">Chart</option>
              </select>
              <span v-if="audience.icon" class="selected-icon">
                <svg v-if="audience.icon === 'user-group'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.66-5.33-4-8-4z"/>
                </svg>
                <svg v-if="audience.icon === 'briefcase'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
                <svg v-if="audience.icon === 'users'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <svg v-if="audience.icon === 'building'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M4 2h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm2 4v12h12V6H6zm2 2h2v2H8V8zm0 4h2v2H8v-2zm0 4h2v2H8v-2zm4 0h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2V8z"/>
                </svg>
                <svg v-if="audience.icon === 'chart'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H8v-4h4v4zm4 0h-4v-4h4v4zm0-6h-4v-4h4v4zm-4-6H8v4h4V5z"/>
                </svg>
              </span>
            </div>
          </div>
          <button @click.prevent="removeAudience(index)">Remove</button>
        </div>
        <button @click.prevent="addAudience" :disabled="plan.targetAudiences.length >= 5">Add Audience</button>
      </section>

      <!-- Marketing Channels -->
      <section>
        <h2>Marketing Channels</h2>
        <div v-for="(channel, index) in plan.channels" :key="index" class="channel-item">
          <div class="form-group">
            <label :for="'channel-name-' + index">Channel Name</label>
            <div class="custom-select-wrapper">
              <select :id="'channel-name-' + index" v-model="channel.name" required @change="updateChannelIcon(index)">
                <option value="" disabled>Select channel for marketing</option>
                <option value="Social Media - Instagram">Social Media - Instagram</option>
                <option value="Social Media - TikTok">Social Media - TikTok</option>
                <option value="Social Media - Facebook">Social Media - Facebook</option>
                <option value="Social Media - Twitter">Social Media - Twitter</option>
                <option value="Social Media - LinkedIn">Social Media - LinkedIn</option>
                <option value="Email Marketing">Email Marketing</option>
                <option value="Google Ads">Google Ads</option>
                <option value="SEO">SEO</option>
                <option value="YouTube">YouTube</option>
                <option value="Pinterest">Pinterest</option>
                <option value="Others">Others</option>
              </select>
              <span v-if="channel.icon" class="selected-icon">
                <svg v-if="channel.icon === 'instagram'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <svg v-if="channel.icon === 'tiktok'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44.03c.08 1.54.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.33.04-4.61-1.04-5.94-2.95-1.32-1.91-1.85-4.38-1.48-6.65.38-2.27 1.76-4.27 3.71-5.49 1.95-1.22 4.34-1.58 6.61-.98v4.03c-.93-.38-1.92-.62-2.92-.71-1-.09-2.02.05-2.94.41-.92.36-1.72 1.02-2.27 1.81-.55.79-.85 1.74-.85 2.69 0 .95.3 1.9.85 2.69.55.79 1.35 1.45 2.27 1.81.92.36 1.94.5 2.94.41 1-.09 1.99-.33 2.92-.71 1.93-.76 3.37-2.49 3.88-4.48.51-1.99.41-4.07.31-6.11V.02z"/>
                </svg>
                <svg v-if="channel.icon === 'facebook'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <svg v-if="channel.icon === 'twitter'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <svg v-if="channel.icon === 'linkedin'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.866-3.063-1.867 0-2.154 1.459-2.154 2.966v5.701h-3v-11h2.879v1.526h.041c.401-.761 1.378-1.563 2.834-1.563 3.03 0 3.586 1.996 3.586 4.592v6.445z"/>
                </svg>
                <svg v-if="channel.icon === 'email'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <svg v-if="channel.icon === 'google'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 11h8.1c.1.5.1 1.1.1 1.7 0 5.5-3.7 9.4-8.2 9.4-4.7 0-8.5-3.9-8.5-8.6s3.8-8.6 8.5-8.6c2.1 0 4 .8 5.3 2l-2.1 2c-.9-.9-2.1-1.4-3.2-1.4-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c3.1 0 4.3-2.2 4.5-3.4h-4.5V11z"/>
                </svg>
                <svg v-if="channel.icon === 'seo'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26.81-1 1.39-1.9 1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V10h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.81 3.98-2.1 5.39z"/>
                </svg>
                <svg v-if="channel.icon === 'youtube'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21.58 7.19c-.23-.86-.87-1.5-1.73-1.73C18.37 5 12 5 12 5s-6.37 0-7.85.47c-.86.23-1.5.87-1.73 1.73C2 8.63 2 12 2 12s0 3.37.47 4.81c.23.86.87 1.5 1.73 1.73C5.63 19 12 19 12 19s6.37 0 7.85-.47c.86-.23 1.5-.87 1.73-1.73C22 15.37 22 12 22 12s0-3.37-.42-4.81zM9.5 15.5V8.5l6 3.5-6 3.5z"/>
                </svg>
                <svg v-if="channel.icon === 'pinterest'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.139 3.247 9.501 7.792 11.166-.108-.945-.204-2.396.043-3.429.222-.936 1.428-5.967 1.428-5.967s-.364-.732-.364-1.814c0-1.698.986-2.966 2.214-2.966 1.043 0 1.546.786 1.546 1.729 0 1.053-.669 2.627-1.015 4.084-.289 1.216.609 2.207 1.803 2.207 2.162 0 3.825-2.279 3.825-5.571 0-2.911-2.094-4.944-5.084-4.944-3.463 0-5.494 2.597-5.494 5.279 0 1.052.405 2.181.912 2.794.1.121.115.227.084.35-.094.384-.609 2.408-.684 2.742-.094.419-.304.509-.702.304-1.041-.536-1.695-2.229-1.695-3.591 0-2.923 2.124-5.611 6.126-5.611 3.216 0 5.711 2.294 5.711 5.354 0 3.191-2.014 5.761-4.805 5.761-1.167 0-2.267-.609-2.645-1.326 0 0-.577 2.194-.715 2.732-.254.986-.938 2.215-1.395 2.962 1.056.329 2.162.508 3.309.508 6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
                <svg v-if="channel.icon === 'others'" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </span>
            </div>
          </div>
          <div class="form-group">
            <label :for="'channel-description-' + index">Channel Description</label>
            <textarea :id="'channel-description-' + index" v-model="channel.description" maxlength="150" required placeholder="Channel Description"></textarea>
          </div>
          <div class="form-group">
            <label :for="'channel-highlight-' + index">Highlight Channel</label>
            <input :id="'channel-highlight-' + index" type="checkbox" v-model="channel.highlight" />
          </div>
          <button @click.prevent="removeChannel(index)">Remove</button>
        </div>
        <button @click.prevent="addChannel" :disabled="plan.channels.length >= 6">Add Channel</button>
      </section>

      <!-- Timeline -->
      <section>
        <h2>Timeline Milestones</h2>
        <div v-for="(milestone, index) in plan.timeline" :key="index">
          <div class="form-group">
            <label :for="'milestone-title-' + index">Milestone Title</label>
            <input :id="'milestone-title-' + index" v-model="milestone.title" placeholder="Milestone Title" maxlength="50" required />
          </div>
          <div class="form-group">
            <label :for="'milestone-description-' + index">Milestone Description</label>
            <textarea :id="'milestone-description-' + index" v-model="milestone.description" maxlength="200" required placeholder="Milestone Description"></textarea>
          </div>
          <div class="form-group">
            <label :for="'milestone-date-' + index">Milestone Date</label>
            <input :id="'milestone-date-' + index" type="date" v-model="milestone.date" />
          </div>
          <button @click.prevent="removeMilestone(index)">Remove</button>
        </div>
        <button @click.prevent="addMilestone" :disabled="plan.timeline.length >= 10">Add Milestone</button>
      </section>

      <!-- Additional Settings -->
      <section>
        <h2>Additional Settings</h2>
        <div class="form-group">
          <label for="plan-status">Plan Status</label>
          <select id="plan-status" v-model="plan.status">
            <option>Draft</option>
            <option>Active</option>
            <option>Archived</option>
          </select>
        </div>
        <div class="form-group">
          <label for="assigned-agents">Assigned Agents</label>
          <select id="assigned-agents" multiple v-model="plan.assignedAgents">
            <option>Alex Dunia</option>
            <option>Jane Smith</option>
          </select>
        </div>
        <div class="form-group">
          <label for="internal-notes">Internal Notes (Admin Only)</label>
          <textarea id="internal-notes" v-model="plan.internalNotes" maxlength="1000" placeholder="Internal Notes (Admin Only)"></textarea>
        </div>
      </section>

      <button type="submit">Save Plan</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const plan = ref({
  title: 'Marketing Strategy for Williams',
  creationDate: new Date().toISOString().slice(0, 16),
  strategyOverview: 'This comprehensive marketing strategy is designed to maximize exposure and engagement for the Williams property.',
  targetAudiences: [{ title: 'Young Professionals', description: 'Ages 28-40, household income $100k+', icon: 'user-group' }],
  channels: [{ name: 'Social Media - Instagram', description: 'Instagram campaigns', icon: 'instagram', highlight: true }],
  timeline: [{ title: 'Week 1: Launch', description: 'Photography and virtual tour', date: '2024-12-01' }],
  status: 'Draft',
  assignedAgents: ['Alex Dunia'],
  internalNotes: 'Discuss with marketing team before finalizing'
});

const router = useRouter();

const addAudience = () => plan.value.targetAudiences.push({ title: '', description: '', icon: '' });
const removeAudience = (index) => plan.value.targetAudiences.splice(index, 1);

const addChannel = () => plan.value.channels.push({ name: '', description: '', icon: '', highlight: false });
const removeChannel = (index) => plan.value.channels.splice(index, 1);

const addMilestone = () => plan.value.timeline.push({ title: '', description: '', date: '' });
const removeMilestone = (index) => plan.value.timeline.splice(index, 1);

// Map channel names to icons
const updateChannelIcon = (index) => {
  const channelName = plan.value.channels[index].name;
  const iconMap = {
    'Social Media - Instagram': 'instagram',
    'Social Media - TikTok': 'tiktok',
    'Social Media - Facebook': 'facebook',
    'Social Media - Twitter': 'twitter',
    'Social Media - LinkedIn': 'linkedin',
    'Email Marketing': 'email',
    'Google Ads': 'google',
    'SEO': 'seo',
    'YouTube': 'youtube',
    'Pinterest': 'pinterest',
    'Others': 'others'
  };
  plan.value.channels[index].icon = iconMap[channelName] || '';
};

const savePlan = () => {
  const existingPlans = JSON.parse(localStorage.getItem('marketingPlans') || '[]');
  existingPlans.push(plan.value);
  localStorage.setItem('marketingPlans', JSON.stringify(existingPlans));
  alert('Plan saved successfully!');
  router.push('/marketing-tools');
};
</script>

<style scoped>
.admin-form-container {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  background: #FFFFFF;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

section {
  margin-bottom: 3rem;
  background: #F8FAFC;
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid #E5E7EB;
  transition: all 0.3s ease;
}

section:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1E3A8A;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
}

input, textarea, select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #FFFFFF;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group:focus-within label {
  color: #2563EB;
}

button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
}

button:active {
  transform: translateY(0);
}

button:disabled {
  background: #D1D5DB;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.audience-item, .channel-item {
  background: #FFFFFF;
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #E5E7EB;
  transition: all 0.3s ease;
}

.audience-item:hover, .channel-item:hover {
  border-color: #3B82F6;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.1);
}

.custom-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.selected-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #EFF6FF;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.selected-icon:hover {
  transform: scale(1.1);
}

.icon {
  width: 20px;
  height: 20px;
  fill: #2563EB;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.audience-item, .channel-item {
  animation: fadeIn 0.3s ease forwards;
}

/* Form validation styling */
input:invalid, textarea:invalid, select:invalid {
  border-color: #EF4444;
}

input:invalid:focus, textarea:invalid:focus, select:invalid:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Submit button styling */
button[type="submit"] {
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  font-size: 1.125rem;
  background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%);
}

button[type="submit"]:hover {
  background: linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%);
}
</style>
