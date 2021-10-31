<template>
<div>
    <!-- <pre>{{post}}</pre> -->
    <nuxt-link :to="{ name: 'post-id', params: { id: post.secretid } }"></nuxt-link>
    <v-card class="my-12 ml-5 mr-5" max-width="330" max-height="580">
        <a @click="getregistering(post.id), getsuccess(post.id)">
            <div>
                <v-img height="350" :src="`${post.image}`"></v-img>
                <v-card-title>
                    {{ post.name }}
                </v-card-title>
            </div>
            <v-card-text>
                <div class="card-body">
                    <div class="card-title">ID: {{ post.pid }}</div>
                    <div class="card-text">Price: {{ post.price }}</div>
                </div>
            </v-card-text>
        </a>
        <div class="d-flex justify-center card-footer">
            <form @submit.prevent="registering(post.id)">
                <div v-if="post.onstock == true">
                    <v-btn color="success" type="submit">ลงทะเบียน</v-btn>
                </div>
                <div v-else>
                    สินค้าหมด
                </div>
            </form>
        </div>
    </v-card>

    <v-dialog v-model="dialog" :overlay="false" max-width="600px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                {{post.name}}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-img max-height="300" contain :src="`${post.image}`"></v-img>
                </v-row>
                <!-- <div class="d-flex justify-center mt-5">
                    {{post.name}}
                </div> -->
                <v-divider></v-divider>
                <div>
                    <div>
                        <v-btn color="success" @click="detail(-1)">รายละเอียดสินค้า</v-btn>
                        <v-btn color="success" @click="detail(0)">รายชื่อลงทะเบียน</v-btn>
                        <v-btn color="success" @click="detail(1)">รายผู้ที่มีสิทธิการซื้อสินค้า</v-btn>
                    </div>
                    <v-divider></v-divider>
                    <div v-show="itemdetils === -1">
                        <div>
                            <span>ชื่อสินค้า: {{post.name}}</span>
                        </div>
                        <v-divider></v-divider>
                        <div v-if="post.pdetail === null || post.pdetail === ''">
                            <!-- {{post.pdetail}} -->
                            ไม่มีรายละเอียดสินค้า
                        </div>
                        <div v-else>
                            {{post.pdetail}}
                        </div>
                    </div>
                    <div v-show="itemdetils === 0">
                        <v-simple-table>
                            <thead>

                            </thead>
                            <tbody>
                                <tr v-for="item,index in registeringlist" :key="index">
                                    {{item.name}}
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>

                    <div v-show="itemdetils === 1">
                        <v-simple-table>
                            <thead>

                            </thead>
                            <tbody>
                                <tr v-for="item,index in registeringsuccess" :key="index">
                                    {{item.name}}
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { Core } from "@/vuexes/core";
export default {
    data: () => {
        return {
            itemdetils: -1,
            producttocart: {
                sid: {},
                pid: {},
                qty: 1
            },
            register: {
                pid: null
            },
            registerdefault: {
                pid: null
            },
            testform: {
                message: "test"
            },
            dialog: false,
            registeringlist: [],
            registeringsuccess: []
        }
    },
    props: {
        post: Object,
    },
    watch: {
        dialog(val) {
            val || this.close()
        }
    },
    async created() {
        // console.log(this.post)
        // console.log(this.post.id)
    },
    methods: {
        async addcart() {
            this.producttocart.sid = this.post.id
            this.producttocart.pid = this.post.pid
            let cartstatus = await Core.post(`/cart/add`, this.producttocart);
        },
        async registering(productid) {
            this.register.pid = productid
            let registerindata = await Core.post(`/product/registering`, this.register)
            if (registerindata.status == 400) {
                let toast = this.$toasted.show(registerindata.message, {
                    type: "error",
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 5000
                });
            }
            if (registerindata.status == 200) {
                let toast = this.$toasted.show(registerindata.message, {
                    type: "success",
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 5000
                });
            }
        },
        async test(data) {
            let commenttest = await Core.post('/comment/add/' + data, this.testform)
            console.log(commenttest)
        },
        async dialogtoggle(x) {
            console.log(x)
            // 
            this.dialog = true;
        },
        async close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.itemdetils = -1
            })
        },
        async detail(x) {
            this.itemdetils = x
        },
        async getregistering(x) {
            // console.log(x)
            this.dialog = true;
            let regiterraw = await Core.get(`/product/registering/users/` + x)
            if (regiterraw.status == 400) {

            }
            if (regiterraw.status == 200) {
                // console.log(regiterraw)
                this.registeringlist = regiterraw.users
            }
        },
        async getsuccess(x) {
            // console.log(x)
            this.dialog = true;
            let successraw = await Core.get(`/product/registering/users/success/` + x)
            console.log(successraw)
            if (successraw.status == 400) {

            }
            if (successraw.status == 200) {
                // console.log(regiterraw)
                this.registeringsuccess = successraw.users
            }
        }
    }
};
</script>

<style>
.imagesize {
    width: 30%;
}
</style>
