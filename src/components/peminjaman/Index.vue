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
                            <h1 class="m-0">Data Peminjaman</h1>
                        </div>          
                    </div>
                </div>
            </div>
 
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-10">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <router-link class="btn btn-info mb-2" to="/pinjam/tambah">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">#</th>
                                                <th>Nama Siswa</th>
                                                <th>Tanggal Pinjam</th>
                                                <th>Tanggal Kembali</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(p, index) in pinjam" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ siswaMap[p.id_siswa] }}</td> <!-- Menggunakan nama siswa dari siswaMap -->
                                                <td>{{ formatDate(p.tanggal_pinjam) }}</td>
                                                <td>{{ formatDate(p.tanggal_kembali) }}</td>
                                                <td>
                                                    <span v-if="checkStatus(p.id_peminjaman_buku)" class="badge bg-success">Kembali</span>
                                                    <span v-else class="badge bg-danger">Belum kembali</span>
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <router-link class="btn btn-success" :to="{ name : 'detailpinjam' , params : { id : p.id_peminjaman_buku } }">Detail</router-link>
                                                        <router-link class="btn btn-warning" :to="{ name : 'editpinjam' , params : { id : p.id_peminjaman_buku } }">Edit</router-link>  
                                                        <button type="button" @click="hapus(p.id_siswa)" class="btn btn-danger">Hapus</button>                                                      
                                                    </div>
                                                </td>
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
import axios from 'axios'

export default {
    data() {
        return {
            pinjam: [], 
            pengembalian: [],
            siswaMap: {}
        }
    },
    created() {        
        axios.get('http://localhost:8000/api/getpinjam',{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                  .then( res => {
                      this.pinjam = res.data
                      // Memuat data siswa setelah data peminjaman dimuat
                      this.loadSiswaData();
                  }),
        axios.get('http://localhost:8000/api/getkembali',{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                  .then( res => {
                      this.pengembalian = res.data
                      // Memuat data siswa setelah data pengembalian dimuat
                      this.loadSiswaData();
                  })
    },
    methods : {
        formatDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = ('0' + (d.getMonth() + 1)).slice(-2);
            const day = ('0' + d.getDate()).slice(-2);
            return `${day}/${month}/${year}`;
        },
        hapus(id) {
            axios.delete(`http://localhost:8000/api/pinjam/${id}`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                      // eslint-disable-next-line no-unused-vars
                      .then( res => {
                          let i = this.pinjam.map(item => item.id).indexOf(id);
                          this.pinjam.splice(i, 1);
                      });
        },
        checkStatus(idPeminjaman) {
            const pinjamMatch = this.pinjam.some(p => p.id_peminjaman_buku === idPeminjaman);
            const pengembalianMatch = this.pengembalian.some(p => p.id_peminjaman_buku === idPeminjaman);
            return pinjamMatch && pengembalianMatch;
        },
        loadSiswaData() {
            // Mengambil data siswa berdasarkan id_siswa pada setiap data pinjam
            this.pinjam.forEach(item => {
                if (!this.siswaMap[item.id_siswa]) {
                    axios.get(`http://localhost:8000/api/getsiswaById/${item.id_siswa}`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                        .then(res => {
                            this.siswaMap[item.id_siswa] = res.data.nama_siswa; // Menggunakan sintaks objek JavaScript biasa
                        })
                        .catch(error => {
                            console.error('Error fetching siswa data:', error);
                        });
                }
            });
        },
    }
}
</script>