<template>
<v-app>
    <!-- <div class="d-sm-inline-flex d-md-inline-flex"> -->
    <div class="d-flex">
        <v-col cols="2">
            <v-card>
                <v-card-title class="justify-center">
                    หมวดหมู่สินค้า
                </v-card-title>
                <v-divider></v-divider>
                <!-- <v-btn color="success">หมวดหมู่สินค้า</v-btn> -->
                <!-- <pre>{{categorylist}}</pre> -->
                <v-card-text>
                    <v-list>
                        <v-list-item-group color="primary">
                            <v-list-item @click="getcategory(-1)"> สินค้าทั้งหมด </v-list-item>
                            <v-list-item v-for="(item, i) in categorylist" :key="i" @click="getcategory(item.id)"> {{item.cname}} </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col class="" cols="">
            <v-card>
                <v-card-title>
                    <div v-if="categorystate == -1">สินค้าทั้งหมด</div>
                    <div v-if="categorystate > 0">หมวดหมู่: {{categorymain.categorythainame}}</div>
                </v-card-title>
                <!-- <pre>{{categorylist}}</pre> -->
                <!-- <pre>{{carddata}} </pre> -->
                <v-divider></v-divider>
                <!-- <v-card-text class="d-flex align-content-start flex-wrap justify-center"> -->
                <div v-if="categorystatus != 400">
                    <v-card-text class="d-flex align-content-start flex-wrap">
                        <Card-Product v-for="post in carddata" :key="post.secretid" :post="post" />
                    </v-card-text>
                </div>
                <div v-else>
                    <v-card-text>
                        ไม่พบสินค้าในขณะนี้
                    </v-card-text>
                </div>
            </v-card>
        </v-col>
    </div>
</v-app>
</template>

<script>
import { Core } from '@/vuexes/core'
import { Web } from '@/vuexes/web'
import MainCard from '@/components/Card/Product'

export default {
    components: {
        MainCard
    },
    data() {
        return {
            categorystate: -1,
            categorystatelist: {
                categoryname: null,
            },
            categorystatus: null,
            carddata: [],
            test: [],
            categorylist: {},
            categorymain: {}
        }
    },
    // async Request(){
    //   await getProducts();
    // },
    async created() {
        await this.getProducts();
        await this.getcategorys();
    },
    methods: {
        async getProducts() {
            let product = await Core.get(`/product/`)
            this.carddata = product
        },
        async getcategorys() {
            this.categorylist = await Core.get(`/category`)
        },
        async getcategory(x) {
            this.categorystate = x
            if (x > 0) {
                let products = await Core.get(`/category/` + x)
                if (products.status == 200) {
                    return this.carddata = products.results, this.categorystatus = 200, this.categorymain = products.categorymain
                } else {
                    return this.categorystatus = 400, this.categorymain = products.categorymain
                }
            }
            if (x < 0) {
                this.categorystatus = 200
                this.getProducts();
            }
        }
    },
}
</script>

<style>

</style>
