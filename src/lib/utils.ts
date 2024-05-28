import { ElectricScooterRounded } from "@mui/icons-material";
import {
	MOIS,
	Contenu,
	Traitements,
	Traitement,
	CLE_CONTENU,
	CLE_TRAITEMENTS,
} from "./types";

/**
 * Finds the month in a string date YYYY-MM-DDThh:mm or DD-MM-YYYYThh:mm
 * @param date YYYY-MM-DDThh:mm or DD-MM-YYYYThh:mm
 * @returns month in french and abreviated
 */
export function trouveMoisS(date: string): MOIS {
	const morceaux = date.split("T");
	if (morceaux.length === 2) {
		const m2 = morceaux[0].split("-");
		if (m2.length === 3) {
			const mois = m2[1];
			if (mois === "01") return "jan";
			if (mois === "02") return "fev";
			if (mois === "03") return "mar";
			if (mois === "04") return "avr";
			if (mois === "05") return "mai";
			if (mois === "06") return "juin";
			if (mois === "07") return "juil";
			if (mois === "08") return "aou";
			if (mois === "09") return "sep";
			if (mois === "10") return "oct";
			if (mois === "11") return "nov";
			if (mois === "12") return "dec";
			throw new Error(`mois ${mois} intraduisible`);
		} else
			throw new Error(
				`impossible de trouver le mois de cette date : ${date}(split -)`
			);
	} else
		throw new Error(
			`impossible de trouver le mois de la date ${date} (split T)`
		);
}

export function trouveMois(une_date: Date): MOIS {
	const m = une_date.getMonth();
	switch (m) {
		case 0:
			return "jan";
		case 1:
			return "fev";
		case 2:
			return "mar";
		case 3:
			return "avr";
		case 4:
			return "mai";
		case 5:
			return "juin";
		case 6:
			return "juil";
		case 7:
			return "aou";
		case 8:
			return "sep";
		case 9:
			return "oct";
		case 10:
			return "nov";
		case 11:
			return "dec";
		default:
			throw new Error("mois inconnu !");
	}
}

/**
 * Trouve le nom du mois pour le numéro de mois donné (de 1 à 12)
 *
 * @param un_numero_de_mois un numéro de 1 à 12
 * @returns le nom du mois.
 */
export function getMois(un_numero_de_mois: number): MOIS {
	switch (un_numero_de_mois) {
		case 1:
			return "jan";
		case 2:
			return "fev";
		case 3:
			return "mar";
		case 4:
			return "avr";
		case 5:
			return "mai";
		case 6:
			return "juin";
		case 7:
			return "juil";
		case 8:
			return "aou";
		case 9:
			return "sep";
		case 10:
			return "oct";
		case 11:
			return "nov";
		case 12:
			return "dec";
		case 0:
			throw new Error(
				"ne pas utiliser directement getMonth() pour trouver le nom du mois : ajouter +1 (n° de mois en base 1)"
			);
		default:
			throw new Error(`pas de mois pour ce n° "${un_numero_de_mois}"`);
	}
}
export function dummyContent(): Contenu {
	const dd = "1900/01/01T22:22";
	const mm = "jan";
	return {
		date: dd,
		mois: mm,
		duree: "sans",
		impact: "L",
		nuit: false,
		aura: false,
		cephalee: false,
		postdrome: false,
		prodrome: false,
		traitement1: 0,
		nom_t1: "",
		traitement2: 0,
		nom_t2: "",
		traitement3: 0,
		nom_t3: "",
		traitement4: 0,
		nom_t4: "",
		regles: false,
	};
}

export function dummyTraitement(id: number): Traitement {
	return { id: id, nom: "", valide: false };
}

export function dummyTraitements(): Traitements {
	return {
		tt1: dummyTraitement(1),
		tt2: dummyTraitement(2),
		tt3: dummyTraitement(3),
		tt4: dummyTraitement(4),
	};
}

/**
 * Ajoute un contenu dans le local storage du navigateur web
 *
 * @param c le contenu a ajouter au contenu dans le LocalStorage
 */
