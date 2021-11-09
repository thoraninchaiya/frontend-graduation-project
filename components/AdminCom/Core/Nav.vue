<template>
<v-app>
    <v-card>
        <v-navigation-drawer permanent expand-on-hover>
            <v-list>
                <v-list-item class="px-2">
                    <v-list-item-avatar>
                        <!-- <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img> -->
                    </v-list-item-avatar>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class="text-h6">
                            <!-- Sandra Adams -->
                        </v-list-item-title>
                        <v-list-item-subtitle></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list nav dense>
                <v-list-item v-for="(item, i) in adminlink" :key="i" :to="item.to">
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list nav dense>
                <v-list-item to="/">
                    <v-list-item-icon>
                        <v-icon>mdi-account-arrow-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</v-app>
</template>

<script>
export default {
    data() {
        return {
            adminlink: [{
                    icon: 'mdi-view-dashboard',
                    title: 'Dashboard',
                    to: '/admin/dashboard'
                },
                // {
                //     icon: 'mdi-credit-card-outline',
                //     title: 'Payment',
                //     to: '/admin/payment'
                // },
                {
                    icon: 'mdi-archive',
                    title: 'Product',
                    to: '/admin/product'
                },
                {
                    icon: 'mdi-stack-exchange',
                    title: 'Receipt',
                    to: '/admin/receipt'
                },
                // {
                //     icon: 'mdi-truck-fast-outline',
                //     title: 'Delivery',
                //     to: ''
                // },
                {
                    icon: 'mdi-sync',
                    title: 'Random',
                    to: '/admin/random'
                },
                // {
                //     icon: 'mdi-comment-text-multiple-outline',
                //     title: 'Comment',
                //     to: '/admin/comment'
                // },
                {
                    icon: 'mdi-account-multiple',
                    title: 'User',
                    to: '/admin/user'
                },
                {
                    icon: 'mdi-wallpaper',
                    title: 'Banner',
                    to: '/admin/banner'
                }
            ]
        }
    }
}
</script>

<style>

</style>
