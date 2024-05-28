'use client';

import { IconButton, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from 'react'
import { Traitement, Traitements } from '@/lib/types';

type Props = {
    id: number;
    traitement: Traitements;
    sauver: (t: Traitement) => void;
}

const Saisietexte = ({ sauver, traitement, id }: Props) => {

    let myvalid: boolean = false;
    let myname: string = "";
    if (id === 1) {
        myvalid = traitement.tt1.valide;
        myname = traitement.tt1.nom;
    } else if (id === 2) {
        myvalid = traitement.tt2.valide;
        myname = traitement.tt2.nom;
    } else if (id === 3) {
        myvalid = traitement.tt3.valide;
        myname = traitement.tt3.nom;
    } else if (id === 4) {
        myvalid = traitement.tt4.valide
        myname = traitement.tt4.nom;
    }


    const [ttvalid, setTtvalid] = useState<boolean>(myvalid);
    const [ttname, setTtname] = useState<string>(myname);

    const label = `nom ${id}`;
    const aria_label_enable = `enable traitement ${id}`;
    const aria_label_disable = `disable traitement ${id}`;

    const change_validation = () => {
        setTtvalid(!ttvalid);
        sauver_tt(id, ttname, !ttvalid);
    }

    const sauver_tt = (id: number, name: string, valid: boolean) => {
        const resu: Traitement = {
            id: id,
            nom: name,
            valide: valid
        };
        sauver(resu);
    }

    const maj_nom = (e: any) => {
        e.preventDefault();
        const txt = e.target.value;

        if (txt !== "" && !ttvalid) {
            setTtvalid(!ttvalid);
            sauver_tt(id, txt, !ttvalid);
        } else if (txt === "" && !ttvalid) {
            setTtvalid(!ttvalid);
            sauver_tt(id, txt, !ttvalid);
        } else {
            sauver_tt(id, txt, ttvalid);
        }
        setTtname(txt);
    }

    return (
        <div className='flex flex-row'>
            <div className='rounded-md bg-slate-400 p-2 flex-shrink'>
                <TextField
                    label={label}
                    size='small'
                    variant='outlined'
                    color='info'
                    value={ttname}
                    onChange={maj_nom}
                />
            </div>

            {ttvalid ?
                <IconButton
                    aria-label={aria_label_enable}
                    className='rounded-full'
                    onClick={change_validation}
                >
                    <CheckCircleIcon className='text-green-700' />
                </IconButton>
                :
                <IconButton
                    aria-label={aria_label_disable}
                    className='rounded-full'
                    onClick={change_validation}
                >
                    <CancelIcon className='text-red-700' />
                </IconButton>

            }

        </div>
    )
}

export default Saisietexte