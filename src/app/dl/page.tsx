'use client'

import { Button, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FabriqueCalendrierCSV } from '@/lib/utils';

const DLPage = () => {

    const sp = useSearchParams();
    const data = sp.get('data');
    const title = sp.get('title');
    const router = useRouter();

    const createAndDownloadFile = () => {
        if (data) {
            const data_traitee = FabriqueCalendrierCSV(data, "Etienne", title);
            const datacsv = new Blob([data_traitee], { type: 'text/csv' });
            const url = window.URL.createObjectURL(datacsv);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${title}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } else {
            toast.error("No data found in URL");
        }
    };

    return (

        <div className='max-w-3xl mx-auto p-2 m-4 text-center text-wrap'>
            <Toaster />
            <Typography
                variant='h4'
            >
                Téléchargement des données
            </Typography>
            <Typography
                variant='h5'
            >
                {title ? (title === "X" ? ("de tous les mois") : ("mois " + title)) : "sans titre"}
            </Typography>
            <div className='mx-auto flex flex-col sm:flex-row space-y-4 sm:space-x-4 mt-10 max-w-xl 
             items-center sm:justify-center'>

                <div className='bg-transparent mt-4 rounded-md max-w-48'>
                    <Button
                        variant='contained'
                        onClick={() => createAndDownloadFile()}
                        className='bg-orange-600 hover:bg-orange-500 w-40'
                        autoFocus
                    >
                        Télécharger
                    </Button>
                </div>

                <div className='bg-transparent rounded-md max-w-48'>
                    <Button
                        variant='contained'
                        startIcon={<ArrowBackIcon />}
                        onClick={() => router.replace("/calendar")}
                        className='bg-blue-500 hover:bg-blue-400 w-40'
                    >
                        Retour
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default DLPage