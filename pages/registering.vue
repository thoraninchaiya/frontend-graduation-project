<template>
  <v-app>
    <!-- <div class="d-sm-inline-flex d-md-inline-flex"> -->
    <div class="d-flex">

      <v-col class="" cols="">
          <v-card>
            <v-card-title>
              <div>สินค้าลงทะเบียน</div>
            </v-card-title>
            <!-- <pre>{{carddata}} </pre> -->
            <v-divider></v-divider>
            <!-- <v-card-text class="d-flex align-content-start flex-wrap justify-center"> -->

            <div v-if="carddata.status != 404">
              <v-card-text>{{carddata.message}}</v-card-text>
              <v-card-text class="d-flex align-content-start flex-wrap">
                  <Card-Product v-for="post in carddata" :key="post.secretid" :post="post" />
              </v-card-text>
            </div>
            <div v-else>
              <v-card-text>{{carddata.message}}</v-card-text>
            </div>
          </v-card>
      </v-col>
    </div>
  </v-app>

</template>

<script>
import  {Core} from '@/vuexes/core'
import {Web} from '@/vuexes/web'
import MainCard from '@/components/Card/Product'

  export default {
    components:{
      MainCard
    },
    data () {
      return {
        carddata: [],
        test: []
      }
    },
    methods: {
      async getProducts(){
        this.carddata = await Core.get(`/registeringproducts`)
      }
    },
    async Request(){
      await getProducts();
    },
    async created(){
      await this.getProducts();
    }
  }
</script>

<style>

</style>