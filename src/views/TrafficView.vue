<template>
  <div id="wrapper">
    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header class="background-black">
              <h3 class="fontLight">Einen Bahnhof o. LKW-Station ergänzen</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="background-black">
              <add-route-view></add-route-view>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="background-black">
              <h3 class="fontLight">Ein Fahrzeug ergänzen</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="background-black">
              <add-plan-view></add-plan-view>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="background-black">
              <h3 class="fontLight">Füllraten</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="background-black">
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
import TrainView from "@/components/traffic/ShowTrainStation";
import AddRouteView from "@/components/traffic/AddStation.vue";
import ShowFillDurationView from "@/components/traffic/ShowFillDuration";
import AddPlanView from "@/components/traffic/AddPlan";


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