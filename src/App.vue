<template>
  <div id="app">

    <v-app style="background-color: transparent">
      <v-app-bar app flat height="85px">
        <!-- -->
    <v-row>
      <v-col cols="3" md="3">
        <p v-if="spielstand!=''" class="gametitle"><b><u>Spielstand:</u></b> {{ spielstand }}</p>
      </v-col>
      <v-col cols="6" md="6" id="nav">
        <span v-if="setGame" class="mt-2 routerLink">
          <router-link to="/">Home</router-link> |
          <router-link to="/traffic">Verkehr</router-link> |
          <router-link to="/factory">Fabrik</router-link><span v-if="adminShow"> |
          <router-link to="/admin">Admin</router-link></span>
        </span>
      </v-col>
      <v-col cols="3" md="3">

        <v-dialog
            transition="dialog-top-transition"
            max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="btn-brand ma-t-10"
                v-bind="attrs"
                v-on="on"
            >Savegame</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                  dark
                  class="toolbarPopUp"
              >Du kannst einer Datenbank joinen oder eine neue erstellen.</v-toolbar>
              <v-card-text>
                <br>
                <v-row>
                  <v-col cols="12"><p>Der aktuelle Name unter dem alles gespeichert wird: <b>{{spielstand?spielstand:'Kein Spielstand vorhanden'}}</b></p></v-col>
                </v-row>
                <hr>
                <br>
                <v-row>
                  <v-col cols="12">
                    <p>
                      Bitte gib einen Namen für den Spielstand und ein Passwort an, unter dem die <br>
                      Datenbank laufen soll. Bachte dabei, dass Name und Passwort im <b>Klartext</b> <br>
                      gespeichert werden, da <b>keine persönlichen Daten</b> von dir gespeichert werden.<br>
                      Das Passwort hat lediglich dem Zweck, das niemand Fremdes sich ausversehen auf deine Datenbank zuschalten kann.
                    </p>
                  </v-col>
                </v-row>
                <hr>
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
                    class="btn-new"
                    @click="setSpielstand"
                >Neue Datenbank</v-btn>
                <v-btn
                    outlined
                    class="btn-join"
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

      <v-footer class="py-3 footer-box">
        <v-row>
          <v-col
              class="text-center"
              cols="12"
          >
            <router-link to="/"><v-btn class="mx-5 my-3" text rounded>Home</v-btn></router-link>
            <router-link to="/services"><v-btn class="mx-5 my-3" text rounded>Services</v-btn></router-link>
            <router-link to="/feedback"><v-btn class="mx-5 my-3" text rounded>Feedback</v-btn></router-link>
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
    setGame() {
      return this.$store.getters.getIsSetGame;
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
            this.spielstand = spielstand;
            this.$store.dispatch("isSetGame");
            this.$store.dispatch("setAllRessources");
            this.$store.dispatch("setBasicRessources");
            this.$store.dispatch("setAllNodes");
            this.$store.dispatch("setBasicNodes");
            this.$store.dispatch("setAllTraffic");
            this.$store.dispatch("setAllTimetable");
            this.$store.dispatch("setAllFactory");
            this.$store.commit("setStorage");
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
              this.$store.dispatch("setAllFactory");
              this.$store.dispatch("setAllRessources");
              this.$store.dispatch("setBasicRessources");
              this.$store.dispatch("setAllNodes");
              this.$store.dispatch("setBasicNodes");
              this.$store.dispatch("setAllTraffic");
              this.$store.dispatch("setAllTimetable");
              this.$store.commit("setStorage");
              this.newSpielstand = '';
              this.newPassword = '';
              this.dialog = !this.dialog;
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

<style lang="scss">
@import "assets/style/variables.scss";

body, html {
  height: 100%;
  background-color: $background-app;
}

h1 {
  font-size: 1.7rem;
}

#app {
  font-family: $global-font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font-color;
  height: 100%;
}

header {
  background-color: $font-color !important;
  border-radius: 0 0 30px 30px !important;
}

.ma-t-10 {
  margin: 12px;
}

#nav {
  padding: 30px;
  background-color: $accent;
  width: 40%;
  margin: 0 auto 20px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;

  @media (max-width: 600px) {
      width: 70%;
  }

  a {
    font-weight: bold;
    color: $link-color;
    text-decoration: none;
    margin: 0 5%;

    &.router-link-exact-active {
      color: $brand;
    }
  }
}

.footer-box {
  background-color: $background-box !important;

  a {
    text-decoration: none;

    .v-btn {
      font-weight: bold !important;
      color: $btn-new ;
    }
  }
}

.fontLight {
  color: $font-color-light;
}

.btn {
  &-delete {
    background-color: $warn !important;
    color: $background-box !important;
    height: 46px !important;
    width: 100%;
  }

  &-brand {
    background-color: $brand !important;
  }

  &-tracker {
    color: $accent !important;
  }

  &-new {
    color: $btn-new !important;
  }

  &-join {
    color: $btn-join !important;
  }

  &-discord {
    background-color: $discord !important;
  }

  &-telegram {
    background-color: $telegram !important;
  }
}

.divider {
  &-brand {
    background-color: $brand;
  }

  &-one {
    background-color: $border1;
  }

  &-two {
    background-color: $border2;
  }

  &-three {
    background-color: $border3;
  }
}

.background-black {
  background-color: $accent;
}

.toolbarPopUp {
  color: $accent !important;
  background-color: $brand !important;
  font-weight: bold;
}

.gametitle {
  margin-top: 18px;
  color: $brand;
}

.routerLink {
  color: $brand;
}

.v-select {
  display: grid;
}
.errorMsg {
  color: $warn;
  font-weight: bold;
}
</style>
