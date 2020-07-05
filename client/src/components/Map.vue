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
        <b-button v-on:click="dataPrep">datas</b-button>
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
      kecReady: false, kelReady: false,
      koorMark: [], koorSehat: [], koorTidak: [], 
      jumlahSehat: null, jumlahTidak: null, kelSehat: [], kelTidak: [], kecSehat: [], kecTidak: [],
      kelColor: [], kecColor:[]
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
        
        }
      },
      kecFilter(kecparams){
        var Idkec;
        switch (kecparams) {
          case "Beji": Idkec = 0; break;
          case "Bojong Sari": Idkec = 1; break;
          case "Cilodong": Idkec = 2; break;
          case "Cimanggis": Idkec = 3; break;
          case "Cinere": Idkec = 4; break;
          case "Cipayung": Idkec = 5; break;
          case "Limo": Idkec = 6; break;
          case "Pancoran Mas": Idkec = 7; break;
          case "Sawangan": Idkec = 8; break;
          case "Sukmajaya": Idkec = 9; break;
          case "Tapos": Idkec = 10; break;
          default:
            break;
        }
        return Idkec;
      },
      kelFilter(kelparams){
        var Idkel;
        switch (kelparams) {
          case "Beji" : Idkel = 0; break;
          case "Beji Timur" : Idkel = 1; break;
          case "Kemiri Muka" : Idkel = 2; break;
          case "Pondok Cina" : Idkel = 3; break;
          case "Kukusan" : Idkel = 4; break;
          case "Tanah Baru" : Idkel = 5; break;
          case "Pancoran Mas" : Idkel = 6; break;
          case "Depok" : Idkel = 7; break;
          case "Depok Jaya" : Idkel = 8; break;
          case "Rangkapan Jaya Baru" : Idkel = 9; break;
          case "Mampang" : Idkel = 10; break;
          case "Cipayung" : Idkel = 11; break;
          case "Cipayung Jaya" : Idkel = 12; break;
          case "Ratu Jaya" : Idkel = 13; break;
          case "Pondok Jaya" : Idkel = 14; break;
          case "Sukma Jaya" : Idkel = 15; break;
          case "Mekar Jaya" : Idkel = 16; break;
          case "Bakti Jaya" : Idkel = 17; break;
          case "Abadi Jaya" : Idkel = 18; break;
          case "Tirta Jaya" : Idkel = 19; break;
          case "Cisalak" : Idkel = 20; break;
          case "Cilodong" : Idkel = 21; break;
          case "Sukamaju" : Idkel = 22; break;
          case "Kalibaru" : Idkel = 23; break;
          case "Kalimulya" : Idkel = 24; break;
          case "Jatimulya" : Idkel = 25; break;
          case "Limo" : Idkel = 26; break;
          case "Meruyung" : Idkel = 27; break;
          case "Grogol" : Idkel = 28; break;
          case "Krukut" : Idkel = 29; break;
          case "Cinere" : Idkel = 30; break;
          case "Pangkalan Jati Baru" : Idkel = 31; break;
          case "Pangkalan Jati" : Idkel = 32; break;
          case "Gandul" : Idkel = 33; break;
          case "Rangkapan Jaya" : Idkel = 34; break;
          case "Cisalak Pasar" : Idkel = 35; break;
          case "Mekar Sari" : Idkel = 36; break;
          case "Pasir Gunung Selatan" : Idkel = 37; break;
          case "Tugu" : Idkel = 38; break;
          case "Harjamukti" : Idkel = 39; break;
          case "Curug Bojong Sari" : Idkel = 40; break;
          case "Tapos" : Idkel = 41; break;
          case "Leuwinanggung" : Idkel = 42; break;
          case "Sukatani" : Idkel = 43; break;
          case "Sukamaju Baru" : Idkel = 44; break;
          case "Jatijajar" : Idkel = 45; break;
          case "Cilangkap" : Idkel = 46; break;
          case "Cimpaeun" : Idkel = 47; break;
          case "Sawangan" : Idkel = 48; break;
          case "Kedaung" : Idkel = 49; break;
          case "Cinangka" : Idkel = 50; break;
          case "Sawangan Baru" : Idkel = 51; break;
          case "Bedahan" : Idkel = 52; break;
          case "Pengasinan" : Idkel = 53; break;
          case "Pasir Putih" : Idkel = 54; break;
          case "Bojongsari Baru" : Idkel = 55; break;
          case "Bojongsari" : Idkel = 56; break;
          case "Serua" : Idkel = 57; break;
          case "Pondok Petir" : Idkel = 58; break;
          case "Tugu Cimanggis" : Idkel = 59; break;
          case "Duren Mekar" : Idkel = 60; break;
          case "Duren Seribu" : Idkel = 61; break;
          case "Bojong Pondok Terong" : Idkel = 62; break;
          default: 
            break;
        }
        return Idkel;
      },
      dataPrep: function(event){
        var panjang = this.rumahs.length; // get array length
        var warna;
        for (var i=0;i<panjang;i++){ // loop for array
          var koor = this.rumahs[i].kordinat.split(", "); // split coordinates string
          var lats = parseFloat(koor[0]);
          var lngs = parseFloat(koor[1]);
          var idkelurahan; var idkecamatan;
          this.koorMark[i] = new google.maps.Marker({ // create marker object
            position: {lat: lats, lng: lngs}
            // map: this.map
          });
          // this.koorMark[i].setMap(this.map);
          if (this.rumahs[i].status == "True"){ // if rumah layak huni
            this.koorSehat[i] = new google.maps.Marker({ // for layak huni heatmap
              position: {lat: lats, lng: lngs}
            });
            this.jumlahSehat++; // total rumah sehat
            idkecamatan = this.kecFilter(this.rumahs[i].kecamatan); // identifikasi kec/kel dari rumah
            idkelurahan = this.kelFilter(this.rumahs[i].kelurahan);
            this.kecSehat[idkecamatan]++; // tambah total sehat pada index array kec/kel
            this.kelSehat[idkelurahan]++;
          } else {
            this.koorTidak[i] = new google.maps.Marker({
              position: {lat: lats, lng: lngs}
            });
            this.jumlahTidak++;
            idkecamatan = this.kecFilter(this.rumahs[i].kecamatan); // identifikasi kec/kel dari rumah
            idkelurahan = this.kelFilter(this.rumahs[i].kelurahan);
            this.kecTidak[idkecamatan]++; // tambah total sehat pada index array kec/kel
            this.kelTidak[idkelurahan]++;
          }
        }
        for (var i=0;i<63;i++){
          this.kelColor[i] = Math.ceil(100*this.kelSehat[i]/(this.kelSehat[i]+this.kelTidak[i]));
        }
        console.log(panjang,"lalu",this.jumlahSehat,"dan",this.jumlahTidak);
        console.log(this.kecSehat); console.log(this.kecTidak)
        console.log(this.kelSehat); console.log(this.kelTidak)
        console.log(this.kelColor);
      },
      // POLYGON KECAMATAN
      setPolyKec:function(event){
        var warna;
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
            this.kecSehat[i] = 0;
            this.kecTidak[i] = 0;
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
        console.log("SEHAT:",this.kecSehat);console.log("TIDAK:",this.kecTidak);
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
              indexID: i,
              map: this.map
            })
            // meletakkan polygon pada peta
            this.boundKel[i].setMap(this.map);
            this.kelSehat[i] = 0;
            this.kelTidak[i]= 0;
            // buat infowindow
            // this.lurahPolyInfo[i] = new google.maps.InfoWindow({content: "info", position: {lat: -6.3857178, lng: 106.8119226}});
            // (function (i) {google.maps.event.addListener(this.boundKel[i], 'click', function () {console.log("klik")});})(i);
            // this.boundKel[i].addListener('click',function(){console.log("klik")});
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
        console.log("SEHAT:",this.kelSehat);console.log("TIDAK:",this.kelTidak);
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