export const CLE_CONTENU = "mig_content";
export const CLE_TRAITEMENTS = "mig_trt";
export const CLE_PATIENT = "pat_name";

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

export type IMPACT = "L" | "M" | "I" | "";

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
	nom_t1: string;
	traitement2: number;
	nom_t2: string;
	traitement3: number;
	nom_t3: string;
	traitement4: number;
	nom_t4: string;
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

