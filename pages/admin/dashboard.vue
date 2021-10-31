<template>
<div class="app">
    <v-card width="96%" class="ml-5">
        <v-card-text>
            <!-- <pre> {{chartOptions}} </pre> -->
            <div class="d-flex mt-5 ml-3">
                <v-card max-width="200">
                    <v-card-title primary-title>
                        ยอดขายวันนี้
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="d-flex justify-center">
                            <div>{{todaydata.todaysales}} &#3647; </div>
                        </div>
                    </v-card-text>
                </v-card>

                <v-card max-width="300" class="ml-3">
                    <v-card-title primary-title>
                        จำนวนการสั่งซื้อวันนี้
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="d-flex justify-center">
                            <div>{{todaydata.ordercount}}</div>
                        </div>
                    </v-card-text>
                </v-card>
            </div>

            <!-- <div class="ml-3 mt-5">

                <v-card max-width="600" class="ml-1">
                    <div class="mt-5 ml-2">
                        สินค้าขายดีวันนี้
                    </div>
                    <apexcharts apexcharts width="550" type="bar" :options="chartOptions" :series="series"></apexcharts>
                </v-card>
            </div>

            <pre>
                {{series}}
            </pre> -->

            <v-card max-width="50%" class="mt-5 ml-3">
                <v-card-text>
                    <v-data-table :headers="headers" :items="itemWithIndex" sort-by="sort" :items-per-page="10" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>
                                    รายการสั่งซื้อ
                                </v-toolbar-title>

                                <v-dialog v-model="infodialog" :overlay="false" max-width="1000px" transition="dialog-transition">
                                    <v-card>
                                        <v-card-title primary-title>
                                            <div>รายละเอียดใบสั่งซื้อ</div>
                                        </v-card-title>
                                        <!-- <pre> {{receiptmain}} </pre> -->
                                        <div>
                                            <v-card-text>
                                                <v-row>
                                                    <v-col cols="1"></v-col>
                                                    <v-col cols="3">
                                                        <div>ชื่อลูกค้า: {{editedItem.users_name}}</div>
                                                        <div>ที่อยู่ลูกค้า: {{editedItem.user_address}}</div>
                                                    </v-col>
                                                    <v-col cols="4"></v-col>
                                                    <v-col cols="3">
                                                        <div>
                                                            <div>หมายเลขการสั่งซื้อ: {{editedItem.order_serial}}</div>
                                                            <div>หมายเลขใบเสร็จ: {{editedItem.receipt_serial}}</div>
                                                        </div>
                                                    </v-col>

                                                </v-row>

                                            </v-card-text>
                                        </div>

                                        <v-card-text class="mt-5">
                                            <v-simple-table fixed-header>
                                                <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th>ลำดับ</th>
                                                            <th>รูปสินค้า</th>
                                                            <th>ชื่อสินค้า</th>
                                                            <th>จำนวน</th>
                                                            <th>ราคารวม</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <template>
                                                            <tr v-for="item,i in receiptdata" :key="i">
                                                                <!-- <tr> -->
                                                                <td> i </td>
                                                                <td>
                                                                    <v-img class="cartimage" src="image`"></v-img>
                                                                </td>
                                                                <td> {{item.productname}} </td>
                                                                <td> {{item.receiptqty}} </td>
                                                                <td> {{item.producttotalamt}} </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>รวม</td>
                                                                <td> {{receiptmaintotal.total}} </td>
                                                            </tr>
                                                        </template>

                                                    </tbody>
                                                </template>
                                            </v-simple-table>

                                            <div class="d-flex justify-end mt-3">
                                                <v-card-actions>
                                                    <v-btn color="error" @click="close()">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                </v-card-actions>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>

                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions=" {item} ">
                            <v-btn color="success" text @click="receiptinfo(item)">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>

        </v-card-text>
    </v-card>
</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { Core } from '@/vuexes/core'

export default {
    layout: 'admin',
    name: 'Chart',
    components: {
        apexcharts: VueApexCharts,
    },
    data() {
        return {
            infodialog: false,
            dialog: false,
            chartOptions: {
                chart: {
                    id: 'vuechart-example',
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
            },
            series: [{
                name: 'จำนวนชิ้น',
                data: [30, 40, 45, 50, 49, 60, 70, 81]
            }],
            headers: [
                { text: 'ลำดับ', align: 'center', sortable: true, value: 'sort' },
                { text: 'รหัสใบเสร็จ', align: 'start', sortable: false, value: 'receipt_serial' },
                { text: 'ชื่อลูกค้า', align: 'start', sortable: false, value: 'users_name' },
                { text: 'สถานะ', align: 'start', sortable: false, value: 'receipt_status' },
                { text: 'ราคารวม', align: 'start', sortable: false, value: 'receipt_toal_amt' },
                { text: '', align: 'center', sortable: false, value: 'actions' },
            ],
            bestsellertitle: [],
            bestsellerlist: [],
            todaydata: {
                ordercount: null,
                todaysales: null,
            },
            todaydataorderlist: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            sendform: {
                receiptid: null
            },
            orderdata: {},
            receiptmain: {},
            paymentdata: {},
            receiptdata: {},
            receiptmaintotal: {
                total: null
            },
            getpayment: {},
        }
    },
    async created() {
        this.gettoday()
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        infodialog(val) {
            val || this.close()
        },
    },
    computed: {
        itemWithIndex() {
            return this.todaydataorderlist.map(
                (receipt_id, index) => ({
                    ...receipt_id,
                    sort: index + 1
                })
            )
        },
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    methods: {
        updateChart() {
            const max = 90;
            const min = 20;
            const newData = this.series[0].data.map(() => {
                return Math.floor(Math.random() * (max - min + 1)) + min
            })
            // In the same way, update the series option
            this.series = [{
                data: newData
            }]
        },
        async gettoday() {
            let todayraw = await Core.get(`/admin/dashboard/today`)
            this.todaydata = todayraw.ordercount
            this.todaydataorderlist = todayraw.orderlist
            this.chartOptions.xaxis.categories = todayraw.bestsellerproduct.redblack
            this.series.data = todayraw.bestsellerproduct.sold_qty
            console.log(todayraw.bestsellerproduct)
        },
        async orderinfo(item) {

            this.sendform.receiptid = item.receipt_id
            console.log(this.sendform)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            let senddata = await Core.post(`/admin/purchase/getreceipt`, this.sendform)
            console.log(senddata)
        },
        close() {
            this.dialog = false
            this.infodialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        async receiptinfo(item) {
            this.sendform.receiptid = item.receipt_id
            this.editedItem = Object.assign({}, item)
            let info = await Core.post('/admin/purchase/getreceipt', this.sendform)
            this.receiptdata = info.data
            this.receiptmain = info.main
            this.receiptmaintotal.total = info.main[0]['receipttotalamt']
            this.getpayment = info.paymentdata[0]
            this.infodialog = true
        },
    }
}
</script>

<style scoped>
button {
    background: #26E6A4;
    border: 0;
    font-size: 16px;
    color: '#fff';
    padding: 10px;
    margin-left: 28px;
}
</style>
