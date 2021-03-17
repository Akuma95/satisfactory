<template>
  <div>
    <v-row class="rowSearch">
      <v-col cols="12">
        <h3>Suche nach einer Fabrik</h3>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="searchFactory"
            append-icon="mdi-magnify"
            label="Suche nach dem Namen"
            filled
            outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <div v-for="factory in allFactory" :key="factory.name" class="my-8">
      <factory-comp :factory="factory" :search-factory="searchFactory"></factory-comp>
    </div>
  </div>
</template>

<script>
import FactoryComp from "@/components/factory/FactoryComp";

export default {
  name: "TrafficView",
  components: {
    FactoryComp,
  },
  computed: {
    allFactory() {
      return this.$store.getters.getAllFactory;
    },
  },
  data() {
    return {
      searchFactory: '',
      sheet: false,
    };
  },
};
</script>

<style scoped>
#wrapper {
  border-radius: 20px;
  background-color: #dddddd;
  width: 92%;
  margin: auto;
  padding: 10px 20px;
}
.rowSearch {
  background-color: #dddddd;
  width: 92%;
  margin: auto;
  border-radius: 5px;

}
p {
  white-space: pre-line;
}
</style>