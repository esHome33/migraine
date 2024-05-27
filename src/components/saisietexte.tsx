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

    const validation_parent = props.valide;

    const id = props.num;
    let myvalid: boolean = false;
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
        validation_parent(ttname, !ttvalid, mynumber);
    }

    useEffect(() => {
        validation_parent(ttname, ttvalid, mynumber);
    }, []);

    const maj_nom = (e: any) => {
        e.preventDefault();
        const txt = e.target.value;
        setTtname(txt);

        if (txt !== "" && !ttvalid) {
            setTtvalid(!ttvalid);
            validation_parent(ttname, !ttvalid, mynumber);
        } else if (txt === "" && !ttvalid) {
            setTtvalid(!ttvalid);
            validation_parent(ttname, !ttvalid, mynumber);
        } else {
            validation_parent(ttname, ttvalid, mynumber);
        }
    }

    return (
        <div className='flex flex-row'>
            <div className='rounded-md bg-slate-400 p-2 flex-shrink'>
                <TextField
                    label={label}
                    size='small'
                    variant='outlined'
                    color='error'
                    value={ttname}
                    onChange={maj_nom}
                />
            </div>
            
                {ttvalid ?
                    <IconButton
                        aria-label={aria_label_enable}
                        className='rounded-full'
                        onClick={change}
                    >
                        <CheckCircleIcon className='text-green-700' />
                    </IconButton>
                    : null}
                {ttvalid ?
                    null :
                    <IconButton
                        aria-label={aria_label_disable}
                        className='rounded-full'
                        onClick={change}
                    >
                        <CancelIcon className='text-red-700' />
                    </IconButton>}

            </div>
            )
}

            export default SaisieTexte