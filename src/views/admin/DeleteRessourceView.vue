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
            style="height: 56px; color: #ddd; width: 100%"
            color="#ad1010"
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
import {db} from '@/firebase'
import firebase from "firebase";

export default {
  name: "RessourceView",
  props: [
    'localAllRessources',
  ],
  watch: {
    localAllRessources() {
      this.setCombobox();
    },
    selectedRessource() {
      this.changeSelctedRessource();
    }
  },
  data() {
    return {
      disableBtn: false,
      disableBtnAll: true,
      allRessources: this.localAllRessources,
      selectedRessource: {},
      items: []
    };
  },
  methods: {
    writeLog(col, doc) {
      let timestamp = Date.now();
      let date = new Date(timestamp);
      let humanDateShort = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();

      let log = {
        who: localStorage.getItem('id') !== '' ? localStorage.getItem('id') : Math.random().toString(36).substr(2, 9),
        date: firebase.firestore.FieldValue.serverTimestamp(),
        kind: 'Delete Data',
        collection: col,
        document: doc,
      };
      db.collection('log').doc(humanDateShort+'||'+doc).set(log);
    },
    deleteRessource() {
      let path = db.collection('ressources').doc(this.selectedRessource.value)
      path = this.selectedRessource.warning ?
          path :
          path.collection('alternative').doc(this.selectedRessource.value);

      path.delete();
      this.selectedRessource.warning ?
          this.writeLog('ressources', this.selectedRessource.value) :
          this.writeLog('ressources|'+this.selectedRessource.value+'|alternative', this.selectedRessource.value)


      this.setCombobox();
    },

    changeSelctedRessource() {
      this.disableBtn = this.selectedRessource.warning ? false : true;
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
                this.selectedRessource = input;
              });
            })
        let input = {
          text: obj.id,
          value: obj.id,
          warning: true,
          color: 'red',
          hint: 'Dies ist ein Original Rezept',
        };
        this.items.push(input);
        this.selectedRessource = input;
      });
    },
  },
  mounted() {
    this.setCombobox();
  }
};
</script>

<style scoped>
#wrapper {
  background-color: #dddddd;
  border-radius: 20px;
  width: 90%;
  margin: auto;
  padding: 10px 20px;
}
</style>