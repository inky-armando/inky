<template>
    <div class="">
        <div class="container p-5">
            <h2 class="display-5 fw-bold text-body-emphasis">Proyectos</h2>
            <p class="lead mb-4">A Couple of free lance projects I have been working on</p>
            <div class="row justify-content-center">
                <ProjectCard class="col-lg-4 p-3" v-for="project in projectList" :Title="project.title"
                    :Description="project.description" :TimeRead="project.timeRead" :Img="project.img"></ProjectCard>
                <div class="col p-3">
                    <button class="btn btn-outline-secondary">Ver proyectos</button>
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
                    img: "https://i.pinimg.com/564x/b3/d8/f2/b3d8f209d3d24c4802c1900ee2397ee3.jpg"
                },
                {
                    title: "Worker Counters",
                    description: "Demostration of usage for Workers on web browsers.",
                    timeRead: "5 min",
                    img: ""
                },
                {
                    title: "Worker Counters",
                    description: "Demostration of usage for Workers on web browsers.",
                    timeRead: "5 min",
                    img: ""
                }
            ]
        }
    }
}
</script>