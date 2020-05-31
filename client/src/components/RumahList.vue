<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Rumah List
        <b-link href="#/add-Rumah">(Add Rumah)</b-link>
      </h2>
      <button v-on:click="greet">Greet</button>
      <!-- <b-table striped hover :items="rumahs" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
        </template>
      </b-table> -->
    </b-col>
  </b-row>
</template>

<script>
    import gql from "graphql-tag";
    import router from "../router";

//     const GET_RUMAHS = gql`
//   { 
//   rumahs {
//     id,
//     alamat,
//     jamban,
//     kordinat,
//     no_rumah,
//     rt,
//     rw,
//     sampa,
//     spal,
//     status,
//     kepemilikan,
//     created_at,
//     no_telp,
//     nilai,
//     total_nilai,
//     petugas,
//     kecamatan,
//     koordinat_kecamatan,
//     kelurahan,
//     koordinat_kelurahan
//   }
// }
// `;

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
  name: "RumahList",
  apollo: {
    rumahs: {
      query: GET_OTHER,
      pollInterval: 5000
    }
  },
  data() {
    return {
      fields: {
        id: { label: "Id", sortable: true, class: "text-left" },
        alamat: { label: "Alamat", class: "text-left" },
        jamban: { label: "jamban", class: "text-left" },
        kordinat: { label: "kordinat", class: "text-left" },
        no_rumah: { label: "no_rumah", class: "text-left" },
        rt: { label: "rt", class: "text-left" },
        rw: { label: "rw", class: "text-left" },
        sampa: { label: "sampa", class: "text-left" },
        spal: { label: "spal", class: "text-left" },
        status: { label: "status", class: "text-left" },
        kepemilikan: { label: "kepemilikan", class: "text-left" },
        created_at: { label: "created_at", class: "text-left" },
        no_telp: { label: "no_telp", class: "text-left" },
        nilai: { label: "nilai", class: "text-left" },
        total_nilai: { label: "total_nilai", class: "text-left" },
        petugas: { label: "petugas", class: "text-left" },
        kecamatan: { label: "kecamatan", class: "text-left" },
        koordinat_kecamatan: { label: "koordinat_kecamatan", class: "text-left" },
        kelurahan: { label: "kelurahan", class: "text-left" },
        koordinat_kelurahan: { label: "koordinat_kelurahan", class: "text-left" },
        
        actions: { label: "Action", class: "text-center" }
      },
      rumahs: [],
      other: []
    };
  },
  methods: {
    details(rumah) {
      router.push({ name: "ShowRumah", params: { id: rumah.id } });
    },
    greet: function (event) {
      if (event) {
        console.log("mounteds",this.rumahs);
      }
    },
  },
  mounted: function () {
  console.log("mounteds",this.other);
  }
};
</script>

<style>
.table {
  width: 96%;
  margin: 0 auto;
}
</style>