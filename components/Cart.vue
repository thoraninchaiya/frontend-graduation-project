<template>
<div>
    <v-btn @click="cartdialog = !cartdialog;getcart(); "><i class="fas fa-shopping-cart"></i></v-btn>
    <v-dialog v-model="cartdialog" :overlay="false" max-width="800px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title> ตะกร้าสินค้า </v-card-title>
            <v-card-text>
                <!-- <pre>{{cartstock}}</pre> -->
                <!-- <pre>{{cart}}</pre> -->
                <!-- <div v-if="`${item.cid}`">cart.id</div> -->
                <!-- <pre> {{remove}} </pre> -->
                <!-- <div v-if="`${cart.status}` == null"> -->
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
                                <template>
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
                                                <div>
                                                    <v-btn color="success" small @click="removeone(item.cid, item.productid, item.qty)">-</v-btn>
                                                </div>
                                                <div class="ma-1">{{ item.qty }}</div>
                                                <div>
                                                    <v-btn color="success" small @click="addone(item.cid, item.productid, item.qty)">+</v-btn>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {{ item.price * item.qty }}
                                        </td>
                                        <td>
                                            <div>
                                                <v-btn color="error" small @click="removeitem(item.cid, item.productid)">ลบ</v-btn>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </template>
                    </v-simple-table>
                <!-- </div> -->
                <!-- <div v-else>ไม่มีสินค้าในตะกร้าสินค้า</div> -->
                <div class="mt-5 d-flex justify-end">
                    <!-- <v-btn color="success" @click="getcart();">test</v-btn> -->
                    <v-btn color="success" @click="$router.push('/checkout'), callback()">สั่งซื้อสินค้า</v-btn>
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
            cart: {},
            remove: {
                cid: 0
            },
            add: {},
            cartstock: {
                cid: {},
                productid: {},
                qty: 0,
                status: null
            },
        };
    },
    async created() {
        this.getcart();
    },
    methods: {
        async getcart() {
            let token = User.token;
            if (token) {
                this.cart = await Core.get(`/cart/get`);
            }
        },
        async removeitem(itemid, productid){
            // console.log(itemid)
            this.remove.cid = itemid
            // this.remove.pid = productid
            let cartremoveitem = await Core.post(`/cart/remove`, this.remove)
            if(cartremoveitem.status == 200){
                await this.getcart();
            }
        },
        async addone(itemid, productid, qty) {
            this.cartstock.qty = 1
            this.cartstock.cid = itemid
            this.cartstock.productid = productid
            this.cartstock.status = "add"
            if(qty < 5){
                let cartstockqty = await Core.put(`/cart/update`, this.cartstock)
                if(cartstockqty.status == 200){
                    await this.getcart();
                }            
            }
        },
        async removeone(itemid, productid, qty) {
            this.cartstock.qty = 1
            this.cartstock.cid = itemid
            this.cartstock.productid = productid
            this.cartstock.status = "minus"
            if(qty > 0){
                let cartstockqty = await Core.put(`/cart/update`, this.cartstock)
                if(cartstockqty.status == 200){
                    await this.getcart();
                }            
            }
        },
        async callback(){
            this.cartdialog = false
        }
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
