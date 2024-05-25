import { MOIS, Contenu, Traitements, Traitement, CLE_CONTENU, CLE_TRAITEMENTS } from "./types";


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
		traitement2: 0,
		traitement3: 0,
		traitement4: 0,
		regles:false
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
			const resu: Contenu[] = []
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

export function sauveTraitements(t: Traitements) {
	if (window) {
		const med = JSON.stringify(t);
		window.localStorage.setItem(CLE_TRAITEMENTS, med);
	} else {
		throw new Error(`ERREUR : window inexistant (${JSON.stringify(t)} non sauvé)`);
		
	}
}

export function IsDummyTraitements(t: Traitements):boolean {
	const c1 = !t.tt1.valide && t.tt1.nom.length === 0;
	const c2 = !t.tt2.valide && t.tt2.nom.length === 0;
	const c3 = !t.tt3.valide && t.tt3.nom.length === 0;
	const c4 = !t.tt4.valide && t.tt4.nom.length === 0;
	return c1 && c2 && c3 && c4;
}