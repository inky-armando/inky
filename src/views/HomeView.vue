<template>
  <div class="home">
    <Header></Header>
    <div class="bg-about p-2">
      <AboutView></AboutView>
    </div>
    <div>
      <div class="p-5">
        <h2 class="display-5 fw-bold text-body-emphasis titles">Esta página</h2>
        <p class="lead mb-4">¿Quieres saber como se hizo está página web?</p>
        <button class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Leer más</button>
      </div>
    </div>
    <Modal>
      <WebInfo></WebInfo>
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Apps from '@/components/Apps.vue'
import Projects from '@/components/Projects.vue'
import Modal from '@/components/Modal.vue'
import WebInfo from '@/components/WebInfo.vue'
import AboutView from './AboutView.vue'


export default {
  name: 'HomeView',
  components: {
    Modal,
    Header,
    Apps,
    Projects,
    WebInfo,
    AboutView
},
  methods: {

  }
}
</script>

<style>
.bg-projects {
  background-color: rgba(43, 205, 226, 0.541)
}

.bg-about {
  background-color: rgba(43, 205, 226, 0.541)
}
</style>
