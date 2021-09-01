<template>
  <v-app>
      <v-btn @click="dialog=!dialog" color="success">test</v-btn>
      <v-dialog v-model="dialog" scrollable :overlay="false" max-width="1000px" transition="dialog-transition">
          <v-card>
              <v-card-title primary-title>
                  title
                  <v-spacer></v-spacer>
                  <v-btn text @click="dialog=!dialog">
                      <i class="em em-x" aria-role="presentation" aria-label="CROSS MARK"></i>
                  </v-btn>
              </v-card-title>
              <v-card-text>
                <div class="bgh">
                  <div class="mt-16 flex justify-center items-center" width="800px">
                    <v-card>
                      <v-card-text>
                        <form @submit.prevent="login()">
                          <!-- <v-text-field required v-model="form.email" filled label="อีเมลล์" rounded type="text"></v-text-field> -->
                          <v-text-field required v-model="form.email" filled label="อีเมลล์" rounded type="text"></v-text-field>
                          <v-text-field required v-model="form.password" type="password" filled label="รหัสผ่าน" rounded></v-text-field>
                          <v-btn depressed large color="success" class="w-full" type="submit" rounded >เข้าสู่ระบบ</v-btn>
                          <br/><br/>
                          <v-btn text large rounded color="primary" class="w-full font-bold" @click="$router.push('/auth/register')" >สมัครสมาชิก</v-btn>
                        </form>
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
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
        dialog:false,
        form: {},
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