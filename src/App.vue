<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
@font-face {
    font-family: 'Alien';
    src: url('./static/fonts/Alien/Alien-Encounters-Regular.ttf');
}

@font-face {
    font-family: 'VCR MONO';
    src: url('./static/fonts/VCR-MONO/VCR_MONO.ttf');
}

html, body {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
}

#app {
    font-family: VCR MONO;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}
</style>
