import {getPrepared} from "@/store/function";

export const trafficModule = {
    state: {
        allTraffic: [],
        allTimetable: [],
        allStations: [],
    },
    mutations: {
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
        async setAllTraffic(state) {
            let prepared = getPrepared();
            await prepared.collection('traffic').onSnapshot({
                next: (d) => {
                    let res = d.docs.map(value => value.data());
                    state.commit("setAllTraffic", res);
                    state.dispatch("setAllStations", res);
                }
            });
        },
        async setAllTimetable(state) {
            let prepared = getPrepared();
            await prepared.collection('timetable').onSnapshot({
                next: (d) => state.commit("setAllTimetable", d.docs.map(value => value.data()))
            });
        },
        async setAllStations(state, payload) {
            let prepared = getPrepared();
            let res = [];
            payload.forEach(e => {
                let main = {
                    kind: e.kind,
                    name: e.name,
                    value: e.value,
                    stations: [],
                }
                prepared.collection('traffic').doc(e.name).collection('stations').onSnapshot({
                    next: (d) => main.stations.push(d.docs.map(value => value.data()))
                });
                res.push(main);
            });
            state.commit("setAllStations", res)
        },
    },
    getters: {
        getAllTraffic: state => state.allTraffic,
        getAllTimetable: state => state.allTimetable,
        getAllStations: state => state.allStations,
    }
}