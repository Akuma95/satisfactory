<template>
  <div id="wrapper">
    <h1>Bahnhof o. LKW-Station ergänzen</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-combobox
            :items="stationKind"
            v-model="traffic.stationKind"
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
        <v-text-field
            v-model="traffic.stationName"
            :label="traffic.stationKind.value === 'train' ? 'Name des Bahnhofs*' : 'Name der LKW-Station*'"
            :menu-props="{
              bottom: true,
              offsetY: true,
              offsetOverflow: true,
              rounded: true,
            }"
        ></v-text-field>
        <p class="satis-error" v-if="errorSave">Der Name ist leer oder bereits vergeben.</p>
      </v-col>
      <v-col cols="12" md="4">
        <template>
          <v-row>
            <v-col cols="5" class="mt-4">Anzahl der Plattform</v-col>
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
            <v-col cols="2" class="mt-4">{{ traffic.stationValue }}</v-col>
            <v-col cols="2" class="mt-4">
              <v-btn
                  class="mx-2"
                  icon
                  small
                  color="#333"
                  :disabled="traffic.stationKind.value !== 'train'"
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
        <v-textarea
            v-model="traffic.stationDescription"
            rows="2"
            outlined
            :label="traffic.stationKind.value === 'train' ? 'Kurze Beschreibung zu diesem Bahnhof' : 'Kurze Beschreibung zu dieser LKW-Station'"
            placeholder="Welche Fabrik ist hier integriert? Wo steht die Bahnstation?"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <v-row v-for="items in traffic.stationValue" :key="items" class="ma-3">
      <v-col cols="12">
        <h2>Frachtstation Nr. {{items}}</h2>
        <v-row>
          <v-col cols="12" md="4">
            <v-combobox
                :items="ressourceItems"
                v-model="traffic.stationFreight[items-1].freight"
                label="Ressource"
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
                :items="unFillItems"
                v-model="traffic.stationFreight[items-1].class"
                :disabled="traffic.stationFreight[items-1].freight.value === 'Platzhalter'"
                label="Be- / Entladen"
                :menu-props="{
                  bottom: true,
                  offsetY: true,
                  offsetOverflow: true,
                  rounded: true,
                }"
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="4">
            <v-checkbox
                v-model="traffic.stationFreight[items-1].isFluid"
                :disabled="traffic.stationFreight[items-1].freight.value === 'Platzhalter'"
                label="Flüssigkeit"
                color="#ad9210"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="traffic.stationFreight[items-1].amount.available"
                :disabled="traffic.stationFreight[items-1].freight.value === 'Platzhalter'"
                label="Wie viel ist an der Station verfügbar (Pro Min)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="traffic.stationFreight[items-1].amount.transport"
                :disabled="traffic.stationFreight[items-1].freight.value === 'Platzhalter'"
                label="Wie viel wird transportiert (Pro Min)"
            ></v-text-field>
          </v-col>
        </v-row>
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
import {getPrepared} from "@/store/function";

export default {
  name: "AddStationView",
  watch: {
    allRessources() {
      this.setCombobox(this.allRessources, this.ressourceItems);
    },
    allTraffic() {
      this.setCombobox(this.allTraffic(), this.trafficItems);
    },
  },
  data() {
    return {
      errorSave: false,
      showBtn: false,
      unFillItems: [
        {
          text: 'beladen',
          value: 'freightIn'
        },
        {
          text: 'entladen',
          value: 'freightOut'
        },
      ],
      ressourceItems: [],
      trafficItems: [],
      value: '1',
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
      traffic: {
        stationName: '',
        stationValue: 1,
        stationDescription: '',
        stationKind: {
          text: 'Zug',
          value: 'train'
        },
        stationFreight: [{
            isFluid: false,
            class: '',
            freight: '',
            amount: {
              transport: '',
              available: '',
            },
          }],
      },
    };
  },
  computed: {
    allRessources() {
      return this.$store.state.res.basicRessources;
    },
    allTraffic() {
      return this.$store.state.traffic.allTraffic;
    }
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
      let station = {
        name: this.traffic.stationName,
        value: this.traffic.stationValue,
        description: this.traffic.stationDescription,
        kind: this.traffic.stationKind.value,
      };
      //Den Pfad erstellen zur DB.
      let prepared = getPrepared()
      let pathBasic = prepared.collection('traffic').doc(station.name)

      //Das erstellte Objekt abspeichern und und die Werte des Formulars reseten.
      pathBasic.set(station).then(() => {
        let i = 1
        this.traffic.stationFreight.forEach(e => {
          let freight = {
            name: e.freight.value,
            class: e.freight.value !== 'Platzhalter' ? e.class.value : '',
            isFluid: e.freight.value !== 'Platzhalter' ? e.isFluid : '',
            amount: e.freight.value !== 'Platzhalter' ? e.amount : {transport: '', available: '',}
          };
          if(e.freight.value !== undefined && e.freight.value !== '') {
            prepared.collection('traffic').doc(station.name).collection("stations").doc(i + e.freight.value).set(freight)
            i++;
          }
        })
      });
      //in DB schreiben - ende
    },
    save() {
      let stationName = this.traffic.stationName
      stationName === '' ? this.errorSave = true : this.writeDB()
    },
    resetTraffic() {
      this.traffic.stationValue = 1
      this.traffic.stationFreight = [{
        isFluid: false,
        class: '',
        freight: '',
        amount: {
          transport: '',
          available: '',
        },
      }]
    },
    addFrieght () {
      this.traffic.stationValue++;
      this.traffic.stationFreight.push({
        isFluid: false,
        class: '',
        freight: '',
        amount: {
          transport: '',
          available: '',
        },
      });
    },
    removeFrieght () {
      if (this.traffic.stationValue>1) {
        this.traffic.stationValue--;
        this.traffic.stationFreight.pop();
      }
    },
    setCombobox(src, target) {
      src.forEach(obj => {
        let input = {
          text: obj.name,
          value: obj.name,
        };
        target.push(input);
      });
      target.push({
        text: 'Platzhalter',
        value: 'Platzhalter',
      });
    },
  },
  mounted() {
    this.setCombobox(this.allRessources, this.ressourceItems);
    this.setCombobox(this.allTraffic, this.trafficItems);
  }
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