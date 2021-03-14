<template>
  <div id="wrapper">
    <h1>Eine Fabrik hinzufügen</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
            v-model="factory.id"
            label="Fabrikname"
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
      <v-col cols="12" md="6">
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
        <v-divider style="background-color: #F2C800"></v-divider>
        <span v-for="input in countInput" :key="input">
          <div class="input">
            <v-row>
              <v-col cols="12" md="3">
                <v-checkbox
                    v-model="factory.input[input-1].isNode"
                    color="#D5B000"
                    label="Knoten"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" md="3">
                <v-combobox
                    :items="nodeItems"
                    v-model="factory.input[input-1].node"
                    label="Welchen Knoten"
                    :menu-props="{
                      bottom: true,
                      offsetY: true,
                      offsetOverflow: true,
                      rounded: true,
                    }"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="3">
                <v-combobox
                    :items="purity"
                    v-model="factory.input[input-1].purity"
                    label="Reinheit"
                    :menu-props="{
                      bottom: true,
                      offsetY: true,
                      offsetOverflow: true,
                      rounded: true,
                    }"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                    v-model="factory.input[input-1].countNodes"
                    label="Anzahl der Knoten"
                ></v-text-field>
              </v-col>
            </v-row>
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
        <v-divider style="background-color: #F2C800"></v-divider>
        </span>
      </v-col>
      <v-col cols="12" md="6">
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
        <v-divider style="background-color: #5ebf00"></v-divider>
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
          <v-divider style="background-color: #5ebf00"></v-divider>
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-btn @click="save" style="background-color: #F2C800">Speichern</v-btn>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>

<script>
import {db} from "@/firebase";

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
        input: [{
          isNode: false,
          node: '',
          purity: '',
          countNodes: '',
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
      return this.$store.getters.getAllNodes;
    },
    allTraffic() {
      return this.$store.getters.getAllTraffic;
    },
    allRessources() {
      return this.$store.getters.getAllRessources;
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
        input: this.factory.input,
        outout: this.factory.output
      };
      //Den Pfad erstellen zur DB.
      let pathBasic = db.collection('factory').doc(fabric.name)
      let pathRessource = db.collection('ressources')

      //Das erstellte Objekt abspeichern und und die Werte des Formulars reseten.
      pathBasic.set(fabric).then(() => {
        fabric.input.forEach(f => {
          if (f.isNode) {
            //set blocked Nodes
            db.collection('nodes').get().then(querySnapshot => {
              let data = querySnapshot.docs.map(doc => doc.data());
              data.forEach(e => {
                if (e.name === f.node.value) {
                  let blocked = {
                    impure: e.impure,
                    normal: e.normal,
                    pure: e.pure,
                    name: e.name,
                    impureBlock: parseInt(e.impureBlock),
                    normalBlock: parseInt(e.normalBlock),
                    pureBlock: parseInt(e.pureBlock),
                  }
                  f.purity.value === 'pure' ? blocked.impureBlock+=parseInt(f.countNodes) : blocked.impureBlock = e.impureBlock
                  f.purity.value === 'normal' ? blocked.normalBlock+=parseInt(f.countNodes) : blocked.normalBlock = e.normalBlock
                  f.purity.value === 'impure' ? blocked.pureBlock+=parseInt(f.countNodes) : blocked.pureBlock = e.pureBlock
                  db.collection('nodes').doc(e.name).set(blocked);
                }
              })
            });
          }
          if (f.resource.value !== '') {
            let input = {amount: f.countRessource};
            pathRessource.doc(f.resource.value).collection('need').doc(fabric.name).set(input);
          }

        })
        fabric.outout.forEach(e => {
          if (e.resource !== '') {
            let output = {amount: e.countRessource};
            pathRessource.doc(e.resource.value).collection('produce').doc(fabric.name).set(output);
          }
        })
        this.factory.id = '';
        this.factory.powerUsage = '';
        this.factory.powerProduction = '';
        this.factory.descriptionLocation = '';
        this.factory.descriptionFactory = '';
        this.factory.input = [{
          isNode: false,
          node: '',
          countNodes: '',
          resource: '',
          countRessource: '',
          station: '',
        }];
        this.factory.output = [{
          resource: '',
          countRessource: '',
          station: '',
        }];
      })
      //in DB schreiben - ende
    },
    save() {
      this.writeDB();
    },
    addInput () {
      this.countInput++;
      this.factory.input.push({
        isNode: false,
        node: '',
        countNodes: '',
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