<template>
    <Header/>
    <Login/>
    <Footer/>
</template>

<script>
import Login from '../components/login.vue'
import Footer from '../components/footer.vue'
import Header from '../components/header.vue'
export default {
    name: 'login',
    components: {
        Footer,
        Login,
        Header
    }
}

</script>

<style>

</style>