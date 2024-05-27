import { Contenu } from '@/lib/types'
import { Checkbox, FormControlLabel, ListItem, Typography } from '@mui/material';
import React from 'react'
import DateHeure from './dateheur';

type Props = {
    ligne: Contenu;
}

const CalendarLine = (props: Props) => {
    const content = props.ligne;

    const duree = content.duree;

    const regles = content.regles ?
        <FormControlLabel control={<Checkbox defaultChecked />} label="Règles" /> : null;

    const ceph = content.cephalee ?
        <FormControlLabel control={<Checkbox defaultChecked />} label="Céphalée" /> : null;

    const nuit = content.nuit ?
        <FormControlLabel control={<Checkbox defaultChecked />} label="Nuit" /> : null;

    const aura = content.aura ?
        <FormControlLabel control={<Checkbox defaultChecked />} label="Aura" /> : null;

    const postdrome = content.postdrome ?
        <FormControlLabel control={<Checkbox defaultChecked />} label="Postdrome" /> : null;

    const prodrome = content.prodrome ?
        <FormControlLabel control={<Checkbox defaultChecked />} label="Prodrome" /> : null;

    const impact = content.impact === "I" ?
        <Typography className='text-red-800 bg-red-200 rounded-lg ml-3 px-1 font-bold w-8 h-6 text-center'>I</Typography>
        :
        (content.impact === "L" ?
            <Typography className='text-yellow-900 bg-yellow-200 rounded-lg ml-3 px-1 font-bold w-8 h-6 text-center'>L</Typography>
            :
            <Typography className='text-orange-900 bg-orange-200 rounded-lg ml-3 px-1 font-bold w-8 h-6 text-center'>M</Typography>
        )

    const t1 = (content.traitement1 > 0 && content.nom_t1 !== "") ?
        <div className='text-xs text-blue-300 mr-1'>{`${content.nom_t1}: ${content.traitement1}`}</div>
        : null;

    const t2 = (content.traitement2 > 0 && content.nom_t2 !== "") ?
        <div className='text-xs text-violet-300 mr-1'>{`${content.nom_t2}: ${content.traitement2}`}</div>
        : null;

    const t3 = (content.traitement3 > 0 && content.nom_t3 !== "") ?
        <div className='text-xs text-blue-300 mr-1'>{`${content.nom_t3}: ${content.traitement3}`}</div>
        : null;

    const t4 = (content.traitement4 > 0 && content.nom_t4 !== "") ?
        <div className='text-xs text-violet-300 mr-1'>{`${content.nom_t4}: ${content.traitement4}`}</div>
        : null;



    return (
        <>
            <ListItem className='rounded-md border-blue-400 border' >
                <div className='flex flex-col'>
                    <div className='flex flex-col flex-wrap sm:flex-row'>
                        <DateHeure date={content.date} />
                        <span className='hidden sm:block sm:mx-1'>-</span>
                        <span className='flex flex-row'>impact {impact}</span>
                        <span className='hidden sm:block sm:mx-1'>-</span>
                        <span className='flex flex-row'>durée {duree}</span>
                    </div>
                    <div className='flex flex-row flex-wrap'>
                        {ceph} {nuit} {regles} {aura} {postdrome} {prodrome}
                    </div>
                    <div className='flex flex-row flex-wrap'>
                        {t1} {t2} {t3} {t4}
                    </div>
                </div>
            </ListItem>
        </>
    )
}

export default CalendarLine