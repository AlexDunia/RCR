<script setup>
import { useHeaderStore } from "@/stores/headerStore";
import AddListingForm from "@/components/AddListingForm.vue";
import PageLoader from "@/ui/PageLoader.vue";

const headerStore = useHeaderStore();
headerStore.setTitle("Add Listing");
</script>

<template>
  <PageLoader>
    <div class="manage-listings">
      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <div class="tab-item">
          <router-link to="/add-listing" class="special">
            <i class="fas fa-plus-circle" id="special"></i> Add Listing
          </router-link>
          <div class="special-underline"></div>
        </div>

        <router-link to="/view-listings">
          <i class="fas fa-home"></i> View Listings
        </router-link>

        <router-link to="/pending-approvals" class="pend">
          <i class="fas fa-clock"></i> Pending Approvals
        </router-link>
        <router-link to="/drafts" class="drafts">
          <i class="fas fa-file-alt"></i> Drafts
        </router-link>
        <div class="tab-underline"></div>
      </div>
      <br />
      <div class="second-special-underline"></div>

      <div class="form-container">
        <AddListingForm />
      </div>
    </div>
  </PageLoader>
</template>
