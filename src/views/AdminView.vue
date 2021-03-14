<template>
  <div id="wrapper">
    <v-row>
      <v-col cols="6">
        <nodes-view
            :local-all-nodes="allNodes"
        ></nodes-view>
      </v-col>
      <v-col cols="6">
        <show-nodes-view
            :local-all-nodes="allNodes"
        ></show-nodes-view>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <add-ressource-view
            :local-all-ressources="allRessources"
            @emitRessource="reloade($event)"
        ></add-ressource-view>
      </v-col>
      <v-col cols="6">
        <delete-ressource-view
            :local-all-ressources="allRessources"
        ></delete-ressource-view>
      </v-col>
      <v-col cols="12">
        <show-ressource-view
            :local-all-ressources="allRessources"
        ></show-ressource-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NodesView from "@/views/admin/AddNodesView";
import ShowNodesView from "@/views/admin/ShowNodesView";
import AddRessourceView from "@/views/admin/AddRessourceView";
import ShowRessourceView from "@/views/admin/ShowRessourceView";
import DeleteRessourceView from "@/views/admin/DeleteRessourceView";

import {db} from '@/firebase'

export default {
  name: "AdminView",
  components: {
    NodesView,
    ShowNodesView,
    AddRessourceView,
    ShowRessourceView,
    DeleteRessourceView,
  },
  data() {
    return {
      allNodes: [],
      allRessources: [],
      storage: [],
    };
  },
  firestore: {
    allNodes: db.collection('nodes'),
    allRessources: db.collection('ressources')
  },
  watch: {
    allRessources() {
      this.getDB();
    }
  },
  computed: {
  },
  methods: {
    reloade(newRessource) {
      this.allRessources = newRessource;
    },
    async getNeeded(name) {
      let needed = 0;
      await db.collection('ressources').doc(name).collection('need').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          needed+=parseInt(f.amount)
        })
      })
      return needed;
    },
    async getProduce(name) {
      let produce = 0;
      await db.collection('ressources').doc(name).collection('produce').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          produce+=parseInt(f.amount)
        })
      })
      return produce;
    },
    async getDB() {
      this.allRessources.forEach(e => {
        let storage = {
          ressource: '',
          usage: 0,
          produce: 0,
          balance: 0,
        };
        storage.ressource = e.name;
        this.getNeeded(e.name).then(e => storage.usage = e)
        this.getProduce(e.name).then(e => storage.produce = e).then(() => {
          storage.balance = storage.produce - storage.usage;
        })
        this.storage.push(storage);
      });
    }
  },
};
</script>

<style scoped>
.row {
  width: 95%;
  margin: auto;
}
</style>