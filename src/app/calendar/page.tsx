'use client'

import Caldrawer from "@/components/calendardrawer";
import CalendarLine from "@/components/calendarline";
import { Contenu } from "@/lib/types";
import { AnalyseContent, getContenu, GetFilteredContent } from "@/lib/utils";
import { Button, Drawer, IconButton, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';


const CalendarPage = () => {

	const [items_init, setItems_init] = useState<Contenu[] | undefined>(undefined);
	const [items, setItems] = useState<Contenu[] | undefined>(undefined);
	const [mois, setMois] = useState<string[]>([]);
	const [filtre_s, setFiltre_s] = useState<string>("");
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const c = getContenu();
		setItems_init(c);
		setItems(c);
		const mm = AnalyseContent(c);
		setMois(mm);
	}, []);

	const ouvre_panel = () => {
		setOpen(true);
	}



	const filtre = (filtre: string) => {
		if (items_init) {
			if (filtre === "X") {
				setItems(items_init);
				setFiltre_s("");
			} else {
				const liste_filtree = GetFilteredContent(filtre, items_init);
				setItems(liste_filtree);
				setFiltre_s(filtre);
			}
			setOpen(false);
		}
	}

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
				<Button
					variant="contained"
					href="/"
					className="bg-orange-500 hover:bg-orange-200"
				>
					Retour
				</Button>
			</div>
		</div>
		);
	} else {
		return (<>
			<div className="sticky top-4 ml-6 h-1">
				<IconButton onClick={ouvre_panel}
					className="bg-orange-200 hover:bg-orange-200 h-11 w-11"
				>
					<MenuOpenIcon />
				</IconButton>
			</div>
			<div className="max-w-3xl rounded-md ml-20 p-4">

				<Drawer open={open} onClose={() => setOpen(false)}>
					<Caldrawer
						items={mois}
						filtreur={filtre}
						selected={filtre_s}
					/>
				</Drawer>

				<div className="flex flex-col space-y-2">
					<div className="flex flex-row space-x-4 justify-stretch">
						<div className="flex-1">
							<div className="flex flex-col">
								<Typography
									variant="body1"
									className="bg-orange-200 rounded text-center text-black">
									Synthèse
								</Typography>
								<Typography variant="body2">il y a {items.length} item affiché</Typography>
								<Typography variant="body2" className="italic">
									{filtre_s === "" ? "items non filtrés" : `filtre actif ${filtre_s}`}
								</Typography>
							</div>

						</div>
						<div className="mx-auto text-center flex-grow-0">
							<Button
								href="/"
								variant="contained"
								className="bg-orange-500 hover:bg-orange-400"
							>
								Retour
							</Button>
						</div>
					</div>
					<div>
						<List className="bg-slate-700 rounded-md p-2">
							{items.map((it, index) => {
								return (
									<CalendarLine ligne={it} key={index} />
								)
							})}
						</List>

					</div>
				</div>
			</div>
		</>
		)

	}

}

export default CalendarPage;