<template>
  <div id="wrapper">
    <h2>Resourcenknoten</h2>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
        style="background-color: transparent"
    ></v-data-table>
  </div>
</template>

<script>
import {db} from "@/firebase/firebase";

export default {
  name: "ShowNodesView",
  data() {
    return {
      headers: [
        {
          text: 'Knoten',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Rein', value: 'pure' },
        { text: 'Rein Besetzt', value: 'pureBlock' },
        { text: 'Normal', value: 'normal' },
        { text: 'Normal Besetzt', value: 'normalBlock' },
        { text: 'Unrein', value: 'impure' },
        { text: 'Unrein Besetzt', value: 'impureBlock' },
      ],
      items: [],
    };
  },
  watch: {
    basicNodes() {
      this.setNodeTable();
    },
  },
  computed: {
    allNodes() {
      return this.$store.getters.getAllNodes;
    },
    basicNodes() {
      return this.$store.getters.getBasicNodes;
    },
  },
  mounted() {
    this.setNodeTable();
  },
  methods: {
    setNodeTable() {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }

      this.basicNodes.forEach(e => {
        let node = {
          name: e.name,
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
        this.items.push(node);
      })
    }
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