<template>
  <div>
    <div class="bg-color" style="max-height: 540px;">
      <font-awesome-icon :icon="Icon" style="font-size: 80px;" class="p-4" />
      <div class="card-body p-2">
        <h5 class="card-title">{{ Title }}</h5>
        <p class="card-text">{{ Description }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <router-link :to="'/project/' + Id"><button type="button"
                class="btn btn-sm btn-outline-light">View</button></router-link>
          </div>
          <small class="text-body-secondary">{{ TimeRead }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Id: {
      type: Number,
      default: 0
    },
    Icon: {
      type: String,
      default: 'plug'
    },
    Title: {
      type: String,
      default: 'Title'
    },
    Description: {
      type: String,
      default: 'Project description'
    },
    TimeRead: {
      type: String,
      default: '10 min'
    }
  },

}
</script>

<style>
.bg-color {
  background-color: rgb(162, 134, 201) !important;
}
</style>