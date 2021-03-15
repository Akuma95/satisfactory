import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allRessources: [],
    basicRessources: [],
    allNodes: [],
    basicNodes: [],
    allTraffic: [],
    allTimetable: [],
    allStations: [],
    allFactory: []
  },
  mutations: {
    setAllRessources(state, payload) {
      state.allRessources = payload;
    },
    setAllNodes(state, payload) {
      state.allNodes = payload;
    },
    setBasicRessources(state, payload) {
      state.basicRessources = payload;
    },
    setBasicNodes(state, payload) {
      state.basicNodes = payload;
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
    setAllFactory(state, payload) {
      state.allFactory = payload;
    },
  },
  actions: {
    async setAllRessources(state) {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        console.log('Test Datenbank')
        prepared = db.collection('login').doc('TestSpiel');
      }
      let res = []
      await prepared.collection('ressources').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllRessources", res)
      })
    },
    async setBasicRessources(state) {
      let res = []
      await db.collection('ressources').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setBasicRessources", res)
      })
    },
    async setAllNodes(state) {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }
      let res = []
      await prepared.collection('nodes').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllNodes", res)
      })
    },
    async setBasicNodes(state) {
      let res = []
      await db.collection('nodes').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setBasicNodes", res)
      })
    },
    async setAllTraffic(state) {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }
      let res = []
      await prepared.collection('traffic').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllTraffic", res)
      }).then(() => {
        //state.dispatch("setAllStations");
      })
    },
    async setAllTimetable(state) {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }
      let res = []
      await prepared.collection('timetable').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllTimetable", res)
      })
    },
    async setAllFactory(state) {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }
      let res = []
      await prepared.collection('factory').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllFactory", res)
      })
    },
    setAllStations(state) {
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
    getBasicRessources: state => state.basicRessources,
    getBasicNodes: state => state.basicNodes,
    getAllTraffic: state => state.allTraffic,
    getAllTimetable: state => state.allTimetable,
    getAllStations: state => state.allStations,
    getAllFactory: state => state.allFactory,
  }
})
