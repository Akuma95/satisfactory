<template>
  <div id="wrapper"
       :style="'background-color: '+node.color"
       v-if="node.name.includes(search)">
    <h2>{{node.name}}</h2>
    <v-row>
      <v-col cols="6">
        <p><b>Unrein:</b></p>
        <p>{{node.impureBlock}} / {{node.impure}} belegt</p>
      </v-col>
      <v-col cols="6">
        <p><b>Rein:</b></p>
        <p>{{node.pureBlock}} / {{node.pure}} belegt</p>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <p><b>Normal:</b></p>
        <p>{{node.normalBlock}} / {{node.normal}} belegt</p>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ShowNodesView",
  props: [
    'node',
    'color',
    'search'
  ],
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
#wrapper {
  background-color: #dddddd;
  border-radius: 20px;
  /**border: #111416 1px solid;*/
  max-width: 300px;
  margin: auto;
  padding: 10px 20px;
}
p {
  margin: 0 !important;
}
</style>