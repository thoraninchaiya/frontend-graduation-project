<template>
  <div class="bgh">
    <div class="mt-16 flex justify-center items-center">
      <v-card class="w-full md:w-1/2 rounded-xl elevation-8">
        <v-card-text>
          <form>
            <v-text-field required v-model="form.email" filled label="อีเมลล์" rounded type="email"></v-text-field>
            <v-text-field required v-model="form.password" type="password" filled label="รหัสผ่าน" rounded></v-text-field>
            <v-text-field required v-model="form.repassword" type="password" filled label="ยืนยันรหัสผ่าน" rounded></v-text-field>
            <v-text-field required v-model="form.fname" filled label="ชื่อ" rounded></v-text-field>
            <v-text-field required v-model="form.lname" filled label="นามสกุล" rounded></v-text-field>
            <v-text-field required v-model="form.phone" filled label="เบอร์ติดต่อ" rounded></v-text-field>
            <v-text-field required v-model="form.address" filled label="ที่อยู่" rounded></v-text-field>
            <v-btn depressed large color="success" class="w-full" type="submit" rounded>สมัครสมาชิก</v-btn>
            <br><br>
            <v-btn text large rounded color="primary" class="w-full font-bold" @click="$router.push('/auth/login')">เข้าสู่ระบบ</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
    data:()=>{
        return({
            dialog: false,
            form: {}   
        })
    },
    methods: {
      async register(){
      }
    }
}
</script>

<style>

</style>