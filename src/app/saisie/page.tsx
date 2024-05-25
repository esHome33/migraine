'use client'
import SaisieTexte from '@/components/saisietexte'
import { CLE_TRAITEMENTS, Traitement, Traitements } from '@/lib/types'
import { Alert, Button, ButtonGroup, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { dummyTraitements } from '@/lib/utils';

const PageSaisieTraitement = () => {

    const [tts, setTts] = useState<Traitements | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);

    const isValid = (t: Traitements) => {
        // au moins un des traitements doit être validés
        const v1 = t.tt1.valide && t.tt1.nom.length > 0;
        const v2 = t.tt2.valide && t.tt2.nom.length > 0;
        const v3 = t.tt3.valide && t.tt3.nom.length > 0;
        const v4 = t.tt4.valide && t.tt4.nom.length > 0;
        return (v1 || v2 || v3 || v4);
    }
    
    const router = useRouter();

    const go_valid = () => {
        if (tts && isValid(tts)) {
            window.localStorage.setItem(CLE_TRAITEMENTS, JSON.stringify(tts));
            router.replace("/");
        }
    }


    useEffect(() => {
        const t = window.localStorage.getItem(CLE_TRAITEMENTS);
        if (t) {
            const tt: Traitements = JSON.parse(t);
            setTts(tt);
        } else {
            const tt: Traitements = dummyTraitements();
            setTts(tt);
        }
    }, []);
    
    const valideTraitement = (traitement_name: string, isvalidated: boolean, numero: number) => {

        if (traitement_name === "" && isvalidated) {
            setError(true);
            return;
        }

        const tt: Traitement = { id: numero, nom: traitement_name, valide: isvalidated };
        if (tts) {
            const new_tts = tts;
            if (numero === 1) {
                new_tts.tt1 = tt;
            } else if (numero === 2) {
                new_tts.tt2 = tt;
            } else if (numero === 3) {
                new_tts.tt3 = tt;
            } else if (numero === 4) {
                new_tts.tt4 = tt;
            }
            setTts(new_tts);
            const v = isValid(new_tts);
            setError(!v);
        }
    }

    const retourMaison = () => {
        router.replace("/");
    }

    return (
        <div className='max-w-lg bg-slate-700 mx-auto min-h-screen p-4 rounded'>
            <Typography fontStyle={"italic"} fontWeight={'bold'} textAlign={'center'} variant={'h4'} >
                SAISIE DES TRAITEMENTS
            </Typography>
            <div className='flex flex-col space-y-4 justify-start align-baseline mt-5'>
                <Typography variant='body1'>
                    Vous pouvez saisir jusqu&apos;&agrave; 4 traitements (si les traitements sont
                    trop nombreux, désactivez ceux qui sont en trop)
                </Typography>
                {
                    !tts ? <Typography variant='body2' color={'blue'}>chargement des données...</Typography>
                        : <>
                            <SaisieTexte traitement={tts} key={1} num={1} valide={valideTraitement} />
                            <SaisieTexte traitement={tts} key={2} num={2} valide={valideTraitement} />
                            <SaisieTexte traitement={tts} key={3} num={3} valide={valideTraitement} />
                            <SaisieTexte traitement={tts} key={4} num={4} valide={valideTraitement} />
                        </>
                }
            </div>

            <div className='mt-6'>
                {error ?
                    <Alert icon={<WarningIcon fontSize="inherit" />} severity="warning">
                        Vous devez valider au moins un traitement et remplir le nom des traitements validés.
                    </Alert> : null
                }
            </div>
            <div className='mx-auto mt-6'>
                <ButtonGroup>
                    <Button
                        variant='contained'
                        className='bg-[#019b2d] hover:bg-[#4eda76] hover:text-black'
                        onClick={go_valid}
                    >Valider</Button>
                    <Button
                        variant='contained'
                        className='bg-[#123256] hover:bg-[#528ed2]  hover:text-black'
                        onClick={retourMaison}
                    >Annuler</Button>
                </ButtonGroup>
            </div>

        </div>
    )
}

export default PageSaisieTraitement;