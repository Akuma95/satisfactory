<template>
  <div id="wrapper">
    <h2>Knoten hinzufügen / ändern</h2>
    <v-row>
      <v-col cols="12">
        <v-combobox
            v-model="node.name"
            :items="nodes"
            label="Knotenname"
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

    <v-btn @click="save" color="#F2C800">Speichern</v-btn>

  </div>
</template>

<script>
import {db} from '@/firebase'
import firebase from "firebase";

export default {
  name: "RessourceView",
  props: [
    'localAllNodes',
  ],
  watch: {
    localAllNodes() {
      //this.allNodes = this.localAllNodes;
      this.setCombobox()
    }
  },
  data() {
    return {
      allNodes: this.localAllNodes,
      nodes: [],
      node: {
        name: '',
        pure: '',
        normal: '',
        impure: '',
      },
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
        kind: 'Add Data',
        collection: col,
        document: doc,
      };
      db.collection('log').doc(humanDateShort+'||'+doc).set(log);
    },
    save() {
      let node = {
        name: this.node.name.text,
        pure: this.node.pure,
        normal: this.node.normal,
        impure: this.node.impure,
        pureBlock: 0,
        normalBlock: 0,
        impureBlock: 0,
      };

      db.collection('nodes').doc(node.name).set(node).then(() => {
        this.writeLog('nodes', node.name)
        this.node.name = null;
        this.node.pure = null;
        this.node.normal = null;
        this.node.impure = null;
      })
    },
    setCombobox() {
      let allNodes = this.allNodes;

      allNodes.forEach(obj => {
        let input = {
          text: obj.name,
          value: obj.name,
        };
        this.nodes.push(input);
      });
    }
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