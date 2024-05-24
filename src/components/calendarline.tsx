import { Contenu } from '@/lib/types'
import { Checkbox, FormControlLabel, ListItem, Typography } from '@mui/material';
import React from 'react'

type Props = {
    ligne: Contenu;
}

const CalendarLine = (props: Props) => {
    const content = props.ligne;



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
        <Typography className='text-red-800 bg-red-200 rounded-lg ml-3 px-1 font-bold'>I</Typography> :
        (content.impact === "L" ?
            <Typography className='text-yellow-900 bg-yellow-200 rounded-lg ml-3 px-1 font-bold'>L</Typography> :
            <Typography className='text-orange-900 bg-orange-200 rounded-lg ml-3 px-1 font-bold'>M</Typography>)

    return (
        <>
            <ListItem className='rounded-md border-blue-400 border'>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        {content.date} - {content.mois} - impact {impact}
                    </div>
                    <div className='flex flex-row'>
                        {ceph} {nuit} {aura} {postdrome} {prodrome}
                    </div>
                </div>
            </ListItem>
        </>
    )
}

export default CalendarLine