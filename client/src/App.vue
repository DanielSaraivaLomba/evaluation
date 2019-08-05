<template>
  <v-app id="app">
    <div id="nav">
            <router-link v-if="authenticated" to="/login"></router-link>
        </div>
        <router-view @authenticated="setAuthenticated"/>
    
    <Header v-if="authenticated === true"/>
    <!-- <MenuEval v-if="authenticated === true && eval === true"> -->
    <Content v-if="authenticated === true"/>
    <Menu v-if="authenticated === true"/>
    <Footer v-if="authenticated === true"/>
  </v-app>
</template>

<script>
import Login from './components/Login'
import Header from './components/layout/Header'
import Menu from './components/layout/Menu'
import Footer from './components/layout/Footer'
import Content from './components/layout/Content'


export default {
  name: 'App',
  data() {
            return {
                authenticated: false,
                mockAccount: {
                    username: "1234",
                    password: "1234"
                }
            }
  },
  mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
  methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            }
        },
  components: {
    Menu,
    Header,
    Footer,
    Content,
  },
}

</script>

<style>
@import "vuetify/dist/vuetify.min.css";
@import "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons";
@import './assets/styles/styles.css';

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;


}

body {
        background-color: #F0F0F0;
    }
h1 {
        padding: 0;
        margin-top: 0;
    }
</style>
