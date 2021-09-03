<template>
  <v-bottom-navigation dark>
    <v-btn @click="$router.push('/')">
      <span class="font">หน้าแรก</span>
    </v-btn>
    <!-- <v-btn @click="$router.push('newproduct')">
      <span class="font">สินค้าใหม่</span>
    </v-btn> -->
    <v-btn @click="$router.push('product')">
      <span class="font">สินค้า</span>
    </v-btn>
    <!-- <v-btn  @click="$router.push('promotion')">
      <span class="font">โปรโมชั่น</span>
    </v-btn> -->
    <v-btn  @click="$router.push('registering')">
      <span class="font">ลงทะเบียน</span>
    </v-btn>
    <v-btn  @click="$router.push('limited')">
      <span class="font">สินค้าลิมิเต็ด</span>
    </v-btn>
    <!-- <v-btn @click="$router.push('about')">
      <span class="font">เกี่ยวกับ</span>
    </v-btn> -->
    <v-btn @click="$router.push('contact')">
      <span class="font">ติดต่อเรา</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {

}
</script>

<style>
  .font{
      font-size: 1rem;
  }
</style>