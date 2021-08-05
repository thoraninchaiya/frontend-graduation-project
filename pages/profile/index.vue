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
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="" cols="10">
        <v-card>
          <v-card-text>
            <div v-show="ContactTab === 0">
              <User-About/>
            </div>
            <div v-show="ContactTab === 1">
              <User-Payment/>
            </div>
            <div v-show="ContactTab === 2">
              <User-Contact/>
            </div>              
            <div v-show="ContactTab === 3">
              <User-Delivery/>
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
      contactList: ['บัญชีของฉัน', 'การสั่งซื้อ', 'การชำระเงิน', 'ติดตามสินค้า']
    });
  },
}
</script>

<style>

</style>