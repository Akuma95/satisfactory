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
        ></v-combobox>
      </v-col>
      <v-col cols="12" md="4">
        <v-combobox
            :items="timetableItems"
            v-model="timetable.name"
            label="Name des Zuges*"
        ></v-combobox>
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
        ></v-select>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-btn
        @click="save"
        color="#F2C800"
    >Speichern</v-btn>

  </div>
</template>

<script>
import {db} from "@/firebase";
import firebase from "firebase";

export default {
  name: "AddPlanView",
  props: [
    'localAllTraffic',
    'loaclAllTimetable'
  ],
  watch: {
    allTraffic() {
      this.setTraffic();
    },
    allTimetable() {
      this.setTimetable();
    },
  },
  firestore: {
    allTraffic: db.collection('traffic'),
    allTimetable: db.collection('timetable'),
  },
  data() {
    return {
      allTraffic: this.localAllTraffic,
      allTimetable: this.loaclAllTimetable,
      errorSave: false,
      trafficItems: [],
      timetableItems: [],
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
        }
      ],
    };
  },
  methods: {
    writeLog(col, doc) {
      let timestamp = Date.now();
      let date = new Date(timestamp);
      let humanDateShort = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();

      let log = {
        who: localStorage.getItem('id') !== '' ? localStorage.getItem('id') : Math.random().toString(36).substr(2, 9),
        date: firebase.firestore.FieldValue.serverTimestamp(),
        kind: 'Add Data',
        collection: col,
        document: doc,
      };
      db.collection('log').doc(humanDateShort+'||'+doc).set(log);
    },
    writeDB() {
      //Ein Station Objekt für Firestore erstellen
      let timetable = {
        name: this.timetable.name,
        duration: this.timetable.duration,
        value: this.timetable.value,
        kind: this.timetable.kind.value,
        station: this.timetable.station,
      };
      //Den Pfad erstellen zur DB.
      let pathBasic = db.collection('timetable').doc(timetable.name)

      //Das erstellte Objekt abspeichern und und die Werte des Formulars reseten.
      pathBasic.set(timetable).then(() => {
        this.writeLog('timetable', timetable.name)
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
        this.timetableItems.forEach(e => {
          if (e.value === this.timetable.name.value) {
            this.errorSave = true;
          } else {
            this.writeDB();
            return false;
          }
        })
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
    setTraffic() {
      this.allTraffic.forEach(obj => {
        let input = {
          text: obj.name,
          value: obj.name,
        };
        this.trafficItems.push(input);
      });
    },
    setTimetable() {
      this.allTimetable.forEach(obj => {
        let input = {
          text: obj.id,
          value: obj.id,
        };
        this.timetableItems.push(input);
      });
    }
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