<template>
<v-app class="mt-5 ml-5 mr-5">
    <div class="mt-2">
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="itemWithIndex" sort-by="product_id" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>ประวัติการสั่งซื้อ</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title primary-title>
                                        คุณยืนยันที่จะยกเลิกออเดอร์
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="6">
                                                หมายเลขการสั่งซื้อ
                                                <v-text-field disabled :value="editedItem.orderserial"></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                หมายเลขใบเสร็จ
                                                <v-text-field disabled :value="editedItem.receiptserial"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-text>
                                        <div class="d-flex justify-end">
                                            <div>
                                                <v-btn color="error" @click="closeDelete">
                                                    <v-icon>mdi-cancel</v-icon>
                                                </v-btn>
                                                <v-btn color="success" @click="cancelreceipt()">
                                                    <v-icon>mdi-check</v-icon>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="receiptinfo" :overlay="false" max-width="1000" transition="dialog-transition">
                                <v-card>
                                    <template>
                                        <v-card-title class="justify-center">SALAFEX</v-card-title>
                                        <v-card-title class="justify-center">ใบสั่งซื้อสินค้า</v-card-title>
                                        <v-card-text>
                                            <div>
                                                <v-row>
                                                    <v-col cols="4">
                                                        <div>ข้อมูลลูกค้า</div>
                                                        <div>ชื่อ: {{receiptorderdatamain.user_name}} </div>
                                                        <div>ที่อยู่: {{receiptorderdatamain.user_address}} </div>
                                                    </v-col>
                                                    <v-col cols="4">
                                                        <div>ข้อมูลติดต่อร้าน</div>
                                                        <div>เบอร์: 0123456789</div>
                                                        <div>ที่อยู่: เซ็นทรัลเชียงราย</div>
                                                    </v-col>
                                                    <v-col cols="4">
                                                        <div>วันที่สั่งซื้อ: {{receiptorderdatamain.receiptdate}}</div>
                                                        <div>เลขที่สั่งซื้อ: {{receiptorderdatamain.receiptserial}}</div>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-card-text>
                                        <v-card-text>
                                            <v-simple-table>
                                                <thead>
                                                    <th>ลำดับ</th>
                                                    <th>รูปสินค้า</th>
                                                    <th>สินค้า</th>
                                                    <th>จำนวน</th>
                                                    <th>ราคา</th>
                                                    <th>ราคารวม</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item, i in receiptorderdata" :key="i">
                                                        <td> {{i+1}} </td>
                                                        <td>image</td>
                                                        <td> {{item.productname}} </td>
                                                        <td> {{item.receiptqty}} </td>
                                                        <td> {{item.productunit}} </td>
                                                        <!-- <td>100</td> -->
                                                        <td> {{item.producttotalamt}} </td>
                                                    </tr>
                                                    <!-- <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td colspan="2" class="align-end">ราคาไม่รวมภาษี</td>
                                                        <td>0</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td colspan="2">ราคารวมภาษี</td>
                                                        <td>0</td>
                                                    </tr> -->
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <!-- <td></td> -->
                                                        <td></td>
                                                        <td colspan="2">รวมที่ต้องชำระทั้งหมด</td>
                                                        <td> {{receiptorderdatamain.receipttoalamt}} </td>
                                                    </tr>
                                                </tbody>
                                            </v-simple-table>
                                        </v-card-text>
                                    </template>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="dialogpayment" :overlay="false" max-width="700" transition="dialog-transition">
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
                                                    หมายเลขการสั่งซื้อ
                                                    <v-text-field disabled :value="editedItem.orderserial"></v-text-field>
                                                </div>
                                            </v-col>
                                            <v-col cols="6">
                                                <div class="mt-3">
                                                    เลขที่ใบเสร็จ
                                                    <v-text-field disabled :value="editedItem.receiptserial"></v-text-field>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="6">
                                                <div class="mt-3">
                                                    จำนวนเงินที่ต้องชำระ
                                                    <v-text-field disabled :value="receiptorderdatamain.receipttoalamt"></v-text-field>
                                                </div>
                                            </v-col>
                                        </v-row>

                                        <div class="mt-5">
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
                                                <v-card max-width="500px">
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
                                                                    <v-text-field type="number" class="test" required v-model="formpayment.price" label="กรุณากรอกจำนวนเงินที่โอน"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="6">
                                                                    <v-text-field type="time" v-model="formpayment.time" required label="กรุณากรอกเวลา"></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <v-file-input class="mt-2" label="แนบสลิป" v-on:change="selectFile" required accept="image/*"></v-file-input>
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
                                                    <div class="d-flex justify-center">
                                                        <!-- <img src="" alt=""> -->
                                                        sdl
                                                    </div>
                                                </v-card-text>
                                            </v-card>
                                        </div>

                                        <div class="d-flex justify-center mt-5">
                                            <v-card max-width="auto" min-width="500">
                                                <v-card-text>
                                                    <div>ยอดที่โอน: 1000</div>
                                                    <div>เวลา: 10:00</div>
                                                </v-card-text>
                                            </v-card>
                                        </div>

                                        <div class="d-flex justify-end mt-3">
                                            <v-card-actions>
                                                <v-btn color="success" @click="test(item)">ตรวจสอบเรียบร้อยแล้ว</v-btn>
                                                <v-btn color="error" @click="test(item)">ยกเลิก</v-btn>
                                            </v-card-actions>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="dialogdelivery" :overlay="false" max-width="500px" transition="dialog-transition">
                                <v-card>
                                    <v-card-title>
                                        รายละเอียดการจัดส่งสินค้า
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <div>เลขที่ใบเสร็จ</div>
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field disabled :value="editedItem.receiptserial"></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <div class="d-flex">
                                            <div>
                                                <div>บริษัทขนส่ง</div>
                                                <v-row>
                                                    <v-col cols="9">
                                                        <v-text-field disabled :value="deliverydata.company"></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div>
                                                <div>หมายเลขติดตามสินค้า</div>
                                                <v-row>
                                                    <v-col cols="9">
                                                        <v-text-field disabled :value="deliverydata.serial"></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                        </v-toolbar>
                    </template>
                    <template v-slot:item.status="{item}">
                        <!-- 'waitpaid','pending','success','cancel','waitdelivery' -->
                        <div v-if="item.orderstatus == 'waitpaid'"><span class="yellow--text text--darken-2">รอการชำระเงิน</span></div>
                        <div v-if="item.orderstatus == 'success'"><span class="green--text text--accent-4">สำเร็จ</span></div>
                        <div v-if="item.orderstatus == 'pending'"><span class="orange--text text--accent-4">กำลังตรวจสอบ</span></div>
                        <div v-if="item.orderstatus == 'cancel'"><span class="red--text text--darken-4">ยกเลิก</span></div>
                        <div v-if="item.orderstatus == 'waitdelivery'"><span class="light-blue--text text--darken-1">กำลังรอการขนส่ง</span></div>
                    </template>
                    <template v-slot:item.btnaction="{ item }">
                        <!-- item.orderstatus -->
                        <div v-if="item.orderstatus == 'waitpaid'" class="mt-1">
                            <v-btn color="info" @click="inforeceipt(item)">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-btn color="warning" @click="payment(item)">
                                <v-icon>mdi-credit-card-outline</v-icon>
                            </v-btn>
                            <v-btn color="warning" disabled @click="delivery(item)">
                                <v-icon>mdi-truck-fast-outline</v-icon>
                            </v-btn>
                            <v-btn color="error" @click="deleteItem(item)">
                                <v-icon>mdi-cancel</v-icon>
                            </v-btn>
                        </div>
                        <div v-if="item.orderstatus == 'cancel' || item.orderstatus == 'pending' || item.orderstatus == 'waitdelivery'" class="mt-1">
                            <v-btn color="info" @click="inforeceipt(item)">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-btn color="warning" disabled @click="payment(item)">
                                <v-icon>mdi-credit-card-outline</v-icon>
                            </v-btn>
                            <v-btn color="warning" disabled @click="delivery(item)">
                                <v-icon>mdi-truck-fast-outline</v-icon>
                            </v-btn>
                            <v-btn color="error" disabled @click="deleteItem(item)">
                                <v-icon>mdi-cancel</v-icon>
                            </v-btn>
                        </div>
                        <div v-if="item.orderstatus == 'success'" class="mt-1">
                            <v-btn color="info" @click="inforeceipt(item)">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-btn color="warning" disabled @click="payment(item)">
                                <v-icon>mdi-credit-card-outline</v-icon>
                            </v-btn>
                            <v-btn color="warning" @click="delivery(item)">
                                <v-icon>mdi-truck-fast-outline</v-icon>
                            </v-btn>
                            <v-btn color="error" disabled @click="deleteItem(item)">
                                <v-icon>mdi-cancel</v-icon>
                            </v-btn>
                        </div>
                    </template>
                    <template v-slot:item.date=" {item} ">
                        <!-- {{item.receipt_date}} -->
                        {{ formatDate(item.receiptdate) }}
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</v-app>
</template>

