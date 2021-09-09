<template>
  <div>
    <v-btn @click="cartdialog = !cartdialog;getcart(); "><i class="fas fa-shopping-cart"></i></v-btn>
    <v-dialog v-model="cartdialog" :overlay="false" max-width="800px" transition="dialog-transition">
      <v-card>
        <v-card-title primary-title> ตะกร้าสินค้า </v-card-title>
        <v-card-text>
          <div v-if="`${cart.status}` != 400">
            <v-simple-table fixed-header max-height="600px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th></th>
                    <th class="">สินค้า</th>
                    <th class="">ราคาต่อชิ้น</th>
                    <th class="">จำนวน</th>
                    <th class="">ราคารวม</th>
                    <th class="">action</th>
                  </tr>
                </thead>

                <tbody class="">
                  <tr v-for="item in cart" :key="item.cid">
                    <td>
                      <v-img class="cartimage" :src="`${item.image}`"></v-img>
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.price }}
                    </td>
                    <td>
                      <div class="d-inline-flex">
                        <div><v-btn color="success" small>-</v-btn></div>
                        <div class="ma-1">{{ item.qty }}</div>
                        <div><v-btn color="success" small>+</v-btn></div>
                      </div>
                    </td>
                    <td>
                      {{ item.price * item.qty }}
                    </td>
                    <td>
                      <!-- {{ cart.calories }} -->
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <div v-else>{{cart.message}}</div>
          <div>
            <v-btn color="success" @click="getcart();">test</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Core } from "@/vuexes/core";
import { User } from "@/vuexes/auth";
export default {
  data() {
    return {
      cartdialog: false,
      cart: [],
    };
  },
  async created() {
    this.getcart();
  },
  methods: {
    async getcart() {
      let token = User.token;
      // console.log(token);
      if (token) {
        this.cart = await Core.get(`/cart/get`);
      }
    },
  },
};
</script>



<style>
.cartimage {
  max-width: 4.375rem;
  max-height: 4.375rem;
}
.tdclass {
  vertical-align: center;
}
</style>