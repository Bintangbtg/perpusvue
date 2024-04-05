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
                            <div class="card card-warning">
                                <div class="card-header">
                                    <h3 class="card-title">Peminjaman Baru</h3>
                                </div>
                                <form @submit.prevent="tambah">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <select class="form-control" v-model="pinjam.id_siswa">
                                                <option v-for="(s, index) in siswa" :key="index" :value="s.id_siswa">{{s.nama_siswa}}</option>
                                            </select>                                            
                                        </div>                                        
                                        <div class="form-group">
                                            <label>Tanggal Pinjam</label>
                                            <input type="date" class="form-control" v-model="pinjam.tanggal_pinjam">
                                        </div>
                                        <div class="form-group">
                                            <label>Tanggal Kembali</label>
                                            <input type="date" class="form-control" v-model="pinjam.tanggal_kembali">
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
            pinjam : {},
            siswa : {}
        }
    },
    created() {
        axios.get('http://localhost:8000/api/getsiswa',{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                  .then(res => {
                      this.siswa = res.data
                  })
                  .catch(err => console.log(err));
    },
    methods : {
        tambah() {
            axios.post('http://localhost:8000/api/pinjam_buku', this.pinjam,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                      // eslint-disable-next-line no-unused-vars
                      .then( res => {
                        console.log(res.data);
                          this.$router.push('/pinjam');
                          console.log(this.pinjam)
                      })
                      .catch( err => console.log(err))
        }

    }
}
</script>