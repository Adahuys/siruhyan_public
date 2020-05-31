<template>
  <div id="about">
  When you have a great story about how your product or service was built to change lives, share it. The "About Us" page is a great place for it to live, too. Good stories humanize your brand, providing context and meaning for your product. What’s more, good stories are sticky -- which means people are more likely to connect with them and pass them on.
  <div id="map" ref="map">
      <!-- <map-marker :lat="-27.344" :lng="133.036"></map-marker>
      <map-marker :lat="-26.344" :lng="132.036"></map-marker>
      <map-marker :lat="-25.344" :lng="131.036"></map-marker> -->
  </div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  data: () => ({
      map: null
  }),
  mounted(){
      this.map = new window.google.maps.Map(this.$refs["map"],{
          center: {lat: -25.344, lng: 131.036},
          zoom: 4
      })
      new window.google.maps.Marker({
          position: {lat: -25.344, lng: 131.036},
          map: this.map
      })
  },
  methods: {
      getmap(callback){
          let vm = this
          function checkForMap() {
              if (vm.map) callback(vm.map)
              else setTimeout(checkForMap,200)
          }
          checkForMap()
      }
  }
}
</script>
<!-- styling for the component -->
<style>
#about {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#map{
    height: 600px;
    background: gray;
}
</style>