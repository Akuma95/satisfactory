<template>
  <div id="wrapper">
    <h1>Eine Fabrik hinzufügen</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
            v-model="factory.id"
            label="Fabrikname*"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
            v-model="factory.powerUsage"
            label="Strumverbrauch"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
            v-model="factory.powerProduction"
            label="Strumgewinnung"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-textarea
            v-model="factory.descriptionLocation"
            rows="3"
            label="Beschreibung der Location"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <v-textarea
            v-model="factory.descriptionFactory"
            rows="3"
            label="Beschreibung der Fabrik"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <span><h2>Node für die Fabrik</h2> <v-btn
            class="mx-2"
            icon
            small
            color="#333"
            @click="addNode"
        >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn><v-btn
            class="mx-2"
            icon
            small
            color="#333"
            @click="removeNode"
        >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn></span>
        <br><br>
        <v-divider style="background-color: #F2C800"></v-divider>
        <span v-for="node in countNode" :key="node">
          <div class="input">
            <v-row>
              <v-col cols="12">
                <v-combobox
                    :items="nodeItems"
                    v-model="factory.node[node-1].name"
                    label="Welchen Knoten"
                    :menu-props="{
                      bottom: true,
                      offsetY: true,
                      offsetOverflow: true,
                      rounded: true,
                    }"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="6">
                <v-combobox
                    :items="purity"
                    v-model="factory.node[node-1].purity"
                    label="Reinheit"
                    :menu-props="{
                      bottom: true,
                      offsetY: true,
                      offsetOverflow: true,
                      rounded: true,
                    }"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="factory.node[node-1].countNodes"
                    label="Anzahl der Knoten"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                    :items="trafficItems"
                    v-model="factory.node[node-1].station"
                    label="Station"
                    :menu-props="{
                      bottom: true,
                      offsetY: true,
                      offsetOverflow: true,
                      rounded: true,
                    }"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </div>
        <v-divider style="background-color: #F2C800"></v-divider>
        </span>
      </v-col>
      <v-col cols="12" md="4">
        <span><h2>Input der Fabrik</h2> <v-btn
            class="mx-2"
            icon
            small
            color="#333"
            @click="addInput"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn><v-btn
            class="mx-2"
            icon
            small
            color="#333"
            @click="removeInput"
        >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn></span>
        <br><br>
        <v-divider style="background-color: #FA0E49"></v-divider>
        <span v-for="input in countInput" :key="input">
          <div class="input">
            <v-row>
              <v-col cols="12" md="6">
                <v-combobox
                    :items="ressourceItems"
                    v-model="factory.input[input-1].resource"
                    label="Ressource"
                    :menu-props="{
                      bottom: true,
                      offsetY: true,
                      offsetOverflow: true,
                      rounded: true,
                    }"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="factory.input[input-1].countRessource"
                    label="Anzahl / min"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                    :items="trafficItems"
                    v-model="factory.input[input-1].station"
                    label="Station"
                    :menu-props="{
                      bottom: true,
                      offsetY: true,
                      offsetOverflow: true,
                      rounded: true,
                    }"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </div>
        <v-divider style="background-color: #FA0E49"></v-divider>
        </span>
      </v-col>
      <v-col cols="12" md="4">
        <span><h2>Output der Fabrik</h2> <v-btn
            class="mx-2"
            icon
            small
            color="#333"
            @click="addOutput"
        >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn><v-btn
            class="mx-2"
            icon
            small
            color="#333"
            @click="removeOutput"
        >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn></span>
        <br><br>
        <v-divider style="background-color: #62c600"></v-divider>
        <span v-for="output in countOutput" :key="output">
          <div class="input">
            <v-row>
              <v-col cols="12" md="6">
                <v-combobox
                    :items="ressourceItems"
                    v-model="factory.output[output-1].resource"
                    label="Ressource"
                    :menu-props="{
                      bottom: true,
                      offsetY: true,
                      offsetOverflow: true,
                      rounded: true,
                    }"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="factory.output[output-1].countRessource"
                    label="Anzahl / min"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                    :items="trafficItems"
                    v-model="factory.output[output-1].station"
                    label="Station"
                    :menu-props="{
                      bottom: true,
                      offsetY: true,
                      offsetOverflow: true,
                      rounded: true,
                    }"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </div>
          <v-divider style="background-color: #62c600"></v-divider>
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-btn
            @click="save"
            style="background-color: #F2C800"
            :disabled="factory.id===''"
        >Speichern</v-btn>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>

<script>
import {db} from "@/firebase/firebase";
import {getPrepared} from "@/store/function";

