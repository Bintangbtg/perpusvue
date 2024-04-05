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
              <h1 class="m-0">Daftar Pengembalian Buku</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>ID Peminjaman Buku</th>
                        <th>Tanggal Pengembalian</th>
                        <th>Denda</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in pengembalianBuku" :key="item.id">
                        <td>{{ item.id_peminjaman_buku }}</td>
                        <td>{{ item.tanggal_pengembalian }}</td>
                        <td>{{ item.denda }}</td>
                      </tr>
                    </tbody>
                  </table>
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
      pengembalianBuku: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:8000/api/getkembali',{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
        .then(response => {
          this.pengembalianBuku = response.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }
};
</script>