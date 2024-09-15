<template>
    <div>
      <button @click="logoutUser">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/UserStore'
  import { useRouter } from 'vue-router'
  
  const userStore = useUserStore()
  const router = useRouter()
  
  function logoutUser() {
    // Chama a função de logout da store
    userStore.logout()
  
    // Opcional: redireciona para a página de login após o logout
    router.push('/login')
  }
  </script>