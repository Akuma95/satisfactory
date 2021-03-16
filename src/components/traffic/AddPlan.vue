<template>
  <div id="wrapper">
    <h1>Einen Fahrzeuge ergänzen</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-combobox
            :items="stationKind"
            v-model="timetable.kind"
            label="Beförderungsart"
            @change="resetTraffic"
            :menu-props="{
              bottom: true,
              offsetY: true,
              offsetOverflow: true,
              rounded: true,
            }"
        ></v-combobox>
      </v-col>
      <v-col cols="12" md="4">
        <v-combobox
            :items="timetableItems"
            v-model="timetable.name"
            label="Name des Zuges*"
            :menu-props="{
              bottom: true,
              offsetY: true,
              offsetOverflow: true,
              rounded: true,
            }"
        ></v-combobox>
        {{timetable.name}}
        <p class="satis-error" v-if="errorSave">Der Name ist leer oder bereits vergeben.</p>
      </v-col>
      <v-col cols="12" md="4">
        <template>
          <v-row>
            <v-col cols="5" class="mt-4">Anzahl der <span v-if="timetable.kind.value === 'train'">Bahnhöfe</span><span v-else>LKW-Stationen</span></v-col>
            <v-col cols="2" class="mt-4">
              <v-btn
                  class="mx-2"
                  icon
                  small
                  color="#333"
                  @click="removeFrieght"
              >
                <v-icon dark>
                  mdi-minus
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="2" class="mt-4">{{ timetable.value }}</v-col>
            <v-col cols="2" class="mt-4">
              <v-btn
                  class="mx-2"
                  icon
                  small
                  color="#333"
                  @click="addFrieght"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="timetable.duration"
            label="Dauer für eine Runde"
        ></v-text-field>
        <p class="satis-error" v-if="errorSave">Der Name ist leer oder bereits vergeben.</p>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <v-row class="ma-3">
      <v-col cols="12" md="3" v-for="items in timetable.value" :key="items" >
        <h2><span v-if="timetable.kind.value === 'train'">Bahnhof</span><span v-else>LKW-Station</span> Nr. {{items}}</h2>
        <v-select
            :items="trafficItems"
            v-model="timetable.station[items-1]"
            :label="timetable.kind.value === 'train' ? 'Bahnhof' : 'LKW-Station'"
            :menu-props="{
              bottom: true,
              offsetY: true,
              offsetOverflow: true,
              rounded: true,
            }"
        ></v-select>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-btn
        @click="save"
        color="#F2C800"
        v-if="showBtn"
    >Speichern</v-btn>

  </div>
</template>

<script>
import {db} from "@/firebase/firebase";

export default {
  name: "AddPlanView",
  watch: {
    allTraffic() {
      this.setCombobox(this.allTraffic, this.trafficItems);
    },
    allTimetable() {
      this.setCombobox(this.allTimetable, this.timetableItems);
    },
  },
  data() {
    return {
      errorSave: false,
      trafficItems: [],
      timetableItems: [],
      showBtn: false,
      value: '1',
      timetable: {
        kind: {
          text: 'Zug',
          value: 'train'
        },
        name: '',
        duration: '',
        value: 1,
        station: ['']
      },
      stationKind: [
        {
          text: 'Zug',
          value: 'train'
        },
        {
          text: 'LWK',
          value: 'truck'
        },
        {
          text: 'Schlepper',
          value: 'tractor'
        },
        {
          text: 'Drohne',
          value: 'drone'
        }
      ],
    };
  },
  computed: {
    allTraffic() {
      return this.$store.getters.getAllTraffic;
    },
    allTimetable() {
      return this.$store.getters.getAllTimetable;
    },
  },
  mounted() {
    this.setCombobox(this.allTimetable, this.timetableItems);
    this.setCombobox(this.allTraffic, this.trafficItems);
    this.showBtnM();
  },
  methods: {
    showBtnM() {
      if (localStorage.getItem('spielstand')!==''||localStorage.getItem('spielstand')!==undefined) {
        this.showBtn = true
      }
      this.showBtn = false
    },
    async writeDB() {
      //Ein Station Objekt für Firestore erstellen
      let timetable = {
        name: this.timetable.name,
        duration: this.timetable.duration,
        value: this.timetable.value,
        kind: this.timetable.kind.value,
        station: this.timetable.station,
      };
      //Den Pfad erstellen zur DB.
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }
      let pathBasic = prepared.collection('timetable').doc(timetable.name)

      //Das erstellte Objekt abspeichern und und die Werte des Formulars reseten.
      pathBasic.set(timetable).then(() => {
        this.timetable.name = '';
        this.timetable.duration = '';
        this.timetable.value = 1;
        this.timetable.kind = {
          text: 'Zug',
          value: 'train'
        };
        this.timetable.station = [''];
      });
      //in DB schreiben - ende
    },
    save() {
      if (this.timetable.name === '') {
        this.errorSave = true;
      } else {
        if (this.timetableItems.length > 0) {
        this.timetableItems.forEach(e => {
          if (e.value === this.timetable.name) {
            this.errorSave = true;
          } else {
            this.writeDB().then(()=>{location.reload()});
            return false;
          }
        })
        } else {
          this.writeDB().then(()=>{location.reload()});
        }
      }
    },

    resetTraffic() {
      this.timetable.value = 1
      this.timetable.station = ['']
    },
    addFrieght () {
      this.timetable.value++;
      this.timetable.station.push('');
    },
    removeFrieght () {
      if (this.timetable.value>1) {
        this.timetable.value--;
        this.timetable.station.pop();
      }
    },
    setCombobox(res, tar) {
      res.forEach(obj => {
        let input = {
          text: obj.name,
          value: obj.name,
        };
        tar.push(input);
      });
    },
  },
};
</script>

<style scoped>
#wrapper {
  background-color: #dddddd;
  border-radius: 20px;
  width: 90%;
  margin: auto;
  padding: 10px 20px;
}

.satis-error {
  color: #c60000;
  font-weight: bold;
}

hr {
  background-color: #F2C800;
  border-width: thin;
}
</style>