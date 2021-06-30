<template>
  <div id="wrapper">

    <h1>Ressourcen Übersicht</h1>
    <v-data-table
        :headers="headers"
        :items="ressourceItems"
        :items-per-page="5"
        show-group-by
        class="elevation-1"
        style="background-color: transparent"
    ></v-data-table>
  </div>
</template>

<script>
import {db} from '@/firebase/firebase'

export default {
  name: "RessourceView",
  components: {},
  watch: {
    allRessources() {
      this.setRessourceTable();
    }
  },
  data() {
    return {
      ressourceItems: [],
      headers: [
        {
          text: 'Einzigartigername',
          align: 'start',
          sortable: true,
          value: 'id',
          groupable: false
        },
        { text: 'Komponente', value: 'name' },
        { text: 'Erz', value: 'ore' },
        { text: 'Alternative', value: 'alternative' },
        { text: 'Flüssigkeit', value: 'liquid' },
      ],
    };
  },
  computed: {
    allRessources() {
      return this.$store.state.res.basicRessources;
    }
  },
  mounted() {
    this.setRessourceTable();
  },
  methods: {
    async getSubCol(name, body) {
      await db.collection('ressources').doc(name).collection('alternative').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          body.id = f.id
          body.alternative = true
          this.ressourceItems.push(body);

        })
      })
    },
    setRessourceTable() {
      this.ressourceItems = []
      this.allRessources.forEach(e => {
        this.ressourceItems.push({
          id: e.id,
          name: e.name,
          ore: e.ore,
          alternative: false,
          liquid: e.liquid
        });
        this.getSubCol(e.name, {
          id: '',
          name: e.name,
          ore: e.ore,
          alternative: false,
          liquid: e.liquid
        });
      });
    }
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
</style>