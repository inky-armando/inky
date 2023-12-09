<template>
    <div class="">
        <div class="container p-5">
            <h2 class="display-5 fw-bold text-body-emphasis titles">Proyectos</h2>
            <p class="lead mb-4">Project ideas that I find very useful</p>
            <div class="row justify-content-center">
                <ProjectCard class="col-lg-4 p-3" v-for="project in projectList" :Title="project.title"
                    :Description="project.description" :TimeRead="project.timeRead" :Icon="project.icon" :Id="project.id"></ProjectCard>
                <div class="col p-3">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api/api'
import ProjectCard from './ProjectCard.vue';

export default {
    components: {
        ProjectCard
    },
    data() {
        return {
            projectList: null
        }
    },
    created(){
        this.projectList = api.projects
    }
}
</script>