export function ajouteContenu(c: Contenu) {
	if (window) {
		const contenu = window.localStorage.getItem(CLE_CONTENU);
		if (!contenu) {
			const resu: Contenu[] = [];
			resu.push(c);
			const sav = JSON.stringify(resu);
			window.localStorage.setItem(CLE_CONTENU, sav);
		} else {
			const resu: Contenu[] = JSON.parse(contenu) as Contenu[];
			resu.push(c);
			const sav = JSON.stringify(resu);
			window.localStorage.setItem(CLE_CONTENU, sav);
		}
	}
}

/**
 * lit les enregistrements dans le local storage du navigateur Web
 * et les fournit. Renvoit un tableau vide s'il n'y a aucun contenu
 * dans le local storage.
 * @returns Contenu[] ou []
 */
export function getContenu(): Contenu[] {
	if (window) {
		const contenu = window.localStorage.getItem(CLE_CONTENU);
		let resu: Contenu[];
		if (!contenu) {
			resu = [];
		} else {
			resu = JSON.parse(contenu) as Contenu[];
		}
		return resu;
	} else {
		const resu: Contenu[] = [];
		return resu;
	}
}

/**
 * retrouve les traitements stockés dans le local storage du browser.
 *
 * @returns traitements
 */
export function getTraitements(): Traitements {
	if (window) {
		const med = window.localStorage.getItem(CLE_TRAITEMENTS);
		let resu: Traitements;
		if (!med) {
			resu = dummyTraitements();
		} else {
			resu = JSON.parse(med);
		}
		return resu;
	} else {
		return dummyTraitements();
	}
}

/**
 * Sauve les traitements dans le local storage du browser.
 *
 * @param t traitements
 */
export function sauveTraitements(t: Traitements): void {
	if (window) {
		const med = JSON.stringify(t);
		window.localStorage.setItem(CLE_TRAITEMENTS, med);
	} else {
		throw new Error(
			`ERREUR : window inexistant (${JSON.stringify(t)} non sauvé)`
		);
	}
}

/**
 * Vérifie si les traitements sont dummys
 * @param t traitements
 * @returns vrai si le traitements sont factices (dummy)
 */
export function IsDummyTraitements(t: Traitements): boolean {
	const c1 = !t.tt1.valide && t.tt1.nom.length === 0;
	const c2 = !t.tt2.valide && t.tt2.nom.length === 0;
	const c3 = !t.tt3.valide && t.tt3.nom.length === 0;
	const c4 = !t.tt4.valide && t.tt4.nom.length === 0;
	return c1 && c2 && c3 && c4;
}

/**
 * Analyse le contenu fourni en param
 * et en extrait les différents mois présents (2024 - mai)
 *
 * @param c le contenu tel qu'extrait du local storage
 * @returns un tableau des mois trouvés dans
 * le contenu fourni (ex : 2024 - mai)
 */
export function AnalyseContent(c: Contenu[]): string[] {
	let resu: string[] = [];
	c.map((contenu) => {
		const date = contenu.date;
		const morceaux = date.split("-");
		const annee = morceaux[0];
		const mois = contenu.mois;
		const intitule = `${annee} - ${mois}`;
		if (!resu.includes(intitule)) {
			resu.push(intitule);
		}
	});
	return resu;
}

/**
 * Extrait les contenus de la liste fournie qui correspondent au filtre fourni
 *
 * @param filtre année et mois pour filtrer les contenus (ex : "2024 - fev")
 * @param c liste des contenus venant du local storage.
 * @returns les contenus qui correspondent à l'année et au mois du filtre
 */
export function GetFilteredContent(filtre: string, c: Contenu[]): Contenu[] {
	const resu: Contenu[] = [];
	c.map((contenu) => {
		const date = contenu.date;
		const morceaux = date.split("-");
		const annee = morceaux[0];
		const mois = contenu.mois;
		const intitule = `${annee} - ${mois}`;
		if (intitule === filtre) {
			resu.push(contenu);
		}
	});
	return resu;
}
/**
 * type détaillé d'une ligne de CSV issu de l'URI
 */
