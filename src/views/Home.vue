<template>
  <div class="home">
    <h1>Satisfactory Planung</h1>
    <br>
    <v-row>
      <v-col cols="12" md="7">
        <all-nodes-view></all-nodes-view>
      </v-col>
      <v-col cols="12" md="5">
        <storage-view></storage-view>
      </v-col>
    </v-row>
    <br>
  </div>
</template>

<script>
import AllNodesView from "@/views/overview/AllNodesView";
import StorageView from "@/views/overview/StorageView";

import {db} from "@/firebase";

export default {
  name: 'home',
  components: {
    AllNodesView,
    StorageView,
  },
}
</script>
