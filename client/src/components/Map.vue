<template>
  <div id="about">
  <b-button 
  v-b-toggle.sidebar-1 style="position:absolute;z-index: 10; left:10px; top: 20%;">Polygones</b-button>
  <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
        <b-button v-on:click="getPoly">map</b-button>
        <b-button v-on:click="setPolyKec">kecamatan</b-button>
      </div>
    </b-sidebar>
  <div id="map" ref="map" style="z-index:0">
      <!-- <map-marker :lat="-27.344" :lng="133.036"></map-marker>
      <map-marker :lat="-26.344" :lng="132.036"></map-marker>
      <map-marker :lat="-25.344" :lng="131.036"></map-marker> v-on:click="getPoly" -->
  </div>
  </div>
</template>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhwmRyn2gXpj8U4yCbmj8ZHSi3tYQJOiE&libraries=visualization"></script>
<!--<script type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhwmRyn2gXpj8U4yCbmj8ZHSi3tYQJOiE&libraries=visualization">
</script> -->
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
    },
  },
  data: () => ({
      map: null
      ,
      boundary: [],
      poly: null,
      polyData: initPolygon,
      heatMapData: [],
      rumahs: [],
      kecamatan: [],
      polykec: [],
      boundKec: [],
      kecVisible: false,
      kecReady: false
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
    console.log(this.polyData);
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
            console.log(typeof this.rumahs[400].kordinat);
            var koor = this.rumahs[400].kordinat.split(", ");
            console.log(koor);

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
            center: {lat: -6.3857178, lng: 106.8119226},
            zoom: 12
        });
        
        var data1 = new window.google.maps.Polygon({
            paths: this.polyData.kel1.data,
            fillColor: 'green',
            map: this.map
        });
        var data2 = new window.google.maps.Polygon({
            paths: this.polyData.kel2.data,
            fillColor: 'green',
            map: this.map
        });
        var info = new google.maps.InfoWindow({content: "info"});
        var marks = new window.google.maps.Marker({
            position: {lat: parseFloat(koor[0]), lng: parseFloat(koor[1])},
            map: this.map
        });
        marks.addListener('click',function(){info.open(this.map, marks)});
        data1.addListener('click',function(){info.open(this.map, data1)});

        var heatMapData = [
          {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
          new google.maps.LatLng(37.782, -122.445),
          {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
          {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
          {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
          new google.maps.LatLng(37.782, -122.437),
          {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

          {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
          {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
          new google.maps.LatLng(37.785, -122.443),
          {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
          new google.maps.LatLng(37.785, -122.439),
          {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
          {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
        ];
        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatMapData
        });
        heatmap.setMap(this.map);
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
        

        // var heatmap = new google.maps.visualization.HeatmapLayer({
        //   data: this.heatmapData
        // });
        // heatmap.setMap(this.map);
        }
      },
      setPolyKec:function(event){
        // cek apakah polygon telah dibuat
        if (this.kecReady == false){
          // polygon dibuat, tandai
          this.kecReady = !this.kecReady;
          console.log("polygon is ready!");
          // isi data json batas wilayah
          this.polykec[0] = this.polyData.kec1.data; // beji
          this.polykec[1] = this.polyData.kec2.data; // bojongsari
          this.polykec[2] = this.polyData.kec3.data; // cilodong
          this.polykec[3] = this.polyData.kec4.data; // cimanggis
          this.polykec[4] = this.polyData.kec5.data; // cinere
          this.polykec[5] = this.polyData.kec6.data; // cipayung
          this.polykec[6] = this.polyData.kec7.data; // limo
          this.polykec[7] = this.polyData.kec8.data; // pancoran mas
          this.polykec[8] = this.polyData.kec9.data; // sawangan
          this.polykec[9] = this.polyData.kec10.data; // sukmajaya
          this.polykec[10] = this.polyData.kec11.data; // tapos
          // loop pembuatan objek polygon
          for (var i=0; i<11; i++){
            this.boundKec[i] = new google.maps.Polygon({
              paths: this.polykec[i],
              fillColor: "green"
            })
            // meletakkan polygon pada peta
            this.boundKec[i].setMap(this.map);
          }
        } else {
          // polygon wilayah telah dibuat
          console.log("polygon already made");
          // sembunykan polygon
          for (var i=0; i<11; i++){
            this.boundKec[i].setVisible(this.kecVisible);
          }
          // set visibilitas polygon
          this.kecVisible = !this.kecVisible;
          console.log(this.kecVisible);
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