<template>
  <Header />
  <div class="container">
    <div id="details" v-if="movie">
      <h1 id="title">{{ movie.title }}</h1>
      <p id="plot">{{ movie.plot }}</p>
      <p class="info"> <strong> Director: </strong> {{ movie.director }}</p>
      <p class="info"> <strong>Country: </strong> {{ movie.country }}</p>
      <p class="info"> <strong>Released: </strong> {{ movie.released }}</p>
      <p class="info"> <strong>Runtime: </strong> {{ movie.runtime }} minutes</p>
      <p class="info"> <strong>IMDb Rating: </strong> {{ movie.imdbRating }}</p>
      <p class="info"> <strong>Writer: </strong> {{ movie.writer }}</p>
      <p><strong>Price:</strong> R${{ movie.price }}</p>
      <button @click="addToCart">Adicionar ao Carrinho</button>
    </div>
    <div id="imgDetails">
      <Card :movieId="String($route.params.movieId)" class="movie-poster-details" />
    </div>
  </div>

  <Footer />
</template>

<script>
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';
import Card from '@/components/card.vue';
import { useUserStore } from "../stores/UserStore"

export default {
  name: "MovieView",
  components: {
    Header,
    Footer,
    Card
  },
  data() {
    return {
      movie: null,
      userStore: useUserStore(),
    };
  },
  methods: {
    viewMovie(id) {
      this.axios.get(`http://localhost:3000/movies/${id}`)
        .then(response => {
          this.movie = response.data.movie[0];
        })
        .catch(error => {
          console.error(error);
        });
    },
    async addToCart() {
      try {
        const userId = this.userStore.user.id; //
        const movieId = this.$route.params.movieId; //pega pela URL o id do filme
        console.log(movieId, userId)
        await this.axios.post('http://localhost:3000/movies/addToCart', {
          user_id: userId,
          movie_id: movieId
        }, {
          headers: {
            Authorization: `Bearer ${this.userStore.jwt}`
          }
        });
        alert('Filme foi adicionado');
      } catch (error) {
        console.log('Erro ao adicionar filme ao caminho: ', error);
        alert('Não foi possível adicionar o filme ao carrinho')
      }
    }
  },
  created() {
    this.viewMovie(this.$route.params.movieId);
  }
}
</script>

<style scoped>
* {
  color: white;
  background-color: #070707;
}

.container {
  display: flex;
  padding-top: 70px;
  margin-left: 10%;
  margin-right: 10%;
}

#details {
  width: 50%;
  height: auto;
}

#details p,
#details h1 {
  margin: 0 0 10px;
}

#imgDetails {
  margin-left: 11%;
}

.movie-poster-details :deep(img) {
  width: 25vw !important;
  height: auto !important;
  border-radius: 3%;
}

#details #title {
  font-family: 'Coolvetica';
  font-weight: normal;
  font-size: 30pt;
  letter-spacing: 1px;
  padding-top: 30px;
}

#plot {
  font-family: 'sf pro display';
  font-size: 1.1em;
  padding-top: 2px;
  padding-bottom: 20px;
}

.info {
  font-family: 'sf pro display';
  font-size: 1em;
}

button {
  padding: 10px 20px;
  background-color: #EC1E20;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #C0171A;
}
</style>