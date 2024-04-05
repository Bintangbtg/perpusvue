<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <navbar-component></navbar-component>
    <sidebar-component></sidebar-component>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Detail</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-header">
                  <h4 class="m-0">Detail Anggota</h4>
                </div>
                <div class="card-body text-justify">
                  <h5 class="mb-3">{{ siswa.nama_siswa }}</h5>

                  <h6>Tanggal Lahir</h6>
                  <p class="card-text">{{ siswa.tanggal_lahir }}</p>

                  <h6>Jenis Kelamin</h6>
                  <p class="card-text">{{ siswa.gender }}</p>

                  <h6>Alamat</h6>
                  <p class="card-text">{{ siswa.alamat }}</p>

                  <h6>Kelas</h6>
                  <p class="card-text">{{ kelas.nama_kelas }}</p>

                  <router-link class="btn btn-primary" to="/siswa">Kembali</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      siswa: {},
      kelas: {}
    };
  },
  created() {
    this.getDataSiswa();
  },
  methods: {
    getDataSiswa() {
      axios.get(`http://localhost:8000/api/getsiswaById/${this.$route.params.id}`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
        .then(res => {
          this.siswa = res.data;
          this.getKelasName(this.siswa.id_kelas);
        })
        .catch(err => console.error(err));
    },
    getKelasName(idKelas) {
      axios.get(`http://localhost:8000/api/getkelasById/${idKelas}`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
        .then(response => {
          this.kelas = response.data;
        })
        .catch(error => {
          console.error('Error fetching kelas:', error);
        });
    }
  }
};
</script>