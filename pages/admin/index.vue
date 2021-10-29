<template>
    <div>
        index
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data(){
        return {
            // admindialog: true
        }
    },
    async created(){
        this.dashboard()
    },
    methods: {
        async dashboard(){
            this.$router.push('/admin/dashboard')
        }
    } 
}
</script>

<style>

</style>