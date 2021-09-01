<template>
  <v-app>
    <v-carousel cycle height="750" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="(slide, i) in carousel" :key="i">
        <v-sheet :image="carousel[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-img height="" :src="`${slide.image}`"></v-img>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <pre>{{user}}</pre>

    <v-container grid-list-xs>
      <div class="mt-5">
        <div class="d-lg-flex justify-center">
          <v-app>
            <v-card>
              <v-card-title class="justify-center">
                <div class="display-1">
                  <h4>สินค้าใหม่</h4>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="d-flex align-content-start flex-wrap justify-center">
                <!-- <Card-SecondaryCard v-for="post in carddata" :key="post.secretid" :post="post" /> -->
                <Card-FirstCard v-for="post in carddata" :key="post.secretid" :post="post" />
              </v-card-text>
            </v-card>
          </v-app>
        </div>
      </div>      
    </v-container>

  </v-app>
</template>

<script>
import {Core} from '@/vuexes/core'
import {Web} from '@/vuexes/web'
import {User} from '@/vuexes/auth'
import MainCard from '@/components/Card/FirstCard'
  export default{
    components:{
      MainCard
    },
    data () {
      return {
        carousel: [],
        carddata: [],
        user: {},
      }
    },
    methods: {
      async getProducts(){
        this.carddata = await Core.get(`/newproduct`)
      },
      async getCarousel(){
        this.carousel = await Core.get(`/getcarousel`)
      }
    },
    async Request(){
      await getProducts();
      await getCarousel();
    },
    async created() {
      await this.getProducts();
      await this.getCarousel();
      this.user = await User.getUser();
    }
  }
</script>

<style>

</style>