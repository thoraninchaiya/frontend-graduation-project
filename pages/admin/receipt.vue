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
        <!-- <pre>
            {{orderlist}}
        </pre> -->
        <!-- <div>
            <v-card class="ml-5">
                <v-card-text>
                    test2
                </v-card-text>
            </v-card>
        </div> -->
    </div>

    <div class="mt-2">
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="itemWithIndex" sort-by="product_id" class="elevation-1">
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
                                                            <td> {{receiptmaintotal.total | currency_2}} </td>
                                                        </tr>
                                                    </template>

                                                </tbody>
                                            </template>
                                        </v-simple-table>

                                        <v-card class="mt-5">
                                            <v-card-text>
                                                <div class="d-flex justify-center">
                                                    image
                                                </div>
                                            </v-card-text>
                                        </v-card>
                                        <v-card-actions>
                                            action
                                        </v-card-actions>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                        </v-toolbar>
                    </template>
                    <template v-slot:item.btnaction="{ item }">
                        <!-- <v-btn-toggle v-model="btnaction" mandatory> -->
                        <!-- <v-btn color="success">Success</v-btn> -->
                        <!-- {{item}} -->
                        <!-- <v-btn color="info" @click="test(item)">รายละเอียดใบสั่งซื้อ</v-btn> -->
                        <v-btn color="info" @click="receiptinfo(item)">
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                        <!-- <v-btn color="error" @click="test(item)">ยกเลิกใบสั่งซื้อ</v-btn> -->
                        <v-btn color="error" @click="deleteItem(item)">
                            <v-icon>mdi-cancel</v-icon>
                        </v-btn>
                        <!-- </v-btn-toggle> -->
                    </template>
                    <template v-slot:item.image=" {item} ">
                        <v-img :src="`${item.product_image}`" alt="" class="imgsize"></v-img>
                    </template>
                    <template v-slot:item.glutenfree="{ item }">
                        <!-- <v-simple-checkbox v-model="editedItem.product_status" disabled></v-simple-checkbox> -->
                        <v-select :items="dataitems" v-model="item.product_status" @input="test(item.product_status)" class="selector"></v-select>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
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
        dialog: false,
        infodialog: false,
        btnaction: undefined,
        dialogDelete: false,
        dataitems: ['active', 'unactive'],
        headers: [
            { text: 'ลำดับที่', align: 'start', sortable: true, value: 'sort' },
            { text: 'หมายเลขใบสั่งซื้อ', align: 'center', sortable: false, value: 'receiptidserial' },
            { text: 'ชื่อลูกค้า', align: 'start', sortable: false, value: 'name' },
            { text: 'วันที่สั่งซื้อ', align: 'start', sortable: true, value: 'receipt_date' },
            { text: 'รวมทั้งหมด', align: 'start', sortable: false, value: 'receipttotal' },
            { text: 'สถานะ', value: 'receiptstatus', sortable: false },
            { text: '', value: 'btnaction', sortable: false },
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
        }
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
    },

    async created() {
        this.getalluser()
        this.getreceipt()
    },

    methods: {
        test(item) {
            this.editedItem = Object.assign({}, item)
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
            })
            console.log(item)
        },

        async receiptinfo(item){
            this.editedItem = Object.assign({}, item)
            let info = await Core.post('/admin/purchase/getreceipt', this.editedItem)
            this.receiptdata = info.data
            this.receiptmain = info.main
            console.log(info.main[0]['receipttotalamt'])
            this.receiptmaintotal.total = info.main[0]['receipttotalamt']
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
            console.log(item)
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
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
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

        // async getproduct() {
        //     this.productlist = await Core.get(`/admin/product`)
        // },
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
