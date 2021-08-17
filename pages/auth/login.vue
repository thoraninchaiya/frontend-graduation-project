<template>
  <div class="bgh">
    <div class="mt-16 flex justify-center items-center">
      <v-card class="w-full md:w-1/2 rounded-xl elevation-8">
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
</template>

<script>
import { User } from "@/vuexes/auth";

export default {
  data: () => {
    return {
      form: {},
    };
  },
  async created() {
    await this.checkUser();
    // await this.getUser();
  },
  methods: {
    async getUser() {
      let account = await User.getUser();
      if (account.email) {
        await this.$router.replace("/");
      }
    },
    async login() {
      await User.login(this.form);
      let account = await User.getUser();
      console.log(account)
      if (account.email) {
        await location.reload();
      }
    },
    async checkUser() {
      let token = User.token;
      if(token){
        await User.storeToken(token);
        await this.$router.replace("/");
      }

    },
  },
};
</script>

<style>
</style>