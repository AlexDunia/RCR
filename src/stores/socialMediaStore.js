import { ref } from 'vue';

// Social media data store (mimicking API response)
export const useSocialMediaStore = () => {
  const isLoading = ref(false);
  const error = ref(null);
  
  // Initial dummy data matching the screenshot
  const socialPlatforms = ref([
    {
      id: 'X',
      name: 'X',
      data: [70, 55, 30, 40, 20, 80, 55],
      lastUpdated: '2023-10-15T10:00:00Z',
      totalFollowers: 20
    },
    {
      id: 'Facebook',
      name: 'Facebook',
      data: [70, 55, 30, 40, 20, 80, 55],
      lastUpdated: '2023-10-15T10:00:00Z',
      totalFollowers: 20
    },
    {
      id: 'LinkedIn',
      name: 'LinkedIn',
      data: [70, 55, 30, 40, 20, 80, 55],
      lastUpdated: '2023-10-15T10:00:00Z',
      totalFollowers: 20
    }
  ]);

  // Function to fetch social media data from API
  const fetchSocialMediaData = async (postId = null) => {
    // postId would be used in the actual API call to fetch data for a specific post
    isLoading.value = true;
    error.value = null;
    
    try {
      // In a real implementation, this would be an API call:
      // const response = await fetch(`/api/posts/${postId}/social-metrics`);
      // if (!response.ok) throw new Error('Failed to fetch social media data');
      // const data = await response.json();
      // socialPlatforms.value = data;
      
      // For now, we're using the hardcoded data with a simulated delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update with more realistic data that matches the screenshot
      socialPlatforms.value = [
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
      ];
      
      console.log('Social media data loaded');
    } catch (err) {
      console.error('Error fetching social media data:', err);
      error.value = err.message || 'Failed to load social media data';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    socialPlatforms,
    isLoading,
    error,
    fetchSocialMediaData
  };
}; 