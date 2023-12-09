<template>
    <div class="container">
        <div v-html="body" class="html-body"></div>
    </div>
</template>

<script>
import api from '../api/api'

export default {
    data(){
        return {
            body: ""
        }
    },
    created(){
        console.log(api.projects)
        api.projects.forEach( project => {
            if(project.id == this.$route.params.id) this.body = project.body
        })
        console.log(this.$route.params.id)
    }
}
</script>

<style>
.html-body {
    text-align: start;
}

.lang-javascript {
    color: rgb(214, 209, 209);
}

pre {
    background-color: rgb(34, 34, 54);
    padding: 10px;
}

.hljs-function{
    color: rgb(218, 138, 207);
}

.hljs-keyword, .hljs-built_in {
    color: rgb(13, 230, 238);
}

.hljs-string {
    color: rgb(167, 207, 106);
}

.hljs-params {
    color: gainsboro;
}

.lang-shell {
    color: rgb(255, 196, 0);
}
</style>