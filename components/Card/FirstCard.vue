<template>
  <v-card class="mx-auto my-12 ml-5 mr-5" max-width="330">
    <nuxt-link :to="{name: 'post-id', params: {id: post.secretid}}"></nuxt-link>

    <v-img height="250" :src="`${post.image}`"></v-img>

    <v-card-title>
        {{post.name}}
        <!-- <nuxt-link :to="{params: {id: post.id}}">{{post.title}}</nuxt-link> -->
    </v-card-title>

    <v-card-text>
      <div>
        <!-- {{post.id}} -->
        {{post.price}}
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