export const CLE_ID = "v_mig";
export const CurrentVersion = "V1";
export const CLE_CONTENU = "mig_content";
export const CLE_TRAITEMENTS = "mig_trt";

export type MOIS =
	| "jan"
	| "fev"
	| "mar"
	| "avr"
	| "mai"
	| "juin"
	| "juil"
	| "aou"
	| "sep"
	| "oct"
	| "nov"
	| "dec";

export type IMPACT = "L" | "M" | "I";

export type Contenu = {
	date: Date;
	mois: MOIS;
	prodrome?: boolean;
	aura?: boolean;
	cephalee?: boolean;
	postdrome?: boolean;
	duree: string;
	nuit?: boolean;
	impact: IMPACT;
	traitement_1: string;
	traitement_2: string | undefined;
	traitement_3: string | undefined;
	traitement_4: string | undefined;
};

export type Traitements = {
	id: number;
	nom: string;
}[];

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
	const dd = new Date(1900, 0, 1);
	const mm = trouveMois(dd);
	return {
		date: dd,
		mois: mm,
		duree: "sans",
		impact: "L",
		traitement_1: "trt 1",
		nuit: false,
		traitement_2: undefined,
		traitement_3: undefined,
		traitement_4: undefined,
		aura: false,
		cephalee: false,
		postdrome: false,
		prodrome: false,
	};
}

export function dummyTraitement(): Traitements {
    return [
			{ id: 1, nom: "trt 1" },
			{ id: 2, nom: "trt 2" },
			{ id: 3, nom: "trt 3" },
			{ id: 4, nom: "trt 4" },
		];
}