type Ligne = {
	date_jour: number;
	date_mois: MOIS;
	date_annee: number;
	time: string;
	booleens: string;
	duree: string;
	regles: string;
	impact: string;
	nuit: string;
	traitement: string;
};

/**
 * Crée une ligne de texte comportant tous les éléments de Ligne
 * séparés par un ; et comportant en fin de texte "\r\n" (saut de ligne)
 *
 * @param ligne la ligne à utiliser pour créer le texte
 * @param numero un numéro qui sera mis en début de texte (ce sera le jour du mois)
 * @param traitements un texte donnant les traitements. Ce texte ne doit pas finir par un ;
 * @param patient le nom du patient qui sera ajouté à la fin de la ligne de texte.
 *
 * @returns texte CSV d'une ligne
 */
function creeCSV(
	ligne: Ligne,
	numero: number,
	traitements?: string,
	patient?: string
): string {
	let resu = "";
	if (ligne.date_jour === numero) {
		resu += numero.toString() + ";";
		resu += ligne.booleens;
		resu += ligne.duree;
		resu += ligne.regles;
		resu += ligne.impact;
		resu += ligne.nuit;
		resu += traitements ? traitements : ligne.traitement;
		resu += patient ? ";" + patient : "";
	}
	return resu + "\r\n";
}

/**
 * type du regroupement de lignes par date du mois.
 */
type ConteneurLigne = {
	date_jour: number;
	date_mois: MOIS;
	date_annee: number;
	lignes: Ligne[];
};

function getCurrentMois(): string {
	const today = new Date();
	const an = today.getFullYear();
	const mois = trouveMois(today);
	return `${an} - ${mois}`;
}

type AN_MOIS = {
	an: number;
	mois: number;
};

function getNumeroMois(m: MOIS) {
	switch (m) {
		case "jan":
			return 1;
		case "fev":
			return 2;
		case "mar":
			return 3;
		case "avr":
			return 4;
		case "mai":
			return 5;
		case "juin":
			return 6;
		case "juil":
			return 7;
		case "aou":
			return 8;
		case "sep":
			return 9;
		case "oct":
			return 10;
		case "nov":
			return 11;
		case "dec":
			return 12;
		default:
			return 0;
	}
}

/**
 * Transforme un texte AN - mois en couple de nombres (an et mois)
 *
 * @param an_mois une chaine de filtre sous forme 2024 - jan
 * @returns un couple contenant l'année et le mois en nombre
 */
function getAN_MOIS(an_mois: string): AN_MOIS {
	const m = an_mois.split(" - ");
	if (m.length !== 2) {
		throw new Error(
			`getAN_MOIS couldn't transform this string "${an_mois}"`
		);
	}
	const mm = m[1] as MOIS;
	const resu: AN_MOIS = {
		an: Number(m[0]),
		mois: getNumeroMois(mm),
	};
	return resu;
}

/**
 * on fusionne le champ nuit s'il y a plusieurs enregistrements pour un jour.
 *
 * @param lines les différents enregistrements pour la même journée
 */
function jointNuit(lines: Ligne[]): string {
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].nuit !== ";") {
			return lines[i].nuit;
		}
	}
	// ici on a nuit qui est à false partout donc on renvoie vide.
	return ";";
}

/**
 * on fusionne le champ Règles s'il y a plusieurs enregistrements pour un jour.
 *
 * @param lines les différents enregistrements pour la même journée
 * @returns le champ fusionné
 */
function jointRegles(lines: Ligne[]): string {
	for (let i = 0; i < lines.length; i++) {
		const r = lines[i].regles;
		if (r !== ";") {
			console.log("regles", r);
			return r;
		}
	}
	// sinon règles est à false partout et on renvoie donc vide
	return ";";
}

