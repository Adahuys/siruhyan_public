<template>
  <div id="about">
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
<script type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhwmRyn2gXpj8U4yCbmj8ZHSi3tYQJOiE&libraries=visualization">
</script>
<script>
import initPolygon from "./initPolygon.js";
import gql from "graphql-tag";
import router from "../router";
// import kel1 from "./components/AddRumah.vue";

const GET_OTHER = gql`
  { 
  rumahs {
    id,
    alamat,
    jamban,
    kordinat,
    no_rumah,
    rt,
    rw,
    status,
    kepemilikan,
    nilai,
    total_nilai,
    petugas,
    kecamatan,
    koordinat_kecamatan,
    kelurahan,
    koordinat_kelurahan
  }
}
`;

export default {
  name: 'Map',
  apollo: {
    rumahs: {
      query: GET_OTHER,
      pollInterval: 5000
    }
  },
  data: () => ({
      map: null
      ,
      boundary: [],
      poly: null,
      polyData: initPolygon,
      heatMapData: [],
      rumahs: []
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
            // this.boundary[0] = this.polyData.kel1.data;
            // this.boundary[1] = this.polyData.kel2.data;
            console.log(this.rumahs[400].kordinat);

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
        
        var data1 = new window.google.maps.Polygon({
            paths: this.polyData.kel1.data,
            fillColor: 'green',
            map: this.map
        });
        // var poly1 = data1;
        // poly1.setVisible(false);
        // const data1 = new window.google.maps.Data({geometry: new window.google.maps.Data.Polygon([this.polyData.kel1.data])});
        // const data2 = new window.google.maps.Data({geometry: new window.google.maps.Data.Polygon([this.polyData.kel2.data])});
        // this.map.data.add({geometry: new window.google.maps.Data.Polygon([this.boundary])})
        // this.map.data.add(data1);
        // this.map.data.setStyle({
        //     data: data1,
        //     fillColor:'green'
        // })
        // this.map.data.setStyle({
        //     data: data2,
        //     fillColor:'red'
        // })
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
  margin-top: 0px;
}
#map{
    height: 600px;
    background: gray;
}
</style>