import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {


  const user = ref({
    id: Number(localStorage.getItem('id')) || null,
    username: localStorage.getItem('username') || "",
    email: localStorage.getItem('email') || "",
    bio: localStorage.getItem('bio') || "",
    adm: Number(localStorage.getItem('adm')) || 0,
  })

  const jwt = ref(localStorage.getItem('token') || '')


  const isAuthenticated = computed(() => jwt.value !== "")

  // Função de autenticação para salvar os dados após o login
  function authenticate(response) {
    const authUser = response.data.user
    const token = response.data.token.token

    // Atualizando o estado do usuário
    user.value = {
      id: authUser.id,
      username: authUser.username,
      email: authUser.email,
      bio: authUser.bio,
      adm: authUser.adm
    }

    // Atualizando o token
    jwt.value = token

    
    localStorage.setItem('id', authUser.id)
    localStorage.setItem('username', authUser.username)
    localStorage.setItem('email', authUser.email)
    localStorage.setItem('bio', authUser.bio)
    localStorage.setItem('adm', authUser.adm)
    localStorage.setItem('token', token)
  }
  function admin(response) {
    
  }

  function logout() {
    jwt.value = ""
    user.value = {
      id: null,
      username: "",
      email: "",
      bio: "",
      adm: 0
    }

    localStorage.clear()
  }

  return { user, jwt, isAuthenticated, authenticate, logout }
})
