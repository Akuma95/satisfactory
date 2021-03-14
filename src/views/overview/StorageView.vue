<template>
  <div id="wrapper">
    <h2>Verbrauch Anzeigen</h2>
    <p>Die Werte sind pro Minute.</p>
    <v-data-table
        :headers="headers"
        :items="storage"
        :items-per-page="5"
        class="elevation-1"
        style="background-color: transparent"
    ></v-data-table>
  </div>
</template>

<script>
import {db} from "@/firebase";

export default {
  name: "ShowNodesView",
  props: [
    'localAllRessources',
  ],
  watch: {
    allRessources() {
      this.setTable();
    }
  },
  data() {
    return {
      allRessources: this.localAllRessources,
      headers: [
        {
          text: 'Ressourcen',
          align: 'start',
          sortable: true,
          value: 'ressource',
        },
        { text: 'Verbrauch', value: 'usage' },
        { text: 'Produziert', value: 'produce' },
        { text: 'Bilanzen', value: 'balance' },
      ],
      storage: [],
    };
  },
  methods: {
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
    setTable() {
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
    },
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
</style>