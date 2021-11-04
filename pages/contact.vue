<template>
<v-app>
    <div class="d-sm-inline-flex d-md-inline-flex mt-10">

        <v-col cols="2">
            <v-card>
                <v-card-text class="d-inline-flex flex-col">
                    <v-btn color="success" v-for="(tab, index) in contactList" :key="tab.id" @click="ContactTab = index" :class="{active: ContactTab === index}" class="mt-3">
                        <div>
                            {{ tab }}
                        </div>
                    </v-btn>

                    <!-- <v-btn color="success">เกี่ยวกับ</v-btn>
            <v-btn color="success" class="mt-3">การชำระเงิน</v-btn>
            <v-btn color="success" class="mt-3">ช่องทางการติดต่อ</v-btn> -->
                </v-card-text>
            </v-card>
        </v-col>

        <v-col class="" cols="10">
            <v-card>
                <v-card-text>
                    <div v-show="ContactTab === 0">
                        <More-About />
                    </div>
                    <div v-show="ContactTab === 1">
                        <More-Payment />
                    </div>
                    <div v-show="ContactTab === 2">
                        <More-Contact />
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </div>

    <pre> {{dateRangeText}} </pre>

    <template>
        <v-row>
            <v-col cols="12" sm="6">
                <v-date-picker v-model="dates" range></v-date-picker>
                <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <!-- <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly></v-text-field> -->
                <!-- model: {{ dates }} -->
            </v-col>
        </v-row>
    </template>

</v-app>
</template>

<script>
export default {
    data: () => {
        return ({
            ContactTab: 0,
            contactList: ['เกี่ยวกับ', 'การชำระเงิน', 'ช่องทางการติดต่อ'],
            dates: []
        });
    },
    computed: {
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
    }
}
</script>

<style>

</style>
