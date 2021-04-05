import {getPrepared} from "@/store/function";
import {db} from "@/firebase/firebase";

function getAmount(name, subcol) {
    let prepared = getPrepared();
    let needed = 0;
    prepared.collection('ressources').doc(name).collection(subcol).get().then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data());
        data.forEach(f => {
            needed+=parseInt(f.amount)
        })
    })
    return needed;
}

export const ressourceModule = {
    state: {
        allRessources: [],
        basicRessources: [],
        storage: [],
    },
    mutations: {
        setAllRessources(state, payload) {
            state.allRessources = payload;
        },
        setBasicRessources(state, payload) {
            state.basicRessources = payload;
        },
        setStorage(state) {
            state.storage = [];
            state.basicRessources.forEach(res => {
                let storage = {
                    ressource: res.name,
                    usage: 0,
                    produce: 0,
                    balance: 0,
                };
                storage.usage = getAmount(res.name, 'need')
                storage.produce = getAmount(res.name, 'produce')
                storage.balance = storage.produce - storage.usage;
                state.storage.push(storage)
            })
        },
    },
    actions: {
        async setAllRessources(state) {
            let prepared = getPrepared();
            await prepared.collection('ressources').onSnapshot({
                next: (d) => state.commit("setAllRessources", d.docs.map(value => value.data()))
            });
        },
        async setBasicRessources(state) {
            await db.collection('ressources').onSnapshot({
                next: (d) => state.commit("setBasicRessources", d.docs.map(value => value.data()))
            });
        },
    },
    getters: {
        getAllRessources: state => state.allRessources,
        getBasicRessources: state => state.basicNodes,
    }
}