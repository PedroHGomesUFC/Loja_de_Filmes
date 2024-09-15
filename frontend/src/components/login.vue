<template>
    <div class="form_login">
      <h2>Login</h2>
      <input class="form" type="email" v-model="email" placeholder="Email">
      <input class="form" type="password" v-model="password" placeholder="Password">
      <button id="button" @click="login">Entrar</button>
      <p v-if="errorMessage" class="error"><strong>{{ errorMessage }}</strong></p>
      <p class="options">Esqueceu a senha ?</p>
      <p class="options">Crie a sua conta</p>
    </div>
  </template>
  
  <script>
  import Footer from '@/components/footer.vue';
  import axios from 'axios';
  
  export default {
    name: "login",
    components: {
      Footer
    },
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '' 
      };
    },
    methods: {
      login() {
        axios.post('http://localhost:3000/users/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log('Login bem-sucedido', response.data);
          localStorage.setItem('token', response.data.token.token);
        })
        .catch(error => {
          console.log('Erro ao fazer login:', error.response);
          if(error.response.data.error == undefined) { // esse serve para que caso o usuario tente fazer login sem fornece email ou senha de uma resposta.
            this.errorMessage = error.response.data.msg;
            return
          }
          this.errorMessage = error.response.data.error;
        });
      }
    }
  }
  </script>
  
  <style>
  .form_login h2 {
    color: white;
    font-family: 'coolvetica';
    font-size: 2.5em;
    font-weight: 500;
    letter-spacing: 1px;
    padding-bottom: 40px;
    padding-top: 8%;
  }
  .error {
    color: white;
    margin-top: 10px;
    font-size: 25px;
    font-family: 'sf pro display';
  }
  .form_login {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
.form {
    background-color: #d9d9d936;
    border: 2px solid white;
    border-radius: 3px;
    width: 500px;
    height: 44px;
    margin-top: 25px;
    font-family: 'sf pro display';
    color: white;
    font-size: 1.1em;
    padding: 0px 1% 0px 1%;
  }
#button {
  background-color: white;
  border: none;
  color: black;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 3px;
  width: 13%;
  min-width: 250px;
  font-family:'sf pro display';
  font-weight: bold;
  font-size: 20px;
  margin-top: 2%;
  transition: 0.3s;
}
#button:hover {
    background-color:#EC1E20 ;
    color: white;
}
.options {
    color: white;
    font-family:'sf pro display';
    font-size: 18px;
    padding-top: 10px;
}
  
  </style>
  