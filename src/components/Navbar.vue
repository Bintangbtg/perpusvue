<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>      
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <button class="btn btn-sm btn-danger" @click="logout"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </li>
        </ul>
    </nav>
</template>

<script>
import axios from 'axios'

export default {
    created() {
        console.log(this.$store.state.token);
    },
    methods: {
        logout() {
            axios.post('http://localhost:8000/api/logout', null, {
                headers: { 'Authorization': `Bearer ${this.$store.state.token}` }
            })
            // eslint-disable-next-line no-unused-vars
            .then(res => {
                this.$store.commit('clearToken');
                this.$router.push('/login');
            })
            .catch(err => {
                console.error(err);
            });
        }
    }
}
</script>