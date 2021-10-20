<template>
  <div>
    <pre>{{post}}</pre>
    <v-card class="my-12 ml-5 mr-5" max-width="330" max-height="580">
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
      <div class="d-flex justify-center card-footer">
        <form @submit.prevent="registering(post.id), test(post.id)">
          <div v-if="post.onstock == true">
            <v-btn color="success" type="submit">ลงทะเบียน</v-btn>
          </div>
          <div v-else>
            สินค้าหมด
          </div>
        </form>
      </div>
    </v-card>
  </div>
</template>

<script>
import { Core } from "@/vuexes/core";
export default {
  data: () =>{
    return {
      producttocart: {
        sid: {},
        pid: {},
        qty: 1
      },
      register: {
        pid: null
      },
      registerdefault: {
        pid: null
      },
      testform: {
        message: "test"
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
    },
    async registering(productid){
      this.register.pid = productid
      let registerindata = await Core.post(`/product/registering`, this.register)
      console.log(registerindata)
      if(registerindata.status == 400){
        let toast = this.$toasted.show(registerindata.message, { 
        type: "error",
	      theme: "toasted-primary",
	      position: "top-right", 
	      duration: 5000
        });
      }
      if(registerindata.status == 200){
        let toast = this.$toasted.show(registerindata.message, { 
        type: "success",
	      theme: "toasted-primary",
	      position: "top-right", 
	      duration: 5000
        });
      }
    },
    async test(data){
      let commenttest = await Core.post('/comment/add/'+data, this.testform)
      console.log(commenttest)
    }
  }
};
</script>

<style>
</style>