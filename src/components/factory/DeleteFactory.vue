<template>
  <div id="wrapper">

    <h1>Ressource löschen</h1>

    <v-row>
      <v-col cols="9">
        <v-combobox
            v-model="selctedFactory"
            :items="items"
            label="Löschen"
            small-chips
            :color="selctedFactory.color"
            :hint="selctedFactory.hint"
            attach
            @change="changeSelctedFactory"
            :menu-props="{
              bottom: true,
              offsetY: true,
              offsetOverflow: true,
              rounded: true,
            }"
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-btn
            class="btn-delete"
            :disabled="!disableBtn"
            @click="deleteFactory"
        >Löschen</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="selctedFactory.warning">
      <v-col cols="12">
        <v-checkbox
            v-model="disableBtn"
            label="Wenn ich diese Fabrik lösche, werden die Ressourcen und Nodes auch gelöscht."
        ></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {getPrepared} from "@/store/function";

export default {
  name: "DeleteFactoryView",
  watch: {
    selctedFactory() {
      this.changeSelctedFactory();
    }
  },
  data() {
    return {
      disableBtn: false,
      showBtn: false,
      selctedFactory: '',
      items: []
    };
  },
  computed: {
    allFactory() {
      return this.$store.getters.getAllFactory;
    },
    allNodes() {
      return this.$store.getters.getAllNodes;
    },
    allRessources() {
      return this.$store.getters.getAllRessources;
    }
  },
  mounted() {
    this.setCombobox();
  },
  methods: {
    deleteFactory() {
      let prepared =  getPrepared()
      this.allRessources.forEach(e => {
        prepared.collection('ressources').doc(e.id).collection('need').doc(this.selctedFactory.value).delete();
        prepared.collection('ressources').doc(e.id).collection('produce').doc(this.selctedFactory.value).delete();
      })
      this.allNodes.forEach(e => {
        prepared.collection('nodes').doc(e.name).collection('blocked').doc(this.selctedFactory.value).delete();
      })
      prepared.collection('factory').doc(this.selctedFactory.value).delete();
      this.$store.dispatch("setAllRessources");
      this.$store.dispatch("setAllNodes");
      this.$store.dispatch("setAllFactory").then(()=>{
        this.selctedFactory = '';
        this.disableBtn = false;
        this.setCombobox();
      });
    },
    changeSelctedFactory() {
      this.disableBtn = !this.selctedFactory.warning;
    },
    setCombobox() {
      this.allFactory.forEach(obj => {
        let input = {
          text: obj.name,
          value: obj.name,
          warning: true,
          color: 'red',
          hint: 'Dies ist ein Original Rezept',
        };
        this.items.push(input);
      });
    },
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