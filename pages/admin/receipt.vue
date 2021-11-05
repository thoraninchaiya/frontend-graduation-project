<template>
<v-app class="mt-5 ml-5 mr-5">
    <div class="d-flex">
        <div>
            <v-card max-width="500px" min-width="100px">
                <v-card-text>
                    ใบสั่งซื้อใหม่วันนี้
                </v-card-text>

                <v-divider></v-divider>
                <v-card-text>
                    <div class="d-flex justify-center">
                        {{ordertoday}}
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>

    <div class="mt-2">
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="itemWithIndex" :items-per-page="30" sort-by="product_id" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>ใบสั่งซื้อทั้งหมด</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>

                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">ยืนยันการยกเลิกใบสั่งซื้อ {{editedItem.receiptidserial}} </v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">ยกเลิก</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm(editedItem)">ยืนยัน</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="infodialog" :overlay="false" max-width="1000px" transition="dialog-transition">
                                <v-card>
                                    <v-card-title primary-title>
                                        รายละเอียดใบสั่งซื้อ
                                    </v-card-title>
                                    <!-- <pre> {{receiptmain}} </pre> -->
                                    <v-card-text>
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
                                                        <tr v-for="item,i in receiptdata" :key="i">
                                                            <!-- <tr> -->
                                                            <td> i </td>
                                                            <td>
                                                                <v-img class="cartimage" src="image`"></v-img>
                                                            </td>
                                                            <td> {{item.productname}} </td>
                                                            <td> {{item.receiptqty}} </td>
                                                            <td> {{item.producttotalamt}} </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>รวม</td>
                                                            <td> {{receiptmaintotal.total}} </td>
                                                        </tr>
                                                    </template>

                                                </tbody>
                                            </template>
                                        </v-simple-table>

                                        <div class="d-flex justify-center">
                                            <v-card class="mt-5" max-width="auto" min-width="500">
                                                <v-card-text>
                                                    <div class="d-flex justify-center" v-if="getpayment.status == 400">
                                                        <!-- <img src="" alt=""> -->
                                                        {{getpayment.message}}
                                                    </div>
                                                    <div class="d-flex justify-center" v-if="getpayment.status == 200">
                                                        <v-img :src="getpayment.image" max-width="300" contain></v-img>
                                                    </div>
                                                </v-card-text>
                                            </v-card>
                                        </div>

                                        <div class="d-flex justify-center mt-5">
                                            <v-card max-width="auto" min-width="500">
                                                <v-card-text>
                                                    <!-- <pre> {{getpayment}} </pre> -->
                                                    <div>ยอดที่โอน: {{getpayment.payment_price}} </div>
                                                    <div>เวลา: {{getpayment.payment_time}}</div>
                                                </v-card-text>
                                            </v-card>
                                        </div>

                                        <div class="d-flex justify-end mt-3" v-if="editedItem.receiptstatuscode == 2">
                                            <v-card-actions>
                                                <v-btn color="success" @click="confirmpayment(editedItem)">ตรวจสอบเรียบร้อยแล้ว</v-btn>
                                                <v-btn color="error" @click="close()">ยกเลิก</v-btn>
                                            </v-card-actions>
                                        </div>
                                        <div class="d-flex justify-end mt-3" v-if="editedItem.receiptstatuscode != 2">
                                            <v-card-actions>
                                                <v-btn disabled color="success">ตรวจสอบเรียบร้อยแล้ว</v-btn>
                                                <v-btn color="error" @click="close()">ยกเลิก</v-btn>
                                            </v-card-actions>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="dialogdelivery" :overlay="false" max-width="500px" transition="dialog-transition">
                                <v-card>
                                    <v-card-title primary-title>
                                        เพิ่มหมายเลขพัสดุ
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field disabled label="หมายเลขใบสั่งซื้อ" :value="editedItem.receiptidserial"></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <form @submit.prevent="updatedelivery(editedItem.receiptid)">
                                            <v-row>
                                                <v-col cols="4">
                                                    <!-- <v-text-field label=""></v-text-field> -->
                                                    <v-select :items="deliverylistdata" v-model="updatedeliverydata.company" disable label="บริษัทขนส่ง" item-text="name" item-value="id"></v-select>
                                                </v-col>
                                                <v-col cols="8">
                                                    <v-text-field v-model="updatedeliverydata.serial" label="กรุณากรอกหมายเลขพัสดุ"></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <div class="d-flex justify-end">
                                                <v-btn color="error" @click="close()">ยกเลิก</v-btn>
                                                <v-btn color="success" class="ml-2" type="submit">ยืนยัน</v-btn>
                                            </div>
                                        </form>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                        </v-toolbar>
                    </template>

                    <template v-slot:item.btnaction="{ item }">
                        <div v-if="item.receiptstatuscode == 1 || item.receiptstatuscode == 2">
                            <v-btn color="info" @click="receiptinfo(item)">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-btn disabled color="warning">
                                <v-icon>mdi-truck-fast-outline</v-icon>
                            </v-btn>
                            <v-btn color="error" @click="deleteItem(item)">
                                <v-icon>mdi-cancel</v-icon>
                            </v-btn>
                        </div>

                        <div v-if="item.receiptstatuscode == 3 || item.receiptstatuscode == 4">
                            <v-btn color="accent" @click="receiptinfo(item)">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-btn disabled color="warning">
                                <v-icon>mdi-truck-fast-outline</v-icon>
                            </v-btn>
                            <v-btn color="error" disabled>
                                <v-icon>mdi-cancel</v-icon>
                            </v-btn>
                        </div>

                        <div v-if="item.receiptstatuscode == 5">
                            <v-btn color="accent" @click="receiptinfo(item)">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-btn @click="delivery(item)" color="warning">
                                <v-icon>mdi-truck-fast-outline</v-icon>
                            </v-btn>
                            <v-btn color="error" disabled>
                                <v-icon>mdi-cancel</v-icon>
                            </v-btn>
                        </div>

                    </template>

                    <template v-slot:item.date=" {item} ">
                        <!-- {{item.receipt_date}} -->
                        {{formatDate(item.receipt_date)}}
                    </template>

                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
    <!-- <div>
        <pre>
        {{editedItem}}

        {{productlist}}
        </pre>
    </div> -->
