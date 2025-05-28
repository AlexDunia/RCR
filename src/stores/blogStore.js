import { defineStore } from 'pinia';
import { ref } from 'vue';
// import axios from 'axios'; // Uncomment when ready to use Laravel API

export const useBlogStore = defineStore('blog', () => {
  // State: initial hardcoded blogs (from LandingPage.vue)
  const blogs = ref([
    {
      id: 1,
      title: '5 Tips for First-Time Home Buyers',
      desc: 'Buying your first home can be overwhelming. Here are five essential tips to help you navigate the process, from budgeting to closing the deal. Learn how to make your first purchase a success. These tips will help you avoid common pitfalls and make informed decisions throughout your home buying journey.',
      link: '#',
    },
    {
      id: 2,
      title: 'How to Choose the Right Neighborhood',
      desc: 'Choosing the right neighborhood is just as important as the home itself. Discover what factors to consider, from schools to amenities, and how to find the perfect fit for your lifestyle. Our guide will help you make the best choice for your family.',
      link: '#',
    },
    {
      id: 3,
      title: 'Understanding Pre-Construction Projects',
      desc: 'Pre-construction projects offer unique opportunities and risks. Learn what you need to know before investing, including timelines, contracts, and how to spot the best deals. Get the most out of your investment with our expert advice.',
      link: '#',
    }
  ]);

  // Loading and error state for async actions
  const isLoading = ref(false);
  const error = ref(null);

  // Getter: all blogs
  function getAllBlogs() {
    return blogs.value;
  }

  // Getter: get blog by id
  function getBlogById(id) {
    return blogs.value.find(blog => blog.id === id);
  }

  // Action: fetch blogs (mocked, but ready for API)
  async function fetchBlogs() {
    isLoading.value = true;
    error.value = null;
    try {
      // Uncomment and update when ready for Laravel API:
      // const response = await axios.get('/api/blogs');
      // blogs.value = response.data.data;
      // For now, just simulate delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // blogs.value is already set with hardcoded data
    } catch (err) {
      error.value = err.message || 'Failed to fetch blogs';
    } finally {
      isLoading.value = false;
    }
  }

  // Action: add blog (for future use)
  async function addBlog(newBlog) {
    isLoading.value = true;
    error.value = null;
    try {
      // Uncomment and update for Laravel API:
      // const response = await axios.post('/api/blogs', newBlog);
      // blogs.value.push(response.data.data);
      // For now, just add locally
      blogs.value.push({ ...newBlog, id: Date.now() });
    } catch (err) {
      error.value = err.message || 'Failed to add blog';
    } finally {
      isLoading.value = false;
    }
  }

  return {
    blogs,
    isLoading,
    error,
    getAllBlogs,
    getBlogById,
    fetchBlogs,
    addBlog,
  };
}); 