export default {
  name: "RessourceView",
  watch: {
    allRessources() {
      this.setCombobox(this.allRessources, this.ressourceItems)
    },
    allNodes() {
      this.setCombobox(this.allNodes, this.nodeItems)
    },
    allTraffic() {
      this.setCombobox(this.allTraffic, this.trafficItems)
    }
  },
  data() {
    return {
      countNode: 1,
      showBtn: false,
      countInput: 1,
      countOutput: 1,
      nodeItems: [],
      trafficItems: [],
      ressourceItems: [],
      purity: [
        {
          value: 'pure',
          text: 'Rein'
        },
        {
          value: 'normal',
          text: 'Normal'
        },
        {
          value: 'impure',
          text: 'Unrein'
        }
      ],
      factory: {
        id: '',
        powerUsage: '',
        powerProduction: '',
        descriptionLocation: '',
        descriptionFactory: '',
        node: [{
          name: '',
          purity: '',
          countNodes: '',
          station: '',
        }],
        input: [{
          resource: '',
          countRessource: '',
          station: '',
        }],
        output: [{
          resource: '',
          countRessource: '',
          station: '',
        }],
      },
    };
  },
  computed: {
    allNodes() {
      return this.$store.state.node.basicNodes;
    },
    allTraffic() {
      return this.$store.state.traffic.allTraffic;
    },
    allRessources() {
      return this.$store.state.res.basicRessources;
    },
  },
  mounted() {
    this.setCombobox(this.allNodes, this.nodeItems)
    this.setCombobox(this.allTraffic, this.trafficItems)
    this.setCombobox(this.allRessources, this.ressourceItems)
  },
  methods: {
    writeDB() {
      //Ein Station Objekt für Firestore erstellen
      let fabric = {
        name: this.factory.id,
        power: {
          usage: this.factory.powerUsage,
          production: this.factory.powerProduction,
        },
        description: {
          location: this.factory.descriptionLocation,
          factory: this.factory.descriptionFactory,
        },
        node: this.factory.node,
        input: this.factory.input,
        output: this.factory.output
      };
      //Den Pfad erstellen zur DB.
      let prepared = getPrepared()
      let pathFactory = prepared.collection('factory').doc(fabric.name)
      let pathRessource = prepared.collection('ressources')

      //Das erstellte Objekt abspeichern und und die Werte des Formulars reseten.
      pathFactory.set(fabric).then(() => {
        db.collection('nodes').get().then(querySnapshot => {
          let data = querySnapshot.docs.map(doc => doc.data());
          data.forEach(e => {
            //set blocked Nodes
            let blocked = {
              impure: 0,
              normal: 0,
              pure: 0,
            }
            let save = false;
            fabric.node.forEach(f=> {
              if (f.name.value === e.name) {
                if (f.purity.value === 'pure') {
                  blocked.pure += parseInt(f.countNodes);
                } else if (f.purity.value === 'normal') {
                  blocked.normal += parseInt(f.countNodes);
                } else if (f.purity.value === 'impure') {
                  blocked.impure += parseInt(f.countNodes);
                }
                save = true;
              }
            })
            if (save) {
              prepared.collection('nodes').doc(e.name).collection('blocked').doc(fabric.name).set(blocked).then(() => {
                prepared.collection('nodes').doc(e.name).set({name: e.name});
              })
            }
          })
        })
        fabric.input.forEach(e => {
          if (e.resource !== '') {
            let input = {amount: e.countRessource};
            pathRessource.doc(e.resource.value).collection('need').doc(fabric.name).set(input);
          }
        })
        fabric.output.forEach(e => {
          if (e.resource !== '') {
            let output = {amount: e.countRessource};
            pathRessource.doc(e.resource.value).collection('produce').doc(fabric.name).set(output);
          }
        })
        // TODO: Fehlermeldung "Cannot read property of 'name'
        this.factory = {
          id: '',
          powerUsage: '',
          powerProduction: '',
          descriptionLocation: '',
          descriptionFactory: '',
          node: [{
            name: '',
            purity: '',
            countNodes: '',
            station: '',
          }],
          input: [{
            resource: '',
            countRessource: '',
            station: '',
          }],
          output: [{
            resource: '',
            countRessource: '',
            station: '',
          }],
        };
      })
      //in DB schreiben - ende
    },
    save() {
      this.writeDB();
    },
    addNode () {
      this.countNode++;
      this.factory.node.push({
        name: '',
        purity: '',
        countNodes: '',
        station: '',
      });
    },
    addInput () {
      this.countInput++;
      this.factory.input.push({
        resource: '',
        countRessource: '',
        station: '',
      });
    },
    addOutput () {
      this.countOutput++;
      this.factory.output.push({
        resource: '',
        countRessource: '',
        station: '',
      });
    },
    removeNode () {
      if (this.countNode>1) {
        this.countNode--;
        this.factory.node.pop();
      }
    },
    removeInput () {
      if (this.countInput>1) {
        this.countInput--;
        this.factory.input.pop();
      }
    },
    removeOutput () {
      if (this.countOutput>1) {
        this.countOutput--;
        this.factory.output.pop();
      }
    },
    setCombobox(res, tar) {
      res.forEach(obj => {
        let input = {
          text: obj.name,
          value: obj.name,
        };
        tar.push(input);
      });
    },
  },
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
.col-6 {
  max-width: 49%;
}
</style>