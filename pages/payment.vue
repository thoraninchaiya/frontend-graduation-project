<template>
<div>
    <v-container grid-list-xs>
        <!-- <pre>
        {{listcheckoutdata}}
        {{formpayment}}
        </pre> -->
        <v-dialog v-model="confirmdialog" persistent :overlay="false" max-width="500px" transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    สถานะการชำระเงิน
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <span>ชำระเงินสำเร็จ</span>
                    <div class="mt-3 d-flex justify-end">
                        <v-btn color="success" @click="confirmpay()">ยืนยัน</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-card>
            <v-card-title primary-title>
                ชำระเงิน
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="mt-3">
                    รายการที่ต้องชำระ
                </div>
                <v-row>
                    <v-col cols="6">
                        <div class="mt-3">
                            หมายเลขการสั่งซื้อ: {{order.serial}}
                            <!-- <v-col cols="12" sm="6" md="6">
                                <v-text-field disabled :value="order.serial"></v-text-field>
                            </v-col> -->
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="mt-3">
                            เลขที่ใบเสร็จ: {{order.receiptserial}}
                            <!-- <v-col cols="12" sm="6" md="6">
                                <v-text-field disabled :value="order.receiptserial"></v-text-field>
                            </v-col> -->
                        </div>
                    </v-col>
                </v-row>

                <div class="mt-5">
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
                                    <!-- <form @submit.prevent="upload(), payment()" class="mt-3"> -->
                                    <v-row>
                                        <!-- <input type="text" v-model="formpayment.orderid" :value="listcheckoutdata.orderid"> -->
                                        <!-- <v-text-field type="text" v-model="formpayment.orderid" :value="listcheckoutdata.orderid"></v-text-field> -->
                                        <v-col cols="6">
                                            <!-- <v-text-field type="number" class="test" v-model="formpayment.price" label="กรุณากรอกจำนวนเงินที่โอน"></v-text-field> -->
                                            <v-text-field type="number" class="test" v-model="formpayment.price" label="กรุณากรอกจำนวนเงินที่โอน"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field type="time" v-model="formpayment.time" label="กรุณากรอกเวลา"></v-text-field>
                                        </v-col>
                                    </v-row>
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
    data: () => ({
            listcheckoutdata: {},
            orderdetail: {},
            order: {
                total: 0,
                serial: null,
                receiptserial: null
            },
            filedata: {},
            defaultfile: null,
            imagefile: null,
            formpayment: {
                receiptid: null,
                price: null,
                time: null,
            },
            formpaymentdefault: {
                receiptid: null,
                price: null,
                time: null
            },
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            confirmdialog: false
    }),
    async created() {
        this.listcheckout()
    },
    methods: {
        async selectFile(event) {
            this.filedata = event
        },
        async upload() {
            this.formpayment.receiptid = this.listcheckoutdata.receiptid
            let formData = new FormData();
            this.filedata.payment = this.formpayment
            formData.append('image', this.filedata);
            formData.append('receiptid', this.formpayment.receiptid);
            formData.append('price', this.formpayment.price);
            formData.append('time', this.formpayment.time);
            // formData.append('data', this.form);
            // let uploaddata = await Core.post(`/payment/upload`, formData, this.form)
            console.log(formData)
            let uploaddata = await Core.post(`/purchase/receipt/payment`, formData)
            console.log(uploaddata)
            if (uploaddata.status == 200) {
                this.filedata = this.defaultfile
                this.formpayment = this.formpaymentdefault
                this.imagefile = null
                this.confirmdialog = true
            }
        },
        async listcheckout() {
            let listcheckoutraw = await Core.get(`/purchase/listcheckout`)
            if (listcheckoutraw.status == 400) {
                // this.$router.push('/')
            }
            if (listcheckoutraw.status == 200) {
                this.listcheckoutdata = listcheckoutraw.order
                this.order.total = listcheckoutraw.order.receiptotalamt
                this.order.receiptserial = listcheckoutraw.order.receiptserial
                this.orderdetail = listcheckoutraw.orderdetail
                this.order.serial = listcheckoutraw.order.orderserial
            }
        },
        async confirmpay(){
            this.$router.push('/')
        }
    }
}
</script>

<style>
.cartimage {
    max-width: 4.375rem;
    max-height: 4.375rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>
