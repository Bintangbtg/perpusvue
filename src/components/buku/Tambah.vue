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
              <div class="card card-info">
                <div class="card-header">
                  <h3 class="card-title">Buku Baru</h3>
                </div>
                <form @submit.prevent="tambah">
                  <div class="card-body">
                    <div class="form-group">
                      <label>Judul</label>
                      <input type="text" class="form-control" v-model="buku.nama_buku">
                    </div>
                    <div class="form-group">
                      <label>Deskripsi</label>
                      <textarea rows="4" class="form-control" v-model="buku.deskripsi"></textarea>
                    </div>
                    <div class="form-group">
                      <label>Foto</label>
                      <input type="file" @change="handleFileUpload" class="form-control-file">
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
      buku: {
        nama_buku: '',
        deskripsi: '',
        foto: null // Menggunakan null untuk foto awalnya
      }
    }
  },
  methods: {
    tambah() {
      const formData = new FormData();
      formData.append('nama_buku', this.buku.nama_buku);
      formData.append('deskripsi', this.buku.deskripsi);
      formData.append('foto', this.buku.foto);

      axios.post('http://localhost:8000/api/addbuku',{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} }, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set header untuk FormData
        }
      })
      .then(res => {
        console.log('Data yang dikirim:', formData);
        console.log('Response dari server:', res.data);
        this.$router.push('/buku');
      })
      .catch(err => console.log(err))
    },
    handleFileUpload(event) {
      this.buku.foto = event.target.files[0];
    }
  }
}
</script>