<template>
  <div class="pa-6" id="wrapper" v-if="factory.name.includes(searchFactory)">
      <v-row>
        <v-col cols="2">
          <!--<v-btn color="green">Speichern</v-btn>-->
        </v-col>
        <v-col cols="2">
          <v-btn class="btn-delete" @click="sheet = !sheet">Löschen</v-btn>
          <v-bottom-sheet v-model="sheet">
            <v-sheet
                class="text-center"
                height="300px"
            >
              <v-btn
                  class="mt-6"
                  text
                  color="orange"
                  @click="sheet = !sheet"
              >
                Schließen ohne Löschen
              </v-btn>
              <div class="py-3">
                <h1>"{{ factory.name }}" löschen?</h1><br>
                <p>Wenn ich diese Fabrik lösche, werden die Ressourcen und Nodes auch gelöscht.</p>
              </div>
              <v-btn
                  class="mt-6"
                  text
                  color="red"
                  @click="deleteFactory(factory.name)"
              >
                Löschen
              </v-btn>
            </v-sheet>
          </v-bottom-sheet>

        </v-col>
        <v-col cols="12" md="4">
          <h1>{{ factory.name }}</h1>
        </v-col>
        <v-col cols="2">
          <p><b>Stromkosten:</b> {{factory.power.usage - factory.power.production}}</p>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <h2>Kurze Beschreibung zur Fabrik</h2>
          <p>{{factory.description.factory}}</p>
        </v-col>
        <v-col cols="12" md="6">
          <h2>Kurze Beschreibung zur Location</h2>
          <p>{{factory.description.location}}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <h2>Nodes</h2>
          <v-row v-for="node in factory.node" :key="node.name.value+node.purity.value">
            <v-col cols="3"></v-col>
            <v-col cols="12" md="4">{{node.name.value}} ({{node.purity.value}})</v-col>
            <v-col cols="12" md="2">{{node.countNodes}}</v-col>
            <v-col cols="3"></v-col>
            <v-col cols="12">{{node.station}}</v-col><br>
            <v-col cols="12"><v-divider class="divider-one"></v-divider></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <h2>Input</h2>
          <v-row v-for="input in factory.input" :key="input.resource.value">
            <v-col cols="3"></v-col>
            <v-col cols="12" md="4">{{input.resource.value}}</v-col>
            <v-col cols="12" md="2">{{input.countRessource}}</v-col>
            <v-col cols="3"></v-col>
            <v-col cols="12">{{input.station}}</v-col>
            <v-col cols="12"><v-divider class="divider-two"></v-divider></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <h2>Output</h2>
          <v-row v-for="output in factory.output" :key="output.resource.value">
            <v-col cols="3"></v-col>
            <v-col cols="12" md="4">{{output.resource.value}}</v-col>
            <v-col cols="12" md="2">{{output.countRessource}}</v-col>
            <v-col cols="3"></v-col>
            <v-col cols="12">{{output.station}}</v-col>
            <v-col cols="12"><v-divider class="divider-three"></v-divider></v-col>
          </v-row>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import {getPrepared} from "@/store/function";

export default {
  name: "TrafficView",
  props: [
      'factory',
      'searchFactory'
  ],
  data() {
    return {
      sheet: false,
    };
  },
  methods: {
    deleteFactory() {
      //Den Pfad erstellen zur DB.
      let prepared = getPrepared()
      prepared.collection('factory').doc(this.factory.name).delete().then(() => {
        this.$store.dispatch("setAllFactory");
        this.sheet = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/variables.scss";

#wrapper {
  background-color: $background-box;
  border-radius: 20px;
  width: 92%;
  margin: auto;
  padding: 10px 20px;
}
p {
  white-space: pre-line;
}
</style>