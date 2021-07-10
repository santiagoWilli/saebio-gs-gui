<template>
    <div class="mb-3">
        <b>Sæbio: automatización de un pipeline de aplicaciones para la secuenciación del genoma</b>
        es un servicio para la generación de informes de vigilancia epidemiológica.
    </div>
    <div class="mb-5">
        Se trata del resultado de un trabajo de fin de grado, realizado por <b>Santiago Martínez Willi</b>
        y tutorizado por <b>José Juan Hernández Cabrera</b>, que nace a raíz de las necesidades planteadas por
        el <b>Hospital Universitario de Gran Canaria Doctor Negrín</b> para cumplir con el Plan Nacional de
        Resistencia a los Antibióticos (PRAN).
    </div>
    <div>
        Enlaces a los repositorios de las aplicaciones que conforman este proyecto:
        <ul>
            <li><a href="https://github.com/santiagoWilli/saebio-genome-sequencing-api" target="_blank">Sæbio: genome sequencing API</a></li>
            <li><a href="https://github.com/santiagoWilli/saebio-nullarbor-api" target="_blank">Sæbio: Nullarbor API</a></li>
            <li><a href="https://github.com/santiagoWilli/saebio-gs-gui" target="_blank">Sæbio: genome sequencing GUI</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    margin: 5px 10px;
}
a {
    color: #42b983;
}
</style>
