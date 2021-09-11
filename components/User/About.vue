<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        บัญชีของฉัน
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-if="editmode == false">
          <v-text-field v-model="form.email" label="อีเมลล์" disabled></v-text-field>
          <v-text-field v-model="form.fname" label="ชื่อ" disabled></v-text-field>
          <v-text-field v-model="form.lname" label="นามสกุล" disabled></v-text-field>
          <v-text-field v-model="form.addr" label="ที่อยู่" disabled></v-text-field>
          <v-text-field v-model="form.phone" label="เบอร์โทรศัพท์" disabled></v-text-field>
          <v-btn color="error" @click="editmode = true">แก้ไขข้อมูล</v-btn>
        </div>
        <form @submit.prevent="saveprofile()">
          <div v-if="editmode == true">
            <v-text-field v-model="form.email" label="อีเมลล์" disabled required></v-text-field>
            <v-text-field v-model="form.fname" label="ชื่อ" required></v-text-field>
            <v-text-field v-model="form.lname" label="นามสกุล" required></v-text-field>
            <v-text-field v-model="form.addr" label="ที่อยู่" required></v-text-field>
            <v-text-field v-model="form.phone" label="เบอร์โทรศัพท์" maxlength="10" size="10" required></v-text-field>
            <v-btn color="error" @click="editmode = false; checkUser()">ยกเลิก</v-btn>
            <v-btn color="success" type="submit">บันทึก</v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {Core} from '@/vuexes/core';
import { User } from '@/vuexes/auth';

export default {
  data:() => {
    return {
      editmode: false,
      form: {}
    }
  },
  async created(){
    await this.checkUser();
  },
  methods: {
    async checkUser(){
      let token = User.token;
      if(token){
        this.form = await Core.get(`/user/profile`)
      }
    },
    async saveprofile(){
      let user = await Core.put(`/user/edit`, this.form)
      if(user.status == 200){
        await this.checkUser();
        this.editmode = false

        let toast = this.$toasted.show(user.message, { 
        type: "success",
	      theme: "toasted-primary",
	      position: "top-right", 
	      duration: 5000
        });
      }else{
        let toast = this.$toasted.show(user.message, { 
        type: "error",
	      theme: "toasted-primary",
	      position: "top-right", 
	      duration: 5000
        });
      }
    }
  }
}
</script>

<style>

</style>