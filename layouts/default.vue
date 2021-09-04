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
        // console.log(token)
        // console.log("test:" + token)
        if(token){
          let account = await User.getUser();
          console.log("this account in default page: " + JSON.stringify(account))
        }
      },
      async getUser() {
        let account = await User.getUser();
        console.log(account)
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