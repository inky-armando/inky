<template>
    <div class="">
        <div class="container p-5">
            <h2 class="display-5 fw-bold text-body-emphasis titles">Proyectos</h2>
            <p class="lead mb-4">Project ideas that I find very useful</p>
            <div class="row justify-content-center">
                <ProjectCard class="col-lg-4 p-3" v-for="project in projectList" :Title="project.title"
                    :Description="project.description" :TimeRead="project.timeRead" :Icon="project.icon"></ProjectCard>
                <div class="col p-3">
                    <button class="btn btn-outline-dark">Ver proyectos</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue';

export default {
    components: {
        ProjectCard
    },
    data() {
        return {
            projectList: [
                {
                    title: "Discord Bot",
                    description: "Serverless AWS Discord Bot created to provide media from different KPOP Idols.",
                    timeRead: "10 min",
                    icon: "fa-brands fa-discord"
                },
                {
                    title: "Web Browser Workers",
                    description: "Demostration of usage for Workers on web browsers.",
                    timeRead: "5 min",
                    icon: "fa-solid fa-microchip"
                },
                {
                    title: "AWS S3 Hosted website",
                    description: "Guide to develop and host your own website.",
                    timeRead: "5 min",
                    icon: "fa-brands fa-aws"
                }
            ]
        }
    }
}
</script>