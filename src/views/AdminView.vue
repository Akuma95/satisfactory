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
import NodesView from "@/views/admin/AddNodesView";
import ShowNodesView from "@/views/admin/ShowNodesView";
import AddRessourceView from "@/views/admin/AddRessourceView";
import ShowRessourceView from "@/views/admin/ShowRessourceView";
import DeleteRessourceView from "@/views/admin/DeleteRessourceView";

import {db} from '@/firebase'

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