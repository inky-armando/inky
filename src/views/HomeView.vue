<template>
  <div class="home">
    <Header></Header>
    <Projects class="bg-projects"></Projects>
    <Apps></Apps>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Apps from '@/components/Apps.vue';
import Projects from '@/components/Projects.vue';

export default {
  name: 'HomeView',
  components: {
    Header,
    Apps,
    Projects
  }
}
</script>

<style>
.bg-projects {
  background-color: rgba(43, 205, 226, 0.541)
}
</style>
