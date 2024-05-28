'use client'

import { Contenu } from "@/lib/types";
import { AnalyseContent, getContenu, GetFilteredContent, MiseEnCSVContenu } from "@/lib/utils";
import { Button, Drawer, IconButton, List, Snackbar, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Toaster } from "react-hot-toast";
import Caldrawer from "@/components/caldrawer";
import { useRouter } from "next/navigation";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalendarLine from "@/components/calendarLine";


const Calendar = () => {

	const [items_init, setItems_init] = useState<Contenu[] | undefined>(undefined);
	const [items, setItems] = useState<Contenu[] | undefined>(undefined);
	const [mois, setMois] = useState<string[]>([]);
	const [filtre_s, setFiltre_s] = useState<string>("X");
	const [open, setOpen] = useState<boolean>(false);
	const [openInfo, setOpenInfo] = useState<boolean>(false);
	const [msg_info, setMsg_info] = useState<string>("");

	let data_dl = useRef<string>("?data=");
	let title_dl = useRef<string>("&title=X");

	const router = useRouter();

	useEffect(() => {
		const c = getContenu();
		setItems_init(c);
		setItems(c);
		const mm = AnalyseContent(c);
		setMois(mm);
	}, []);

	useEffect(() => {
		if (items) {
			let resu: string = "";
			resu += MiseEnCSVContenu(undefined);
			items.map((contenu: Contenu) => {
				resu += MiseEnCSVContenu(contenu);
			});
			data_dl.current = encodeURI("?data=" + resu);
		}
	}, [items]);

	useEffect(() => {
		title_dl.current = encodeURI("&title=" + filtre_s);
	}, [filtre_s]);


	const faire_download = () => {
		const d = data_dl.current;
		const t = title_dl.current;
		const url = "/dl" + d + t;
		setMsg_info(`${url}`);
		setOpenInfo(true);
		router.push(url);
	}

	const ouvre_panel = () => {
		setOpen(true);
	}

	const filtre = (filtre: string) => {
		if (items_init) {
			if (filtre === "X") {
				setItems(items_init);
				setFiltre_s("X");
			} else {
				const liste_filtree = GetFilteredContent(filtre, items_init);
				setItems(liste_filtree);
				setFiltre_s(filtre);
			}
			setOpen(false);
		}
	}

	const handleInfoClose = (o: object, r: string) => {
		if (r === 'clickaway') {
			return;
		}
		setOpenInfo(false);
	}

	const copieTexteURL = () => {
		if (navigator) {
			navigator.clipboard.writeText(msg_info);
			setOpenInfo(false);
		}

	}

	const action = (
		<IconButton onClick={copieTexteURL}>
			<ContentCopyIcon />
		</IconButton>
	);

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
			<Snackbar
				open={openInfo}
				onClose={handleInfoClose}
				message={msg_info}
				action={action}
			/>


			<div className="sticky top-4 ml-4 h-1">
				<IconButton onClick={ouvre_panel}
					className="bg-orange-200 hover:bg-orange-200 h-11 w-11"
				>
					<MenuOpenIcon />
				</IconButton>
			</div>
			<div className="max-w-3xl rounded-md ml-14 p-4">
				<Toaster />
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
								<Typography variant="body2">
									il y a {items.length} item affiché
									{items.length > 1 ?
										"s" : ""
									}
								</Typography>

								{filtre_s === "" || filtre_s === "X" ?
									<Typography variant="body2" className="italic">
										items non filtrés
									</Typography>
									:
									<Typography
										variant="body2"
										className="italic text-red-600"
									>
										{`filtre actif ${filtre_s}`}
									</Typography>
								}
							</div>

						</div>
						<div className="text-right flex-grow-0 flex flex-col space-y-1">
							<div className="w-full">
								<Button
									onClick={faire_download}
									variant="contained"
									className="bg-orange-500 hover:bg-orange-400"
								>
									TELECHARGE
								</Button>
							</div>
							<div className="">
								<Button
									href="/"
									variant="contained"
									className="bg-orange-500 hover:bg-orange-400 w-full"
								>
									Retour
								</Button>
							</div>
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

export default Calendar;