</v-app>
</template>

<script>
import { Core } from "@/vuexes/core";
import { User } from "@/vuexes/auth";

export default {
    layout: 'admin',
    data: () => ({
        deliverylistdata: {},
        updatedeliverydata: {},
        dialogdelivery: false,
        deliverydata: {},
        dialog: false,
        infodialog: false,
        dialogDelete: false,
        dataitems: ['active', 'unactive'],
        headers: [
            { text: 'ลำดับที่', align: 'start', sortable: false, value: 'sort' },
            { text: 'หมายเลขใบสั่งซื้อ', sortable: false, align: 'center', value: 'receiptidserial' },
            { text: 'ชื่อลูกค้า', align: 'start', sortable: false, value: 'name' },
            { text: 'วันที่สั่งซื้อ', align: 'start', sortable: false, value: 'date' },
            { text: 'รวมทั้งหมด', align: 'start', sortable: false, value: 'receipttotal' },
            { text: 'สถานะ', sortable: false, value: 'receiptstatus' },
            { text: '', align: 'right', sortable: false, value: 'btnaction' },
            // { text: 'Actions', value: 'actions', sortable: false },
            // { text: 'glutenfree', value: 'glutenfree', sortable: false },
        ],
        orderlist: [],
        ordertoday: [],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
        receiptdata: {},
        receiptmain: {},
        receiptmaintotal: {
            total: null
        },
        getpayment: {},
        getpaymentdefault: {},

    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        itemWithIndex() {
            return this.orderlist.map(
                (receiptid, index) => ({
                    ...receiptid,
                    sort: index + 1
                })
            )
        },
        receiptnindex() {
            return this.receiptdata.map(
                (receiptid, index) => ({
                    ...receiptid,
                    sort: index + 1
                })
            )
        }
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        infodialog(val) {
            val || this.close()
        },
        dialogdelivery(val) {
            val || this.close()
        },
        // dialogdelivery(val){
        //     val || this.close()
        // }
    },

    async created() {
        this.getalluser()
        this.getreceipt()
    },

    methods: {

        test(item) {
            // this.editedItem = Object.assign({}, item)
            // this.$nextTick(() => {
            //     this.editedItem = Object.assign({}, this.defaultItem)
            // })

            // console.log(this.receiptmain[0])

            // console.log(Date.now().valueOf()/1000)
            // var datetest = Date.now().valueOf()
            // console.log(datetest)
        },

        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(date).toLocaleDateString('en', options)
        },
        async delivery(item) {
            this.editedItem = Object.assign({}, item)
            this.dialogdelivery = true
            let deliverylist = await Core.get(`/admin/purchase/deliverylist`)
            if (deliverylist.status == 400) {
                this.toast(deliverylist.status, deliverylist.message)
                this.close()
            }
            if (deliverylist.status == 200) {
                this.deliverylistdata = deliverylist.data
            }
        },

        async updatedelivery(x) {
            this.updatedeliverydata.receiptid = x
            let updatedelivery = await Core.post('/admin/purchase/delivery', this.updatedeliverydata)
            if (updatedelivery.status == 200) {
                this.toast(updatedelivery.status, updatedelivery.message)
                this.getreceipt()
                this.close()
            }
            if (updatedelivery.status == 400) {
                this.toast(updatedelivery.status, updatedelivery.message)
                this.close()
            }
        },

        async confirmpayment(x) {
            let payment = await Core.post('/admin/purchase/receipt/payment', this.editedItem)
            if (payment.status == 200) {
                this.toast(payment.status, payment.message)
                this.close()
                this.$nextTick(() => {
                    this.getreceipt()
                })
            }
            if (payment.status == 400) {
                this.toast(payment.status, payment.message)
                this.close()
            }

            // this.$nextTick(() => {
            //     this.editedItem = Object.assign({}, this.defaultItem)
            // })
        },

        async receiptinfo(item) {
            this.editedItem = Object.assign({}, item)
            let info = await Core.post('/admin/purchase/getreceipt', this.editedItem)
            this.receiptdata = info.data
            this.receiptmain = info.main
            this.receiptmaintotal.total = info.main[0]['receipttotalamt']
            this.getpayment = info.paymentdata[0]

            this.infodialog = true
            // this.$nextTick(() => {
            //     this.editedItem = Object.assign({}, this.defaultItem)
            // })
        },

        async cancelreceipt(item) {
            this.editedItem = Object.assign({}, item)
            let cancel = await Core.post('/admin/purchase/receipt/cancel', this.editedItem)
            this.toast(cancel.status, cancel.message);
            this.$nextTick(() => {
                this.getreceipt()
                this.editedItem = Object.assign({}, this.defaultItem)
            })
        },

        editItem(item) {
            this.editedIndex = this.orderlist.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.orderlist.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm(x) {
            this.cancelreceipt(x);
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.infodialog = false
            this.dialogDelete = false
            // this.dialogdelivery = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.paymentdata = {}
                this.updatedeliverydata = {}
                this.dialogdelivery = false
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.userlist[this.editedIndex], this.editedItem)
            } else {
                this.userlist.push(this.editedItem)
            }
            this.close()
        },

        async getalluser() {
            var orderrawlist = await Core.get(`/admin/purchase`)
            this.ordertoday = orderrawlist.order_today
        },
        async getreceipt() {
            var receiptlist = await Core.get(`/admin/purchase/receipts`)
            this.orderlist = receiptlist.data
        },

        async toast(a, b) {
            if (a == 400) {
                let toast = this.$toasted.show(b, {
                    type: "error",
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 5000
                });
            }
            if (a == 200) {
                let toast = this.$toasted.show(b, {
                    type: "success",
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 5000
                });
            }
        }
    },
}
</script>

<style>
.selector {
    max-width: 100px;
}

.imgsize {
    max-width: 50px;
}
</style>
