<template>
  <div class="home">
    <h1>Satisfactory Planungstool</h1>
    <span v-if="setGame">
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
    </span>
    <div id="wrapper" v-else>
      <h2>Willkommen</h2>
      <p>
        hier kannst du deine Fabriken hinterlegen und hast so einen Super überblick. <br>
        Um zu starten musst du vorher kurz <b>oben rechts auf den gelben Button</b> klicken. <br>
        Dort kannst du den Namen deines Spielstandes eintragen und ändern. <br>
        Diesen Namen kannst du dann mit deinen Freunden teilen und so gemeinsam an einer Fabrik arbeiten.
      <p/>
    </div>
  </div>
</template>

<script>
import AllNodesView from "@/components/overview/ShowAllNodes";
import StorageView from "@/components/overview/ShowStorage";

export default {
  name: 'home',
  components: {
    AllNodesView,
    StorageView,
  },
  computed: {
    setGame() {
      return this.$store.getters.getIsSetGame;
    },
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/variables.scss";

h1 {
  color: $brand;
}

#wrapper {
  background-color: $background-box;
  border-radius: 20px;
  width: 90%;
  margin: 20px auto;
  padding: 10px 20px;
}
</style>