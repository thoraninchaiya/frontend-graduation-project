<template>
<v-app class="mt-5 ml-5 mr-5">
    <pre>
        {{editedIndex}}
        {{editedItem}}
    </pre>
    <!-- <div class="d-flex">
        <div>
            <v-card max-width="500px" min-width="100px">
                <v-card-text>
                    test1
                </v-card-text>
            </v-card>
        </div>
        <div>
            <v-card>
                <v-card-text>
                    test2
                </v-card-text>
            </v-card>
        </div>
    </div> -->

    <div class="mt-2">
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="productlist" sort-by="product_id" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>สินค้าทั้งหมด</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <!-- Edit item and Add item -->
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                        New Item
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.product_id" label="รหัสสินค้า"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.product_name" label="ชื่อสินค้า"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.product_price" label="ราคาสินค้า"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.product_qty" label="จำนวนคงเหลือ"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.sold_qty" label="จำหน่ายแล้ว" disabled></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.product_status" label="สถานะสินค้า"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="blue darken-1" text @click="save">
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog><!-- End Edit item -->

                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.image=" {item} ">
                        <v-img :src="`${item.product_image}`" alt="" class="imgsize"></v-img>
                    </template>
                    <template v-slot:item.glutenfree="{ item }">
                        <!-- <v-simple-checkbox v-model="editedItem.product_status" disabled></v-simple-checkbox> -->
                        <v-select :items="dataitems" v-model="item.product_status" @input="changstatus(item.product_id, item.product_status)" class="selector"></v-select>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item)">
                            mdi-delete
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
        dialog: false,
        dialogDelete: false,
        dataitems: ['active', 'unactive'],
        headers: [
            { text: 'รหัสสินค้า', align: 'start', sortable: true, value: 'product_id' },
            { text: 'รูปภาพ', align: 'center', sortable: false, value: 'image' },
            { text: 'ชื่อสินค้า', align: 'start', sortable: false, value: 'product_name' },
            { text: 'ราคาสินค้า', value: 'product_price' },
            { text: 'จำนวนคงเหลือ', value: 'product_qty' },
            { text: 'จำหน่ายแล้ว', value: 'sold_qty' },
            { text: 'สถานะวางขาย', value: 'glutenfree',sortable: false },
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
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
        test(item){
            console.log(item)
        },
        async changstatus(itemid, itemstatus){
            // console.log(itemid)
            // console.log(itemstatus)
            this.productstatus.type = "updatestatus"
            this.productstatus.id = itemid
            this.productstatus.status = itemstatus
            let updatestatus = await Core.post(`/admin/product`, this.productstatus)
            // console.log(updatestatus)
            if(updatestatus.status == 200){
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
.selector{
    max-width: 100px;
}
.imgsize{
    max-width: 50px;
}
</style>
