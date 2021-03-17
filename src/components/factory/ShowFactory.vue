<template>
  <div>
    <div v-for="factory in allFactory" :key="factory.name" id="wrapper" class="my-8">
      <factory-comp :factory="factory"></factory-comp>
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
p {
  white-space: pre-line;
}
</style>