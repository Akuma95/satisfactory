<template>
  <div id="wrapper">
    <h2>Knoten hinzufügen / ändern</h2>
    <v-row>
      <v-col cols="12">
        <v-combobox
            v-model="node.name"
            :items="nodes"
            label="Knotenname"
            :menu-props="{
              bottom: true,
              offsetY: true,
              offsetOverflow: true,
              rounded: true,
            }"
        ></v-combobox>
      </v-col>
      <v-col cols="4">
        <v-text-field
            v-model="node.pure"
            label="Rein"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
            v-model="node.normal"
            label="Normal"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
            v-model="node.impure"
            label="Unrein"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-btn @click="save" class="btn-brand">Speichern</v-btn>

  </div>
</template>

<script>
import {db} from '@/firebase/firebase'

export default {
  name: "RessourceView",
  data() {
    return {
      nodes: [],
      node: {
        name: '',
        pure: '',
        normal: '',
        impure: '',
      },
    };
  },
  computed: {
    allNodes() {
      return this.$store.state.node.basicNodes;
    }
  },
  watch: {
    allNodes() {
      this.setCombobox()
    }
  },
  mounted() {
    this.setCombobox()
  },
  methods: {
    save() {
      let node = {
        name: this.node.name.text ? this.node.name.text : this.node.name,
        pure: this.node.pure,
        normal: this.node.normal,
        impure: this.node.impure,
      };

      db.collection('nodes').doc(node.name).set(node).then(() => {
        this.node.name = null;
        this.node.pure = null;
        this.node.normal = null;
        this.node.impure = null;
      })
    },
    setCombobox() {
      this.allNodes.forEach(obj => {
        let input = {
          text: obj.name,
          value: obj.name,
        };
        this.nodes.push(input);
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