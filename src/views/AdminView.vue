<template>
  <div id="wrapper">
    <v-row>
      <v-col cols="6">
        <nodes-view></nodes-view>
      </v-col>
      <v-col cols="6">
        <show-nodes-view></show-nodes-view>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <add-ressource-view></add-ressource-view>
      </v-col>
      <v-col cols="6">
        <delete-ressource-view></delete-ressource-view>
      </v-col>
      <v-col cols="12">
        <show-ressource-view></show-ressource-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NodesView from "@/components/admin/AddNodes";
import ShowNodesView from "@/components/admin/ShowNodes";
import AddRessourceView from "@/components/admin/AddRessource";
import ShowRessourceView from "@/components/admin/ShowRessource";
import DeleteRessourceView from "@/components/admin/DeleteRessource";

export default {
  name: "AdminView",
  components: {
    NodesView,
    ShowNodesView,
    AddRessourceView,
    ShowRessourceView,
    DeleteRessourceView,
  },
};
</script>

<style scoped>
.row {
  width: 95%;
  margin: auto;
}
</style>