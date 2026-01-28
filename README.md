# Gestió de Despeses Compartides – DA02

## 📌 Descripció
Aplicació web desenvolupada amb React i Firebase que permet gestionar projectes de despeses compartides. Els usuaris poden crear projectes, afegir participants, registrar despeses i consultar un resum econòmic automàtic que indica quant ha de pagar o rebre cada participant.

Aquest projecte s’ha realitzat com a pràctica de la unitat **DA02 – Desenvolupament al núvol**.

---

## 🎯 Objectius del projecte
- Implementar autenticació d’usuaris amb Firebase Auth.
- Protegir les rutes de l’aplicació perquè només els usuaris autenticats hi puguin accedir.
- Gestionar projectes amb participants.
- Registrar i gestionar despeses associades a cada projecte.
- Calcular automàticament el balanç econòmic de cada participant.
- Aplicar regles de seguretat a Firebase Firestore.

---

## 🛠 Tecnologies utilitzades
- **React + Vite**
- **Firebase Authentication**
- **Firebase Firestore**
- **React Router**
- **Tailwind CSS**
- **DaisyUI**

---

## ⚙️ Instal·lació i execució

1. Clonar el repositori:
```bash
git clone <url-del-repositori>

2. Instal·lar dependències:

npm install

3. Crear un fitxer .env a partir de .env.example i afegir les claus de Firebase.

4. Executar el projecte:

npm run dev

L’aplicació estarà disponible a:

http://localhost:5173

Variables d’entorn

El projecte utilitza variables d’entorn per a la configuració de Firebase.
Cal crear un fitxer .env amb el format següent:

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

Funcionalitats principals

Registre i inici de sessió d’usuaris.

Protecció de rutes mitjançant autenticació.

Creació, visualització i eliminació de projectes.

Gestió de participants dins dels projectes.

Afegir i eliminar despeses associades a un projecte.

Panell de resum amb càlcul automàtic de saldos.

Regles de seguretat a Firestore per evitar accessos no autoritzats.




Seguretat

S’han definit regles de seguretat a Firebase Firestore que garanteixen que:

Només els usuaris autenticats poden accedir a les dades.

Només el propietari o els participants poden veure els projectes.

Les despeses estan protegides i vinculades al projecte corresponent.


Autor: Marcos Luis Valdes

Pràctica realitzada per a l’assignatura DA02 – Desenvolupament al núvol.
