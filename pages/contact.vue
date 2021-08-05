<template>
  <v-app>
    <div class="d-sm-inline-flex d-md-inline-flex mt-10">

      <v-col cols="2">
        <v-card>
          <v-card-text class="d-inline-flex flex-col">
            <v-btn color="success" v-for="(tab, index) in contactList" :key="tab.id" @click="ContactTab = index" :class="{active: ContactTab === index}" class="mt-3">
              <div>
                {{ tab }}
              </div>
            </v-btn>

            <!-- <v-btn color="success">เกี่ยวกับ</v-btn>
            <v-btn color="success" class="mt-3">การชำระเงิน</v-btn>
            <v-btn color="success" class="mt-3">ช่องทางการติดต่อ</v-btn> -->
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="" cols="10">
        <v-card>
          <v-card-text>
            <div v-show="ContactTab === 0">
              <More-About/>
            </div>
            <div v-show="ContactTab === 1">
              <More-Payment/>
            </div>
            <div v-show="ContactTab === 2">
              <More-Contact/>
            </div>              
          </v-card-text>
        </v-card>
      </v-col>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => {
    return ({
      ContactTab: 0,
      contactList: ['เกี่ยวกับ', 'การชำระเงิน', 'ช่องทางการติดต่อ']
    });
  },
}
</script>

<style>

</style>