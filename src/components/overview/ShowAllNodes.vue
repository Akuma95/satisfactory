<template>
  <div id="wrapper">
    <h2>Resourcenknoten</h2>
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
          :items="items"
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
          text: 'Knoten',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Rein', value: 'pure' },
        { text: 'Rein Besetzt', value: 'pureBlock' },
        { text: 'Normal', value: 'normal' },
        { text: 'Normal Besetzt', value: 'normalBlock' },
        { text: 'Unrein', value: 'impure' },
        { text: 'Unrein Besetzt', value: 'impureBlock' },
      ],
      items: [],
    };
  },
  watch: {
    basicNodes() {
      this.setNodeTable();
    },
    allNodes() {
      this.setNodeTable();
    },
  },
  computed: {
    allNodes() {
      return this.$store.state.node.allNodes;
    },
    basicNodes() {
      return this.$store.state.node.basicNodes;
    },
  },
  methods: {
    setNodeTable() {
      let prepared = getPrepared();

      this.basicNodes.forEach(e => {
        let node = {
          name: e.name,
          pure: e.pure,
          pureBlock: 0,
          normal: e.normal,
          normalBlock: 0,
          impure: e.impure,
          impureBlock: 0
        }
        this.allNodes.forEach(user => {
          if (e.name === user.name) {
            prepared.collection('nodes').doc(e.name).collection('blocked').get().then(querySnapshot => {
              let data = querySnapshot.docs.map(doc => doc.data());
              data.forEach(dataEle => {
                  node.pureBlock += parseInt(dataEle.pure);
                  node.normalBlock += parseInt(dataEle.normal);
                  node.impureBlock += parseInt(dataEle.impure);
              })
            })
          }
        })
        this.items.push(node);
      })
    }
  }
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