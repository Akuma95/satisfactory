import {db} from "@/firebase/firebase";

export function getPrepared() {
    let prepared
    if (location.host !== 'localhost:8080') {
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
    } else {
        //prepared = db.collection('login').doc('TestSpiel');
        prepared = db.collection('login').doc(localStorage.getItem('spielstand'));
    }
    return prepared;
}

