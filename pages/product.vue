<template>
  <v-app>
    <div class="d-sm-inline-flex d-md-inline-flex">

      <v-col cols="2">
        <v-card>
          <v-card-title class="justify-center">
            หมวดหมู่สินค้า
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="" cols="10">
          <v-card>
            <v-card-title>
              สินค้าทั้งหมด
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="d-flex align-content-start flex-wrap">
                <Card-SecondaryCard v-for="post in carddata" :key="post.id" :post="post" />
              </v-card-text>
          </v-card>      
      </v-col>
    </div>
  </v-app>

</template>

<script>
import axios from 'axios'
import MainCard from '@/components/Card/SecondaryCard'

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