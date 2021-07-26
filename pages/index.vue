<template>
  <v-app>
    <v-carousel cycle height="650" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="(slide, i) in colors" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <!-- <div class="text-h2">
              {{ slide }} Slide
            </div> -->
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <v-container grid-list-xs>
      <div class="mt-5">
        <div class="d-lg-flex justify-center">
          <v-app>
            <v-card>
              <v-card-title class="justify-center">
                <div>
                  สินค้าใหม่
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="d-flex align-content-start flex-wrap">
                <Card-FirstCard v-for="post in carddata" :key="post.id" :post="post" />
              </v-card-text>
            </v-card>
          </v-app>
        </div>
      </div>      
    </v-container>

  </v-app>
</template>

<script>
import axios from 'axios'
import MainCard from '@/components/Card/FirstCard'

  export default {
    components:{
      MainCard
    },
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
          'green',
        ],
        carddata: [],
      }
    },
    async created() {
      this.carddata = await axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((result)=>{return result.data})
      .catch((error)=>{return error.response})
    }
  }
</script>

<style>

</style>