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
              <h1 class="m-0">Form Tambah Data</h1>
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
                  <h3 class="card-title">Anggota Baru</h3>
                </div>
                <form @submit.prevent="tambah">
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
                        <label class="btn btn-secondary">
                          <input type="radio" value="L" v-model="siswa.gender"> Laki-laki
                        </label>
                        <label class="btn btn-secondary">
                          <input type="radio" value="P" v-model="siswa.gender"> Perempuan
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Alamat</label>
                      <textarea rows="4" class="form-control" v-model="siswa.alamat"></textarea>
                    </div>
                    <div class="form-group">
                      <label>Username</label>
                      <input type="text" class="form-control" v-model="siswa.username">
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" v-model="siswa.password">
                    </div>
                    <div class="form-group">
                      <label>Kelas</label>
                            <select class="form-control" v-model="siswa.id_kelas">
                            <option value="" disabled selected>Pilih Kelas</option>
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
import axios from 'axios';

export default {
  data() {
    return {
      siswa: {
        id_kelas: '', // Pastikan properti id_kelas ada di objek siswa
        nama_siswa: '',
        tanggal_lahir: '',
        gender: '',
        alamat: '',
        username: '',
        password: ''
      },
      kelas: []
    }
  },
  created() {
    this.getKelas();
  },
  methods: {
    getKelas() {
      axios.get('http://localhost:8000/api/getkelas',{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
        .then(res => {
          this.kelas = res.data;
        })
        .catch(err => console.error('Error:', err));
    },
    tambah() {
      console.log('Data yang akan dikirim:', this.siswa);

      // Pastikan id_kelas telah diisi sebelum mengirim data
      if (!this.siswa.id_kelas) {
        console.error('ID kelas harus diisi');
        return;
      }

      axios.post('http://localhost:8000/api/addsiswa',{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} }, {
          ...this.siswa,
          id_kelas: parseInt(this.siswa.id_kelas) // Pastikan id_kelas berupa integer
        })
        .then(res => {
          console.log('Response dari server:', res.data);
          this.$router.push('/siswa');
        })
        .catch(err => console.error('Error:', err));
    }
  }
}
</script>