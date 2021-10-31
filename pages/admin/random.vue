<template>
<v-app class="mt-5 ml-5 mr-5">
    <!-- <pre>
    {{editedItem}}
    </pre> -->
    <div class="mt-2">
        <v-card max-width="50%">
            <v-card-text>
                <v-data-table :headers="headers" :items="productlist" sort-by="product_id" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <!-- <v-toolbar-title>สินค้าลงทะเบียน</v-toolbar-title> -->
                            <v-dialog v-model="dialog" persistent :overlay="false" max-width="800px" transition="dialog-transition">
                                <v-card>
                                    <v-card-title>
                                        {{editedItem.product_name}}
                                        <v-spacer></v-spacer>
                                        <v-btn color="error" text @click="close()">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </v-card-title>

                                    <v-divider></v-divider>

                                    <v-card-text>
                                        <div class="d-flex justify-center">
                                            <v-img :src="editedItem.product_image" max-width="18.75rem" max-height="18.75rem" contain></v-img>
                                        </div>
                                        <div class="mt-3">
                                            <v-btn color="success" @click="changepage(0)">ระบบสุ่ม</v-btn>
                                            <v-btn color="success" @click="changepage(1)">รายชื่อผู้ที่ลงทะเบียน</v-btn>
                                            <v-btn color="success" @click="changepage(2)">รายชื่อผู้ที่ได้รับรางวัล</v-btn>
                                        </div>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-text v-if="pagestate == 0">
                                        <div class="d-flex justify-center">
                                            <v-row>
                                                <v-col cols="5">
                                                    <v-text-field label="จำนวนผู้ที่จะได้รับรางวัล"></v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-btn color="success">เริ่มการสุ่ม</v-btn>
                                                    <!-- <v-btn color="success" class="ml-3">ยกเลิกผลการสุ่ม</v-btn> -->
                                                    <!-- <v-btn color="success" class="ml-3">ยืนยันผลการสุ่ม</v-btn> -->
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-card-text>

                                    <v-card-text v-if="pagestate == 1">
                                        รายชื่อผู้ที่ลงทะเบียน
                                    </v-card-text>
                                    <v-card-text v-if="pagestate == 2">
                                        รายชื่อผู้ที่ได้รับรางวัล
                                    </v-card-text>

                                    <v-card-text v-if="pagestate == 0">
                                        <div class="d-flex justify-center">รายชื่อผลการสุ่มที่ไม่ยืนยัน</div>
                                        <div>
                                            name
                                        </div>
                                        <div class="d-flex justify-end">
                                            <v-btn color="success" class="ml-3">ยกเลิกผลการสุ่ม</v-btn>
                                            <v-btn color="success" class="ml-3">ยืนยันผลการสุ่ม</v-btn>
                                        </div>
                                    </v-card-text>

                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.image=" {item} ">
                        <div class="d-flex justify-center mt-1">
                            <v-img :src="`${item.product_image}`" alt="" max-height="100" max-width="100" contain></v-img>
                        </div>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="mr-2" @click="getlistdata(item)">
                            mdi-magnify
                        </v-icon>
                        <!-- <v-icon small @click="deleteItem(item)">
                            mdi-delete
                        </v-icon> -->
                    </template>
                    <template v-slot:no-data>
                        <div>
                            nodata
                        </div>
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
import { Core } from '@/vuexes/core'
export default {
    layout: 'admin',
    data: () => ({
        pagestate: 0,
        dialog: false,
        dialogDelete: false,
        dataitems: ['active', 'unactive'],
        headers: [
            // { text: 'รหัสสินค้า', align: 'start', sortable: true, value: 'product_id' },
            { text: 'รูปภาพ', align: 'center', sortable: false, value: 'image' },
            { text: 'ชื่อสินค้า', align: 'start', sortable: false, value: 'product_name' },
            // { text: 'จำนวนผู้ลงทะเบียน', value: 'product_qty' },
            // { text: 'd', value: 'sold_qty' },
            // { text: 'สถานะวางขาย', value: 'glutenfree',sortable: false },
            { text: 'Actions', value: 'actions', sortable: false },
            // { text: 'glutenfree', value: 'glutenfree', sortable: false },
        ],
        productlist: [],
        desserts: [],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
        productstatus: {
            id: {},
            status: {},
            type: {},
        },
        defaultproductstatus: {
            id: {},
            status: {},
            type: {},
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'เพิ่มสินค้าใหม่' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    async created() {
        this.getproduct()
    },

    methods: {
        test(item) {
            console.log(item)
        },
        async getlistdata(item) {
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        async changepage(x) {
            this.pagestate = x
        },
        async changstatus(itemid, itemstatus) {
            // console.log(itemid)
            // console.log(itemstatus)
            this.productstatus.type = "updatestatus"
            this.productstatus.id = itemid
            this.productstatus.status = itemstatus
            let updatestatus = await Core.post(`/admin/product`, this.productstatus)
            // console.log(updatestatus)
            if (updatestatus.status == 200) {
                this.$nextTick(() => {
                    this.productstatus = Object.assign({}, this.defaultproductstatus)
                    let toast = this.$toasted.show(updatestatus.message, {
                        type: "success",
                        theme: "toasted-primary",
                        position: "top-right",
                        duration: 5000
                    });
                })
                // this.productstatus = this.defaultproductstatus
            }
        },

        editItem(item) {
            this.editedIndex = this.productlist.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            console.log(item)
        },

        deleteItem(item) {
            this.editedIndex = this.productlist.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.productlist.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.pagestate = 0
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
                Object.assign(this.productlist[this.editedIndex], this.editedItem)
            } else {
                this.productlist.push(this.editedItem)
            }
            this.close()
        },

        async getproduct() {
            let productlistraw = await Core.get(`/admin/product/registering`)
            this.productlist = productlistraw.data
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
