'use client'

import MigraineItem from "@/components/migraineitem";
import { CLE_CONTENU, CLE_ID, CLE_TRAITEMENTS, Contenu, CurrentVersion, Traitements } from "@/lib/types";
import { Alert, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";


const SuiviPage = () => {

  const [noTraitements, setNoTraitements] = useState<boolean>(true);

  useEffect(() => {
    if (window) {
      const v = window.localStorage.getItem(CLE_ID);
      if (v && v === CurrentVersion) {
        const cont = window.localStorage.getItem(CLE_CONTENU);
        const trait = window.localStorage.getItem(CLE_TRAITEMENTS);
        setNoTraitements(false);
      } else {
        setNoTraitements(true);
      }
    }
  }, [])


  const creeLocalStorage = (contenu: Contenu, traitement: Traitements) => {
    window.localStorage.setItem(CLE_ID, CurrentVersion);
    window.localStorage.setItem(CLE_CONTENU, JSON.stringify(contenu));
    window.localStorage.setItem(CLE_TRAITEMENTS, JSON.stringify(traitement));
  }



  if (!noTraitements) {
    return (
      <div className="max-w-lg mx-auto flex flex-col space-y-4 ">
        <Alert severity="error">
          Vous devez saisir les traitements habituels avant de pouvoir commencer
        </Alert>

        <button className="bg-orange-600 hover:bg-orange-200 rounded-md px-2 py-2">
          <Link href={"/saisie"}>
            <Typography>Saisie</Typography>
          </Link>
        </button>
      </div>
    );
  }


  return (
    <div className="max-w-full p-4 mx-auto">
      <Box>
        <Card className="mt-8 bg-[#a0beca]" variant="outlined">
          <CardHeader
            title="Informations Migraine"
            sx={{ backgroundColor:"#c3e9f8", color:"darkblue"}}
            subheader="entrez toutes les informations concernant votre migraine"
          />
          <CardContent>
            <MigraineItem validate={creeLocalStorage} />
          </CardContent>
          <CardActions className="p-2">
            <ButtonGroup className="max-w-screen-sm text-center" variant="contained">
              <Button>Valider</Button>
              <Button href="/">Annuler</Button>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Box>
    </div>
  )
}

export default SuiviPage;