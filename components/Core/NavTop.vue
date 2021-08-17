<template>
    <div>
        <v-app-bar dark>
            <h2 class="brand-name">SALAFEX</h2>
            <v-spacer></v-spacer>
            <div class="">
              <Cart/>
              <!-- <v-btn color="" ><i class="fas fa-shopping-cart"></i></v-btn> -->
            </div>
            <div class="ml-5">
              <v-btn v-if="token == null" class="btn-white" @click="$router.push('/auth/login')">เข้าสู่ระบบ</v-btn>
              <v-btn v-else @click="logout()" color="btn-white">Logout</v-btn>
            </div>
            <div>
              
            </div>
        </v-app-bar>
    </div>
</template>

<script>
import {User} from '@/vuexes/auth'
export default {
  data:() =>{
    return ({
      token : null
    })
  },
  methods:{
    async logout(){
      await User.logout()
    }

  },
  async created() {
    this.token = User.token
  },
}
</script>

<style>
    .brand-name{
        padding-left: 3rem;
    }
    .nav-content{
        padding-left: 3rem;
    }
</style>