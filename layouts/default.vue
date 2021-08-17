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

    },
    methods:{
      async checkUser(){
        let token  = User.token
        await User.storeToken(token)
        this.response = true
      }
    }
}
</script>

<style>

::-webkit-scrollbar {
  display: none;
}

</style>