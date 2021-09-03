<template>
  <v-app>
    <Core-NavTop/>
    <Core-NavSec/>
    <Nuxt/>
    <!-- <Core-Footer/> -->
  </v-app>
</template>

<script>
import {User} from '@/vuexes/auth'

export default {

    data:()=>{
      return ({
        response:false
      })
    },
    async created(){
      await this.checkUser()
      await this.getUser()
    },
    methods:{
      async checkUser(){
        let token  = User.token
        await User.storeToken(token)
        this.response = true
        // console.log("test:" + token)
      },
      async getUser() {
        let account = await User.getUser();
      }
    }
}
</script>

<style>

::-webkit-scrollbar {
  display: none;
}

</style>