/**
 * on combine les différents champs Traitement en un seul (séparé par " - ").
 *
 * @param lines les différents enregistrements pour la même journée
 * @returns le champ fusionné
 */
function jointTraitements(lines: Ligne[]): string {
	let new_trait: string = "";
	for (let i = 0; i < lines.length; i++) {
		const t = lines[i].traitement;
		if (i === lines.length - 1) {
			new_trait += t;
		} else {
			new_trait += t + " - ";
		}
	}
	return new_trait;
}

/**
 * on fusionne les différents impacts en un seul (en prenant le plus élevé).
 *
 * @param lines les différents enregistrements pour la même journée
 * @returns le champ fusionné
 */
function jointImpacts(lines: Ligne[]): string {
	// 0 pour L ; 1 pour M et 2 pour Intense
	let new_impact: number = 0;
	for (let i = 0; i < lines.length; i++) {
		const impact_lu = lines[i].impact;

		if (impact_lu === "M;") {
			if (new_impact < 1) {
				// on crante M
				new_impact = 1;
			}
		} else if (impact_lu === "I;") {
			// le plus élevé l'emporte : pas la peine de lire les autres impacts.
			return "I;";
		}
		// sinon, impact_lu === "L" et on a déjà une valeur stockée (0 ou 1).
		// on continue de lire les autres impacts.
	}
	// bilan final : s'il n'y avait que des L on renvoie L et sinon on renvoie M
	if (new_impact === 0) {
		return "L;";
	} else {
		return "M;";
	}
}

/**
 * Synthétise les valeurs des 4 booleens au vu des différents enregistrements.
 *
 * @param lines les différents enregistrements pour la même journée
 * @returns un champ de 4 booleens dont les valeurs sont des "ou logiques"
 * de toutes les valeurs des différents enregistrements.
 */
function jointBooleens(lines: Ligne[]): string {
	let b1: string = "";
	let b2: string = "";
	let b3: string = "";
	let b4: string = "";
	for (let i = 0; i < lines.length; i++) {
		const b = lines[i].booleens;
		const m = b.split(";");
		if (m.length != 5) {
			throw new Error(`Il faut 5 booléens : "${b}" et il n'y en a que ${m.length}`);
		} else {
			if (m[0] !== "") {
				if (b1 === "") {
					b1 = m[0];
				}
			}
			if (m[1] !== "") {
				if (b2 === "") {
					b2 = m[1];
				}
			}
			if (m[2] !== "") {
				if (b3 === "") {
					b3 = m[2];
				}
			}
			if (m[3] !== "") {
				if (b4 === "") {
					b4 = m[3];
				}
			}
		}
	}
	return `${b1};${b2};${b3};${b4};`;
}

/**
 * Agrégation des différents enregistrements pour une même journée.
 *
 * @param lines les enreg de la journée
 * @returns un enreg qui est la fusion de toutes les informations des
 * différents enreg.
 */
function agregePlusieursLignes(lines: Ligne[]): Ligne {
	const an = lines[0].date_annee;
	const mois = lines[0].date_mois;
	const jour = lines[0].date_jour;

	let resu: Ligne = {
		booleens: jointBooleens(lines),
		date_annee: an,
		date_mois: mois,
		date_jour: jour,
		//NOTE on choisit de ne pas combiner différentes durées ensemble ... on prend la première.
		duree: lines[0].duree,
		impact: jointImpacts(lines),
		nuit: jointNuit(lines),
		regles: jointRegles(lines),
		//NOTE on choisit de ne pas combiner différents horaires des enreg: on prend le premier.
		time: lines[0].time,
		traitement: jointTraitements(lines),
	};
	return resu;
}

/**
 * Récupère les données CSV de l'URI et les met sous la forme d'un calendrier de 31 jours.
 *
 * @param data les données csv issues de @see {@link MiseEnCSVContenu }
 * @returns le joli calendrier csv
 */
