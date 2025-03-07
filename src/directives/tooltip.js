export default {
  mounted(el, binding) {
    el.setAttribute('title', binding.value);
    el.style.position = 'relative';

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = binding.value;
    tooltip.style.display = 'none';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(17, 24, 39, 0.9)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '13px';
    tooltip.style.fontWeight = '500';
    tooltip.style.zIndex = '9999';
    tooltip.style.maxWidth = '300px';
    tooltip.style.wordWrap = 'break-word';
    tooltip.style.top = '-40px';
    tooltip.style.left = '0';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    tooltip.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)';
    tooltip.style.transform = 'translateY(5px)';

    el.appendChild(tooltip);

    // Show tooltip on hover
    el.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
      setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
      }, 10);
    });

    // Hide tooltip when mouse leaves
    el.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'translateY(5px)';
      setTimeout(() => {
        tooltip.style.display = 'none';
      }, 200);
    });

    // Update tooltip position on mousemove
    el.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const rect = el.getBoundingClientRect();

      // Calculate position to keep tooltip within viewport
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      let tooltipX = x - rect.left;
      let tooltipY = y - rect.top - 40;

      // Adjust horizontal position if tooltip would go off-screen
      if (x + tooltipRect.width > viewportWidth) {
        tooltipX = x - rect.left - tooltipRect.width;
      }

      // Adjust vertical position if tooltip would go off-screen
      if (y - 40 < 0) {
        tooltipY = 10;
      }

      tooltip.style.top = tooltipY + 'px';
      tooltip.style.left = tooltipX + 'px';
    });
  },

  updated(el, binding) {
    // Update tooltip content if binding value changes
    const tooltip = el.querySelector('.custom-tooltip');
    if (tooltip) {
      tooltip.textContent = binding.value;
      el.setAttribute('title', binding.value);
    }
  },

  unmounted(el) {
    // Clean up
    const tooltip = el.querySelector('.custom-tooltip');
    if (tooltip) {
      el.removeChild(tooltip);
    }
  }
};
