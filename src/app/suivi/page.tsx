'use client'

import MigraineItem from "@/components/migraineItem";
import { CLE_CONTENU, CLE_TRAITEMENTS, Contenu, Traitements } from "@/lib/types";
import { ajouteContenu } from "@/lib/utils";
import { Alert, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const Suivi = () => {

  const [noTraitements, setNoTraitements] = useState<boolean>(true);
  const [contenu, setContenu] = useState<Contenu | undefined>(undefined);
  const [traitemt, setTraitemt] = useState<Traitements | undefined>(undefined);
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (window) {
      const cont = window.localStorage.getItem(CLE_CONTENU);
      const trait = window.localStorage.getItem(CLE_TRAITEMENTS);
      if (trait) {
        // les traitements sont trouvés
        const t: Traitements = JSON.parse(trait) as Traitements;

        setTraitemt(t);
        setNoTraitements(false);
        if (cont) {
          // contenu présent ... on va rajouter un nouveau à la fin.
          const c: Contenu = JSON.parse(cont) as Contenu;
        } else {
          /// pas de contenu présent...
        }
      } else {
        // aucun traitement n'est sauvé : il faut d'abord créer cela ainsi que un contenu 
        setNoTraitements(true);
      }
    }
  }, [])

  const router = useRouter();

  const enregistreData = (e: any) => {
    if (touched) {
      if (contenu) {
        ajouteContenu(contenu);
        toast.success("ENREGISTREMENT FAIT !", { icon: '👍' });
        //console.log('contenu', contenu);
        router.replace("/");
      } else {
        toast.error("Rien à enregistrer", { icon: '🟥' });
      }
    } else {
      toast.error("Ajoutez un traitement pour pouvoir enregistrer !", { icon: '⚡' });
    }
  }

  const creeContenu = (contenu: Contenu) => {
    const c1 = contenu.traitement1 === 0;
    const c2 = contenu.traitement2 === 0;
    const c3 = contenu.traitement3 === 0;
    const c4 = contenu.traitement4 === 0;
    if (c1 && c2 && c3 && c4) {
      setTouched(false);
    } else {
      setContenu(contenu);
      setTouched(true);
      //console.log("contenu mis dans le state", contenu);
    }
  }



  if (noTraitements) {
    return (
      <div className="max-w-lg mx-auto flex flex-col space-y-4 mt-10">
        <Alert severity="error">
          Vous devez saisir les traitements habituels avant de pouvoir commencer
        </Alert>
        <Toaster />
        <button className="bg-orange-600 hover:bg-orange-200 rounded-md px-2 py-2">
          <Link href={"/saisie"}>
            <Typography>Saisie</Typography>
          </Link>
        </button>
      </div>
    );
  }


  return (
    <div className="max-w-3xl p-4 mx-auto">
      <Toaster position="top-center" />
      <Box>
        <Card className="mt-1 sm:mt-8 bg-[#a0beca]" variant="outlined">
          <CardHeader
            title="Informations Migraine"
            sx={{ backgroundColor: "#c3e9f8", color: "darkblue" }}
            subheader="entrez toutes les informations concernant votre migraine"
          />
          <CardContent>
            {
              traitemt ?
                <MigraineItem
                  validate={creeContenu}
                  traitements={traitemt}
                />
                :
                <Typography variant="body2">fiche en cours de chargement</Typography>
            }
          </CardContent>
          <CardActions className="p-2">
            <ButtonGroup className="max-w-screen-sm ml-auto mr-1 mb-1" variant="contained">
              <Button onClick={enregistreData}>Enregistrer</Button>
              <Button href="/">Annuler</Button>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Box>
    </div>
  )
}

export default Suivi;