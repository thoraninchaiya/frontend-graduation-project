<template>
  <div class="d-flex">
	  <v-card class="mx-auto my-12 ml-2" max-width="350">
		  <div>
			<v-img height="330" src="/img/58570dc49447a3fb2d58c362cb1eb781.jpg"></v-img>
		  </div>
		<v-card-title class="">
			Title sdsd
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