// Check user permissions and role in localStorage
console.log('Current localStorage values:');
console.log('user_role:', localStorage.getItem('user_role') || 'not set');
console.log('user_name:', localStorage.getItem('user_name') || 'not set');
console.log('user_id:', localStorage.getItem('user_id') || 'not set');

// Fix: Set admin role
localStorage.setItem('user_role', 'admin');
localStorage.setItem('user_name', 'Admin User');
localStorage.setItem('user_id', 'admin-123');

console.log('\nAfter updating:');
console.log('user_role:', localStorage.getItem('user_role'));
console.log('user_name:', localStorage.getItem('user_name'));
console.log('user_id:', localStorage.getItem('user_id'));

// Ensure browser refreshes to apply changes
console.log('\nPlease refresh your browser to apply the changes.');
