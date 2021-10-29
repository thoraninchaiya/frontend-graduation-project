<template>
<div>
    <!-- {{post}} -->
    <nuxt-link :to="{ name: 'post-id', params: { id: post.secretid } }"></nuxt-link>
    <v-card class="my-12 ml-5 mr-5" max-width="330" max-height="580">
        <!-- <pre>
        {{post}}
      </pre> -->
        <a @click="opendialog(post.id)">
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
            <form @submit.prevent="addcart()">
                <div v-if="post.onstock == true">
                    <v-btn color="success" type="submit">เพิ่มลงตะกร้า</v-btn>
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
                        <span>ชื่อสินค้า: {{post.name}}</span>
                    </div>
                    <v-divider></v-divider>
                    <div v-if="post.pdetail === null">
                        <!-- {{post.pdetail}} -->
                        ไม่มีรายละเอียดสินค้า
                    </div>
                    <div v-else>
                        {{post.pdetail}}
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
            dialog: false,
            producttocart: {
                sid: {},
                pid: {},
                qty: 1,
            },
            productdata: {
                sid: null,
                name: "ProductName",
                price: null,
            }
        }
    },
    props: {
        post: Object,
    },
    async created() {
        // console.log(this.post.id)
    },
    methods: {
        async addcart() {
            this.producttocart.sid = this.post.id
            this.producttocart.pid = this.post.pid
            let cartstatus = await Core.post(`/cart/add`, this.producttocart);
            // console.log(cartstatus);
            if (cartstatus.status == 200) {
                let toast = this.$toasted.show("ท่านได้เพิ่มสินค้าลงตะกร้า", {
                    type: "success",
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 5000
                });
            }
            if (cartstatus.status == 401 || cartstatus.status == 400) {
                let toast = this.$toasted.show(cartstatus.message, {
                    type: "error",
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 5000
                });
            }
        },
        async opendialog(x) {
            this.dialog = true
        }
    }
};
</script>

<style>
.imagesize {
    width: 35%;
}
</style>
