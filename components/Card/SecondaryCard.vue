<template>
  <v-card class="my-12 ml-5 mr-5" max-width="350">
    <nuxt-link :to="{name: 'post-id', params: {id: post.secretid}}"></nuxt-link>

    <v-img height="350" :src="`${post.image}`"></v-img>

    <v-card-title>
        {{post.name}}
        <!-- <nuxt-link :to="{params: {id: post.id}}">{{post.title}}</nuxt-link> -->
    </v-card-title>

    <v-card-text>
      <div>
        <div>ID: {{post.id}}</div>
        <div>Price: {{post.price}}</div>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
  </v-card>
</template>

<script>
export default {
    props:{
        post: Object
    }
};
</script>

<style>
</style>