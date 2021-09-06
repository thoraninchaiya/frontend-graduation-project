<template>
    <div>
        <v-app-bar dark>
            <h2 class="brand-name">
              <v-btn @click="$router.push('/')">SALAFEX</v-btn>
              </h2>
            <v-spacer></v-spacer>
            <div class="">
              <!-- <pre> {{cart}} </pre> -->
              <Cart/>
            </div>
            <div class="ml-5">
              <v-btn v-if="token == null" class="btn-white" @click="$router.push('/auth/login')">เข้าสู่ระบบ</v-btn>
              <v-btn v-else @click="logout()" color="btn-white">Logout</v-btn>
            </div>
        </v-app-bar>
    </div>
</template>

<script>
import {Core} from '@/vuexes/core'
import {User} from '@/vuexes/auth'
export default {
  data:() =>{
    return ({
      token : null,
      cart: []
    })
  },
  async created() {
    this.token = User.token
  },
    methods:{
    async logout(){
      await User.logout()
    },

  }
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