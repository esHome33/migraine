'use client'

import { Button, IconButton, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DLPage = () => {

    const sp = useSearchParams();
    const data = sp.get('data');
    const title = sp.get('title');
    const router = useRouter();

    const createAndDownloadFile = () => {
        if (data) {
            const datacsv = new Blob([data], { type: 'text/csv' });
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

        <div className='max-w-3xl mx-auto p-2 m-2 text-center text-wrap'>
            <Toaster />
            <Typography
                variant='h4'
            >
                Téléchargement pour {title ? (" " + title) : " NO TITLE"}
            </Typography>
            <div className='text-center flex flex-col sm:flex-row space-y-4 sm:space-x-4 mt-10'>

            <Button
                variant='contained'
                onClick={() => createAndDownloadFile()}
                className='bg-orange-600 hover:bg-orange-500 mt-4'
                >
                Télécharger
            </Button>

            <Button
                variant='contained'
                className='bg-orange-500 hover:bg-orange-400'
                startIcon={<ArrowBackIcon />}
                onClick={()=>router.back()}
                >
                Retour
            </Button>
                </div>
        </div>
    )
}

export default DLPage