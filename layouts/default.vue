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
      // await this.getUser()
    },
    methods:{
      async checkUser(){
        let token  = User.token
        await User.storeToken(token)
        this.response = true
        // if(token){
        //   let account = await User.getUser();
        // }
      },
      async getUser() {
        let account = await User.getUser();
        if(account.status != 400 || account.status != 400){
          return account
        }else{
          return account.message
        }
      }
    }
}
</script>

<style>

::-webkit-scrollbar {
  display: none;
}

</style>