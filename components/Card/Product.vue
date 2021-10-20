<template>
  <div>
    <!-- {{post}} -->
    <nuxt-link :to="{ name: 'post-id', params: { id: post.secretid } }"></nuxt-link>
    <v-card class="my-12 ml-5 mr-5" max-width="330" max-height="580">
      <a @click="console(post.id)">
        <div>
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
        <v-card-title primary-title>
          {{post.name}}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div>
            <div>
              <v-img class="imagesize" :src="`${post.image}`"></v-img>
            </div>
            <div>
              sds
            </div>
          </div>
          <v-divider></v-divider>
          <div>
            
          </div>
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
      },
      productdata: {
        sid: null,
        name: "ProductName",
        price: null,
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
    async console(x){
      console.log(x)
      this.dialog = true
    }
  }
};
</script>

<style>
.imagesize{
  width: 35%;
}
</style>