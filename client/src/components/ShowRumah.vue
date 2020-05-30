<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Rumah List
        <b-link href="#/">(Rumah List)</b-link>
      </h2>
      <!-- <b-jumbotron>
        <template slot="header">{{rumah.title}}</template>
        <template slot="lead">
          ID: {{rumah.id}}
          <br>
          Alamat: {{rumah.alamat}}
          <br>
          Jamban: {{rumah.jamban}}
          <br>
          Koordinat: {{rumah.kordinat}}
          <br>
          No Rumah: {{rumah.no_rumah}}
          <br>
          RT: {{rumah.rt}}
          <br>
          RW: {{rumah.rw}}
          <br>
          Sampah: {{rumah.sampa}}
          <br>
          SPAL: {{rumah.spal}}
          <br>
          Status: {{rumah.status}}
          <br>
          Kepemilikan: {{rumah.kepemilikan}}
          <br>
          Dibuat: {{rumah.created_at}}
          <br>
          Telepon: {{rumah.no_telp}}
          <br>
          Nilai: {{rumah.nilai}}
          <br>
          Total: {{rumah.total_nilai}}
          <br>
          Petugas: {{rumah.petugas}}
          <br>
          Kecamatan: {{rumah.kecamatan}}
          <br>
          Letak: {{rumah.koordinat_kecamatan}}
          <br>
          Kelurahan: {{rumah.kelurahan}}
          <br>
          Letak: {{rumah.koordinat_kelurahan}}
          <br>
        </template>
        <hr class="my-4">
        <b-btn class="edit-btn" variant="success" @click.stop="editRumah(rumah.id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deleteRumah(rumah.id)">Delete</b-btn>
      </b-jumbotron> -->
    </b-col>
  </b-row>
</template>
<script>
import gql from "graphql-tag";
// import router from "../router";

const GET_RUMAH = gql`
  query rumah($rumahId: Int) {
    rumah(id: $rumahId) {
      id,
    alamat,
    jamban,
    kordinat,
    no_rumah,
    rt,
    rw,
    sampa,
    spal,
    status,
    kepemilikan,
    created_at,
    no_telp,
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

// const DELETE_BOOK = gql`
//   mutation removeRumah($id: Int!) {
//     removeRumah(id: $id) {
//       id
//     }
//   }
// `;

export default {
  name: "ShowRumah",
  data() {
    return {
      rumah: '',
      rumahId: parseInt(this.$route.params.id)
    };
  },
  apollo: {
    rumah: {
      query: GET_RUMAH,
      pollInterval: 300,
      variables() {
        return {
          rumahId: this.rumahId
        };
      }
    }
  },
  mounted: function () {
  console.log(this.rumah);
  },
  methods: {
    // editRumah(id) {
    //   router.push({
    //     name: "EditRumah",
    //     params: { id: id }
    //   });
    // },
    // deleteRumah(id) {
    //   this.$apollo
    //     .mutate({
    //       mutation: DELETE_RUMAH,
    //       variables: {
    //         id: id
    //       }
    //     })
    //     .then(data => {
    //       console.log(data);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }
  }
};

</script>

<style>
.jumbotron {
  padding: 2rem;
}
.edit-btn {
  margin-right: 20px;
  width: 70px;
}
</style>