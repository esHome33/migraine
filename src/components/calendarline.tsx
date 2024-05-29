import { Contenu } from '@/lib/types'
import { Checkbox, FormControlLabel, ListItem, Typography } from '@mui/material';
import React from 'react'
import Dateheur from './dateheur';

type Props = {
    ligne: Contenu;
}

const Calendarline = (props: Props) => {
    const content = props.ligne;

    const duree = content.duree;

    const regles = content.regles ?
        <FormControlLabel id='regles' control={<Checkbox value={true} checked/>} label="Règles" sx={{pointerEvents:"auto"}}/> : null;

    const ceph = content.cephalee ?
        <FormControlLabel id='ceph' control={<Checkbox value={true} checked />} label="Céphalée" sx={{ pointerEvents: "auto" }} /> : null;

    const nuit = content.nuit ?
        <FormControlLabel id="nuit" control={<Checkbox value={true} checked />} label="Nuit" sx={{ pointerEvents: "auto" }} /> : null;

    const aura = content.aura ?
        <FormControlLabel id="aura" control={<Checkbox value={true} checked />} label="Aura" sx={{ pointerEvents: "auto" }} /> : null;

    const postdrome = content.postdrome ?
        <FormControlLabel id="postdr" control={<Checkbox value={true} checked />} label="Postdrome" sx={{ pointerEvents: "auto" }} /> : null;

    const prodrome = content.prodrome ?
        <FormControlLabel id="prodr" control={<Checkbox value={true} checked />} label="Prodrome" sx={{ pointerEvents: "auto" }} /> : null;

    const impact = content.impact === "I" ?
        <Typography className='text-red-800 bg-red-200 rounded-lg ml-2 px-1 font-bold w-8 h-6 text-center'>I</Typography>
        :
        (content.impact === "L" ?
            <Typography className='text-yellow-900 bg-yellow-200 rounded-lg ml-2 px-1 font-bold w-8 h-6 text-center'>L</Typography>
            :
            (content.impact === "M") ?
                <Typography className='text-orange-900 bg-orange-200 rounded-lg ml-2 px-1 font-bold w-8 h-6 text-center'>M</Typography>
                :
                <Typography className='text-blue-300 bg-blue-800 rounded-lg ml-2 px-1 text-xs w-8 h-6 text-center pt-1'>sans</Typography>
        )

    const t1 = (content.traitement1 > 0 && content.nom_t1 !== "") ?
        <div className='text-xs text-blue-100 bg-blue-900 mr-1 border rounded-lg px-1'>{`${content.nom_t1}: ${content.traitement1}`}</div>
        : null;

    const t2 = (content.traitement2 > 0 && content.nom_t2 !== "") ?
        <div className='text-xs text-violet-100 mr-1 border rounded-lg px-1'>{`${content.nom_t2}: ${content.traitement2}`}</div>
        : null;

    const t3 = (content.traitement3 > 0 && content.nom_t3 !== "") ?
        <div className='text-xs text-blue-100 bg-blue-900 mr-1 border rounded-lg px-1'>{`${content.nom_t3}: ${content.traitement3}`}</div>
        : null;

    const t4 = (content.traitement4 > 0 && content.nom_t4 !== "") ?
        <div className='text-xs text-violet-300 mr-1 border rounded-lg px-1'>{`${content.nom_t4}: ${content.traitement4}`}</div>
        : null;



    return (
        <>
            <ListItem className='rounded-md border-blue-400 border' >
                <div className='flex flex-col'>
                    <div className='flex flex-col flex-wrap sm:flex-row'>
                        <Dateheur date={content.date} />
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

export default Calendarline