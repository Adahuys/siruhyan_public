<template>
  <div id="about">
  When you have a great story about how your product or service was built to change lives, share it. The "About Us" page is a great place for it to live, too. Good stories humanize your brand, providing context and meaning for your product. What’s more, good stories are sticky -- which means people are more likely to connect with them and pass them on.
  <button v-on:click="getPoly">Polygones</button>
  <div id="map" ref="map">
      <!-- <map-marker :lat="-27.344" :lng="133.036"></map-marker>
      <map-marker :lat="-26.344" :lng="132.036"></map-marker>
      <map-marker :lat="-25.344" :lng="131.036"></map-marker> -->
  </div>
  </div>
</template>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhwmRyn2gXpj8U4yCbmj8ZHSi3tYQJOiE">
</script>
<script>
import initPolygon from "./initPolygon.js";
// import kel1 from "./components/AddRumah.vue";
export default {
  name: 'Map',
  data: () => ({
      map: null
      ,
      boundary: null,
      poly: null,
      polyData: initPolygon
  }),
  mounted(){
    //   this.map = new window.google.maps.Map(this.$refs["map"],{
    //       center: {lat: -25.344, lng: 131.036},
    //       zoom: 4
    //   });
    //   new window.google.maps.Marker({
    //       position: {lat: -25.344, lng: 131.036},
    //       map: this.map
    //   });
    //   this.boundary = this.polyData.kel1.data;
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
      ,
      getPoly: function(event){
        if (event){
            this.boundary = this.polyData.kel1.data;
            console.log(this.boundary);

        //     this.poly = new google.maps.Polygon({
        //     paths: this.boundary,
        //     strokeColor: "#000000",
        //     strokeOpacity: 0.8,
        //     strokeWeight: 2,
        //     fillColor: "ffffff",
        //     fillOpacity: 0.35,
        //     map: this.map
        //   });
        //   this.poly.setVisible(true);
        this.map = new window.google.maps.Map(this.$refs["map"],{
            center: {lat: -25.344, lng: 131.036},
            zoom: 4
        });
        this.map.data.add({geometry: new window.google.maps.Data.Polygon([this.boundary])})
        new window.google.maps.Marker({
            position: {lat: -25.344, lng: 131.036},
            map: this.map
        });
          }
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