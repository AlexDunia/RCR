<template>
    <div class="tab-navigation">
      <router-link to="/add-listing" active-class="active">Add Listing</router-link>
      <router-link to="/view-listings" active-class="active">View Listings</router-link>
      <router-link to="/pending-approvals" active-class="active">Pending approvals</router-link>
      <router-link to="/drafts" active-class="active">Drafts</router-link>
    </div>
  </template>

  <style scoped>
  .tab-navigation {
    display: flex;
    gap: 10px;
  }

  .tab-navigation a {
    padding: 10px 15px;
    border-radius: 5px;
    text-decoration: none;
    color: #333;
    border: 1px solid #ddd;
  }

  .tab-navigation a.active {
    background-color: #f0f0f0;
    border-color: #999;
  }
  </style>
