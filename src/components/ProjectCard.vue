<template>
    <div>
          <div class="bg-color" style="max-height: 540px;">
            <img :src="Img" class="card-img-top" style="height: 250px;">
            <div class="card-body p-3">
                <h5 class="card-title">{{ Title }}</h5>
              <p class="card-text">{{ Description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                </div>
                <small class="text-body-secondary">{{TimeRead}}</small>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
export default {
  props: ['Title', 'Description', 'TimeRead', "Img"],
  computed(){
    cssProps(); {
      return {
        '--bg-image' : this.Img
      }
    }
  },
  mounted(){
    
  }
}
</script>

<style>
.bg-color{
  background-color: rgb(162, 134, 201)!important;
}

.imageHolder {
  height: 180px;
  width: auto;
}


</style>