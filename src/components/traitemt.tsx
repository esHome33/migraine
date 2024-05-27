'use client';

import { Traitement } from '@/lib/types';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

type Props = {
    traitement: Traitement;
    enregistreur: (numero: number, check: boolean, quantite: number | "") => void;
}

const Traitem = (props: Props) => {

    const validation_parent = props.enregistreur;
    const myTrt = props.traitement;
    const nom_traitement = myTrt.nom;
    const my_num = myTrt.id;
    const [check, setCheck] = useState<boolean>(false);
    const [qte, setQte] = useState<number | "">(0);

    const checker = () => {
        setCheck(!check);
        if (check) {
            validation_parent(my_num, !check, 0);
        } else {
            validation_parent(my_num, !check, qte);
        }
    }

    const chg_qte = (val: string) => {
        const valeur = Number.parseInt(val);
        if (!Number.isNaN(valeur)) {
            setQte(valeur);
            validation_parent(my_num, check, valeur);
        } else {
            if (val === "") {
                setQte("");
            }
        }
    }

    useEffect(() => {
        validation_parent(my_num, check, qte);
    }, []);

    return (
        <div className='flex flex-row sm:flex-col justify-start align-middle'>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={check}
                        onChange={() => checker()}
                    />
                }
                label={nom_traitement}
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