<template>
  <v-app>
      <v-btn @click="dialog=!dialog" color="success">test</v-btn>
      <v-dialog v-model="dialog" scrollable :overlay="false" max-width="300px" transition="dialog-transition">
          <v-card>
              <v-card-title primary-title>
                  title
                  <v-spacer></v-spacer>
                  <v-btn text @click="dialog=!dialog">
                      <i class="em em-x" aria-role="presentation" aria-label="CROSS MARK"></i>
                  </v-btn>
              </v-card-title>
              <v-card-text>
                  text
              </v-card-text>
          </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
export default {
    props: {

    },
    data:()=>{return({
        dialog:false
    })},
    methods:{
        async callback(){
            this.dialog = false
        }
    }
}
</script>

<style>

</style>