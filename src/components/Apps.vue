<template>
    <div class="container p-5">
        <h2 class="display-5 fw-bold text-body-emphasis">Apps</h2>
        <p class="lead mb-4">Functional Applications available for download</p>
        <div class="row justify-content-center">
            <ProjectCard class="col-lg-4 p-3" Title="Botells"></ProjectCard>  
        </div>
    </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue';

export default {
    components:{
        ProjectCard
    }
}
</script>