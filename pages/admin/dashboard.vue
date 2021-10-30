<template>
<div class="app">
    <v-card width="96%" class="ml-5">
        <v-card-text>
            <pre>
                {{editedItem}}
            </pre>
            <div class="d-flex mt-5 ml-3">
                <v-card max-width="200">
                    <v-card-title primary-title>
                        ยอดขายวันนี้
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="d-flex justify-center">
                            <div>NULL</div>
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
            <div class="ml-3 mt-5">
                <v-card max-width="600" class="ml-1">
                    <apexcharts apexcharts width="550" type="bar" :options="chartOptions" :series="series"></apexcharts>
                </v-card>
            </div>

            <v-card max-width="45%" class="mt-5 ml-3">
                <v-card-text>
                    <v-data-table :headers="headers" :items="itemWithIndex" sort-by="sort" :items-per-page="10" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>
                                    รายการสั่งซื้อ
                                </v-toolbar-title>

                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions=" {item} ">
                            <v-btn color="success" text @click="orderinfo(item)">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>

            <pre>
            {{todaydataorderlist}}
            </pre>
            <!-- <div>
        <button @click="updateChart">Update!</button>
    </div>
    <pre> {{series}} </pre> -->
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
            chartOptions: {
                chart: {
                    id: 'vuechart-example',
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70, 81]
            }],
            headers: [
                { text: 'ลำดับ', align: 'center', sortable: true, value: 'sort' },
                { text: 'รหัสใบเสร็จ', align: 'start', sortable: false, value: 'receipt_serial' },
                { text: 'ชื่อลูกค้า', align: 'start', sortable: false, value: 'users_name' },
                { text: 'สถานะ', align: 'start', sortable: false, value: 'receipt_status' },
                { text: 'ที่ต้องชำระ', align: 'start', sortable: false, value: 'receipt_toal_amt' },
                { text: '', align: 'center', sortable: false, value: 'actions' },
            ],
            todaydata: {
                ordercount: null
            },
            todaydataorderlist: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
        }
    },
    async created() {
        this.gettoday()
    },
    watch: {
        dialog(val) {
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
            console.log(todayraw)
            this.todaydata.ordercount = todayraw.ordercount
            this.todaydataorderlist = todayraw.orderlist
        },
        orderinfo(item){
            // console.log(item)
            this.editedItem = Object.assign({}, item)
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
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
