<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <p style="margin-top: 0px;">Front Page</p> -->
    <h1>SIRUHYAN</h1>
    <h6>Sistem Informasi Rumah Layak Huni</h6>
    <!-- <b-card-group> -->
        <b-card
        img-src="https://image.freepik.com/free-vector/modern-check-list-illustration_79603-146.jpg"
        img-right
        >
        <b-card-text style="height: 100%; padding-top:40%">
            <h4>Form Penilaian Rumah Layak Huni</h4>
            <br>
            <p>Form ini digunakan untuk mengetahui nilai layak huni dari properti rumah</p>
            <b-button variant="primary"><router-link v-bind:to="'/form'" style="color: white">Lanjut ke Form</router-link></b-button>
        </b-card-text>
        </b-card>

        <b-card
        img-src="https://image.freepik.com/free-vector/map-dark-concept-illustration_114360-155.jpg"
        img-left
        >
        <b-card-text style="height: 100%; padding-top:40%">
            <h4>Pemetaan Rumah Layak Huni</h4>
            <br>
            <p>Memetakan data rumah layak huni di kota Depok</p>
            <b-button variant="primary"><router-link v-bind:to="'/map'" style="color: white">Lanjut ke Pemetaan</router-link></b-button>
            </b-card-text>
        </b-card>
    <!-- </b-card-group> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
//   components: {
//     HelloWorld
//   }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
