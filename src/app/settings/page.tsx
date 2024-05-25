import { IconButton, Typography } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune';
import React from 'react'

type Props = {}

const SettingsPage = (props: Props) => {
    return (
        <div className='max-w-2xl mx-auto mt-4 p-2 h-dvh rounded bg-slate-900'>
            <div className='flex flex-col space-y-6  text-justify'>
                <Typography variant='h4'>Aide et réglages</Typography>
                <Typography variant='body1'>Cette appli vous permet de suivre les migraines, la date de survenue,
                    l&apos;environnement et la médication.
                </Typography>
                <Typography variant='body1'>Les éléments que vous saisissez sont enregistrés dans votre navigateur.
                    Rien n&apos;est donc transmis ou stocké ailleurs et hors de votre appareil.
                </Typography>
                <Typography variant='body1'>Il faut saisir les médicaments utilisés avant de pouvoir saisir un
                    événement de migraine. Vous pourrez alors éditer ces événements ou les imprimer
                    sur un calendrier mensuel.
                </Typography>
                <div className='flex flex-col sm:flex-row mx-auto'>
                    <Typography variant='body2' className='italic'>
                        Appli programmée en Typescript avec NextJS
                    </Typography>
                    <div className='sm:block hidden'>
                        <Typography variant='body2' className='text-orange-700 font-bold ml-2 mr-2'>
                            -
                        </Typography>
                    </div>
                    <Typography variant='body2' className='text-orange-700 font-bold italic text-center sm:text-justify'>
                        &copy; ESHome33, mai 2024
                    </Typography>

                </div>
                <hr className='bg-orange-600 h-1 w-full' />
            </div>
            <div className='flex flex-row space-x-4 mt-8 align-baseline'>
                <Typography
                    variant='body1'
                    className='text-orange-200 font-bold'
                >
                    Edition des médicaments :
                </Typography>
                <IconButton
                    href='/settings/editmed'
                    className='text-orange-500 -mt-1 bg-orange-200 hover:bg-orange-600 hover:text-orange-100'>
                    <TuneIcon />
                </IconButton>
            </div>

            <div className='flex flex-row space-x-4 mt-8 align-baseline'>
                <Typography
                    variant='body1'
                    className='text-orange-200 font-bold'
                >
                    Edition des enregistrements (à venir) :
                </Typography>
                <IconButton
                    href=''
                    className='text-orange-500 -mt-1 bg-orange-200 hover:bg-orange-600 hover:text-orange-100'>
                    <TuneIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default SettingsPage