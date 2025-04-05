import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
// import { useAuthStore } from './authStore';
import axios from 'axios'; // Assuming axios is used for API calls

// Base API configuration for Laravel backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Centralized Marketing Store with Domain Separation
export const useMarketingStore = defineStore('marketing', () => {
  // Shared state across marketing domains
  const isLoading = ref(false);
  const error = ref(null);

  // Common functions for all marketing domains
  const setLoading = (status) => {
    isLoading.value = status;
  };

  const setError = (errorMessage) => {
    error.value = errorMessage;
  };

  // Clear all errors
  const clearError = () => {
    error.value = null;
  };

  // Marketing Plans Module
  const plans = (() => {
    // Local state
    const marketingPlans = ref([]);
    const currentPlan = ref(null);

    // Getters
    const activePlans = computed(() =>
      marketingPlans.value.filter(plan => plan.status === 'active')
    );

    // Actions
    const fetchPlans = async () => {
      setLoading(true);
      clearError();
      try {
        // Will connect to Laravel API endpoint
        // const response = await api.get('/marketing/plans');
        // marketingPlans.value = response.data.data;

        // Using localStorage for now
        const storedPlans = localStorage.getItem('marketingPlans');
        marketingPlans.value = storedPlans ? JSON.parse(storedPlans) : [];
      } catch (err) {
        setError('Failed to load marketing plans');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const savePlan = async (plan) => {
      setLoading(true);
      clearError();
      try {
        // Will connect to Laravel API endpoint
        // const response = await api.post('/marketing/plans', plan);
        // const savedPlan = response.data.data;
        // marketingPlans.value.push(savedPlan);

        // Using localStorage for now
        const storedPlans = localStorage.getItem('marketingPlans');
        const plans = storedPlans ? JSON.parse(storedPlans) : [];

        // Add creation date if it doesn't exist
        if (!plan.creationDate) {
          plan.creationDate = new Date().toISOString();
        }

        plans.push(plan);
        localStorage.setItem('marketingPlans', JSON.stringify(plans));
        marketingPlans.value = plans;
        return plan;
      } catch (err) {
        setError('Failed to save marketing plan');
        console.error(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    const getPlanById = async (id) => {
      if (marketingPlans.value.length === 0) {
        await fetchPlans();
      }
      currentPlan.value = marketingPlans.value[id] || null;
      return currentPlan.value;
    };

    return {
      marketingPlans,
      currentPlan,
      activePlans,
      fetchPlans,
      savePlan,
      getPlanById
    };
  })();

  // Checklists Module
  const checklists = (() => {
    // Local state
    const marketingChecklists = ref([]);
    const currentChecklist = ref(null);

    // Getters
    const pendingChecklists = computed(() =>
      marketingChecklists.value.filter(checklist => !checklist.completed)
    );

    // Data migration from old localStorage key to new one
    const migrateChecklistData = () => {
      try {
        // Check if old data exists
        const oldChecklists = localStorage.getItem('checklists');
        if (oldChecklists) {
          console.log('Found old checklist data. Migrating...');
          const parsedOldChecklists = JSON.parse(oldChecklists);

          // Check if we have data to migrate
          if (parsedOldChecklists && parsedOldChecklists.length > 0) {
            // Get existing data in new location (if any)
            const existingChecklists = localStorage.getItem('marketingChecklists');
            const parsedExistingChecklists = existingChecklists ? JSON.parse(existingChecklists) : [];

            // Merge data, ensuring no duplicates by ID
            const mergedChecklists = [...parsedExistingChecklists];

            parsedOldChecklists.forEach(oldChecklist => {
              // Check if this checklist doesn't already exist in the new storage
              if (!mergedChecklists.some(existing => existing.id === oldChecklist.id)) {
                mergedChecklists.push(oldChecklist);
              }
            });

            // Save merged data to new location
            localStorage.setItem('marketingChecklists', JSON.stringify(mergedChecklists));
            console.log(`Migration complete. Moved ${parsedOldChecklists.length} checklists.`);

            // Don't delete old data yet - keep as backup
            // localStorage.removeItem('checklists');
          }
        }
      } catch (error) {
        console.error('Error migrating checklist data:', error);
      }
    };

    // Actions
    const fetchChecklists = async () => {
      setLoading(true);
      clearError();
      try {
        // Migrate data from old localStorage key first
        migrateChecklistData();

        // Will connect to Laravel API endpoint
        // const response = await api.get('/marketing/checklists');
        // marketingChecklists.value = response.data.data;

        // Using localStorage for now
        const storedChecklists = localStorage.getItem('marketingChecklists');
        marketingChecklists.value = storedChecklists ? JSON.parse(storedChecklists) : [];
      } catch (err) {
        setError('Failed to load marketing checklists');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const saveChecklist = async (checklist) => {
      setLoading(true);
      clearError();
      try {
        // Will connect to Laravel API endpoint
        // const response = await api.post('/marketing/checklists', checklist);
        // const savedChecklist = response.data.data;
        // marketingChecklists.value.push(savedChecklist);

        // Using localStorage for now
        const storedChecklists = localStorage.getItem('marketingChecklists');
        const checklists = storedChecklists ? JSON.parse(storedChecklists) : [];

        // Generate id if it doesn't exist
        if (!checklist.id) {
          checklist.id = Date.now().toString();
        }

        checklists.push(checklist);
        localStorage.setItem('marketingChecklists', JSON.stringify(checklists));
        marketingChecklists.value = checklists;
        return checklist;
      } catch (err) {
        setError('Failed to save marketing checklist');
        console.error(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    const getChecklistById = async (id) => {
      if (marketingChecklists.value.length === 0) {
        await fetchChecklists();
      }
      currentChecklist.value = marketingChecklists.value.find(c => c.id === id) || null;
      return currentChecklist.value;
    };

    return {
      marketingChecklists,
      currentChecklist,
      pendingChecklists,
      fetchChecklists,
      saveChecklist,
      getChecklistById
    };
  })();

  // Social Media Module
  const social = (() => {
    // Local state
    const posts = ref([]);
    const platforms = ref([
      {
        id: 'X',
        name: 'X',
        data: [70, 55, 30, 40, 20, 80, 55],
        lastUpdated: new Date().toISOString(),
        totalFollowers: 20
      },
      {
        id: 'Facebook',
        name: 'Facebook',
        data: [70, 55, 30, 40, 20, 80, 55],
        lastUpdated: new Date().toISOString(),
        totalFollowers: 20
      },
      {
        id: 'LinkedIn',
        name: 'LinkedIn',
        data: [70, 55, 30, 40, 20, 80, 55],
        lastUpdated: new Date().toISOString(),
        totalFollowers: 20
      }
    ]);
    const currentPost = ref(null);

    // Analytics data
    const currentStats = ref({
      likes: 600,
      comments: 1500,
      shares: 3006,
      impressions: 15000,
      reach: 180,
      videoViews: 'No videos posted',
      avgWatchTime: 'Null'
    });

    // Getters
    const scheduledPosts = computed(() =>
      posts.value.filter(post => post.status === 'scheduled')
    );

    const publishedPosts = computed(() =>
      posts.value.filter(post => post.status === 'published')
    );

    // Actions
    const fetchPosts = async () => {
      setLoading(true);
      clearError();
      try {
        // Will connect to Laravel API endpoint
        // const response = await api.get('/marketing/social/posts');
        // posts.value = response.data.data;

        // Using localStorage for now
        const storedPosts = localStorage.getItem('socialPosts');
        posts.value = storedPosts ? JSON.parse(storedPosts) : [];
      } catch (err) {
        setError('Failed to load social media posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const savePost = async (post) => {
      setLoading(true);
      clearError();
      try {
        // Will connect to Laravel API endpoint
        // const response = await api.post('/marketing/social/posts', post);
        // const savedPost = response.data.data;
        // posts.value.push(savedPost);

        // Using localStorage for now
        const storedPosts = localStorage.getItem('socialPosts');
        const allPosts = storedPosts ? JSON.parse(storedPosts) : [];

        // Generate id if it doesn't exist
        if (!post.id) {
          post.id = Date.now().toString();
        }

        allPosts.push(post);
        localStorage.setItem('socialPosts', JSON.stringify(allPosts));
        posts.value = allPosts;
        return post;
      } catch (err) {
        setError('Failed to save social media post');
        console.error(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    const fetchPlatformMetrics = async () => {
      setLoading(true);
      clearError();
      try {
        // Will connect to Laravel API endpoint
        // const response = await api.get('/marketing/social/metrics');
        // platforms.value = response.data.data;

        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulated API delay
        // platforms.value is already populated with mock data
      } catch (err) {
        setError('Failed to load social media metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const getPostById = async (id) => {
      if (posts.value.length === 0) {
        await fetchPosts();
      }
      currentPost.value = posts.value.find(p => p.id === id) || null;
      return currentPost.value;
    };

    return {
      posts,
      platforms,
      currentPost,
      currentStats,
      scheduledPosts,
      publishedPosts,
      fetchPosts,
      savePost,
      fetchPlatformMetrics,
      getPostById
    };
  })();

  // Templates Module (Done For You content)
  const templates = (() => {
    // Local state
    const marketingTemplates = ref([]);
    const templateCategories = ref(['Email', 'Social Media', 'Flyers', 'Postcards']);

    // Actions
    const fetchTemplates = async (category = null) => {
      setLoading(true);
      clearError();
      try {
        // Will connect to Laravel API endpoint
        // const params = category ? { category } : {};
        // const response = await api.get('/marketing/templates', { params });
        // marketingTemplates.value = response.data.data;

        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulated API delay

        // Mock data - would come from API
        marketingTemplates.value = [
          { id: 1, title: 'Spring Home Sales', category: 'Email', thumbnail: '/templates/email-1.jpg' },
          { id: 2, title: 'New Listing Announcement', category: 'Social Media', thumbnail: '/templates/social-1.jpg' },
          { id: 3, title: 'Open House Invitation', category: 'Flyers', thumbnail: '/templates/flyer-1.jpg' },
          { id: 4, title: 'Just Sold Announcement', category: 'Postcards', thumbnail: '/templates/postcard-1.jpg' },
        ];

        // Filter by category if provided
        if (category) {
          marketingTemplates.value = marketingTemplates.value.filter(t => t.category === category);
        }
      } catch (err) {
        setError('Failed to load marketing templates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    return {
      marketingTemplates,
      templateCategories,
      fetchTemplates
    };
  })();

  // Return the entire store with all modules
  return {
    // Shared state
    isLoading,
    error,

    // Module exports
    plans,
    checklists,
    social,
    templates,

    // Shared methods
    clearError
  };
});
