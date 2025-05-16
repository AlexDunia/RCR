import { ref, onMounted, onUnmounted } from 'vue';

export function useFixedHeader(triggerElementId = 'hero-section') {
  const isHeaderFixed = ref(false);

  onMounted(() => {
    const options = {
      threshold: 0,
      rootMargin: '-80px 0px 0px 0px' // Adjust this value to change when the header becomes fixed
    };

    const observer = new IntersectionObserver(([entry]) => {
      isHeaderFixed.value = !entry.isIntersecting;
    }, options);

    const triggerElement = document.getElementById(triggerElementId);
    if (triggerElement) {
      observer.observe(triggerElement);
    }

    onUnmounted(() => {
      if (triggerElement) {
        observer.unobserve(triggerElement);
      }
    });
  });

  return {
    isHeaderFixed
  };
}
