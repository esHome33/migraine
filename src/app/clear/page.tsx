'use client'

import { Button, IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmationDialog from "@/components/confdia";
import { CLE_CONTENU, CLE_TRAITEMENTS } from "@/lib/types";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";


const ClearAll = () => {
    const [open, setOpen] = useState(false);
    const ouvre = () => {
        setOpen(true);
    }
    const router = useRouter();
    const back_home = () => {
        router.push("/");
    }
    const efface = (effacer: boolean) => {
        setOpen(false);
        if (effacer) {
            if (window) {
                window.localStorage.removeItem(CLE_CONTENU);
                window.localStorage.removeItem(CLE_TRAITEMENTS);
                toast.success("Effacement correctement effectué", { duration: 2000 });
            } else {
                toast.error("Un problème est survenu. Aucun effacement réalisé.");
            }
        } else {
            toast("Aucun effacement réalisé !", { duration: 2000, icon:'👍' });
        }
    }


    return (
        <div className="mx-auto max-w-3xl h-dvh p-2 m-2">
            <Toaster />
            <div className="flex flex-col space-y-2 text-justify">
                <Typography variant="h5" className="text-center">EFFACER LES DONNEES</Typography>
                <Typography variant="body1">Vous pouvez nettoyer votre navigateur en supprimant les deux cookies
                    que dépose cette application.
                    <span className="text-orange-600">{" "}Attention</span> cette action est irréversible.
                </Typography>

            </div>
            <div className="flex sm:flex-row mt-8 justify-center ">
                <Typography variant="h5" className="mr-4 mt-2">Effacer tout </Typography>
                <IconButton className="bg-red-400 hover:bg-red-600 w-12 h-12 shadow shadow-red-100 text-white"
                    onClick={ouvre}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </div>
            <div className="mt-10 text-center">
                <Button className="bg-orange-400 hover:bg-orange-500 text-white"
                    onClick={back_home}
                    startIcon={<ArrowBackIcon />} 
                    autoFocus
                >
                    Retour
                </Button>
            </div>
            <ConfirmationDialog open={open} action={efface} />
        </div>
    )
}

export default ClearAll