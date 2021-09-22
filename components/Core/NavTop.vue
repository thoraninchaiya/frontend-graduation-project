<template>
    <div>
        <v-app-bar dark>
            <h2 class="brand-name">
              <v-btn @click="$router.push('/')">SALAFEX</v-btn>
              </h2>
            <v-spacer></v-spacer>
            <div v-if="token != null">
              <v-btn @click="$router.push('/profile/')"><i class="fas fa-user-alt mr-3"></i> {{" สวัสดีคุณ " + user.fname + " " + user.lname}} </v-btn>
            </div>
            <div class="ml-5" v-if="token != null">
              <!-- <pre> {{cart}} </pre> -->
              <Cart/>
            </div>
            <div class="ml-5">
              <v-btn v-if="token == null" class="btn-white" @click="$router.push('/auth/login')">เข้าสู่ระบบ</v-btn>
              <v-btn v-else @click="logout()" color="btn-white">ออกจากระบบ</v-btn>
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
      cart: [],
      user: {}
    })
  },
  async created() {
    this.token = User.token;
    await this.checkUser();
  },
    methods:{
    async logout(){
      await User.logout()
    },
    async checkUser(){
      let token = User.token
      if(token){
        this.user = await User.getUser();
        if(this.user.status == 401){
          await User.logout()
        }
      }
    }
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