'use client';

import { IconButton, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useState } from 'react'
import { Traitements } from '@/lib/types';

type Props = {
    traitement: Traitements | undefined;
    num: number;
    valide: (traitement_name: string, isvalidated: boolean, numero: number) => void;
}

const SaisieTexte = (props: Props) => {

    const id = props.num;
    let myvalid: boolean =false;
    let myname: string = "";
    if (props.traitement) {   
        if (id === 1) {
            myvalid = props.traitement.tt1.valide;
            myname = props.traitement.tt1.nom;
        } else if (id === 2) {
            myvalid = props.traitement.tt2.valide;
            myname = props.traitement.tt2.nom;
        } else if (id === 3) {
            myvalid = props.traitement.tt3.valide;
            myname = props.traitement.tt3.nom;
        } else if (id === 4) {
            myvalid = props.traitement.tt4.valide
            myname = props.traitement.tt4.nom;
        }
    }
    const mynumber: number = id;

    const [ttvalid, setTtvalid] = useState<boolean>(myvalid);
    const [ttname, setTtname] = useState<string>(myname);

    const label = `nom ${mynumber}`;
    const aria_label_enable = `enable traitement ${mynumber}`;
    const aria_label_disable = `disable traitement ${mynumber}`;

    const change = () => {
        setTtvalid(!ttvalid);
        props.valide(ttname, !ttvalid, mynumber);
    }

    useEffect(() => {
        props.valide(ttname, ttvalid, mynumber);
    }, []);

    return (
        <div className='flex flex-row'>
            <div className='rounded-md bg-slate-400 p-2 flex-shrink'>
                <TextField
                    label={label}
                    size='small'
                    variant='outlined'
                    color='error'
                    value={ttname}
                    onChange={(e) => { e.preventDefault(); setTtname(e.target.value) }}
                />
            </div>
            <IconButton
                aria-label={aria_label_enable}
                className='rounded-full'
                onClick={change}
            >
                {ttvalid ?
                    <CheckCircleIcon className='text-green-700' />
                    : null}
            </IconButton>
            <IconButton
                aria-label={aria_label_disable}
                className='rounded-full'
                onClick={change}
            >
                {ttvalid ?
                    null
                    : <CancelIcon className='text-red-700' />}
            </IconButton>
        </div>
    )
}

export default SaisieTexte