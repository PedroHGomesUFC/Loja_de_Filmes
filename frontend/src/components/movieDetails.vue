<template>
  <p>{{ errorMessage }}</p>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
  name: 'MovieDetails',
  props: {
    movieId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      movieDetails: {
        idTMDB: '',
        title: '',
        plot: '',
        released: '',
        runtime: '',
        genre: '',
        director: '',
        writer: '',
        country: '',
        awards: '',
        imdbRating: ''
      },
      errorMessage: '',
      successMessage: ''
    };
  },
  watch: {
    movieId: 'fetchMovieDetails'
  },
  methods: {
    async fetchMovieDetails() {
      if (!this.movieId) return;

      const accessToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTcwNzliOWVkYWEwMzMyMGZmYjEwZGIwNDc3YzAyNiIsIm5iZiI6MTcxOTQwNzI3OS43OTM2NTcsInN1YiI6IjY2NzgwNmQzYmY4YjVmZmI0MmZjMjYxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZQ9kyGPn4CWGg0AUNIv04LUqI1O0Ai_lUjlwnxHwW3Y'; // Substitua pelo seu token de acesso válido
      const movieUrl = `https://api.themoviedb.org/3/movie/${this.movieId}?language=pt-BR`;
      const creditsUrl = `https://api.themoviedb.org/3/movie/${this.movieId}/credits`;

      const options = {
        method: 'GET',
        headers: {
          'Authorization': accessToken,
          'Accept': 'application/json',
        }
      };

      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(movieUrl, options),
          fetch(creditsUrl, options)
        ]);

        if (!movieResponse.ok || !creditsResponse.ok) {
          throw new Error('Failed to fetch movie details or credits');
        }

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();
        
        if ( movieData.title !== "") {
          axios.post('http://localhost:3000/movies/', {
            idTMDB: this.movieId || '',
            title: movieData.title || '',
            plot: movieData.overview || '',
            released: movieData.release_date || '',
            runtime: movieData.runtime || '',
            gender: movieData.genres ? movieData.genres.map(genre => genre.name).join(', ') : '',
            director: this.getDirector(creditsData.crew) || 'Unknown',
            writer: this.getWriter(creditsData.crew) || 'Unknown',
            country: movieData.production_countries ? movieData.production_countries.map(country => country.name).join(', ') : '',
            imdbRating: movieData.vote_average || ''
          }, { timeout: 10000 })
            .then(()=> {
              Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Filme adicionado com sucesso'
              //TODO adicionar o style
            });
            })
            .catch(error => {
              console.error('Erro ao adicionar filme:', error);
              this.errorMessage = error.response ? error.response.data.message : 'Erro ao tentar adicionar o filme. Verifique a conexão ou tente novamente mais tarde.';
            });

          }
          
      } catch (error) {
        console.error('Error fetching movie details or adding to database:', error);
        this.errorMessage = 'Erro ao buscar detalhes do filme ou adicionar ao banco de dados.';
      }
    },
    getDirector(crew) {
      const directors = crew.filter(member => member.job === 'Director');
      return directors.map(director => director.name).join(', ');
    },
    getWriter(crew) {
      const writers = crew.filter(member => member.job === 'Writer' || member.job === 'Screenplay' || member.job === 'Story');
      return writers.map(writer => writer.name).join(', ');
    }
  },
  mounted() {
    this.fetchMovieDetails();
  }
};
</script>

<style scoped>

.movie-details {
  color: white;
}
.success-message {
  color: green;
}
.error-message {
  color: red;
}
</style>
