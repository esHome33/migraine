'use client';

import { Contenu, IMPACT, Traitements } from '@/lib/types';
import { FormControlLabel, Checkbox, Typography, Input, TextField } from '@mui/material';
import React, { useState } from 'react'
import Traitem from './traitemt';

type Props = {
    validate: (contenu: Contenu, trt: Traitements) => void;
    nom_t1?: string;
    nom_t2?: string;
    nom_t3?: string;
    nom_t4?: string;
}

const MigraineItem = (props: Props) => {

    const [prodrome1, setProdrome1] = useState<boolean>(false);
    const [aura2, setAura2] = useState<boolean>(false);
    const [cephalee3, setCephalee3] = useState<boolean>(true);
    const [postdrome4, setPostdrome4] = useState<boolean>(false);
    const [regles5, setRegles5] = useState<boolean>(false);
    const [t1, setT1] = useState<boolean>(false);
    const [qte1, setQte1] = useState<number>(0);
    const [t2, setT2] = useState<boolean>(false);
    const [qte2, setQte2] = useState<number>(0);
    const [t3, setT3] = useState<boolean>(false);
    const [qte3, setQte3] = useState<number>(0);
    const [t4, setT4] = useState<boolean>(false);
    const [qte4, setQte4] = useState<number>(0);
    const [duree, setDuree] = useState<string>("2 h");
    const [impact, setImpact] = useState<IMPACT>("M");
    const [datee, setDatee] = useState<string>("2024-04-01T22:22");

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
    }

    const modifieImpact = () => {
        if (impact === "I") {
            setImpact("L");
        } else if (impact === "L") {
            setImpact("M");
        } else {
            setImpact("I");
        }
    }

    const checker = (qui: number) => {
        if (qui === 1) {
            setProdrome1(!prodrome1);
        } else if (qui === 2) {
            setAura2(!aura2);
        } else if (qui === 3) {
            setCephalee3(!cephalee3);
        } else if (qui === 4) {
            setPostdrome4(!postdrome4);
        } else if (qui === 5) {
            setRegles5(!regles5);
        }
        // else if (qui === 6) {
        //     setT1(!t1);
        // } else if (qui === 7) {
        //     setT2(!t2);
        // } else if (qui === 8) {
        //     setT3(!t3);
        // } else if (qui === 9) {
        //     setT4(!t4);
        // }
    }

    const changeDuree = (duree: string) => {
        setDuree(duree);
    }

    const enreg_traitement = (numero: number, check: boolean, qte: number) => {
        if (numero === 1) {
            setQte1(qte);
            setT1(check);
        } else if (numero === 2) {
            setQte2(qte);
            setT2(check);
        } else if (numero === 3) {
            setQte3(qte);
            setT3(check);
        } else if (numero === 4) {
            setQte4(qte);
            setT4(check);
        }
    }

    //console.log(`datee ${datee}`);

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
                    className=' bg-blue-400 rounded-lg h-12 w-44 px-2 mt-2'
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


            </div>

            <div className='flex flex-col sm:flex-row space-y-2 sm:space-x-3 align-bottom justify-start'>
                <Typography className='mt-4 mr-2'>Traitements</Typography>
                
                <Traitem
                    nom='t_ONE'
                    qte={qte1}
                    num={1}
                    key={1}
                    enregistreur={enreg_traitement}
                />
                <Traitem
                    nom='t_TWO'
                    qte={qte2}
                    num={2}
                    key={2}
                    enregistreur={enreg_traitement}
                />
                <Traitem
                    nom='t_THREE'
                    qte={qte3}
                    num={3}
                    key={3}
                    enregistreur={enreg_traitement}
                />
                <Traitem
                    nom='t_QUATRE'
                    qte={qte4}
                    num={4}
                    key={4}
                    enregistreur={enreg_traitement}
                />
            </div>

            <div className='flex flex-col sm:flex-row space-y-2 sm:space-x-3 align-bottom justify-start'>
                <Typography className='mt-4'>date :
                </Typography><input
                    className='h-10 bg-[#a0beca] rounded-lg p-2 border-2 border-blue-900'
                    aria-label='date'
                    type='datetime-local'
                    onChange={chg_date}
                    value={datee} />
            </div>
        </div>
    )
}


export default MigraineItem