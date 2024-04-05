import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import IndexSiswa from '../components/siswa/index.vue'
import TambahSiswa from '../components/siswa/Tambah.vue'
import EditSiswa from '../components/siswa/Edit.vue'
import DetailSiswa from '../components/siswa/Detail.vue'
import IndexBuku from '../components/buku/index.vue'
import TambahBuku from '../components/buku/Tambah.vue'
import EditBuku from '../components/buku/Edit.vue'
import DetailBuku from '../components/buku/Detail.vue'
import IndexPinjam from '../components/peminjaman/Index.vue'
import TambahPinjam from '../components/peminjaman/TambahPinjam.vue'
import EditPinjam from '../components/peminjaman/Edit.vue'
import Detail from '../components/peminjaman/Detail.vue'
import TambahDetail from '../components/peminjaman/TambahDetail.vue'
import Pengembalian from '../components/peminjaman/Pengembalian.vue'
import Login from '../components/Login.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta : {
      requiresAuth: true
    }
  },
  {
    path: '/siswa',
    name: 'IndexSiswa',
    component: IndexSiswa,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'tambahsiswa',
    path : '/siswa/tambah',
    component : TambahSiswa,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'editsiswa',
    path : '/siswa/edit/:id',
    component : EditSiswa,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'detailsiswa',
    path : '/siswa/detail/:id',
    component : DetailSiswa,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'indexbuku',
    path : '/buku',
    component : IndexBuku,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'tambahbuku',
    path : '/buku/tambah',
    component : TambahBuku,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'editbuku',
    path : '/buku/edit/:id',
    component : EditBuku,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'detailbuku',
    path : '/buku/detail/:id',
    component : DetailBuku,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'indexpinjam',
    path : '/pinjam',
    component : IndexPinjam,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'tambahpinjam',
    path : '/pinjam/tambah',
    component : TambahPinjam,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'editpinjam',
    path : '/pinjam/edit/:id',
    component : EditPinjam,
    meta : {
      requiresAuth: true
    }
  },
  {
    name: 'detailpinjam',
    path: '/pinjam/detail/:id',
    component: Detail,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'tambahdetail',
    path : '/pinjam/detail/tambah/:id',
    component : TambahDetail,
    meta : {
      requiresAuth: true
    }
  },
  {
    name: 'pengembalian',
    path: '/pengembalian',
    component: Pengembalian,
    meta : {
      requiresAuth: true
    }
  },
  {
    name : 'login',
    path : '/login',
    component : Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
      if(localStorage.getItem('auth')) {
        next()      
      } else {
        next('/login')
      }
  }
  next()
})

export default router