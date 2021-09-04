<template>
  <div>
    <v-card class="my-12 ml-5 mr-5" max-width="330" max-height="580">
      <div>
        <nuxt-link :to="{ name: 'post-id', params: { id: post.secretid } }"></nuxt-link>
        <v-img height="350" :src="`${post.image}`"></v-img>
        <v-card-title>
          {{ post.name }}
          <!-- <nuxt-link :to="{params: {id: post.id}}">{{post.title}}</nuxt-link> -->
        </v-card-title>
      </div>
      <v-card-text>
        <div class="card-body">
          <div class="card-title">ID: {{ post.pid }}</div>
          <div class="card-text">Price: {{ post.price }}</div>
        </div>
      </v-card-text>
      <div class="d-flex justify-center card-footer">
        <v-btn color="success">เพิ่มลงตะกร้า</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
};
</script>

<style>
</style>