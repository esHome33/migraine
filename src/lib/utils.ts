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

export function dummyTraitements(): Traitements {
	return {
		tt1: { id: 1, nom: "", valide: false },
		tt2: { id: 2, nom: "", valide: false },
		tt3: { id: 3, nom: "", valide: false },
		tt4: { id: 4, nom: "", valide: false },
	};
}

export function dummyTraitement(id: number): Traitement {
	return { id: id, nom: "", valide: false };
}

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
 * lit les enregistrements dans le local storage et les fournit. Renvoit
 * un tableau vide s'il n'y a aucun contenu dans le local storage.
 * @returns Contenu[] ou []
 */
export function getContenu() {
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
 * retrouve les traitements stockés dans le local storage.
 * @returns traitements
 */
export function getTraitements() {
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
 * Sauve les traitements dans le local storage
 * @param t traitements
 */
export function sauveTraitements(t: Traitements) {
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
 * et en extrait les différents mois présents
 *
 * @param c le contenu tel qu'extrait du local storage
 * @returns un tableau des mois trouvés dans
 * le contenu fourni
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
 * type du regroupement de lignes par date du mois.
 */
type ConteneurLigne = {
	date_jour: number;
	date_mois: MOIS;
	date_annee: number;
	lignes: Ligne[];
};

/**
 * Récupère les données CSV de l'URI et les met sous la forme d'un calendrier de 31 jours.
 *
 * @param data les données csv issues de @see {@link MiseEnCSVContenu }
 * @returns le joli calendrier csv
 */
export function FabriqueCalendrierCSV(
	data: string,
	nom_patient: string
): string {
	const regroup: ConteneurLigne[] = TrouveLignes(data);
	console.log('regroupement : ', regroup);
	let resu_csv: string = "";
	//TODO utiliser les regroupements pour constituer 31 lignes de CSV
	for (let i: number = 0; i < 31; i++) {
		// regrouper les items par jour (en globalisant les traitements)
		// créer tous les jours dans le calendrier, y compris ceux où il n'y a rien
	}
	return resu_csv;
}

/**
 * il peut y avoir plusieurs traitements par jour : on va récupérer les lignes du CSV
 * et regrouper les traitements qui sont au même jour.
 * @param data le CSV
 * @returns les lignes issues du CSV
 */
function TrouveLignes(data: string): ConteneurLigne[] {
	let lignes: Ligne[] = [];
	let conteneur: ConteneurLigne[] = [];
	const m = data.split("\r\n");
	if (m.length > 0) {
		// analyse des lignes brutes
		m.map((l) => {
			const m1 = l.split(";");
			if (m1.length > 0 && m1[0].length > 0) {
				const ligne: Ligne = analyseLigne(m1);
				lignes.push(ligne);
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

function analyseLigne(elt: string[]): Ligne {
	let line: Ligne;
	// elt comporte date/heure, 4 booleens, durée, regles, impact, nuit et traitements
	let m: MOIS;
	let morceaux: string[] = ["", ""];
	if (elt[0] === "DATE") {
		m = "jan";
		line = {
			date_annee: Number(0),
			date_mois: m,
			date_jour: Number(0),
			time: "HEURE",
			booleens: elt[1] + ";" + elt[2] + ";" + elt[3] + ";" + elt[4] + ";",
			duree: elt[5] + ";",
			regles: elt[6] + ";",
			impact: elt[7] + ";",
			nuit: elt[8] + ";",
			traitement: elt[9]+ ";",
		};
	} else {
		m = trouveMoisS(elt[0]);
		morceaux = elt[0].split("T");
		const date_morceaux = morceaux[0].split("-");
		line = {
			date_annee: Number(date_morceaux[0]),
			date_mois: m,
			date_jour: Number(date_morceaux[2]),
			time: morceaux[1],
			booleens: elt[1] + ";" + elt[2] + ";" + elt[3] + ";" + elt[4] + ";",
			duree: elt[5] + ";",
			regles: elt[6] + ";",
			impact: elt[7] + ";",
			nuit: elt[8] + ";",
			traitement: elt[9] + ";",
		};
	}
	return line;
}

/**
 * Met un contenu sous la forme d'une ligne de texte CSV
 *
 * @param item un contenu à mettre en forme de CSV
 * @returns le contenu sous forme d'une ligne CSV (string)
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
	resu += item.prodrome ? "T;" : "F;";
	resu += item.aura ? "T;" : "F;";
	resu += item.cephalee ? "T;" : "F;";
	resu += item.postdrome ? "T;" : "F;";
	resu += `${item.duree};`;
	resu += item.regles ? "T;" : "F;";
	resu += `${item.impact};`;
	resu += item.nuit ? "T;" : "F;";
	const nom1 = Buffer.from(item.nom_t1, "latin1").toString();
	const nom2 = Buffer.from(item.nom_t2, "latin1").toString();
	const nom3 = Buffer.from(item.nom_t3, "latin1").toString();
	const nom4 = Buffer.from(item.nom_t4, "latin1").toString();
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