<script>
import { Core } from "@/vuexes/core";
import { User } from "@/vuexes/auth";

export default {
    layout: 'admin',
    data: () => ({
        defaultdata: {},
        deliverydata: {},
        dialogdelivery: false,
        infodialog: false,
        dialog: false,
        btnaction: undefined,
        dialogDelete: false,
        dialogpayment: false,
        receiptinfo: false,
        headers: [
            { text: 'ลำดับที่', sortable: false, value: 'sort' },
            { text: 'หมายเลขใบสั่งซื้อ', sortable: false, value: 'receiptserial' },
            { text: 'วันที่สั่งซื้อ', sortable: false, value: 'date' },
            { text: 'สถานะ', value: 'status', sortable: false },
            // { text: 'ติดตามพัสดุ', value: 'orderstatus', sortable: false },
            { text: '', align: 'end', value: 'btnaction', sortable: false },
        ],
        receipt: [],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
        receiptdata: {},
        receiptorderdata: {},
        receiptorderdatamain: {
            user_name: null
        },
        receiptmain: {},
        receiptmaintotal: {
            total: null
        },
        filedata: null,
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
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        itemWithIndex() {
            return this.receipt.map(
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
        receiptinfo(val) {
            val || this.close()
        },
        dialogpayment(val) {
            val || this.close()
        },
        dialogdelivery(val) {
            val || this.close()
        },
        deliverydata(val) {
            val || this.close()
        }
    },

    async created() {
        this.getreceipt()
    },

    methods: {
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(date).toLocaleDateString('en', options)
        },
        async delivery(item) {
            this.editedItem = Object.assign({}, item)
            let deliverydata = await Core.get(`/delivery/` + item.receiptid)
            if(deliverydata.status == 200){
                this.dialogdelivery = true
                this.deliverydata = deliverydata
            }
            if(deliverydata.status == 400){
                this.toast(deliverydata.status, deliverydata.message)
            }
        },

        async selectFile(event) {
            this.filedata = event
        },

        async inforeceipt(item) {
            this.editedItem = Object.assign({}, item)
            this.receiptinfo = true
            let receiptdata = await Core.get(`/user/receipt/` + item.receiptid)
            this.receiptorderdatamain = receiptdata.data[0]
            this.receiptorderdata = receiptdata.detail

        },

        async cancelreceipt() {
            let cancelreceiptraw = await Core.post(`/user/cancelreceipt`, this.editedItem)
            if(cancelreceiptraw){
                this.toast(cancelreceiptraw.status, cancelreceiptraw.message)
                this.close()
            }
            if(cancelreceiptraw.status == 200){
                this.getreceipt()
            }
            // this.editedItem = Object.assign({}, item)
            // this.$nextTick(() => {
            //     this.getreceipt()
            //     this.editedItem = Object.assign({}, this.defaultItem)
            // })
        },

        async payment(item) {
            this.editedItem = Object.assign({}, item)
            this.dialogpayment = true
            let receiptdata = await Core.get(`/user/receipt/` + item.receiptid)
            this.receiptorderdatamain = receiptdata.data[0]
            this.receiptorderdata = receiptdata.detail
        },

        editItem(item) {
            this.editedIndex = this.receipt.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.receipt.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm(x) {
            this.cancelreceipt(x);
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.receiptinfo = false
            this.dialogdelivery = false
            this.deliverydata = false
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.deliverydata = this.defaultdata
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        async getreceipt() {
            var receiptlist = await Core.get(`/user/receipthistory`)
            // this.orderlist = receiptlist.data
            this.receipt = receiptlist.maindata
        },

        async upload(item) {
            this.formpayment.receiptid = this.editedItem.receiptid
            let formData = new FormData();
            formData.append('image', this.filedata);
            formData.append('receiptid', this.formpayment.receiptid);
            formData.append('price', this.formpayment.price);
            formData.append('time', this.formpayment.time);
            let uploaddata = await Core.post(`/purchase/receipt/payment`, formData)
            if (uploaddata.status == 200) {
                this.filedata = this.defaultfile
                this.formpayment = this.formpaymentdefault
                this.imagefile = null
                this.dialogpayment = false
                this.toast(uploaddata.status, uploaddata.message)
                this.getreceipt()
            }
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
