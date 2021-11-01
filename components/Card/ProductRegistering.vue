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
            <div v-if="post.onstock == true">
                <v-btn color="success" @click="registering(post.id)">ลงทะเบียน</v-btn>
                <v-btn color="warning">
                    <v-icon @click="registertocart(post.id)">mdi-cart</v-icon>
                </v-btn>
            </div>
            <div v-else>
                สินค้าหมด
            </div>
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
            registeringsuccess: [],
            cartsent: {},
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
            if (cartstatus) {
                this.toast(cartstatus.status, cartstatus.message)
            }
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
            if (regiterraw) {
                this.toast(regiterraw.status, regiterraw.message)
            }
            if (regiterraw.status == 200) {
                this.registeringlist = regiterraw.users
            }
        },
        async getsuccess(x) {
            // console.log(x)
            this.dialog = true;
            let successraw = await Core.get(`/product/registering/users/success/` + x)
            // console.log(successraw)
            if (successraw) {
                this.toast(successraw.status, successraw.message)
            }
            if (successraw.status == 200) {
                // console.log(regiterraw)
                this.registeringsuccess = successraw.users
            }
        },
        async registertocart(x) {
            console.log(x)
            this.cartsent.productid = x
            let tocartraw = await Core.post(`/product/registering/cart/`, this.cartsent)
            if (tocartraw) {
                this.toast(tocartraw.status, tocartraw.message)
            }
        },
        async toast(a, b) {
            if (a == 400 || a == 401) {
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
    }
};
</script>

<style>
.imagesize {
    width: 30%;
}
</style>
