<template>
  <div class="about container">
    <img src="./../assets/armando.jpg" alt="" class="armando">
    <div class="m-2">
      <h1 class="display-5 fw-bold text-body-primary ">J. Armando Mercado Lugo</h1>
      <p class="lead mb-4">Software Developer - Cloud Engineer</p>
    </div>
    <hr>
    <div class="p-2 display-experience">
      <h2 class="display-5 fw-bold text-body-primary titles mt-4">Experience</h2>
      <p class="lead mb-4">Previous experience as a Software Developer</p>
      <div class="row justify-content-center">
        <div class="card text-bg-dark mt-4" v-for="e in experience" :key="e.id">
          <h5 class="card-header">{{ e.title }} - {{ e.time_spend }}</h5>
          <div class="card-body">
            <h5 class="card-title"><strong>{{ e.job_title }}</strong></h5>
            <p class="card-text">{{ e.role_description }}</p>
            <hr>
            <div class="container row justify-content-around">
              <p class="card-text col-1" v-for="i in e.languages">
                <font-awesome-icon :icon="i" style="font-size: 25px;" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="certifications">
      <h2 class="display-5 fw-bold text-body-primary titles mt-4">Certifications</h2>
      <p class="lead mb-4">My current certifications badges</p>
      <div class="cert">
        <a target="_blank" href="https://www.credly.com/badges/286074e5-2b4b-4654-9bc3-ed54efae6943/public_url">
          <img src="./../assets/aws.png" alt="" class="badge-cert">
        </a>
      </div>
    </div>
    <hr>
    <div class="languages m-4">
      <h2 class="display-5 fw-bold text-body-primary titles mt-4">Languages</h2>
      <p class="lead mb-4">Languages I speak</p>
      <div class="card text-bg-dark mt-4">
        <div class="card-body">
          <h5 class="card-title"><strong>Spanish - Native</strong></h5>
        </div>
      </div>
      <a target="_blank" href="https://www.efset.org/cert/XBH8e1">
        <div class="card text-bg-dark mt-4">
          <div class="card-body">
            <h5 class="card-title"><strong>English - C1 Advanced</strong></h5>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import api from '../api/api'

export default {
  data() {
    return {
      experience: [],
      certifications: []
    }
  },
  created() {
    this.experience = api.experience
    this.certifications = api.certifications
  }
}
</script>

<style>
.armando {
  height: 30vh;
  margin: 10px;
  border-radius: 100%;
}

.badge-cert {
  height: 30vh;
  margin: 10px;
}

.text-bg-dark {
  background-color: rgb(12, 17, 36) !important;
}
</style>
