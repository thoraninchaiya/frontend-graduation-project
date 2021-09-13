<template>
  <div>
    <v-card class="my-12 ml-5 mr-5" max-width="330" max-height="580">
      <a @click="console()">
        <div>
          <nuxt-link :to="{ name: 'post-id', params: { id: post.secretid } }"></nuxt-link>
            <v-img height="350" :src="`${post.image}`"></v-img>
          <v-card-title>
            {{ post.name }}
          </v-card-title>
        </div>
        <v-card-text>
          <div class="card-body">
            <div class="card-title">ID: {{ post.pid }}</div>
            <div class="card-text">Price: {{ post.price }}</div>
          </div>
        </v-card-text>
      </a>
      <div class="d-flex justify-center card-footer">
        <form @submit.prevent="addcart()">
          <div v-if="post.onstock == true">
            <v-btn color="success" type="submit">เพิ่มลงตะกร้า</v-btn>
          </div>
          <div v-else>
            สินค้าหมด
          </div>
        </form>
      </div>
    </v-card>

    <v-dialog v-model="dialog" :overlay="false" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-text>
          this product
        </v-card-text>
      </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
import { Core } from "@/vuexes/core";
export default {
  data: () =>{
    return {
      dialog: false,
      producttocart: {
        sid: {},
        pid: {},
        qty: 1,
      }
    }
  },
  props: {
    post: Object,
  },
  async created(){
    // console.log(this.post.id)
  },
  methods:{
    async addcart(){
      this.producttocart.sid = this.post.id
      this.producttocart.pid = this.post.pid
      let cartstatus = await Core.post(`/cart/add`, this.producttocart);
      // console.log(cartstatus);
      let toast = this.$toasted.show("ท่านได้เพิ่มสินค้าลงตะกร้า", { 
      type: "success",
	    theme: "toasted-primary",
	    position: "top-right", 
	    duration: 5000
      });
    },
    async console(){
      console.log("hello world")
    }
  }
};
</script>

<style>
</style>