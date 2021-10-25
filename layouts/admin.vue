<template>
<div class="d-flex">
    <div class="ma-12 pa-12">
        <AdminCom-Core-Nav/>
    </div>
    <v-main>
        <Nuxt />
    </v-main>
</div>
</template>

<script>
import {User} from '@/vuexes/auth'

export default {
    data() {
        return {

        }
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

</style>
