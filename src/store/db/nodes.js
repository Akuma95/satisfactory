import {db} from "@/firebase/firebase";
import {getPrepared} from '@/store/function';

export const nodeModule = {
    state: {
        allNodes: [],
        basicNodes: [],
    },
    mutations: {
        setAllNodes(state, payload) {
            state.allNodes = payload;
        },
        setBasicNodes(state, payload) {
            state.basicNodes = payload;
        },
    },
    actions: {
        async setAllNodes(state) {
            let prepared = getPrepared();
            await prepared.collection('nodes').onSnapshot({
                next: (d) => state.commit("setAllNodes", d.docs.map(value => value.data()))
            });
        },
        async setBasicNodes(state) {
            await db.collection('nodes').get().then(querySnapshot => {
                    state.commit("setBasicNodes", querySnapshot.docs.map(doc => doc.data()))
                }
            );
        },
    },
    getters: {
        getAllNodes: state => state.allNodes,
        getBasicNodes: state => state.basicNodes,
    }
}