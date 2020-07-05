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
        <b-button v-on:click="setPolyKel">kelurahan</b-button>
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
      camatPolyInfo: [], lurahPolyInfo: [],
      polykec: [], polykel: [],
      boundKec: [], boundKel: [],
      kecVisible: false, kelVisible: false,
      kecReady: false, kelReady: false
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

      // POLYGON KECAMATAN
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
      },

      // POLYGON KELURAHAN
      setPolyKel:function(event){
        // cek apakah polygon telah dibuat
        if (this.kelReady == false){
          // polygon dibuat, tandai
          this.kelReady = !this.kecReady;
          console.log("polygon is ready!");
          // isi data json batas wilayah
            this.polykel[0] = this.polyData.kel1.data; // beji
            this.polykel[1] = this.polyData.kel2.data; // beji timur
            this.polykel[2] = this.polyData.kel3.data; // kemiri muka
            this.polykel[3] = this.polyData.kel4.data; // pondok cina
            this.polykel[4] = this.polyData.kel5.data; // kukusan
            this.polykel[5] = this.polyData.kel6.data; // tanah baru
            this.polykel[6] = this.polyData.kel7.data; // pancoran mas
            this.polykel[7] = this.polyData.kel8.data; // depok
            this.polykel[8] = this.polyData.kel9.data; // depok jaya
            this.polykel[9] = this.polyData.kel10.data; // rangkapan jaya baru
            this.polykel[10] = this.polyData.kel11.data; // mampang
            this.polykel[11] = this.polyData.kel12.data; // cipayung
            this.polykel[12] = this.polyData.kel13.data; // cipayung jaya
            this.polykel[13] = this.polyData.kel14.data; // ratu jaya
            this.polykel[14] = this.polyData.kel15.data; // pondok jaya
            this.polykel[15] = this.polyData.kel16.data; // sukma jaya
            this.polykel[16] = this.polyData.kel17.data; // mekar jaya
            this.polykel[17] = this.polyData.kel18.data; // bakti jaya
            this.polykel[18] = this.polyData.kel19.data; // abadi jaya
            this.polykel[19] = this.polyData.kel20.data; // tirta jaya
            this.polykel[20] = this.polyData.kel21.data; // cisalak
            this.polykel[21] = this.polyData.kel22.data; // cilodong
            this.polykel[22] = this.polyData.kel23.data; // sukamaju
            this.polykel[23] = this.polyData.kel24.data; // kalibaru
            this.polykel[24] = this.polyData.kel25.data; // kalimulya
            this.polykel[25] = this.polyData.kel26.data; // jatimulya
            this.polykel[26] = this.polyData.kel27.data; // limo
            this.polykel[27] = this.polyData.kel28.data; // meruyung
            this.polykel[28] = this.polyData.kel29.data; // grogol
            this.polykel[29] = this.polyData.kel30.data; // krukut
            this.polykel[30] = this.polyData.kel31.data; // cinere
            this.polykel[31] = this.polyData.kel32.data; // pangkalan jati baru
            this.polykel[32] = this.polyData.kel33.data; // pangkalan jati
            this.polykel[33] = this.polyData.kel34.data; // gandul
            this.polykel[34] = this.polyData.kel35.data; // rangkapan jaya
            this.polykel[35] = this.polyData.kel36.data; // cisalak pasar
            this.polykel[36] = this.polyData.kel37.data; // mekar sari
            this.polykel[37] = this.polyData.kel38.data; // pasir gunung selatan
            this.polykel[38] = this.polyData.kel39.data; // tugu
            this.polykel[39] = this.polyData.kel40.data; // harjamukti
            this.polykel[40] = this.polyData.kel41.data; // curug bojong sari
            this.polykel[41] = this.polyData.kel42.data; // tapos
            this.polykel[42] = this.polyData.kel43.data; // leuwinanggung
            this.polykel[43] = this.polyData.kel44.data; // sukatani
            this.polykel[44] = this.polyData.kel45.data; // sukamaju baru
            this.polykel[45] = this.polyData.kel46.data; // jatijajar
            this.polykel[46] = this.polyData.kel47.data; // cilangkap
            this.polykel[47] = this.polyData.kel48.data; // cimpaeun
            this.polykel[48] = this.polyData.kel49.data; // sawangan
            this.polykel[49] = this.polyData.kel50.data; // kedaung
            this.polykel[50] = this.polyData.kel51.data; // cinangka
            this.polykel[51] = this.polyData.kel52.data; // sawangan baru
            this.polykel[52] = this.polyData.kel53.data; // bedahan
            this.polykel[53] = this.polyData.kel54.data; // pengasinan
            this.polykel[54] = this.polyData.kel55.data; // pasir putih
            this.polykel[55] = this.polyData.kel56.data; // bojongsari baru
            this.polykel[56] = this.polyData.kel57.data; // bojongsari
            this.polykel[57] = this.polyData.kel58.data; // serua
            this.polykel[58] = this.polyData.kel59.data; // pondok petir
            this.polykel[59] = this.polyData.kel60.data; // tugu cimanggis
            this.polykel[60] = this.polyData.kel61.data; // duren mekar
            this.polykel[61] = this.polyData.kel62.data; // duren seribu
            this.polykel[62] = this.polyData.kel63.data; // bojong pondok terong
          // loop pembuatan objek polygon
          for (var i=0; i<63; i++){
            this.boundKel[i] = new google.maps.Polygon({
              paths: this.polykel[i],
              fillColor: "red",
              map: this.map
            })
            // meletakkan polygon pada peta
            this.boundKel[i].setMap(this.map);
            // buat infowindow
            this.lurahPolyInfo[i] = new google.maps.InfoWindow({content: "info"});
            this.boundKel[i].addListener('click',function(){this.lurahPolyInfo[i].open(this.map, this.boundKel[i])});
          }
        } else {
          // polygon wilayah telah dibuat
          console.log("polygon already made");
          // sembunykan polygon
          for (var i=0; i<63; i++){
            this.boundKel[i].setVisible(this.kelVisible);
          }
          // set visibilitas polygon
          this.kelVisible = !this.kelVisible;
          console.log(this.kelVisible);
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