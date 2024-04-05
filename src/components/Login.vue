<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="login-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <h2>Perpustakaan Sekolah</h2>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Masukkan Email dan Password</p>

                <form @submit.prevent="login">
                    <div class="input-group mb-3">
                    <input type="email" class="form-control" placeholder="Email" v-model="account.email">
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" class="form-control" placeholder="Password" v-model="account.password">
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                        </div>
                    </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            account : {
                email : '',
                password : '',
                token : ''
            }
        }
    },
    created() {
        if(this.$store.state.token !== '') {
            axios.post('http://localhost:8000/api/checkToken', null, {
            headers: { 'Authorization': `Bearer ${this.$store.state.token}` }
        })
                            // eslint-disable-next-line no-unused-vars
                            .then(res => {
                                this.$router.push('/');
                                console.log("berhasil")
                            })
                            // eslint-disable-next-line no-unused-vars
                            .catch(err => {
                                this.$store.commit('clearToken');
                                console.log("error")
                            })
                }
    },
    methods : {
        async login() {
            try {
                const response = await axios.post('http://localhost:8000/api/login', this.account);
                console.log(response.data);
                if (response.data.authorization && response.data.authorization.token) {
                    this.$store.commit('setToken', response.data.authorization.token);
                    this.$router.push('/');
                } else {
                    console.log("Token not received");
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }
    }
}
</script>