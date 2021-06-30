<template>
  <div id="wrapper">
    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header class="background-black">
              <p class="fontLight">Fabik hinzufügen</p>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="background-black">
              <add-factory-view></add-factory-view>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="background-black">
              <p class="fontLight">Fabik entfernen</p>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="background-black">
              <delete-factory-view></delete-factory-view>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <show-factory-view></show-factory-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddFactoryView from "@/components/factory/AddFactory";
import DeleteFactoryView from "@/components/factory/DeleteFactory";
import ShowFactoryView from "@/components/factory/ShowFactory";

export default {
  name: "FactoryView",
  components: {
    AddFactoryView,
    DeleteFactoryView,
    ShowFactoryView
  },
};
</script>

<style scoped>
</style>