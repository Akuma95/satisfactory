<template style="width: 100%">
  <div id="wrapper" style="width: 100%" class="pa-0">
    <v-row style="width: 100%">
      <v-col cols="12" style="width: 100%" class="pa-0 pb-4 pt-4">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <p>Füllrate Förderband</p>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-0">
              <v-data-table
                  :headers="headerBelt"
                  :items="itemsBelt"
                  :items-per-page="5"
                  class="elevation-1"
                  style="background-color: transparent"
              ></v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <p>Füllrate Pipeline</p>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                  :headers="headerPipe"
                  :items="itemsPipe"
                  :items-per-page="5"
                  class="elevation-1"
                  style="background-color: transparent"
              ></v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>


  </div>
</template>

<script>
import fillDuration from '@/saveFile/fillDurationPlatform.js';

export default {
  name: "TrafficView",
  components: {
  },
  data() {
    return {
      headerBelt: fillDuration.fillBeltHeader,
      headerPipe: fillDuration.fillPipeHeader,
      itemsBelt: fillDuration.fillBeltItems,
      itemsPipe: fillDuration.fillPipeItems,
    };
  },
};
</script>

<style scoped>

#wrapper {
  border-radius: 20px;
  width: 92%;
  margin: auto;
  padding: 10px 20px;
}
</style>