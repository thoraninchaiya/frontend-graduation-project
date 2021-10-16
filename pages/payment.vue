<template>
<div>
    <v-container grid-list-xs>
        <v-card>
            <v-card-title primary-title>
                ชำระเงิน
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="mt-3">
                    รายการที่ต้องชำระ
                </div>
                <div class="mt-3">
                    หมายเลขการสั่งซื้อ:
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field disabled :value="order.serial"></v-text-field>
                    </v-col>
                </div>
                <div class="mt-3">
                    <v-simple-table fixed-header>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รูปสินค้า</th>
                                    <th>ชื่อสินค้า</th>
                                    <th>จำนวน</th>
                                    <th>ราคารวม</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template>
                                    <tr v-for="item,i in orderdetail" :key="i">
                                        <td> {{i+1}} </td>
                                        <td>
                                            <v-img class="cartimage" :src="`${item.image}`"></v-img>
                                        </td>
                                        <td>{{item.name}} </td>
                                        <td>{{item.qty}}</td>
                                        <td>{{item.totalamt}}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>ยอดเงินที่ต้องชำระ</td>
                                        <td> {{order.total}} </td>
                                    </tr>
                                </template>
                            </tbody>
                        </template>
                    </v-simple-table>

                    <v-divider></v-divider>
                    <div>
                        <div>
                            <span class="red--text">
                                ** กรุณาอัพรูปหลักฐานการชำเงิน
                            </span>
                        </div>
                        <div>
                            <span class="red--text">
                                ** แอดมินจะตรวจสอบยอดเงินของคุณภายใน 3 วันทำการ
                            </span>
                        </div>
                    </div>

                    <v-divider></v-divider>

                    <div class="d-flex justify-center">
                        <v-card min-width="500px">
                            <v-card-title primary-title>
                                ช่องทางการชำระเงิน
                            </v-card-title>
                            <v-card-text>
                                <img src="/img/placeholder_600x400.svg" alt="">
                                <form @submit.prevent="upload()" class="mt-3">
                                    <v-file-input class="mt-2" label="แนบสลิป" v-model="imagefile" v-on:change="selectFile" required accept="image/*"></v-file-input>
                                    <!-- <input type="file" name="" id="" @change="selectFile" accept="image/*"> -->
                                    <!-- <v-file-input class="mt-2" label="แนบสลิป" v-on:change="selectFile()" required accept="image/*"></v-file-input> -->
                                    <div class="d-flex justify-end mt-4">
                                        <v-btn color="success" type="submit">แจ้งชำระเงิน</v-btn>
                                    </div>
                                </form>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</div>
</template>

<script>
import { Core } from "@/vuexes/core";
export default {
    data: () => {
        return {
            listcheckoutdata: {},
            orderdetail: {},
            order: {
                total: 0,
                serial: null
            },
            filedata: null,
            defaultfile: null,
            imagefile: null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
        }
    },
    async created() {
        this.listcheckout()
    },
    methods: {
        async selectFile(event) {
            this.filedata = event
        },
        async upload() {
            let formData = new FormData();
            formData.append('image', this.filedata);
            let uploaddata = await Core.post(`/payment/upload`, formData)
            console.log(uploaddata)
            if (uploaddata.status == 200) {
                this.filedata = this.defaultfile
                this.imagefile = null
            }
        },
        async listcheckout(){
            let listcheckoutraw = await Core.get(`/purchase/listcheckout`)
            if(listcheckoutraw.status == 400){
                this.$router.push('/')
            }
            if(listcheckoutraw.status == 200){
                this.listcheckoutdata = listcheckoutraw.order
                this.orderdetail = listcheckoutraw.orderdetail
                this.order.total = listcheckoutraw.order.ordertotalamt
                this.order.serial = listcheckoutraw.order.orderserial
            }


        }
    }
}
</script>

<style>
.cartimage {
    max-width: 4.375rem;
    max-height: 4.375rem;
}
</style>
