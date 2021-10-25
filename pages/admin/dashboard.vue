<template>
<div class="app">
    <div class="d-flex mt-5 ml-5">
        <v-card max-width="200">
            <v-card-title primary-title>
                ยอดขายวันนี้
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="d-flex justify-center">
                    <div>100</div>
                </div>
            </v-card-text>
        </v-card>

        <v-card max-width="200" class="ml-5">
            <v-card-title primary-title>
                ยอดขายวันนี้
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="d-flex justify-center">
                    <div>300</div>
                </div>
            </v-card-text>
        </v-card>
    </div>
    <div class="ml-5 mt-5">
        <v-card max-width="600" class="ml-1">
            <apexcharts apexcharts width="550" type="bar" :options="chartOptions" :series="series"></apexcharts>
        </v-card>
    </div>
    <!-- <div>
        <button @click="updateChart">Update!</button>
    </div>
    <pre> {{series}} </pre> -->
</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

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
            }]
        }
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
        }
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
