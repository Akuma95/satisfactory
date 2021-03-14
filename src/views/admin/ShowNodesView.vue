<template>
  <div id="wrapper">
    <h2>Knoten Anzeigen</h2>

    <v-data-table
        :headers="headers"
        :items="allNodes"
        :items-per-page="5"
        class="elevation-1"
        style="background-color: transparent"
    ></v-data-table>
  </div>
</template>

<script>
import {db} from '@/firebase'

export default {
  name: "ShowNodesView",
  watch: {
    localAllNodes() {
      this.setCombobox()
    }
  },
  data() {
    return {
      nodes: [],
      node: {
        name: '',
        pure: '',
        normal: '',
        impure: '',
      },
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Rein', value: 'pure' },
        { text: 'Normal', value: 'normal' },
        { text: 'Unrein', value: 'impure' },
      ],
    };
  },
  computed: {
    allNodes() {
      return this.$store.getters.getAllNodes;
    }
  },
  mounted() {
    this.setCombobox()
  },
  methods: {
    save() {
      let node = {
        name: this.node.name,
        pure: this.node.pure,
        normal: this.node.normal,
        impure: this.node.impure,
      };
      db.collection('nodes').doc(this.node.name).set(node).then(() => {
        this.node.name = null;
        this.node.pure = null;
        this.node.normal = null;
        this.node.impure = null;
      })
    },
    setCombobox() {
      this.allNodes.forEach(obj => {
        let input = {
          text: obj.name,
          value: obj.name,
        };
        this.nodes.push(input);
      });
    }
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