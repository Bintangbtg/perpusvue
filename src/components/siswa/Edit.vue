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
              <h1 class="m-0">Form Edit Data</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="card card-success">
                <div class="card-header">
                  <h3 class="card-title">Edit Anggota</h3>
                </div>
                <form @submit.prevent="edit">
                  <div class="card-body">
                    <div class="form-group">
                      <label>Nama Anggota</label>
                      <input type="text" class="form-control" v-model="siswa.nama_siswa">
                    </div>
                    <div class="form-group">
                      <label>Tanggal Lahir</label>
                      <input type="date" class="form-control" v-model="siswa.tanggal_lahir">
                    </div>
                    <div class="form-group">
                      <div>
                        <label>Jenis Kelamin</label>
                      </div>
                      <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-secondary" :class="{ 'active': siswa.gender === 'L' }">
                          <input type="radio" value="L" v-model="siswa.gender"> Laki-laki
                        </label>
                        <label class="btn btn-secondary" :class="{ 'active': siswa.gender === 'P' }">
                          <input type="radio" value="P" v-model="siswa.gender"> Perempuan
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Alamat</label>
                      <textarea rows="4" class="form-control" v-model="siswa.alamat"></textarea>
                    </div>
                    <div class="form-group">
                      <label>Kelas</label>
                      <select class="form-control" v-model="siswa.id_kelas">
                        <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas">{{ k.nama_kelas }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      siswa: {
        id_kelas: '',
        nama_siswa: '',
        tanggal_lahir: '',
        gender: '',
        alamat: ''
      },
      kelas: []
    }
  },
  created() {
    this.getDataSiswa();
    this.getKelas();
  },
  methods: {
    getDataSiswa() {
      axios.get(`http://localhost:8000/api/getsiswaById/${this.$route.params.id}`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
        .then(res => {
          this.siswa = res.data
        })
        .catch(err => console.error(err));
    },
    getKelas() {
      axios.get('http://localhost:8000/api/getkelas',{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
        .then(res => {
          this.kelas = res.data
        })
        .catch(err => console.error(err));
    },
    edit() {
      axios.put(`http://localhost:8000/api/updatesiswa/${this.$route.params.id}`, this.siswa,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.$router.push('/siswa');
        })
        .catch(err => console.error(err));
    }
  }
}
</script>