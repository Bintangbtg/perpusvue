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
                                            <label>Nama Buku</label>
                                            <select class="form-control" v-model="idBuku">
                                                <option v-for="book in books" :key="book.id_buku" :value="book.id_buku">{{ book.nama_buku }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Quantity</label>
                                            <input type="number" class="form-control" v-model="qty">
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter dari vue-router

export default {
    setup() {
        const idBuku = ref('');
        const qty = ref('');
        const books = ref([]);
        const router = useRouter(); // Mendapatkan objek router dari vue-router

        const getBooks = () => {
            axios.get('http://localhost:8000/api/getbuku',{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                .then(res => {
                    books.value = res.data.books; // Mengambil array buku dari properti 'books'
                    console.log(books.value)
                })
                .catch(err => console.log(err));
        };

        const tambah = () => {
            axios.post(`http://localhost:8000/api/tambah_item/${router.currentRoute.value.params.id}`,{ headers : { 'Authorization' : `Bearer ` + this.$store.state.token} }, {
                id_buku: idBuku.value,
                qty: qty.value
            })
                .then(res => {
                    console.log(res.data);
                    router.push('/pinjam');
                })
                .catch(err => console.log(err));
        };

        onMounted(getBooks);

        return { idBuku, qty, books, tambah };
    }
}
</script>