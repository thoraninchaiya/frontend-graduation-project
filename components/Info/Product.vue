<template>
  <v-app>
      <v-btn @click="infoproduct=!infoproduct" color="success">test</v-btn>
      <v-dialog v-model="infoproduct" scrollable :overlay="false" max-width="1000px" transition="dialog-transition">
          <v-card>
              <v-card-title primary-title>
                  
                  <v-spacer></v-spacer>
                  <v-btn text @click="infoproduct=!infoproduct">
                      <i class="em em-x" aria-role="presentation" aria-label="CROSS MARK"></i>
                  </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                  <div class="d-flex">
                      <div>
                          <v-img max-width="250" src="http://localhost:8080/img/product/0a72e7dd2a1bea142e4afced6747fb96.jpg"></v-img>
                      </div>
                      <div class="ml-3">
                          <h1>Title</h1>
                      </div>
                  </div>
                  <v-divider></v-divider>
                  <div class="mt-5">
                      <div>
                          <p class="text-h5">Lorem ipsum dolor sit amet consectetur</p>
                      </div>
                  </div>
              </v-card-text>
          </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
export default {
    data: () =>{
        return {
            infoproduct: true
        }
    },
    methods:{
        async callback(){
            this.infoproduct = false,
            this.$emit('ending')
        }
    }
}
</script>

<style>

</style>