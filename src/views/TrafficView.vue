<template>
  <div id="wrapper">
    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header color="#111416">
              <h3 style="color: #dddddd">Einen Bahnhof o. LKW-Station ergänzen</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="#111416">
              <add-route-view :local-all-ressources="allRessources" :local-all-traffic="allTraffic"></add-route-view>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header color="#111416">
              <h3 style="color: #dddddd">Ein Fahrzeug ergänzen</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="#111416">
              <add-plan-view :local-all-traffic="allTraffic" :loacl-all-timetable="allTimetable"></add-plan-view>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header color="#111416">
              <h3 style="color: #dddddd">Füllraten</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="#111416">
              <show-fill-duration-view></show-fill-duration-view>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <train-view :local-all-traffic="allTraffic" :local-all-stations="allStations" :local-all-timetable="allTimetable"></train-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TrainView from "@/views/traffic/TrainView";
import AddRouteView from "@/views/traffic/AddRouteView.vue";
import ShowFillDurationView from "@/views/traffic/ShowFillDurationView";
import AddPlanView from "@/views/traffic/AddPlanView";

import {db} from "@/firebase";

export default {
  name: "TrafficView",
  components: {
    TrainView,
    AddRouteView,
    ShowFillDurationView,
    AddPlanView
  },
  watch: {
    allTraffic() {
      this.getAllStations();
    },
  },
  data() {
    return {
      allRessources: [],
      allTraffic: [],
      allTimetable: [],
      allStations: [],
    };
  },
  firestore: {
    allRessources: db.collection('ressources'),
    allTraffic: db.collection('traffic'),
    allTimetable: db.collection('timetable'),
  },
  computed: {
  },
  methods: {
    getAllStations() {
      this.allTraffic.forEach(e => {
        let main = {
          kind: e.kind,
          name: e.name,
          value: e.value,
          stations: [],
        }
        db.collection('traffic').doc(e.name).collection('stations').get().then(querySnapshot => {
          let getData = querySnapshot.docs.map(doc => doc.data());
          getData.forEach(f => {
            main.stations.push({
              name: f.name,
              class: f.class,
              transport: f.amount.transport,
              available: f.amount.available,
              amountMax: f.amount.transport === f.amount.available
            })
          })
        });
        this.allStations.push(main);
      });
    }
  },
};
</script>

<style scoped>
</style>