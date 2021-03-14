<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/traffic">Verkehr</router-link> |
      <router-link to="/factory">Fabrik</router-link><span v-if="adminShow"> |
      <router-link to="/admin">Admin</router-link></span>
    </div>
    <v-app style="background-color: transparent">
    <router-view />
    </v-app>
  </div>
</template>

<script>

export default {
  data() {
    return {
      adminShow: false,
    };
  },
  methods: {
    checkAdmin() {
      let admin = localStorage.getItem('admin')
      let adminName = JSON.parse(admin).name;
      if (adminName.includes('Akuma95')) {
        this.adminShow = true;
      }
    },
  },
  created() {
    this.checkAdmin();
  }
}
</script>

<style>
body, html {
  height: 100%;
  background-color: #202125;
}

h1 {
  font-size: 1.7rem;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  background-color: #111416;
  width: 40%;
  margin: 0 auto 20px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
}
@media (max-width: 600px) {
  #nav {
    width: 70%;
  }
}
#nav a {
  font-weight: bold;
  color: #647179;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #F2C800;
}
.v-select {
  display: grid;
}
</style>
