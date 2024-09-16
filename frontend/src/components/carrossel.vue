<template>
  <h2>Recomendações Para Você</h2>
  <div class="main">
    <button class="nav left" @click="scrollLeft">&#9664;</button>
    <div id="slider" ref="slider">
      <Card v-for="movieId in movieIds"
      :key="movieId"
      :movieId="movieId"
      class="Card"/>
    </div>
    <button class="nav right" @click="scrollRight">&#9654;</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Card from "./card.vue";
import axios from 'axios';
import { useUserStore } from '../stores/UserStore';
export default {
  name: 'Carrossel',
  components: {
    Card
  },
  setup() {
    const userStore = useUserStore(); //Pegando do PINIA
    const slider = ref(null);
    const movieIds = ref([])
    const fetchMovieIds = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies/', {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`, // Envia o token no header da requisição
          },
        });
        movieIds.value = response.data.movies.map(movie => movie.idTMDB);
      } catch(error) {
        console.log('Erro ao buscar Id dos filmes: ', error)
      }
    }

    const scrollLeft = () => {
      slider.value.scrollBy({
        left: -900,
        behavior: 'smooth'
      });
    };

    const scrollRight = () => {
      slider.value.scrollBy({
        left: 900,
        behavior: 'smooth'
      });
    };

    onMounted(() => {
      fetchMovieIds();
    })

    return {
      slider,
      movieIds,
      scrollLeft,
      scrollRight
    };
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  width: 100%;
  height: auto;
  background: #070707;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

#slider {
  display: flex;
  width: 90%;
  overflow-y: hidden;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

#slider::-webkit-scrollbar {
  display: none;
}
#slider a:not(:last-child) {
  margin-right: 10px;
}

.Card {
  padding: 10px;
  flex: 0 0 auto;
  scroll-snap-align: start;
  transition: transform 450ms;
}

.Card:hover {
  transform: scale(1.08);
}

.nav {
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.nav.left {
  left: 10px;
}

.nav.right {
  right: 10px;
}

.nav:focus {
  outline: none;
}

.Card :deep(img) {
  min-width: 200px;
  width: 15vw;
  height: auto;
  object-fit: cover;
  margin: 12px 0;
  margin-right: 0px;
  border-radius: 3%;

}
.Card:last-child :deep(img) {
  margin-right: 0px; 
}
h2{
  color: white;
  font-family: "Coolvetica";
  font-weight: 200;
  margin-left: 5%;
  padding-top: 20px;
}
</style>
