<template>
  <div class="header">
    <div class="logo-links">
      <router-link to="/" class="logo">
        <img src="/img/E-Motion.svg" alt="logo e-motion">
      </router-link>
      <nav class="nav-links">
        <router-link to="/">Início</router-link>
        <router-link to="#">Categoria</router-link>
        <router-link to="#">Favoritos</router-link>
      </nav>
    </div>
    <div class="icons">
      <span class="icon">
        <router-link to="#"><img src="/img/icons/icon_Search.svg" alt="icone de pesquisa de filmes"></router-link>
      </span> <!-- ícone de busca -->
      <span class="icon">
        <router-link :to="`/Cart/${userStore.user.id}`"><img src="/img/icons/icon_Buycard.svg" alt="icone de carrinho de compras dos filmes"></router-link>
      </span> <!-- ícone de carrinho -->
      <span class="icon">
        <router-link to="/login"><img src="/img/icons/icon_Profile.svg" alt="icone do perfil do usuário"></router-link>
      </span> <!-- ícone de usuário -->
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore';
export default {
  name: 'Header',
  setup() {
    const userStore = useUserStore();

    return {
      userStore, // Retorne o userStore para acessá-lo no template
    };
  }
};
</script>

<style scoped>
.header {
  z-index: 1000;
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #EC1E20;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 5%;
  padding-right: 5%;
  box-sizing: border-box;
}

.logo-links {
  display: flex;
}

.nav-links {
  padding-left: 2%;
  display: flex;
  align-items: center;
}

.nav-links a {
  font-family: 'SF pro display';
  margin: 0px 10px;
  color: white;
  text-decoration: none;
  font-size: 15px;
}

.icon {
  font-size: 20px;
  margin-left: 15px;
}
</style>