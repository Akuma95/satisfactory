<template>
  <div id="wrapper">
    <h2>Verbrauch</h2>
    <p class="ma-0">Die Werte sind pro Minute.</p>
    <v-card color="transparent" flat>
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Suche"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="storage"
          :search="search"
          :items-per-page="5"
          class="elevation-1"
          style="background-color: transparent"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import {getPrepared} from "@/store/function";

export default {
  name: "ShowNodesView",
  data() {
    return {
      search: '',
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
      values: [],
      storage: [],
    };
  },
  watch: {
    allRessources() {
      this.setTable();
    },
  },
  computed: {
    allRessources() {
      return this.$store.state.res.basicRessources;
    }
  },
  mounted() {
    //this.setTable();
  },
  methods: {
    async getNeeded(name) {
      let prepared = getPrepared();
      let needed = 0;
      await prepared.collection('ressources').doc(name).collection('need').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          needed+=parseInt(f.amount)
        })
      })
      return needed;
    },
    async getProduce(name) {
      let prepared = getPrepared();
      let produce = 0;
      await prepared.collection('ressources').doc(name).collection('produce').get().then(querySnapshot => {
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

<style lang="scss" scoped>
@import "src/assets/style/variables.scss";

#wrapper {
  background-color: $background-box;
  border-radius: 20px;
  width: 90%;
  margin: auto;
  padding: 10px 20px;
}

.warning {
  color: red;
}
</style>