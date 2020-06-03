<template>
  <form-wizard @on-complete="onComplete" color="#3498db">
      <h2 slot="title">Form Penilaian Rumah Layak Huni</h2>
     <tab-content title="Komponen Rumah">
        <b-form-group label="1. Langit - langit" label-class="font-weight-bold" label-size="lg"> 
            <b-form-radio-group
                v-model="s1"
                :options="options1"
                name="s1"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group>
        <!-- <div class="mt-3">Selected: <strong>{{ selected1 }}</strong></div> -->
        <br>
        <b-form-group label="2. Dinding" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s2"
                :options="options2"
                name="s2"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="3. Lantai" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s3"
                :options="options3"
                name="s3"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="4. Jendela Kamar Tidur" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s4"
                :options="options4"
                name="s4"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="5. Jendela Ruang Keluarga" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s5"
                :options="options5"
                name="s5"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="6. Ventilasi" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s6"
                :options="options6"
                name="s6"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="7. Lubang Asap Dapur" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s7"
                :options="options7"
                name="s7"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="8. Pencahayan" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s8"
                :options="options8"
                name="s8"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
     </tab-content>
     <tab-content title="Sarana Sanitasi">
         <b-form-group label="1. Sarana Air Bersih" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s9"
                :options="options9"
                name="s9"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="2. Jamban (Sarana Pembuangan Kotoran)" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s10"
                :options="options10"
                name="s10"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="3. Sarana Pembuangan Air Limbah (SPAL)" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s11"
                :options="options11"
                name="s11"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="4. Sarana Pembuangan Sampah / Tempat Sampah" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s12"
                :options="options12"
                name="s12"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
     </tab-content>
     <tab-content title="Perilaku Peghuni">
       <b-form-group label="1. Membuka Jendela Kamar Tidur" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s13"
                :options="options13"
                name="s13"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="2. Membuka Jendela Ruang Keluarga" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s14"
                :options="options14"
                name="s14"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="3. Membersihkan Rumah dan Halaman" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s15"
                :options="options15"
                name="s15"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="4. Membuang Tinja Bayi dan Balita" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s16"
                :options="options16"
                name="s16"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="5. Membuang Sampah" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s17"
                :options="options17"
                name="s17"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
     </tab-content>
     <tab-content title="Informasi Tambahan">
         <b-form-group label="Penanganan Sampah" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s18"
                :options="options18"
                name="s18"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="Terdapat Jentik Nyamuk" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s19"
                :options="options19"
                name="s19"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="Jenis Jamban yang Digunakan" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s20"
                :options="options20"
                name="s20"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
        <b-form-group label="Jenis Sistem Pembuangan Air Limbah" label-class="font-weight-bold" label-size="lg">
            <b-form-radio-group
                v-model="s21"
                :options="options21"
                name="s21"
                stacked
                required
            ></b-form-radio-group>
        </b-form-group><br>
     </tab-content>
 </form-wizard>

</template>

