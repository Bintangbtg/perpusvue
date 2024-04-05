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
                                    <h4 class="m-0">Detail Buku</h4>
                                </div>
                                <div class="card-body text-justify">
                                    <h5 class="mb-3">{{buku.nama_buku}}</h5>

                                    <h6>Deskripsi</h6>
                                    <p class="card-text">{{buku.deskripsi}}</p>

                                    <h6>Foto</h6>
                                    <p class="card-text">{{buku.foto}}</p>
                                    <router-link class="btn btn-primary" to="/buku">Kembali</router-link>
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
            buku : {}
        }
    },
    created() {   
        axios.get(`http://localhost:8000/api/getbukuById/${this.$route.params.id}`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                  .then(res => {
                      this.buku = res.data
                  })
                  .catch(err => console.log(err))             
    }
}
</script>