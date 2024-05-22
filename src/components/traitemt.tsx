'use client';

import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useState } from 'react'

type Props = {
    nom: string;
    num: number;
    qte: number;
    enregistreur: (numero: number, check: boolean, quantite: number) => void;
}

const Traitem = (props: Props) => {

    const [check, setCheck] = useState<boolean>(false);
    const [qte, setQte] = useState<number>(0);

    const checker = () => {
        setCheck(!check);
        props.enregistreur(props.num, !check, qte);
    }

    const chg_qte = (val: string) => {
        const valeur = Number.parseInt(val);
        if (!Number.isNaN(valeur)) {
            setQte(valeur);
            props.enregistreur(props.num, check, valeur);
        }
    }

    return (
        <div className='flex flex-row sm:flex-col justify-start align-middle'>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={check}
                        onChange={() => checker()}
                    />
                }
                label={props.nom}
            />
            {check ?
                <TextField
                    label="quantité"
                    value={qte}
                    onChange={(e) => chg_qte(e.target.value)}
                    size='small'
                    className='w-20'
                />

                : <div className='h-10'></div>}
        </div>
    )
}

export default Traitem