<template>
  <v-container grid-list-xs>
      <v-card>
        <v-card-title primary-title>
            ทำการสั่งซื้อ
        </v-card-title>

      </v-card>

      <v-card class="mt-3">
          <!-- <pre> {{checkoutcart}} </pre> -->
          <v-card-text>
              <p class="font-weight-bold">ที่อยู่ในการจัดส่ง</p>
              <v-divider></v-divider>
              {{userdata.addr}}
          </v-card-text>
      </v-card>

      <v-card class="mt-3">
          <v-card-text>
              <p class="font-weight-bold">รายการสินค้า</p>
              <v-divider></v-divider>
              <v-card-text>
                  <v-simple-table>
                      <template>
                          <thead>
                              <tr>
                                  <th></th>
                                  <th>สินค้า</th>
                                  <th>ราคาต่อชิ้น</th>
                                  <th>จำนวน</th>
                                  <th>ราคารวม</th>
                              </tr>
                          </thead>
                          <tbody>
                              <template>
                                  <tr v-for="item in checkoutcart" :key="item.cid">
                                      <td><v-img class="cartimage" :src="`${item.image}`"></v-img></td>
                                      <td>{{ item.name }}</td>
                                      <td>&#3647;&nbsp;{{ item.price }}</td>
                                      <td>{{ item.qty }}</td>
                                      <td>&#3647;&nbsp;{{ item.price * item.qty }}</td>
                                  </tr>
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td>ราคารวม</td>
                                      <td>price</td>
                                  </tr>
                              </template>
                          </tbody>
                      </template>
                  </v-simple-table>
              </v-card-text>
          </v-card-text>
      </v-card>
      <v-card class="mt-3">
            <v-card-text>
                <p class="font-weight-bold">บริษัทขนส่ง</p>
                <v-divider></v-divider>
                <div>
                    <input type="radio" name="" id=""> kerry
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-end">
                    <v-btn color="success">ยืนยันการสั่งซื้อสินค้า</v-btn>
                </div>
            </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
import { Core } from "@/vuexes/core";
import { User } from "@/vuexes/auth";

export default {
    data: ()=>{
        return({
            userdata: {},
            checkoutcart: {}
        })
    },
    async created(){
        await this.checkUser();
    },
    methods:{
        async checkUser(){
          let token = User.token;
          if(token){
            this.userdata = await Core.get(`/user/profile`)
            await this.getcart();
          }
        },
        async getcart(){
            this.checkoutcart = await Core.get(`/cart/get`)
        },
        async checkout(){
            
        }
    }
}
</script>

<style>

</style>