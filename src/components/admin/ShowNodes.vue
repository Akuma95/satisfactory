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
export default {
  name: "ShowNodesView",
  data() {
    return {
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
      return this.$store.state.node.basicNodes;
    }
  },
  methods: {
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