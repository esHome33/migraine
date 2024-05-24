'use client';

import { Contenu, IMPACT, Traitements } from '@/lib/types';
import { FormControlLabel, Checkbox, Typography, TextField } from '@mui/material';
import React, { useState } from 'react'
import Traitem from './traitemt';
import { trouveMoisS } from '@/lib/utils';

type Props = {
    validate: (contenu: Contenu) => void;
    traitements: Traitements;
}



const MigraineItem = (props: Props) => {

    const myTraitements = props.traitements;

    const obtientDate = (d: Date) => {
        const ds = d.toLocaleString();
        const m1 = ds.split(" ");
        if (m1.length === 2) {
            const date = m1[0];
            const heure = m1[1];
            const m2 = date.split("/");
            if (m2.length === 3) {
                const h1 = heure.split(":");
                if (h1.length === 3) {
                    const month_obtained = d.getMonth();
                    let mois: string;
                    if (month_obtained.toString().length === 1) {
                        mois = `0${month_obtained}`;
                    } else {
                        mois = `${month_obtained}`;
                    }
                    const resu = d.getFullYear() + "-" + mois + "-" + d.getDate() + "T" + h1[0] + ":" + h1[1];
                    console.log("***");
                    return resu;
                } else throw new Error(`PB split : avec cette heure ${heure}`);
            } else throw new Error(`PB split - avec cette date ${date}`);
        } else throw new Error(`PB avec cette date ${ds}`);

    }
    const madate = obtientDate(new Date());

    const [prodrome1, setProdrome1] = useState<boolean>(false);
    const [aura2, setAura2] = useState<boolean>(false);
    const [cephalee3, setCephalee3] = useState<boolean>(true);
    const [postdrome4, setPostdrome4] = useState<boolean>(false);
    const [regles5, setRegles5] = useState<boolean>(false);
    const [nuit6, setNuit6] = useState<boolean>(false);
    const [_t1, setT1] = useState<boolean>(false);
    const [qte1, setQte1] = useState<number>(0);
    const [_t2, setT2] = useState<boolean>(false);
    const [qte2, setQte2] = useState<number>(0);
    const [_t3, setT3] = useState<boolean>(false);
    const [qte3, setQte3] = useState<number>(0);
    const [_t4, setT4] = useState<boolean>(false);
    const [qte4, setQte4] = useState<number>(0);
    const [duree, setDuree] = useState<string>("2 h");
    const [impact, setImpact] = useState<IMPACT>("M");
    const [datee, setDatee] = useState<string>(madate);

    /**
     * décrit l'impact I, L ou M
     * @returns une description de l'impact
    */
    const traduitImpact = (): string => {
        if (impact === "I") {
            return "INTENSE";
        } else if (impact === "L") {
            return "LEGER";
        } else {
            return "MODERE";
        }
    }

    const chg_date = (e: any) => {
        const f = e.target.value;
        console.log(`date retenue ${f}`);
        setDatee(f);
        props.validate(cree_contenu("date", f, false, 0, "L"));
    }

    const c_l = "#a7ff9f";
    const c_m = "#fcffbf";
    const c_i = "#ffdebf";
    let cn: string = "bg-[#a7ff9f] rounded-lg h-12 w-44 px-2 mt-2";
    const [couleur, setCouleur] = useState<string>(cn);

    const modifieImpact = () => {
        if (impact === "I") {
            setImpact("L");
            cn = "bg-[#a7ff9f] rounded-lg h-12 w-44 px-2 mt-2";
            setCouleur(cn);
            props.validate(cree_contenu("impact", "", false, 0, "L"));
        } else if (impact === "L") {
            setImpact("M");
            cn = "bg-[#fcffbf] rounded-lg h-12 w-44 px-2 mt-2";
            setCouleur(cn);
            props.validate(cree_contenu("impact", "", false, 0, "M"));
        } else {
            setImpact("I");
            cn = "bg-[#ffdebf] rounded-lg h-12 w-44 px-2 mt-2";
            setCouleur(cn);
            props.validate(cree_contenu("impact", "", false, 0, "I"));
        }
    }

    const checker = (qui: number) => {
        if (qui === 1) {
            setProdrome1(!prodrome1);
            props.validate(cree_contenu("prodrome", "", !prodrome1, 0, "L"));
        } else if (qui === 2) {
            setAura2(!aura2);
            props.validate(cree_contenu("aura", "", !aura2, 0, "L"));
        } else if (qui === 3) {
            setCephalee3(!cephalee3);
            props.validate(cree_contenu("cephalee", "", !cephalee3, 0, "L"));
        } else if (qui === 4) {
            setPostdrome4(!postdrome4);
            props.validate(cree_contenu("postdrome", "", !postdrome4, 0, "L"));
        } else if (qui === 5) {
            setRegles5(!regles5);
            props.validate(cree_contenu("regles", "", !regles5, 0, "L"));
        } else if (qui === 6) {
            setNuit6(!nuit6);
            props.validate(cree_contenu("nuit", "", !nuit6, 0, "L"));
        }
    }

    const changeDuree = (duree: string) => {
        setDuree(duree);
        props.validate(cree_contenu("duree", duree, false, 0, "L"));
    }

    const enreg_traitement = (numero: number, check: boolean, qte: number | "") => {
        console.log(`enreg de T${numero} : ${check} qté ${qte}`);
        let qte_enregistree: number;
        if (qte === "") {
            qte_enregistree = 0;
        } else {
            qte_enregistree = qte;
        }
        if (numero === 1) {
            setQte1(qte_enregistree);
            setT1(check);
            props.validate(cree_contenu("traitement1", "", false, qte_enregistree, "L"));
        } else if (numero === 2) {
            setQte2(qte_enregistree);
            setT2(check);
            props.validate(cree_contenu("traitement2", "", false, qte_enregistree, "L"));
        } else if (numero === 3) {
            setQte3(qte_enregistree);
            setT3(check);
            props.validate(cree_contenu("traitement3", "", false, qte_enregistree, "L"));
        } else if (numero === 4) {
            setQte4(qte_enregistree);
            setT4(check);
            props.validate(cree_contenu("traitement4", "", false, qte_enregistree, "L"));
        }
    }

    const cree_contenu = (nom_champ: string, string: string, bool: boolean, number: number, new_impact: IMPACT) => {
        const m = trouveMoisS(datee);
        const resu: Contenu = {
            date: datee,
            mois: m,
            duree: duree,
            impact: impact,
            traitement1: qte1,
            traitement2: qte2,
            traitement3: qte3,
            traitement4: qte4,
            aura: aura2,
            cephalee: cephalee3,
            nuit: nuit6,
            postdrome: postdrome4,
            prodrome: prodrome1,
            regles: regles5
        }
        if (nom_champ === "date") {
            resu.date = string;
            resu.mois = trouveMoisS(string);
        } else if (nom_champ === "duree") {
            resu.duree = string;
        } else if (nom_champ === "impact") {
            resu.impact = new_impact;
        } else if (nom_champ === "traitement1") {
            resu.traitement1 = number;
        } else if (nom_champ === "traitement2") {
            resu.traitement2 = number;
        } else if (nom_champ === "traitement3") {
            resu.traitement3 = number;
        } else if (nom_champ === "traitement4") {
            resu.traitement4 = number;
        } else if (nom_champ === "aura") {
            resu.aura = bool;
        } else if (nom_champ === "cephalee") {
            resu.cephalee = bool;
        } else if (nom_champ === "nuit") {
            resu.nuit = bool;
        } else if (nom_champ === "postdrome") {
            resu.postdrome = bool;
        } else if (nom_champ === "prodrome") {
            resu.prodrome = bool;
        } else if (nom_champ === "regles") {
            resu.regles = bool;
        } else throw new Error(`vérifie ce champ de crotte : ${nom_champ} `);

        return resu;
    }


    return (
        <div className='flex flex-col space-y-4'>

            <div className='flex flex-col sm:flex-row space-y-2 sm:space-x-3'>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={prodrome1}
                            onChange={() => checker(1)}
                        />
                    }
                    label="Prodrome"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={aura2}
                            onChange={() => checker(2)}
                        />
                    }
                    label="Aura"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={cephalee3}
                            onChange={() => checker(3)}
                        />
                    }
                    label="Céphalée"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={postdrome4}
                            onChange={() => checker(4)}
                        />
                    }
                    label="Postdrome"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={regles5}
                            onChange={() => checker(5)}
                        />
                    }
                    label="Règles"
                />

            </div>

            <div className='flex flex-col sm:flex-row space-y-2 sm:space-x-3 align-middle justify-start'>
                <button
                    onClick={modifieImpact}
                    className={couleur}
                >
                    <Typography>
                        Impact:  {traduitImpact()}
                    </Typography>
                </button>

                <TextField
                    label="durée"
                    variant='filled'
                    size="small"
                    className='w-fit'
                    value={duree}
                    onChange={(e) => {
                        e.preventDefault();
                        changeDuree(e.target.value);
                    }}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={nuit6}
                            onChange={() => checker(6)}
                        />
                    }
                    label="Nuit"
                />

            </div>

            <div className='flex flex-col sm:flex-row space-y-2 sm:space-x-3 align-bottom justify-start'>
                <Typography className='mt-4 mr-2'>Traitements</Typography>

                <Traitem
                    traitement={myTraitements.tt1}
                    key={1}
                    enregistreur={enreg_traitement}
                />
                <Traitem
                    traitement={myTraitements.tt2}
                    key={2}
                    enregistreur={enreg_traitement}
                />
                <Traitem
                    traitement={myTraitements.tt3}
                    key={3}
                    enregistreur={enreg_traitement}
                />
                <Traitem
                    traitement={myTraitements.tt4}
                    key={4}
                    enregistreur={enreg_traitement}
                />
            </div>

            <div className='flex flex-col sm:flex-row space-y-2 sm:space-x-3 align-bottom justify-start'>
                <Typography className='mt-4'>
                    date :
                </Typography>
                <input
                    className='h-10 bg-[#a0beca] rounded-lg p-2 border-2 border-blue-900'
                    aria-label='date'
                    type='datetime-local'
                    onChange={chg_date}
                    value={datee}
                />
            </div>
        </div>
    )
}


export default MigraineItem