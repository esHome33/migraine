'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

type Props = {
    action: (effacer: boolean) => void;
    open: boolean;
}

const Confirmationdialog = ({ action, open }: Props) => {

    const click_efface = () => {
        action(true);
    }
    const click_annule = () => {
        action(false);
    }

    const on_close = (_event: object, _reason: string) => {
        action(false);
    }
    return (
        <Dialog
            onClose={on_close}
            open={open}
        >
            <div className="bg-slate-700 text-orange-300">
                <DialogTitle
                        className="font-bold"
                >Confirmez l&apos;effacement</DialogTitle>
                <DialogContent>
                    <DialogContentText className="text-orange-100">Vous allez définitivement effacer les noms de vos traitements ainsi
                        que toutes les occurences de migraine que vous avez saisies. Confirmez-vous cela ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="bg-orange-500 hover:bg-orange-700 rounded-lg text-white">
                        <Button onClick={click_efface} variant="outlined" className="text-orange-100 ">
                            Effacer
                        </Button>
                        <Button autoFocus onClick={click_annule} variant="outlined" className="text-orange-100">
                            Annuler
                        </Button>
                    </div>
                </DialogActions>

            </div>
        </Dialog>
    )
}

export default Confirmationdialog