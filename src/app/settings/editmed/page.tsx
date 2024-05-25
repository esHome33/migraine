'use client';

import { Traitement, Traitements } from "@/lib/types";
import { getTraitements, IsDummyTraitements, sauveTraitements } from "@/lib/utils";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const EditMedPage = () => {

    const [m1, setM1] = useState<Traitement | undefined>();
    const [m2, setM2] = useState<Traitement | undefined>();
    const [m3, setM3] = useState<Traitement | undefined>();
    const [m4, setM4] = useState<Traitement | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [nodata, setNodata] = useState<boolean>(false);

    useEffect(() => {
        const med = getTraitements();
        if (!IsDummyTraitements(med)) {
            setM1(med.tt1);
            setM2(med.tt2);
            setM3(med.tt3);
            setM4(med.tt4);
            setLoading(false);
        } else {
            setLoading(false);
            setNodata(true);
        }
    }, []);

    const affiche_loading = <Typography
        variant="body1"
        className="text-center"
    >
        chargement des données en cours ...
    </Typography>;

    const affiche_nodata = <><Typography
        variant="body1"
        className="text-center text-blue-300"
    >
        aucune donnée disponible.
    </Typography>
        <div className="text-center mt-8">
            <Button href="/" variant="contained">Retour</Button>
        </div>
    </>


    const changeM1 = (e: any) => {
        e.preventDefault();
        const nom = e.target.value;
        if (m1) {
            const new1: Traitement = {
                id: m1.id,
                nom: nom,
                valide: m1.valide
            };
            setM1(new1);
        }
    }

    const changeM2 = (e: any) => {
        e.preventDefault();
        const nom = e.target.value;
        if (m2) {
            const new2: Traitement = {
                id: m2.id,
                nom: nom,
                valide: m2.valide
            };
            setM2(new2);
        }
    }

    const changeM3 = (e: any) => {
        e.preventDefault();
        const nom = e.target.value;
        if (m3) {
            const new3: Traitement = {
                id: m3.id,
                nom: nom,
                valide: m3.valide
            };
            setM3(new3);
        }
    }
    const changeM4 = (e: any) => {
        e.preventDefault();
        const nom = e.target.value;
        if (m4) {
            const new1: Traitement = {
                id: m4.id,
                nom: nom,
                valide: m4.valide
            };
            setM4(new1);
        }
    }

    const router = useRouter();
    const valideChangements = () => {
        if (m1 && m2 && m3 && m4) {
            const newTT: Traitements = {
                tt1: m1,
                tt2: m2,
                tt3: m3,
                tt4: m4,
            }
            try {
                sauveTraitements(newTT);
                toast.success("Traitements correctement enregistrés", { icon: '😎', duration: 2000 });
                router.push("/");
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    }

    const retourPage = () => {
        router.push("/");
    }

    return (
        <div className="max-w-2xl mx-auto my-4 p-2 h-dvh">
            <Toaster position="bottom-center" />
            <Typography
                variant="h5"
                className="text-center mb-4"
            >
                Editeur des traitements sauvegardés
            </Typography>
            {
                loading ? affiche_loading
                    :
                    nodata ? affiche_nodata
                        :
                        <div className="">
                            <div className="flex flex-col space-y-2 items-center">
                                <TextField
                                    variant="filled"
                                    label="Traitement 1"
                                    value={m1?.nom}
                                    onChange={changeM1}
                                    size="small"
                                    className="bg-slate-300 rounded"
                                />
                                <TextField
                                    variant="filled"
                                    label="Traitement 2"
                                    value={m2?.nom}
                                    onChange={changeM2}
                                    size="small"
                                    className="bg-slate-300 rounded"
                                />
                                <TextField
                                    variant="filled"
                                    label="Traitement 3"
                                    value={m3?.nom}
                                    onChange={changeM3}
                                    size="small"
                                    className="bg-slate-300 rounded"
                                />
                                <TextField
                                    variant="filled"
                                    label="Traitement 4"
                                    value={m4?.nom}
                                    onChange={changeM4}
                                    size="small"
                                    className="bg-slate-300 rounded"
                                />

                            </div>
                            <div className="mt-4 text-center">
                                <ButtonGroup variant="contained" >
                                    <Button
                                        className="bg-orange-600 hover:bg-orange-700"
                                        onClick={valideChangements}
                                    >
                                        OK
                                    </Button>
                                    <Button
                                        className="bg-orange-600 hover:bg-orange-700"
                                        onClick={retourPage}
                                    >
                                        Annuler
                                    </Button>
                                </ButtonGroup>
                            </div>


                        </div>
            }

        </div>
    )
}

export default EditMedPage