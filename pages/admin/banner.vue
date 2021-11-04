<template>
<v-app class="mt-5 ml-5 mr-5">
    <div class="mt-2">
        <v-card>
            <v-card-text>
                <v-data-table :headers="headers" :items="bannerlsit" :items-per-page="30" sort-by="id" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>จัดการแบนเนอร์</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <!-- Edit item and Add item -->
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                        <v-icon class="mr-3">mdi-plus-box</v-icon> เพิ่มแบนเนอร์
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="7" sm="3" md="7">
                                                    <!-- <v-text-field v-model="editedItem.image" label="รูป"></v-text-field> -->
                                                    <v-file-input class="mt-2" label="เลือกรูปภาพ" v-model="imagefiles" v-on:change="selectFile" required accept="image/*"></v-file-input>
                                                </v-col>
                                                <v-col cols="5" sm="3" md="5">
                                                    <v-select :items="dataitems" label="สถานะแสดง" v-model="editedItem.status_code" item-value="id" item-text="name" class="selector"></v-select>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions v-if="editedIndex == -1">
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">
                                            ยกเลิก
                                        </v-btn>
                                        <v-btn color="blue darken-1" text @click="addItem()">
                                            บันทึก
                                        </v-btn>
                                    </v-card-actions>
                                    <v-card-actions v-if="editedIndex > -1">
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">
                                            ยกเลิก
                                        </v-btn>
                                        <v-btn color="blue darken-1" text @click="editbanner()">
                                            บันทึก
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog><!-- End Edit item -->

                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">ยืนยันการลบสินค้า</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">ยกเลิก</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">ยืนยัน</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>

                    <template v-slot:item.image=" {item} ">
                        <v-img :src="`${item.image}`" alt="" max-width="200px" max-height="200px" contain></v-img>
                    </template>
                    <template v-slot:item.actionstatus="{ item }">
                        <!-- <v-select :items="dataitems" v-model="item.status_code" @input="changstatus(item.id, item.status)" item-value="id" item-text="name" class="selector"></v-select> -->
                        <v-select :items="dataitems" v-model="item.status_code" @input="changstatus(item)" item-value="id" :value="item.status_code" item-text="name" class="selector"></v-select>
                        <!-- <v-select :items="dataitems" v-model="item.status_code" item-value="id" item-text="name" class="selector"></v-select> -->
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="mr-2" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon @click="deleteItem(item)">
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
</v-app>
</template>

<script>
import { Core } from '@/vuexes/core'
export default {
    layout: 'admin',
    data: () => ({
        imagefiles: null,
        bannerlsit: [],
        editbannerstatus: {},
        dialog: false,
        dialogDelete: false,
        dataitems: [
            { id: 1, name: 'แสดง' },
            { id: 2, name: 'ไม่แสดง' },
        ],
        headers: [
            { text: 'รหัสแบนเนอร์', sortable: true, align: 'center', value: 'id' },
            { text: 'รูปภาพ', sortable: false, value: 'image' },
            { text: 'สถานะแสดง', sortable: false, value: 'actionstatus' },
            { text: '', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
        filedata: null,

    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'เพิ่มแบนเนอร์' : 'แก้ไขแบนเนอร์'
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
        this.getbanner()
    },

    methods: {
        test(item) {
            console.log(item)
        },
        async changstatus(item) {
            this.editbannerstatus.type = "updatestatus"
            this.editbannerstatus.banner_id = item.id
            this.editbannerstatus.banner_status_code = item.status_code
            let updatestatus = await Core.post(`/admin/banner/edit`, this.editbannerstatus)
            if (updatestatus) {
                this.toast(updatestatus.status, updatestatus.message)
            }
        },
        async addItem(item) {
            // console.log(this.editedItem.status_code)
            let formData = new FormData();
            formData.append('image', this.filedata);
            formData.append('status_code', this.editedItem.status_code);
            let additem = await Core.post(`/admin/banner/add`, formData)

            if (additem) {
                this.toast(additem.status, additem.message)
                this.close()
                this.getbanner()
            }
        },
        async editbanner(){
            // console.log(this.editedItem)
            let formData = new FormData();
            formData.append('image', this.filedata);
            formData.append('banner_id', this.editedItem.id);
            formData.append('banner_status', this.editedItem.status);
            formData.append('banner_status_code', this.editedItem.status_code);
            formData.append('type', "edit");
            let edititemraw = await Core.post(`/admin/banner/edit`, formData)
            if(edititemraw){
                this.toast(edititemraw.status, edititemraw.message)
            }
            if(edititemraw.status == 200){
                this.getbanner();
                this.close();
            }
        },

        editItem(item) {
            this.editedIndex = this.bannerlsit.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.bannerlsit.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        async deleteItemConfirm() {
            let delitem = await Core.post(`/admin/banner/del`, this.editedItem)
            if (delitem) {
                this.toast(delitem.status, delitem.message)
                this.getbanner()
                this.close()
            }
        },

        close() {
            this.dialog = false
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.imagefiles = null
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        async getbanner() {
            let bannerraw = await Core.get(`/admin/banner`)
            this.bannerlsit = bannerraw.data
            // console.log(bannerraw)

        },

        async selectFile(event) {
            this.filedata = event
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
