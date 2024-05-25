'use client'

import CalendarLine from "@/components/calendarline";
import { Contenu } from "@/lib/types";
import { getContenu } from "@/lib/utils";
import { Button, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";



const CalendarPage = () => {

  const [items, setItems] = useState<Contenu[] | undefined>(undefined);
  useEffect(() => {
    const c = getContenu();
    setItems(c);
  }, []);


  if (!items) {
    return (<div className="max-w-xl rounded-md mx-auto p-4">
      <Typography>
        LISTE DES ENREGISTREMENTS en cours de constitution.
      </Typography>
    </div>)
  } else if (items.length === 0) {
    return (<div className="flex flex-col space-y-2 mt-5">
      <Typography className="mx-auto">LISTE DES ENREGISTREMENTS</Typography>
      <div className="max-w-xl rounded-md mx-auto p-4">
        aucun enregistrement trouvé
      </div>
      <div className="mx-auto">
        <Button variant="contained" href="/">Retour</Button>
      </div>
    </div>
    );
  } else {
    return (

      <div className="max-w-xl rounded-md mx-auto p-4">
        <List className="bg-slate-700 rounded-md p-2">
          {items.map((it, index) => {
            return (
              <CalendarLine ligne={it} key={index} />
            )
          })}
        </List>
        <div className="mt-4 mx-auto text-center" id='footer'>
          <Button href="/" variant="contained">Retour</Button>
        </div>
      </div>
    )

  }

}

export default CalendarPage;