import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Configuração do projeto Firebase (lanchonete-belo-arco-iris)
const firebaseConfig = {
  apiKey: 'AIzaSyALk3n51AMQDOiuq-WFLGM9ZnsfPyM1_wE',
  authDomain: 'lanchonete-belo-arco-iris.firebaseapp.com',
  projectId: 'lanchonete-belo-arco-iris',
  storageBucket: 'lanchonete-belo-arco-iris.firebasestorage.app',
  messagingSenderId: '876024304431',
  appId: '1:876024304431:web:8ceb3fb9c583994c3707da',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