export function FabriqueCalendrierCSV(
	data: string,
	nom_patient: string,
	mois?: string | null
): string {
	let mois_choisi = mois;
	if (!mois_choisi || mois_choisi === "X") {
		mois_choisi = getCurrentMois();
	}
	const an_mois = getAN_MOIS(mois_choisi);
	const regroup: ConteneurLigne[] = TrouveLignes(data, an_mois);
	// soit le regroup ne contient aucune ligne ou il en contient
	let resu_csv: string = creeCSV(
		regroup[0].lignes[0],
		0,
		undefined,
		nom_patient
	);
	for (let i: number = 1; i <= 31; i++) {
		const lgs = trouveLigneDujourDansContenu(regroup, i);
		if (!lgs) {
			resu_csv += `${i};;;;;;;;;;${nom_patient}\r\n`;
		} else {
			const nb_lignes = lgs.lignes.length;
			if (nb_lignes > 1) {
				const new_ligne: Ligne = agregePlusieursLignes(lgs.lignes);
				resu_csv += creeCSV(new_ligne, i, undefined, nom_patient);
			} else if(nb_lignes === 1) {
				resu_csv += creeCSV(lgs.lignes[0], i, undefined, nom_patient);
			} else {
				throw new Error(`Bizarre : nb lignes est à 0 !! ${nb_lignes}`);
			}
		} 
	}
	return resu_csv;
}

/**
 * Exploite un conteneur filtré obtenu avec {@link TrouveLignes}
 * @param conteneur le conteneur (filtré) a exploiter
 * @param jour le numéro du jour à trouver
 * @returns les lignes ou undefined si le conteneur ne contient pas ce jour.
 */
function trouveLigneDujourDansContenu(
	conteneur: ConteneurLigne[],
	jour: number
): ConteneurLigne | undefined {
	const resu = conteneur.filter((element) => element.date_jour === jour);
	//console.log(`resu ${jour}`, resu);
	if (resu.length === 0) {
		return undefined;
	} else {
		if (resu.length !== 1) {
			throw new Error(
				`attention il y a plus de 1 conteneurLigne pour 1 jour !! (${JSON.stringify(
					resu
				)})`
			);
		} else {
			return resu[0];
		}
	}
}

/**
 * Il peut y avoir plusieurs traitements par jour : on va récupérer les lignes du CSV
 * et regrouper les traitements qui sont au même jour.
 * @param data le CSV
 * @returns les lignes issues du CSV
 */
function TrouveLignes(data: string, an_mois: AN_MOIS): ConteneurLigne[] {
	let lignes: Ligne[] = [];
	let conteneur: ConteneurLigne[] = [];
	const m = data.split("\r\n");
	if (m.length > 0) {
		// analyse des lignes brutes
		m.map((l) => {
			const m1 = l.split(";");
			if (m1.length > 0 && m1[0].length > 0) {
				const ligne: Ligne | undefined = analyseLigne(m1, an_mois);
				if (ligne) lignes.push(ligne);
			}
		});

		// on va saisir ces lignes dans un conteneur qui regroupe les lignes par dates
		lignes.forEach((element) => {
			if (conteneur.length === 0) {
				// on saisit directement la ligne dans le conteneur qui est vide
				let cont: ConteneurLigne = {
					date_annee: element.date_annee,
					date_mois: element.date_mois,
					date_jour: element.date_jour,
					lignes: [element],
				};
				conteneur.push(cont);
			} else {
				// le conteneur est plein. On le parcourt jusqu'à trouver la bonne date.
				let trouve = false;
				conteneur.forEach((c) => {
					if (trouve) return;
					if (
						c.date_annee === element.date_annee &&
						c.date_mois === element.date_mois &&
						c.date_jour === element.date_jour
					) {
						c.lignes.push(element);
						trouve = true;
					}
				});

				if (!trouve) {
					// cette date ne se trouve pas dans le conteneur :
					// on va créer une nouvelle entrée.
					let cont: ConteneurLigne = {
						date_annee: element.date_annee,
						date_mois: element.date_mois,
						date_jour: element.date_jour,
						lignes: [element],
					};
					conteneur.push(cont);
				}
			}
		});
	}
	return conteneur;
}

