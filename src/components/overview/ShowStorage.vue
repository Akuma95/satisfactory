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
    <ul>
      <li v-for="value in values" :key="value.name">
        <span :class="{ 'warning' : value.liquid }">{{ value.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {db} from "@/firebase/firebase";

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

    values: function(newVal, oldVal) {
      console.log('executed', newVal, oldVal);
    }
  },
  computed: {
    allRessources() {
      return this.$store.getters.getBasicRessources;
    }
  },
  mounted() {
    //this.setTable();
    db.collection('ressources').onSnapshot({
      next: (d) => this.values = d.docs.map(value => value.data())
    });
  },
  methods: {
    async getNeeded(name) {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }
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
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }
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

<style scoped>
#wrapper {
  background-color: #dddddd;
  border-radius: 20px;
  width: 90%;
  margin: auto;
  padding: 10px 20px;
}

.warning {
  color: red;
}
</style>