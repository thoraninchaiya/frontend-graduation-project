<template>
<v-app class="mt-5 ml-5 mr-5">
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
                <v-data-table :headers="headers" :items="userlist" sort-by="product_id" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>ผู้ใช้งานทั้งหมด</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <!-- Edit item and Add item -->
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
                        </v-toolbar>
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
import { Core } from '@/vuexes/core'
export default {
    layout: 'admin',
    data: () => ({
        dialog: false,
        dialogDelete: false,
        dataitems: ['active', 'unactive'],
        headers: [
            { text: 'รหัส', align: 'start', sortable: true, value: 'id' },
            { text: 'ชื่อ', align: 'center', sortable: false, value: 'firstname' },
            { text: 'นามสกุล', align: 'start', sortable: false, value: 'lastname' },
            { text: 'อีเมลล์', value: 'email' },
            { text: 'เบอร์ติดต่อ', value: 'phone' },
            { text: 'สถานะ', value: 'status' },
            // { text: 'Actions', value: 'actions', sortable: false },
            // { text: 'glutenfree', value: 'glutenfree', sortable: false },
        ],
        userlist: [],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
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
        this.getalluser()
    },

    methods: {
        test(item){
            console.log(item)
        },
        editItem(item) {
            this.editedIndex = this.userlist.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
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
            var userrawlist = await Core.get(`admin/user`)
            this.userlist = userrawlist.users
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
