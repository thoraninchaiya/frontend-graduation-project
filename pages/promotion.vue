<template>
 <v-app>
    <v-container class="grey lighten-5">
      <v-row class="mb-6" no-gutters>
        <v-col v-for="n in 4" :key="n">
          <v-card class="pa-2" tile outlined>
            col
          </v-card>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col v-for="n in 2" :key="n" :cols="n === 1 ? 8 : 4">
          <v-card class="pa-2" tile outlined>
            col-{{ n === 1 ? 8 : 4 }}
          </v-card>
        </v-col>
      </v-row>


    <div>
      <Info-IProduct/>
    </div>

    </v-container>


 </v-app>


</template>

<!--<template>
  <div>
      promotion
  </div>
</template> -->

<script>
import {Core} from '@/vuexes/core'
import {User} from '@/vuexes/auth'

export default {
  data () {
    return {
      user: {}
    }
  },
async Request(){

},
async created(){
  await this.checkUser();
},
methods: {
  async checkUser(){
    let token = User.token
    // console.log("this promotion token: " + token)
    if(token){
      this.user = await User.getUser();
    }
  }
}


}
</script>

<style>

</style>