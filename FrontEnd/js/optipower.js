//travaux.js

let travaux = localStorage.getItem("travaux");

if (travaux === null) {
  travaux = await fetch("http://localhost:5678/api/works").json();
  localStorage.setItem("travaux", JSON.stringify(travaux));
} else {
  travaux = JSON.parse(travaux);
}

export { travaux };

export function afficherTravaux(travaux) {
  const galerie = document.querySelector(".galerie");
  galerie.innerHTML = "";

  for (let i = 0; i < travaux.length; i++) {
    const travail = travaux[i];
    const travauxElement = document.createElement("figure");
    travauxElement.dataset.id = travail.id;
    travauxElement.setAttribute("class", `apparition apparition--${i + 1}`);
    const imageElement = document.createElement("img");
    imageElement.src = travail.imageUrl;
    imageElement.alt = travail.title;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = travail.title;
    galerie.appendChild(travauxElement);
    travauxElement.appendChild(imageElement);
    travauxElement.appendChild(titleElement);
  }
}

const ensembleCategories = new Set();
for (let i = 0; i < travaux.length; i++) {
  ensembleCategories.add(travaux[i].category.name);
}

export function genererBoutonsFiltres() {
  creerBoutonFiltre("Tous");

  for (let categorie of ensembleCategories) {
    creerBoutonFiltre(categorie);
  }
}

function creerBoutonFiltre(categorie) {
  const conteneur = document.querySelector(".boutons-filtre");
  const bouton = document.createElement("button");
  bouton.textContent = categorie;

  if (categorie === "Tous") {
    bouton.setAttribute("aria-label", "Afficher tous les travaux");
  } else {
    bouton.setAttribute(
      "aria-label",
      `Filtrer les travaux pour afficher les travaux de la catégorie ${categorie}`
    );
  }

  conteneur.appendChild(bouton);

  bouton.addEventListener("click", () => {
    console.log("Vous avez cliqué sur le bouton : " + categorie);

    const filtredtravaux = travaux.filter(function (travauxElement) {
      if (categorie === "Tous") {
        return true;
      } else {
        return travauxElement.categorie.name === categorie;
      }
    });

    document.querySelector(".galerie").innerHTML = "";
    afficherTravaux(filtredtravaux);
  });
}