<template>
  <div id="wrapper">

    <h1>Ressource löschen</h1>

    <v-row>
      <v-col cols="9">
        <v-combobox
            v-model="selectedRessource"
            :items="items"
            label="Löschen"
            small-chips
            :color="selectedRessource.color"
            :hint="selectedRessource.hint"
            attach
            @change="changeSelctedRessource"
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
            @click="deleteRessource"
        >Löschen</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="selectedRessource.warning">
      <v-col cols="12">
        <v-checkbox
            v-model="disableBtn"
            label="Wenn ich diese Ressource Lösche, werden auch alle dazugehörigen alternativ Rezepte gelöscht."
        ></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {db} from '@/firebase/firebase'

export default {
  name: "RessourceView",
  watch: {
    selectedRessource() {
      this.changeSelctedRessource();
    }
  },
  data() {
    return {
      disableBtn: false,
      disableBtnAll: true,
      selectedRessource: '',
      items: []
    };
  },
  computed: {
    allRessources() {
      return this.$store.state.res.basicRessources;
    }
  },
  mounted() {
    this.setCombobox();
  },
  methods: {
    deleteRessource() {
      let path = db.collection('ressources').doc(this.selectedRessource.value)
      path = this.selectedRessource.warning ?
          path :
          path.collection('alternative').doc(this.selectedRessource.value);
      path.delete();
    },

    changeSelctedRessource() {
      this.disableBtn = !this.selectedRessource.warning;
    },

    setCombobox() {
      this.allRessources.forEach(obj => {
        db.collection('ressources').doc(obj.name)
            .collection('alternative').get()
            .then(querySnapshot => {
              const documents = querySnapshot.docs.map(doc => doc.data())
              documents.forEach(subObj => {
                let input = {
                  text: subObj.id,
                  value: subObj.id,
                  warning: false,
                  color: 'blue',
                  hint: 'Dies ist ein Alternativ Rezept',
                };
                this.items.push(input);
              });
            })
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