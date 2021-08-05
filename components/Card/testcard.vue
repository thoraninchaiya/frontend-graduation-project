<template>
  <div class="d-flex">
	  <v-card class="mx-auto my-12 ml-2" max-width="350">
		  <div>
			<v-img height="330" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
		  </div>
		<v-card-title class="">
			Title
			<!-- <nuxt-link :to="{params: {id: post.id}}">{{post.title}}</nuxt-link> -->
		</v-card-title>
		  <v-card-text>
			  <v-btn class="light-blue"><i class="fas fa-cart-plus"></i></v-btn>
		  </v-card-text>
		<v-divider class="mx-4"></v-divider>
	  </v-card>
  </div>
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