/**
 * Crée un Ligne à partir de la décomposition d'une ligne CSV
 *
 * @param elt un élément comportant la décomposition de la ligne CSV issue de l'URI
 * @param an_mois un filtre (un année et un mois)
 * @returns undefined si le filtre n'a pas marché ou la Ligne si l'élément répond au filtre
 */
function analyseLigne(elt: string[], an_mois: AN_MOIS): Ligne | undefined {
	let line: Ligne;
	// elt comporte date/heure, 4 booleens(prodrome,aura,ceph et postdrom), durée, regles, impact, nuit et traitements
	let m: MOIS;
	let morceaux: string[] = ["", ""];
	// on peut appeler cette fonction avec les en-têtes : dans ce cas, on produit un Ligne en-tête
	// qiu comporte juste l'année et le mois du filtre.
	if (elt[0] === "DATE") {
		m = getMois(an_mois.mois);
		line = {
			date_annee: an_mois.an,
			date_mois: m,
			date_jour: Number(0),
			time: "HEURE",
			booleens: elt[1] + ";" + elt[2] + ";" + elt[3] + ";" + elt[4] + ";",
			duree: elt[5] + ";",
			regles: elt[6] + ";",
			impact: elt[7] + ";",
			nuit: elt[8] + ";",
			traitement: elt[9],
		};
	} else {
		m = trouveMoisS(elt[0]);
		morceaux = elt[0].split("T");
		const date_morceaux = morceaux[0].split("-");
		const annee_lue = Number(date_morceaux[0]);
		const mois_lu = Number(date_morceaux[1]);

		if (annee_lue === an_mois.an && mois_lu === an_mois.mois) {
			line = {
				date_annee: Number(date_morceaux[0]),
				date_mois: m,
				date_jour: Number(date_morceaux[2]),
				time: morceaux[1],
				booleens:
					elt[1] + ";" + elt[2] + ";" + elt[3] + ";" + elt[4] + ";",
				duree: elt[5] + ";",
				regles: elt[6] + ";",
				impact: elt[7] + ";",
				nuit: elt[8] + ";",
				traitement: elt[9],
			};
		} else {
			return undefined;
		}
	}
	return line;
}

/**
 * Met un contenu sous la forme d'une ligne de texte CSV (items séparés par ;).
 *
 * @param item un contenu à mettre en forme de CSV
 * @returns le contenu sous forme d'une ligne CSV (string) : date;Pr ou rien;A ou rien;C;Po;duree
 * ;R;impact;N;traitements suivi de \r\n
 */
