<template>
    <Header id="head"/>
    <div id="main">
        <h2>Filmes no Carrinho</h2>
    <div class="movie-list">
        <ul>
            <li>
                <Card v-for="movieId in movieIds" :key="movieId" :movieId="movieId" class="Card" />
            </li>
        </ul>
    </div>
    </div>
    <Footer />
</template>

<script>
import { ref, onMounted } from 'vue';
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';
import Card from '@/components/card.vue';
import axios from 'axios';
import { useUserStore } from '../stores/UserStore';
export default {
    name: 'CartView',
    props: ['userId'],
    components: {
        Header,
        Footer,
        Card
    },
    setup(props) {
        const userStore = useUserStore();
        const movieIds = ref([]); // Armazena os IDs dos filmes

        const fetchMovieIds = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/movies/getCart/${userStore.user.id}`, {
                    headers: {
                        Authorization: `Bearer ${userStore.jwt}`, // Envia o token no header da requisição
                    },
                });
                movieIds.value = response.data.map(movie => movie.movie_id);
            } catch (error) {
                console.log('Erro ao buscar Id dos filmes: ', error);
            }
        };

        onMounted(() => {
            fetchMovieIds();
        });

        return {
            movieIds,
        };
    }
};
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}
h2 {
    color: white;
    font-family: "Coolvetica";
    font-weight: 200;
    margin-left: 5%;
}
li {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    background: black;
}
#main {
    padding: 150px 0px 0px 150px;
}
.movie-list {
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
    background-color: #000000;
    border-radius: 10px;
    color:white;
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
.movie-list::-webkit-scrollbar {
  width: 5px;
}

.movie-list::-webkit-scrollbar-track {
  background-color: #000000;

}

.movie-list::-webkit-scrollbar-thumb {
  background-color: #b6b6b6;
  border-radius: 2px;
}
</style>