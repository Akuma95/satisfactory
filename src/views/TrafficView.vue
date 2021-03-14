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
              <add-route-view></add-route-view>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header color="#111416">
              <h3 style="color: #dddddd">Ein Fahrzeug ergänzen</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="#111416">
              <add-plan-view></add-plan-view>
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
        <train-view></train-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TrainView from "@/views/traffic/TrainView";
import AddRouteView from "@/views/traffic/AddRouteView.vue";
import ShowFillDurationView from "@/views/traffic/ShowFillDurationView";
import AddPlanView from "@/views/traffic/AddPlanView";


export default {
  name: "TrafficView",
  components: {
    TrainView,
    AddRouteView,
    ShowFillDurationView,
    AddPlanView
  },
};
</script>

<style scoped>
</style>