export function MiseEnCSVContenu(item: Contenu | undefined) {
	let resu = "";
	if (!item) {
		resu += "DATE;";
		resu += "PRODROME;";
		resu += "AURA;";
		resu += "CEPHALEE;";
		resu += "POSTDROME;";
		resu += "DUREE;";
		resu += "REGLES;";
		resu += "IMPACT;";
		resu += "NUIT;";
		resu += "TRAITEMENT";
		resu += "\r\n";
		return resu;
	}

	resu += `${item.date};`;
	resu += item.prodrome ? "Pr;" : ";";
	resu += item.aura ? "A;" : ";";
	resu += item.cephalee ? "C;" : ";";
	resu += item.postdrome ? "Po;" : ";";
	resu += `${item.duree};`;
	resu += item.regles ? "R;" : ";";
	resu += `${item.impact};`;
	resu += item.nuit ? "N;" : ";";
	const nom1 = Buffer.from(item.nom_t1, "utf-8").toString();
	const nom2 = Buffer.from(item.nom_t2, "utf-8").toString();
	const nom3 = Buffer.from(item.nom_t3, "utf-8").toString();
	const nom4 = Buffer.from(item.nom_t4, "utf-8").toString();
	if (nom1 !== "" && item.traitement1 > 0) {
		// t1 non vide
		resu += `${nom1}:${item.traitement1}`;
		if (nom2 !== "" && item.traitement2 > 0) {
			// t1 non vide et t2 non vide
			resu += ` // ${nom2}:${item.traitement2}`;
			if (nom3 !== "" && item.traitement3 > 0) {
				// t1 non vide et t2 non vide et t3 non vide
				resu += ` // ${nom3}:${item.traitement3}`;
				if (nom4 !== "" && item.traitement4 > 0) {
					// t1 non vide et t2 non vide et t3 non vide et t4 non vide
					resu += ` // ${nom4}:${item.traitement4}`;
				} else {
					//t4 vide
					// t1 non vide et t2 non vide et t3 non vide
					// on a fini
				}
			} else {
				// t1 non vide et t2 non vide et t3 vide
				if (nom4 !== "" && item.traitement4 > 0) {
					resu += ` // ${nom4}:${item.traitement4}`;
					// t1 non vide et t2 non vide et t3 vide et t4 non vide
				} else {
					// t1 non vide et t2 non vide et t3 vide et t4 vide
				}
			}
		} else {
			// t1 non vide et t2 vide
			if (item.traitement3 > 0 && nom3 !== "") {
				// t1 non vide et t2 vide et t3 non vide
				resu += ` // ${nom3}:${item.traitement3}`;
				if (nom4 !== "" && item.traitement4 > 0) {
					// t1 non vide et t2 vide et t3 non vide et t4 non vide
					resu += ` // ${nom4}:${item.traitement4}`;
				} else {
					// t1 non vide et t2 vide et t3 non vide et t4 vide
					// on a fini
				}
			} else {
				// t1 non vide et t2 vide et t3 vide
				if (nom4 !== "" && item.traitement4 > 0) {
					// t1 non vide et t2 vide et t3 vide et t4 non vide
					resu += ` // ${nom4}:${item.traitement4}`;
				} else {
					// t1 non vide et t2 vide et t3 vide et t4 vide
					// on a fini
				}
			}
		}
	} else {
		// t1 vide
		if (nom2 !== "" && item.traitement2 > 0) {
			// t1 vide et t2 non vide
			resu += `${nom2}:${item.traitement2}`;
			if (nom3 !== "" && item.traitement3 > 0) {
				// t1 vide et t2 non vide et t3 non vide
				resu += ` // ${nom3}:${item.traitement3}`;
				if (nom4 !== "" && item.traitement4 > 0) {
					// t1 vide et t2 non vide et t3 non vide et t4 non vide
					resu += ` // ${nom4}:${item.traitement4}`;
				} else {
					// t1 vide et t2 non vide et t3 non vide et t4 vide
					// on a fini
				}
			} else {
				// t1 vide et t2 non vide et t3 vide
				if (nom4 !== "" && item.traitement4 > 0) {
					// t1 vide et t2 non vide et t3 vide et t4 non vide
					resu += ` // ${nom4}:${item.traitement4}`;
				} else {
					// t1 vide et t2 non vide et t3 vide et t4 vide
					// fini !
				}
			}
		} else {
			// t1 vide et t2 vide
			if (nom3 !== "" && item.traitement3 > 0) {
				// t1 vide et t2 vide et t3 non vide
				resu += `${nom3}:${item.traitement3}`;
				if (nom4 !== "" && item.traitement4 > 0) {
					// t1 vide et t2 vide et t3 non vide et t4 non vide
					resu += ` // ${nom4}:${item.traitement4}`;
				} else {
					// t1 vide et t2 vide et t3 non vide et t4 vide
					// fini !
				}
			} else {
				// t1 vide et t2 vide et t3 vide
				if (nom4 !== "" && item.traitement4 > 0) {
					// t1 vide et t2 vide et t3 vide et t4 non vide
					resu += `${nom4}:${item.traitement4}`;
				} else {
					// t1 vide et t2 vide et t3 vide et t4 vide : tout est vide !!
					resu += "//";
				}
			}
		}
	}
	resu += "\r\n";
	return resu;
}
