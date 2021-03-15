<template>
  <div id="app">
    <v-row>
      <v-col cols="1" md="3"></v-col>
      <v-col cols="9" md="6" id="nav">
        <span v-if="setGame">
          <router-link to="/">Home</router-link> |
          <router-link to="/traffic">Verkehr</router-link> |
          <router-link to="/factory">Fabrik</router-link><span v-if="adminShow"> |
          <router-link to="/admin">Admin</router-link></span>
        </span>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="2" md="2">
        <br>
        <v-dialog
            transition="dialog-top-transition"
            max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="#F2C800"
                v-bind="attrs"
                v-on="on"
            >Spieldaten</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                  color="amber"
                  dark
                  style="color: #111416; font-weight: bold;"
              >Du kannst Einstellungen für dein Spiel treffen.</v-toolbar>
              <v-card-text>
                <br>
                <v-row>
                  <v-col cols="12"><p>Der Name unter dem alles gespeichert wird: <b>{{spielstand?spielstand:'Kein Spielstand vorhanden'}}</b></p></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12"><v-text-field
                        v-model="newSpielstand"
                        label="Wie soll der Spielstand heißen?"
                    ></v-text-field></v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                    outlined
                    color="green darken-2"
                    @click="setSpielstand"
                >Speichern</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <div id="">
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
      setGame: true,
      spielstand: '',
      newSpielstand: '',
      dialog: false,
    };
  },
  methods: {
    checkAdmin() {
      if (localStorage.getItem('isAdmin') === undefined) {
        localStorage.setItem('isAdmin', false);
      }
      this.adminShow = localStorage.getItem('isAdmin')
    },
    getSpielstand() {
      this.spielstand = localStorage.getItem('spielstand');
    },
    setSpielstand() {
      if (this.newSpielstand !== '' && this.newSpielstand !== ' ') {
        localStorage.setItem('spielstand', this.newSpielstand);
      }
      this.newSpielstand = '';
      location.reload()
    }
  },
  created() {
    this.checkAdmin();
  },
  mounted() {
    this.getSpielstand();
    this.$store.dispatch("isSetGame");
    this.$store.dispatch("setAllRessources");
    this.$store.dispatch("setBasicRessources");
    this.$store.dispatch("setAllNodes");
    this.$store.dispatch("setBasicNodes");
    this.$store.dispatch("setAllTraffic");
    this.$store.dispatch("setAllTimetable");
    this.$store.dispatch("setAllRessources");
    this.$store.dispatch("setAllFactory");
  },
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
