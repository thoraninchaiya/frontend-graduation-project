<template>
<v-app class="mt-5 ml-5 mr-5">
    <pre>
    {{editedIndex}}
    {{editedItem}}
    </pre>
    <div class="mt-2">
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="productlist" sort-by="product_id" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <!-- <v-spacer></v-spacer> -->

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
            { text: 'จำนวนการรีวิว', value: '' },

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
