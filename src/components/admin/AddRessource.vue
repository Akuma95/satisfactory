<template>
  <div id="wrapper">
    <h1>Eine Ressource ergänzen</h1>
    <v-row>
      <v-col cols="6">
        <v-text-field
            v-model="ressource.id"
            label="Eindeutigername"
            placeholder="Nasser Beton"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-combobox
            v-model="ressource.name"
            :items="component"
            label="Komponente"
            placeholder="Beton"
            :menu-props="{
              bottom: true,
              offsetY: true,
              offsetOverflow: true,
              rounded: true,
            }"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-checkbox
            v-model="ressource.ore"
            label="Erz"
            class="checkboxBackground"
        ></v-checkbox>
      </v-col>
      <v-col cols="4">
        <v-checkbox
            v-model="ressource.alternative"
            label="Alternative"
            class="checkboxBackground"
        ></v-checkbox>
      </v-col>
      <v-col cols="4">
        <v-checkbox
            v-model="ressource.liquid"
            label="Flüssigkeit"
            class="checkboxBackground"
        ></v-checkbox>
      </v-col>
    </v-row>
    <span v-if="!ressource.ore">
      <v-row>
        <v-col cols="6">
          <v-combobox
              v-model="ressource.production.input1"
              :items="component"
              label="Input 1"
              filled
              attach
              :menu-props="{
                bottom: true,
                offsetY: true,
                offsetOverflow: true,
                rounded: true,
              }"
          ></v-combobox>
        </v-col>
        <v-col cols="6">
          <v-combobox
              v-model="ressource.production.input2"
              :items="component"
              label="Input 2"
              filled
              attach
              :menu-props="{
                bottom: true,
                offsetY: true,
                offsetOverflow: true,
                rounded: true,
              }"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-combobox
              v-model="ressource.production.input3"
              :items="component"
              label="Input 3"
              filled
              attach
              :menu-props="{
                bottom: true,
                offsetY: true,
                offsetOverflow: true,
                rounded: true,
              }"
          ></v-combobox>
        </v-col>
        <v-col cols="6">
          <v-combobox
              v-model="ressource.production.input4"
              :items="component"
              label="Input 4"
              filled
              attach
              :menu-props="{
                bottom: true,
                offsetY: true,
                offsetOverflow: true,
                rounded: true,
              }"
          ></v-combobox>
        </v-col>
      </v-row>
    </span>

    <v-btn @click="save" class="btn-brand">Speichern</v-btn>

  </div>
</template>

<script>
import {db} from "@/firebase/firebase";

export default {
  name: "RessourceView",
  data() {
    return {
      ressource: {
        id: '',
        name: '',
        ore: false,
        alternative: false,
        liquid: false,
        production: {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
        },
      },
      component: [],
    };
  },
  computed: {
    allRessources() {
      return this.$store.state.res.basicRessources;
    }
  },
  watch: {
    allRessources() {
      this.setCombobox();
    }
  },
  mounted() {
    this.setCombobox();
  },
  methods: {
    save() {
      //Ein Ressource Objekt für Firestore erstellen
      let ressource = {
        id: this.ressource.id,
        name: this.ressource.name.text !== undefined ? this.ressource.name.text : this.ressource.name,
        ore: this.ressource.ore,
        liquid: this.ressource.liquid,
        input: {
          input1: this.ressource.production.input1.value?this.ressource.production.input1.value:'',
          input2: this.ressource.production.input2.value?this.ressource.production.input2.value:'',
          input3: this.ressource.production.input3.value?this.ressource.production.input3.value:'',
          input4: this.ressource.production.input4.value?this.ressource.production.input4.value:''
        }
      };
      //Den Pfad erstellen zur DB.
      //Wenn es ein Alternativ Rezept ist, wird eine Subcolection erstellt
      let path = db.collection('ressources').doc(ressource.name)
      path = this.ressource.alternative ?
          path.collection('alternative').doc(this.ressource.id) :
          path;
      //Das erstellte Objekt abspeichern und und die Werte des Formulars reseten.
      path.set(ressource).then(() => {
        this.ressource.id = '';
        this.ressource.name = '';
        this.ressource.alternative = false;
        this.ressource.ore = false;
        this.ressource.liquid = false;
        this.ressource.production = {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
        }
      });
    },

    setCombobox() {
      this.allRessources.forEach(obj => {
          let input = {
            text: obj.name,
            value: obj.name,
          };
          this.component.push(input);
      });
    }
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