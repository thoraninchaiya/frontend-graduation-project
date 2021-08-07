<template>
  <v-card class="mx-auto my-12" max-width="330">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="250" src="/img/58570dc49447a3fb2d58c362cb1eb781.jpg"></v-img>

    <v-card-title>
        <nuxt-link :to="{name: 'post-id', params: {id: post.id}}">{{post.title}}</nuxt-link>
        <!-- <nuxt-link :to="{params: {id: post.id}}">{{post.title}}</nuxt-link> -->
    </v-card-title>

    <v-card-text>
      <div>
        {{post.body}}
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