<template>
  <v-app>
      <v-btn @click="dialog=!dialog" color="success">test</v-btn>
      <v-dialog v-model="dialog" scrollable :overlay="false" max-width="1000px" transition="dialog-transition">
          <v-card>
              <v-card-title primary-title>
                  title
                  <v-spacer></v-spacer>
                  <v-btn text @click="dialog=!dialog">
                      <i class="em em-x" aria-role="presentation" aria-label="CROSS MARK"></i>
                  </v-btn>
              </v-card-title>
              <v-card-text>
                <form @submit.prevent="addcart()">
                  <v-text-field label="name" v-model="form.name"></v-text-field>
                  <v-btn color="success" type="submit">text</v-btn>
                </form>
              </v-card-text>
          </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
import {Core} from '@/vuexes/core'
import {User} from '@/vuexes/auth'

export default {
  props: {

  },
  data () {
    return {
      dialog: false,
      form: {},
      cart: {}
    }
  },
  async created(){
    // await this.checkUser();
    // console.log(this.token)
  },
  methods: {
    async callback(){
      this.$emit('ending')
    },
    async addcart(){
      let cart = await Core.post(`/cart/add`, this.form)
      if(cart.status != 400){
        console.log("true")
      }else{
        return(cart.message)
      }
      // console.log(cart)
      // console.log(this.form)
    }
    
  }
}
</script>

<style>

</style>