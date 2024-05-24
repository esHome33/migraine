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
	date: string;
	mois: MOIS;
	prodrome: boolean;
	aura: boolean;
	cephalee: boolean;
	postdrome: boolean;
	duree: string;
	nuit: boolean;
	regles: boolean;
	impact: IMPACT;
	traitement1: number;
	traitement2: number;
	traitement3: number;
	traitement4: number;
};

export type Traitements = {
	tt1: Traitement;
	tt2: Traitement;
	tt3: Traitement;
	tt4: Traitement;
};

export type Traitement = {
	id: number;
	nom: string;
	valide: boolean;
};

