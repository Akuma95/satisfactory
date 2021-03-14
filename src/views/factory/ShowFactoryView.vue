<template>
  <div id="wrapper" class="pa-0 mt-4">
    <span v-for="factory in allFactory" :key="factory.name" class="wrapper">
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="2">
          <v-btn color="#ad1010" style="color: #ddd;" @click="sheet = !sheet">Löschen</v-btn>
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
          <v-row v-for="node in factory.node">
            <v-col cols="3"></v-col>
            <v-col cols="12" md="4">{{node.name.value}} ({{node.purity.value}})</v-col>
            <v-col cols="12" md="2">{{node.countNodes}}</v-col>
            <v-col cols="3"></v-col>
            <v-col cols="12">{{node.station}}</v-col><br>
            <v-col cols="12"><v-divider style="background-color: #F2C800"></v-divider></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <h2>Input</h2>
          <v-row v-for="input in factory.input">
            <v-col cols="3"></v-col>
            <v-col cols="12" md="4">{{input.resource.value}}</v-col>
            <v-col cols="12" md="2">{{input.countRessource}}</v-col>
            <v-col cols="3"></v-col>
            <v-col cols="12">{{input.station}}</v-col>
            <v-col cols="12"><v-divider style="background-color: #FA0E49"></v-divider></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <h2>Output</h2>
          <v-row v-for="output in factory.outout">
            <v-col cols="3"></v-col>
            <v-col cols="12" md="4">{{output.resource.value}}</v-col>
            <v-col cols="12" md="2">{{output.countRessource}}</v-col>
            <v-col cols="3"></v-col>
            <v-col cols="12">{{output.station}}</v-col>
            <v-col cols="12"><v-divider style="background-color: #62c600"></v-divider></v-col>
          </v-row>
        </v-col>
      </v-row>
    </span>
  </div>
</template>

<script>
import fillDuration from '@/saveFile/fillDurationPlatform.js';
import {db} from "@/firebase";

export default {
  name: "TrafficView",

  computed: {
    allFactory() {
      return this.$store.getters.getAllFactory;
    },
  },
  data() {
    return {
      sheet: false,
    };
  },
  methods: {
    deleteFactory(name) {
      this.allRessources.forEach(e => {
        db.collection('ressources').doc(e.id).collection('need').doc(name).delete();
        db.collection('ressources').doc(e.id).collection('produce').doc(name).delete();
      })
      this.allNodes.forEach(e => {
        db.collection('nodes').doc(e.name).collection('block').doc(name).delete();
      })
      db.collection('factory').doc(this.selctedFactory.value).delete();
      this.$store.dispatch("setAllRessources");
      this.$store.dispatch("setAllNodes");
      this.$store.dispatch("setAllFactory").then(()=>{
        location.reload()
      });
    },
  }
};
</script>

<style scoped>

#wrapper {
  border-radius: 20px;
  background-color: #dddddd;
  width: 92%;
  margin: auto;
  padding: 10px 20px;
}
p {
  white-space: pre-line;
}
</style>