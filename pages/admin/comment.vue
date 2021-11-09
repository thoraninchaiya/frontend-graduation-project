<template>
<v-app class="mt-5 ml-5 mr-5">
    <!-- <pre>
    {{editedIndex}}
    {{editedItem}}
    {{commentdata}}
    </pre> -->
    <div class="mt-2">
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="productlist" sort-by="product_id" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <!-- <v-spacer></v-spacer> -->
                            <v-dialog v-model="dialog" :overlay="false" max-width="1000px" transition="dialog-transition">
                                <v-card>
                                    <v-card-title>
                                        <v-spacer></v-spacer>
                                        <v-btn color="error" text @click="close()">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-simple-table fixed-header>
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th>รหัสรีวิว</th>
                                                        <th>ชื่อผู้รีวิว</th>
                                                        <th>ข้อความ</th>
                                                        <th>ระดับ</th>
                                                        <th>วันที่รีวิว</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item, i in commentdata" :key="i">
                                                        <td> {{item.comment_id}} </td>
                                                        <td> {{item.user}} </td>
                                                        <td> {{item.comment_detail}} </td>
                                                        <td> {{item.comment_rating}} </td>
                                                        <td> {{item.comment_date}} </td>
                                                        <td>
                                                            <v-btn color="error" @click="cancel(item.comment_id)" text>
                                                                <v-icon>mdi-cancel</v-icon>
                                                            </v-btn>
                                                            <v-btn color="success" @click="approve(item.comment_id)" text>
                                                                <v-icon>mdi-check</v-icon>
                                                            </v-btn>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                        </v-toolbar>
                    </template>
                    <template v-slot:item.image=" {item} ">
                        <v-img :src="`${item.product_image}`" alt="" max-width="100px" max-height="100px" contain></v-img>
                    </template>
                    <template v-slot:item.glutenfree="{ item }">
                        <!-- <v-simple-checkbox v-model="editedItem.product_status" disabled></v-simple-checkbox> -->
                        <v-select :items="dataitems" v-model="item.product_status" @input="changstatus(item.product_id, item.product_status)" class="selector"></v-select>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="mr-2" @click="editItem(item)">
                            mdi-magnify
                        </v-icon>
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
</v-app>
</template>

<script>
import { Core } from '@/vuexes/core'
export default {
    layout: 'admin',
    data: () => ({
        dialog: false,
        dialogDelete: false,
        dataitems: ['active', 'unactive'],
        headers: [
            { text: 'รหัสสินค้า', align: 'start', sortable: true, value: 'product_id' },
            { text: 'รูปภาพ', align: 'center', sortable: false, value: 'image' },
            { text: 'ชื่อสินค้า', align: 'start', sortable: false, value: 'product_name' },
            // { text: 'จำนวนการรีวิว', value: '' },
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
        },
        commentdata: {},
        commentdatasend: {},
        commentlist: {},
        approvesend: {},

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
        async getcomment() {
            this.commentdatasend.product_id = this.editedItem.secretid
            var commentsend = await Core.post(`/admin/comment/`, this.commentdatasend)
            this.commentdata = commentsend.data
            // console.log(commentsend)
            // console.log(this.commentdatasend.product_id)
        },
        async approve(x) {
            this.approvesend.comment_id = x
            let approveraw = await Core.post(`/admin/comment/approve`, this.approvesend)
            if (approveraw) {
                this.toast(approveraw.status, approveraw.message)
            }
            if (approveraw.status == 200) {
                this.getcomment()
            }
            this.$nextTick(() =>{
                this.approvesend = {}
            })
        },
        async cancel(x) {
            this.approvesend.comment_id = x
            let cancelraw = await Core.post(`/admin/comment/cancel`, this.approvesend)
            if (cancelraw) {
                this.toast(cancelraw.status, cancelraw.message)
            }
            if (cancelraw.status == 200) {
                this.getcomment()
            }
            this.$nextTick(() =>{
                this.approvesend = {}
            })
        },

        editItem(item) {
            this.editedIndex = this.productlist.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            this.getcomment();
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
                this.commentdata = []
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
            this.productlist = await Core.get(`/admin/product`)
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
