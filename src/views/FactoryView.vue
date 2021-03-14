<template>
  <div id="wrapper">
    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header color="#111416">
              <p style="color: #dddddd">Fabik hinzufügen</p>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="#111416">
              <add-factory-view></add-factory-view>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddFactoryView from "@/views/factory/AddFactoryView";
import {db} from "@/firebase";

export default {
  name: "FactoryView",
  components: {
    AddFactoryView,
  },
  data() {
    return {
      allNodes: [],
      allRessources: [],
    };
  },
  firestore: {
    allNodes: db.collection('nodes'),
    allRessources: db.collection('ressources')
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style scoped>
</style>