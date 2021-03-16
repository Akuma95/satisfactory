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
      return this.$store.getters.getBasicNodes;
    }
  },
  methods: {
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