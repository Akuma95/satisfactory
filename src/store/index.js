import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allRessources: [],
    allNodes: [],
    allTraffic: [],
    allTimetable: [],
    allStations: []
  },
  mutations: {
    setAllRessources(state, payload) {
      state.allRessources = payload;
    },
    setAllNodes(state, payload) {
      state.allNodes = payload;
    },
    setAllTraffic(state, payload) {
      state.allTraffic = payload;
    },
    setAllTimetable(state, payload) {
      state.allTimetable = payload;
    },
    setAllStations(state, payload) {
      state.allStations = payload;
    },
  },
  actions: {
    async setAllRessources(state) {
      let res = []
      await db.collection('ressources').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllRessources", res)
      })
    },
    async setAllNodes(state) {
      let res = []
      await db.collection('nodes').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllNodes", res)
      })
    },
    async setAllTraffic(state) {
      let res = []
      await db.collection('traffic').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllTraffic", res)
      })
    },
    async setAllTimetable(state) {
      let res = []
      await db.collection('timetable').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllTimetable", res)
      })
    },
    setallStations(state) {
      let res = [];
      state.allTraffic.forEach(e => {
        let main = {
          kind: e.kind,
          name: e.name,
          value: e.value,
          stations: [],
        }
        db.collection('traffic').doc(e.name).collection('stations').get().then(querySnapshot => {
          let getData = querySnapshot.docs.map(doc => doc.data());
          getData.forEach(f => {
            main.stations.push({
              name: f.name,
              class: f.class,
              transport: f.amount.transport,
              available: f.amount.available,
              amountMax: f.amount.transport === f.amount.available
            })
          })
        });
        res.push(main);
      });
      state.commit("setAllStations", res)
    }
  },
  modules: {},
  getters: {
    getAllRessources: state => state.allRessources,
    getAllNodes: state => state.allNodes,
    getAllTraffic: state => state.allTraffic,
    getAllTimetable: state => state.allTimetable,
    getAllStations: state => state.allStations,
  }
})
