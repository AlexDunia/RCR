// GLOBAL ROLE FIXER - Run this in your browser console

// Clear all localStorage first to remove any conflicting values
localStorage.clear();
console.log('✓ Cleared localStorage');

// Set a new clean role value
localStorage.setItem('user_role', 'admin'); // Change to 'agent' if needed
console.log(`✓ Set user_role to ${localStorage.getItem('user_role')}`);

// Force a complete page reload (bypassing cache)
console.log('⟳ Reloading page...');
window.location.reload(true);

// Note: After running this script, go to your roleStore.js and make sure
// the hardcoded value matches what you want:
//   const currentRole = ref('admin'); // or 'agent'
