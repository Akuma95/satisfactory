import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase'
import {getPrepared} from "@/store/function";
import {nodeModule} from "@/store/db/nodes";
import {ressourceModule} from "@/store/db/ressource";
import {trafficModule} from "@/store/db/traffic";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allGames: [],
    allFactory: [],
    setGame: false,
  },
  mutations: {
    isSetGame(state, payload) {
      state.setGame = payload
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
    async setAllFactory(state) {
      let prepared = getPrepared();
      let res = []
      await prepared.collection('factory').get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
          res.push(f);
        });
        state.commit("setAllFactory", res)
      })
    },
  },
  modules: {
    node: nodeModule,
    res: ressourceModule,
    traffic: trafficModule
  },
  getters: {
    getAllFactory: state => state.allFactory,
    getIsSetGame: state => state.setGame,
    getAllGames: state => state.allGames,
  }
})
