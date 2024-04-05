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
              <h1 class="m-0">Detail Peminjaman Buku</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Detail Peminjaman</h3>
                </div>
                <div class="card-body">
                  <div v-if="loading">Loading...</div>
                  <div v-else>
                    <p v-if="errorMessage">{{ errorMessage }}</p>
                    <div v-if="detail">
                      <p>ID Buku: {{ detail.id_buku }}</p>
                      <p>Nama Buku: {{ detail.nama_buku }}</p>
                      <button class="btn btn-primary" @click="mengembalikanBuku">Mengembalikan Buku</button>
                    </div>
                    <router-link v-else  :to="{ name : 'tambahdetail' , params : { id : this.$route.params.id }}" class="btn btn-primary">Tambah Buku</router-link>
                  </div>
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
import axios from "axios";

export default {
  data() {
    return {
      detail: null,
      loading: true,
      errorMessage: ""
    };
  },
  created() {
    this.fetchDetail();
  },
  methods: {
    fetchDetail() {
      axios
        .get(`http://localhost:8000/api/daftarPinjamDetail/${this.$route.params.id}`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
        .then((response) => {
          this.detail = response.data;
          this.loadBookData(this.detail.id_buku);
          this.loading = false;
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          this.errorMessage = "Data tidak ditemukan";
          this.loading = false;
        });
    },
    loadBookData(idBuku) {
      axios
        .get(`http://localhost:8000/api/getbukuById/${idBuku}`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
        .then((response) => {
          this.detail.nama_buku = response.data.nama_buku;
        })
        .catch((error) => {
          console.error("Error fetching book data:", error);
        });
    },
    mengembalikanBuku() {
      axios
        .post(`http://localhost:8000/api/mengembalikan_buku`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} }, {
          id_peminjaman_buku: this.$route.params.id
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push('/pinjam')
          // Handle response according to your requirements
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    }
  }
};
</script>