<script>

  export default {
    data(){ return {
        s1:0, s2:0, s3:0, s4:0, s5:0, s6:0, s7:0, s8:0, s9:0, s10:0, 
        s11:0, s12:0, s13:0, s14:0, s15:0, s16:0, s17:0, s18:0, s19:0, s20:0, s21:0, selected: null,
        options1: [
          { text: 'Tidak ada', value: 0 },
          { text: 'Ada, kotor, sulit dibersihkan dan rawan kecelakaan', value: 31 },
          { text: 'Ada, bersih dan tidak rawan kecelakaan', value: 62 }
        ],
        options2: [
          { text: 'Bukan tembok (terbuat dari anyaman bambu dan ilalang)', value: 0 },
          { text: 'Semi Permanen / setengah tembok / pasangan bata dan batu yang tidak diplester / papan yang tidak kedap air', value: 31 },
          { text: 'Permanen (tembok / pasangan batu bata yang diplester / papan kedap air)', value: 62 }
        ],
        options3: [
          { text: 'Tanah', value: 0 },
          { text: 'Papan / Anyaman bambu dekat dengan tanah/ plesteran yang retak dan berdebu', value: 31 },
          { text: 'Diplester/ ubin/ keramik/papan (rumah panggung)', value: 62 }
        ],
        options4: [
          { text: 'Tidak ada', value: 0 },
          { text: 'Ada', value: 31 }
        ],
        options5: [ //jendela ruang keluarga
          { text: 'Tidak ada', value: 0 },
          { text: 'Ada', value: 31 }
        ],
        options6: [ //ventilasi
          { text: 'Tidak ada', value: 0 },
          { text: 'Ada, Ada, luas ventilasi permanen \u003c10 persen dari luas lantai', value: 31 },
          { text: 'Ada, luas ventilasi permanen >10 persen dari luas lantai', value: 62 }
        ],
        options7: [ //lubang asap dapur
          { text: 'Tidak ada', value: 0 },
          { text: 'Ada, lubang ventilasi dapur \u003c10 persen dari luas lantai dapur', value: 31 },
          { text: 'Ada, lubang ventilasi dapur >10 persen dari luas lantai dapur (asap keluar dengan sempurna) atau ada exhaust fan ada peralatan lain yang sejenis', value: 62 }
        ],
        options8: [ //pencahayaan
          { text: 'Tidak terang, tidak dapat dipergunakan untuk membaca', value: 0 },
          { text: 'Kurang terang, sehingga kurang jelas membaca dengan normal', value: 31 },
          { text: 'Terang dan tidak silau sehingga dapat dipergunakan untuk membaca dengan normal', value: 62 }
        ],
        options9: [ //sarana air bersih
          { text: 'Tidak ada', value: 0 },
          { text: 'Ada, bukan milik sendiri dan tidak memenuhi syarat kesehatan', value: 25 },
          { text: 'Ada, milik sendiri dan tidak memenuhi syarat kesehatan', value: 50 },
          { text: 'Ada, bukan milik sendiri dan memenuhi syarat kesehatan', value: 75 },
          { text: 'Ada, milik sendiri dan memenuhi syarat kesehatan', value: 100 }
        ],
        options10: [ //jamban
          { text: 'Tidak ada', value: 0 },
          { text: 'Ada, bukan leher angsa, tidak ada tutup, disalurkan kesungai/kolam', value: 25 },
          { text: 'Ada, bukan leher angsa ada ditutup (leher angsa), disalurkan kesungai/ kolam', value: 50 },
          { text: 'Ada, bukan leher angsa ada tutup septic tank', value: 75 },
          { text: 'Ada, leher angsa, septic tank', value: 100 }
        ],
        options11: [ //SPAL air limbah
          { text: 'Tidak ada, sehingga tergenang tidak teratur dihalaman rumah', value: 0 },
          { text: 'Ada, diresapkan tetapi mencemari sumber air (jarak dengan sumber air \u003c10m)', value: 25 },
          { text: 'Ada, dialirkan keselokan terbuka', value: 50 },
          { text: 'Ada, diresapkan tetapi mencemari sumber air (jarak dengan sumber air > 10m)', value: 75 },
          { text: 'Ada, dialirkan keselokan tertutup (saluran kota) untuk diolah lebih lanjut', value: 100 }
        ],
        options12: [ //Tempat sampah
          { text: 'Tidak ada', value: 0 },
          { text: 'Ada, tetapi tidak kedap air dan tidak ada tutup', value: 25 },
          { text: 'Ada, kedap air dan tidak bertutup', value: 50 },
          { text: 'Ada, kedap air dan bertutup', value: 75 }
        ],
        options13: [ //membuka jendela
          { text: 'Tidak pernah dibuka', value: 0 },
          { text: 'Kadang - kadang', value: 44 },
          { text: 'Setiap hari dibuka', value: 88 }
        ],
        options14: [ //membuka jendela ruangkeluarga
          { text: 'Tidak pernah dibuka', value: 0 },
          { text: 'Kadang - kadang', value: 44 },
          { text: 'Setiap hari dibuka', value: 88 }
        ],
        options15: [ //membersihkan halaman
          { text: 'Tidak pernah', value: 0 },
          { text: 'Kadang - kadang', value: 44 },
          { text: 'Setiap hari', value: 88 }
        ],
        options16: [ //tinja bayi
          { text: 'Dibuang kesungai / kebun / kolam / sembarangan', value: 0 },
          { text: 'kadang - kadang kejamban', value: 44 },
          { text: 'Setiap hari dibuang kejamban', value: 88 }
        ],
        options17: [ //buang sampah
          { text: 'Dibuang kesungai / kebun / kolam / sembarangan', value: 0 },
          { text: 'kadang - kadang dibuang ketempat sampah', value: 44 },
          { text: 'Setiap hari dibuang ketempat sampah', value: 88 }
        ],
        options18: [ //sampah
          { text: 'Dipilah / organik', value: '0' },
          { text: 'Tidak dipilah / dibuang', value: '1' }
        ],
        options19: [ //jentik
          { text: 'Ya', value: '0' },
          { text: 'Tidak', value: '1' }
        ],
        options20: [ //jenis jamban
          { text: 'Septik Tank', value: '0' },
          { text: 'Koya / Empang', value: '1' },
          { text: 'Kali', value: '2' },
          { text: 'Helikopter', value: '3' },
        ],
        options21: [ //jenis SPAL
          { text: 'Tertutup', value: '0' },
          { text: 'Terbuka', value: '1' }
        ],
        total: null
    }},
    mounted: function (){
    },
    methods: {
        
        onComplete: function(){
          this.total = this.s1 + this.s2 + this.s3 + this.s4 + this.s5 + this.s6 + this.s7 
          + this.s8 + this.s9 + this.s10 + this.s11 + this.s12 + this.s13 + this.s14 
          + this.s15 + this.s16 + this.s17;

          if (this.total < 1068)
          alert("Rumah Tidak Layak Huni");
          else
          alert("Rumah Layak Huni")
        },
        onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
    }
  }
</script>
<style scoped>

</style>