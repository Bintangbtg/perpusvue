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
                            <div class="card card-info">
                                <div class="card-header">
                                    <h3 class="card-title">Edit Buku</h3>
                                </div>
                                <form @submit.prevent="edit">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label>Judul</label>
                                            <input type="text" class="form-control" v-model="buku.nama_buku">
                                        </div>                                        
                                        <div class="form-group">
                                            <label>Deskripsi</label>
                                            <textarea rows="4" class="form-control" v-model="buku.deskripsi"></textarea>
                                        </div>
                                        <!-- Menggunakan input text untuk foto -->
                                        <div class="form-group">
                                            <label>Foto (Link)</label>
                                            <input type="text" class="form-control" v-model="buku.foto">
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
            buku : {}
        }
    },
    created() {
        this.getDataBuku();
    },
    methods : {
        getDataBuku() {
            axios.get(`http://localhost:8000/api/getbukuById/${this.$route.params.id}`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                .then((res) => {
                    this.buku = res.data
                })
                .catch(err => console.log(err));
        },
        edit() {
            axios.put(`http://localhost:8000/api/updatebuku/${this.$route.params.id}`, this.buku,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                .then( res => {
                    console.log('Response dari server:', res.data);
                    this.$router.push('/buku');
                })
                .catch( err => console.log(err))
        }
    }
}
</script>