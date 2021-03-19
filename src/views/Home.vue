<template>
  <div class="home">
    <h1>Satisfactory Planungstool</h1>
    <span v-if="setGame">
      <br>
      <v-row class="wrapper">
        <v-col cols="3"></v-col>
        <v-col cols="3"><v-checkbox v-model="showNodes" label="Zeige Resourcenknoten"></v-checkbox></v-col>
        <v-col cols="3"><v-checkbox v-model="showRessource" label="Zeige Ressourcen"></v-checkbox></v-col>
        <v-col cols="3"></v-col>
      </v-row>
      <v-row v-if="showNodes">
        <v-col cols="12" v-if="false">
          <all-nodes-view></all-nodes-view>
        </v-col>
        <v-col cols="12" v-else>
          <div class="wrapper">
            <h2>Resourcenknoten</h2>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="searchNode"
                    append-icon="mdi-magnify"
                    label="Suche"
                    single-line
                    hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3" class="singleNode" v-for="item in itemsNodes" :key="item.name">
                <show-node :node="item" color="blue" :search="searchNode"></show-node>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="showRessource">
        <v-col cols="12" v-if="false">
          <storage-view></storage-view>
        </v-col>
        <v-col cols="12" v-else>
          <div class="wrapper">
            <h2>Resourcen</h2>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="searchRes"
                    append-icon="mdi-magnify"
                    label="Suche"
                    single-line
                    hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3" class="singleNode" v-for="item in storage" :key="item.name">
                <show-node :node="item" color="blue" :search="searchRes"></show-node>
              </v-col>
            </v-row>
          </div>
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
import ShowNode from "@/components/overview/ShowNode";
import CardStore from "@/components/overview/CardStore";

import {db} from "@/firebase/firebase";

export default {
  name: 'home',
  components: {
    AllNodesView,
    StorageView,
    ShowNode,
    CardStore,
  },
  data() {
    return {
      itemsNodes: [],
      searchRes: '',
      searchNode: '',
      showNodes: true,
      showRessource: true,
      storage: [],
    };
  },
  computed: {
    setGame() {
      return this.$store.getters.getIsSetGame;
    },
    allNodes() {
      return this.$store.getters.getAllNodes;
    },
    basicNodes() {
      return this.$store.getters.getBasicNodes;
    },
    allRessources() {
      return this.$store.getters.getBasicRessources;
    }
  },
  watch: {
    basicNodes() {
      this.getAllNodes();
    },
    allRessources() {
      this.setTable();
    }
  },
  mounted() {
    this.getAllNodes();
    this.setTable();
  },
  methods: {
    getAllNodes() {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }

      this.basicNodes.forEach(e => {
        let node = {
          name: e.name,
          color: e.color,
          pure: e.pure,
          pureBlock: 0,
          normal: e.normal,
          normalBlock: 0,
          impure: e.impure,
          impureBlock: 0
        }
        this.allNodes.forEach(user => {
          if (e.name === user.name) {
            prepared.collection('nodes').doc(e.name).collection('blocked').get().then(querySnapshot => {
              let data = querySnapshot.docs.map(doc => doc.data());
              data.forEach(dataEle => {
                node.pureBlock += parseInt(dataEle.pure);
                node.normalBlock += parseInt(dataEle.normal);
                node.impureBlock += parseInt(dataEle.impure);
              })
            })
          }
        })
        this.itemsNodes.push(node);
      })
    },
    async getNeeded(name) {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }
      let needed = 0;
      await prepared.collection('ressources').doc(name).collection('need').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          needed+=parseInt(f.amount)
        })
      })
      return needed;
    },
    async getProduce(name) {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }
      let produce = 0;
      await prepared.collection('ressources').doc(name).collection('produce').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          produce+=parseInt(f.amount)
        })
      })
      return produce;
    },
    setTable() {
      console.log(this.allRessources)
      this.allRessources.forEach(e => {
        let storage = {
          ressource: e.name,
          usage: 0,
          produce: 0,
          balance: 0,
        };
        this.getNeeded(e.name).then(e => storage.usage = e)
        this.getProduce(e.name).then(e => storage.produce = e).then(() => {
          storage.balance = storage.produce - storage.usage;
        })
        this.storage.push(storage);
      });
    },
  }
}
</script>

<style scoped>
h1 {
  font-size: 1.7rem;
  color: #F2C800;
}
#wrapper {
  background-color: #dddddd;
  border-radius: 20px;
  width: 90%;
  margin: 20px auto;
  padding: 10px 20px;
}
.wrapper {
  background-color: #dddddd;
  border-radius: 20px;
  margin: auto;
  padding: 10px 20px;
}
.singleNode {
  min-width: fit-content;
  margin: -20px auto;
}
</style>