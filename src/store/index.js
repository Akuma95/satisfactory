import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allGames: [],
    allRessources: [],
    basicRessources: [],
    allNodes: [],
    basicNodes: [],
    allTraffic: [],
    allTimetable: [],
    allStations: [],
    allFactory: [],
    setGame: false,
  },
  mutations: {
    isSetGame(state, payload) {
      state.setGame = payload
    },
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
    setAllGames(state, payload) {
      state.allGames = payload;
    },
  },
  actions: {
    async isSetGame(state) {
      if (localStorage.getItem('spielstand') !== null) {
        state.commit("isSetGame", true)
      }
    },
    async setAllGames(state) {
      let res = []
      await db.collection('login').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllGames", res)
      })
    },
    async setAllRessources(state) {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        console.log('Test Datenbank')
        prepared = db.collection('login').doc('TestSpiel');
        console.log(prepared);
      }
      await prepared.collection('ressources').get().then(querySnapshot =>
        state.commit("setAllRessources", querySnapshot.docs.map(doc => doc.data()))

      )
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
        state.dispatch("setAllStations", res);
      })
    },
    async setAllStations(state, payload) {
      let prepared
      if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
      } else {
        prepared = db.collection('login').doc('TestSpiel');
      }
      let res = [];
      payload.forEach(e => {
        let main = {
          kind: e.kind,
          name: e.name,
          value: e.value,
          stations: [],
        }
        prepared.collection('traffic').doc(e.name).collection('stations').get().then(querySnapshot => {
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
    getIsSetGame: state => state.setGame,
    getAllGames: state => state.allGames,
  }
})
