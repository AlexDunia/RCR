// Diagnostic script to check all possible role sources

// Check localStorage
console.log("=== ROLE DIAGNOSTIC RESULTS ===");
console.log("1. localStorage value:", localStorage.getItem('user_role'));

// Check if there are other similar keys in localStorage
console.log("\n2. All localStorage keys containing 'role':");
Object.keys(localStorage).forEach(key => {
  if (key.toLowerCase().includes('role')) {
    console.log(`   - ${key}: ${localStorage.getItem(key)}`);
  }
});

// List all localStorage values for debugging
console.log("\n3. All localStorage entries:");
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`   - ${key}: ${localStorage.getItem(key)}`);
}

// Import checks
console.log("\n4. Important notes:");
console.log("   - If your app is still using old imports or not using the current roleStore, it might read from localStorage");
console.log("   - Some components might have their own local roles or not be updated to use the central roleStore");
console.log("   - The permissionService might still be checking localStorage directly in some places");

console.log("\n=== RECOMMENDED ACTIONS ===");
console.log("1. Clear localStorage completely: localStorage.clear()");
console.log("2. Verify all components import role from the roleStore");
console.log("3. Check if the permissionService is bypassing the roleStore");
console.log("4. Restart your development server");
