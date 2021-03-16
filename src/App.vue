<template>
  <div id="app">

    <v-app style="background-color: transparent">
      <v-app-bar app color="transparent" flat>
        <!-- -->
    <v-row>
      <v-col cols="3" md="3"></v-col>
      <v-col cols="6" md="6" id="nav">
        <span v-if="setGame" class="mt-2">
          <router-link to="/">Home</router-link> |
          <router-link to="/traffic">Verkehr</router-link> |
          <router-link to="/factory">Fabrik</router-link><span v-if="adminShow"> |
          <router-link to="/admin">Admin</router-link></span>
        </span>
      </v-col>
      <v-col cols="3" md="3">
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
            >Savegame</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                  color="amber"
                  dark
                  style="color: #111416; font-weight: bold;"
              >Du kannst einer Datenbank joinen oder eine neue erstellen.</v-toolbar>
              <v-card-text>
                <br>
                <v-row>
                  <v-col cols="12"><p>Der aktuelle Name unter dem alles gespeichert wird: <b>{{spielstand?spielstand:'Kein Spielstand vorhanden'}}</b></p></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6"><v-text-field
                        v-model="newSpielstand"
                        label="Name des Savegames"
                    ></v-text-field></v-col>
                  <v-col cols="12" md="6"><v-text-field
                      v-model="newPassword"
                      label="Passwort"
                  ></v-text-field></v-col>
                  <v-col cols="12" v-if="gameAssigned"><p class="errorMsg">
                    Es tut mir leid, dieses Savegame besteht bereits.
                  </p></v-col>
                  <v-col cols="12" v-if="failPW"><p class="errorMsg">
                    Es tut mir leid, aber das Password stimmt leider nicht.
                  </p></v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                    outlined
                    color="blue darken-2"
                    @click="setSpielstand"
                >Neue Datenbank</v-btn>
                <v-btn
                    outlined
                    color="green darken-2"
                    @click="getFormSavegame"
                >Datenbank joinen</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <div id="">
    </div>

      </v-app-bar>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>

      <v-footer class="py-3" color="#dddddd">
        <v-row>
          <v-col
              class="text-center"
              cols="12"
          >
            <router-link to="/"><v-btn color="primary" class="mx-5 my-3" text rounded>Home</v-btn></router-link>
            <router-link to="/services"><v-btn color="primary" class="mx-5 my-3" text rounded>Services</v-btn></router-link>
            <router-link to="/feedback"><v-btn color="primary" class="mx-5 my-3" text rounded>Feedback</v-btn></router-link>
          </v-col>
          <v-col
              class="text-center"
              cols="12"
          >
            {{ new Date().getFullYear() }} — <strong>Paul Koplin</strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<script>

import {db} from "@/firebase/firebase";

export default {
  data() {
    return {
      adminShow: false,
      setGame: true,
      spielstand: '',
      password: '',
      newPassword: '',
      gameAssigned: false,
      failPW: false,
      newSpielstand: '',
      dialog: false,
    };
  },
  computed: {
    allGames() {
      return this.$store.getters.getAllGames;
    },
  },
  watch: {
    allGames() {
      this.getLocalSavegame();
    }
  },
  methods: {
    checkAdmin() {
      if (localStorage.getItem('isAdmin') !== undefined) {
        this.adminShow = localStorage.getItem('isAdmin')
      }
    },
    getFormSavegame() {
      this.gameAssigned = false;
      this.failPW = false;
      let spielstand = this.newSpielstand.toLowerCase();
      let password = this.newPassword;
      this.allGames.forEach(game => {
        if (spielstand === game.name) {
          if (password === game.password) {
            this.spielstand = spielstand
            this.password = password
            localStorage.setItem('spielstand', spielstand);
            localStorage.setItem('password', password);
            this.$store.dispatch("isSetGame");
            this.$store.dispatch("setAllRessources");
            this.$store.dispatch("setBasicRessources");
            this.$store.dispatch("setAllNodes");
            this.$store.dispatch("setBasicNodes");
            this.$store.dispatch("setAllTraffic");
            this.$store.dispatch("setAllTimetable");
            this.$store.dispatch("setAllRessources");
            this.$store.dispatch("setAllFactory");
          } else {
            localStorage.setItem('spielstand', '');
            localStorage.setItem('password', '');
            this.failPW = true;
          }
        }
      })
    },
    getLocalSavegame() {
      this.gameAssigned = false;
      this.failPW = false;
      let spielstand = localStorage.getItem('spielstand');
      let password = localStorage.getItem('password');
      this.allGames.forEach(game => {
        if (spielstand === game.name) {
          if (password === game.password) {
            this.$store.dispatch("isSetGame");
            this.$store.dispatch("setAllRessources");
            this.$store.dispatch("setBasicRessources");
            this.$store.dispatch("setAllNodes");
            this.$store.dispatch("setBasicNodes");
            this.$store.dispatch("setAllTraffic");
            this.$store.dispatch("setAllTimetable");
            this.$store.dispatch("setAllRessources");
            this.$store.dispatch("setAllFactory");
          }
        }
      })
    },
    setSpielstand() {
      this.gameAssigned = false;
      this.failPW = false;
      this.allGames.forEach(game => {
        if (game.name === this.newSpielstand.toLowerCase()) {
          localStorage.setItem('spielstand', '');
          localStorage.setItem('password', '');
          this.gameAssigned = true;
        } else {
          if (this.newSpielstand !== '' && this.newSpielstand !== ' ') {
            localStorage.setItem('spielstand', this.newSpielstand.toLowerCase());
            localStorage.setItem('password', this.newPassword);
            db.collection('login').doc(this.newSpielstand.toLowerCase()).set({password:this.newPassword, name:this.newSpielstand.toLowerCase()}).then(()=>{
              this.$store.dispatch("isSetGame");
              this.$store.dispatch("setAllRessources");
              this.$store.dispatch("setBasicRessources");
              this.$store.dispatch("setAllNodes");
              this.$store.dispatch("setBasicNodes");
              this.$store.dispatch("setAllTraffic");
              this.$store.dispatch("setAllTimetable");
              this.$store.dispatch("setAllRessources");
              this.$store.dispatch("setAllFactory");
              this.newSpielstand = '';
              this.newPassword = '';
              location.reload()
            })
          }
        }
      })
    }
  },
  created() {
    this.checkAdmin();
  },
  mounted() {
    this.$store.dispatch("setAllGames");
    this.getLocalSavegame();
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
a {
  text-decoration: none !important;
}
#nav a.router-link-exact-active {
  color: #F2C800;
}
.v-select {
  display: grid;
}
.errorMsg {
  color: #a90000;
  font-weight: bold;
}
</style>
