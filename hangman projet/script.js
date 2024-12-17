// Liste des mots et indices associés
const animaux = [
  { mot: 'serpent', indice: 'Un reptile sans pattes, qui se déplace en rampant.' },
  { mot: 'lion', indice: 'Le roi des animaux, souvent associé à la savane.' },
  { mot: 'dauphin', indice: 'Un mammifère marin, connu pour sa grande intelligence.' },
  { mot: 'kangourou', indice: 'Un marsupial originaire d’Australie.' },
  { mot: 'panda', indice: 'Un ours qui mange principalement du bambou.' },
  { mot: 'aigle', indice: 'Un rapace symbolisant la liberté.' },
  { mot: 'ours', indice: 'Un grand mammifère qui hiberne pendant l’hiver.' },
  { mot: 'tigre', indice: 'Un grand félin avec des rayures distinctives.' },
  { mot: 'girafe', indice: 'L’animal terrestre le plus grand avec un long cou.' }
];

//animaux : Un tableau d'objets contenant des mots à deviner et leurs indices.



let maxErreurs = 6;  //maxErreurs : Le nombre maximal d'erreurs avant la fin du jeu (6 erreurs). 
let erreurs = 0;  // Compteur des erreurs
let lettresDevinees = [];  // Liste des lettres déjà devinées
let motStatus = '';  // Mot en cours de devinette
let reponse = '';  // Réponse du mot à deviner
let indice = '';  // Indice pour l'utilisateur
let jeuTermine = false;  // Indicateur de fin de jeu
let winSound = new Audio('sounds/victoire.wav')
let loseSound = new Audio('sounds/echec.wav')

// Fonction pour initialiser le jeu
function initialiserJeu() {
  choisirMotAleatoire();
  afficherMotDevine();
  afficherIndice();
  mettreAJourErreurs();
  mettreAJourImage();
  document.getElementById('maxErreurs').innerHTML = maxErreurs;
  resetClavier();  // Réinitialiser l'état des lettres sur le clavier
}

// Fonction pour choisir un mot au hasard
function choisirMotAleatoire() {
  const indexAleatoire = Math.floor(Math.random() * animaux.length);  // Choisir un indice au hasard
  reponse = animaux[indexAleatoire].mot;  // Récupérer le mot à deviner
  indice = animaux[indexAleatoire].indice;  // Récupérer l'indice associé
  jeuTermine = false;  // Réinitialiser l'état du jeu
}

// Fonction pour afficher l'indice à l'utilisateur
function afficherIndice() {
  document.getElementById('indice').innerHTML = `Indice : ${indice}`;
}

// Fonction pour gérer un clic sur une lettre
function gererClic(lettreChoisie) {
  if (jeuTermine) return;  // Si le jeu est terminé, on ne fait rien

  if (lettreDejaDevinee(lettreChoisie)) return;  // Si la lettre a déjà été choisie, on ne la sélectionne pas à nouveau

  lettresDevinees.push(lettreChoisie);  // Ajouter la lettre choisie à la liste des lettres devinées
  document.getElementById(lettreChoisie).classList.add('lettre-utilisee');  // Marquer la lettre comme utilisée

  // Vérifier si la lettre est dans la réponse
  if (verifierLettreDansMot(lettreChoisie)) {
    afficherMotDevine();  // Afficher le mot avec les lettres correctement devinées
    verifierVictoire();  // Vérifier si l'utilisateur a gagné
  } else {
    erreurs++;  // Augmenter le nombre d'erreurs
    mettreAJourErreurs();  // Mettre à jour l'affichage des erreurs
    verifierDefaite();  // Vérifier si l'utilisateur a perdu
    mettreAJourImage();  // Mettre à jour l'image en fonction du nombre d'erreurs
  }
}

// Fonction pour vérifier si la lettre a déjà été devinée
function lettreDejaDevinee(lettreChoisie) {
  for (let i = 0; i < lettresDevinees.length; i++) {
    if (lettresDevinees[i] === lettreChoisie) {
      return true;
    }
  }
  return false;
}

// Fonction pour vérifier si la lettre est présente dans le mot
function verifierLettreDansMot(lettreChoisie) {
  for (let i = 0; i < reponse.length; i++) {
    if (reponse[i] === lettreChoisie) {
      return true;
    }
  }
  return false;
}

// Fonction pour mettre à jour l'image en fonction des erreurs
function mettreAJourImage() {
  document.body.style.transition = "background-image 1s ease-in-out";  // Transition douce pour le changement d'image
  document.body.style.backgroundImage = 'url("./images/' + erreurs + '.jpg")';  // Charger l'image correspondant à l'erreur
}

// Fonction pour vérifier si l'utilisateur a gagné
function verifierVictoire() {
  if (motStatus === reponse) {  // Si le mot deviné est complet
    jeuTermine = true;  // Terminer le jeu
    document.getElementById('motDevine').innerHTML = 'Bravo !!! Le mot était : ' + reponse;
    document.body.style.transition = "background-image 1s ease-in-out";
    document.body.style.backgroundImage = 'url("./images/7.jpg")';  // Afficher l'image de victoire
    winSound.play()
  }
}

// Fonction pour vérifier si l'utilisateur a perdu
function verifierDefaite() {
  if (erreurs === maxErreurs) {  // Si l'utilisateur atteint le nombre maximal d'erreurs
    jeuTermine = true;  // Terminer le jeu
    document.getElementById('motDevine').innerHTML = 'Perdu !!! Le mot était : ' + reponse;
    loseSound.play()
  }
 
}

// Fonction pour afficher le mot à deviner
function afficherMotDevine() {
  motStatus = '';  // Réinitialiser le mot à deviner
  for (let i = 0; i < reponse.length; i++) {
    if (lettreDejaDevinee(reponse[i])) {  // Si la lettre a été devinée
      motStatus += reponse[i];
    } else {
      motStatus += ' _ ';  // Sinon, afficher un espace vide
    }
  }
  document.getElementById('motDevine').innerHTML = motStatus;  // Mettre à jour l'affichage du mot
}

// Fonction pour mettre à jour l'affichage des erreurs
function mettreAJourErreurs() {
  document.getElementById('erreurs').innerHTML = erreurs;  // Afficher le nombre d'erreurs
}

// Fonction pour réinitialiser le jeu
function reinitialiserJeu() {
  erreurs = 0;  // Remettre les erreurs à zéro
  lettresDevinees = [];  // Vider la liste des lettres devinées
  jeuTermine = false;  // Réinitialiser l'état du jeu
  choisirMotAleatoire();  // Choisir un nouveau mot
  afficherMotDevine();  // Afficher le mot à deviner
  afficherIndice();  // Afficher l'indice
  mettreAJourErreurs();  // Mettre à jour l'affichage des erreurs
  mettreAJourImage();  // Réinitialiser l'image
  resetClavier();  // Réinitialiser l'état des lettres sur le clavier
}

// Fonction pour réinitialiser l'état du clavier (enlever la classe 'lettre-utilisee')
function resetClavier() {
  // Obtenir toutes les lettres du clavier (celles avec la classe 'lettre')
  let lettres = document.querySelectorAll('.touche');
  
  // Enlever la classe 'lettre-utilisee' de toutes les lettres
  for (let i = 0; i < lettres.length; i++) {
    lettres[i].classList.remove('lettre-utilisee');
  }
}

// Appel initial pour commencer le jeu
initialiserJeu();
