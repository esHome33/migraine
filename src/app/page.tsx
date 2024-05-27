import { Button, Card, CardActions, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col md:flex-row space-y-2 align-center justify-center text-center">
        <div className="my-auto pt-2">
          <Typography variant="h4">
            GESTION MIGRAINE
          </Typography>
        </div>
        <div className="my-auto md:ml-3">
          <Tooltip title="Application de suivi des migraines - développé par ESHome33 - mai 2024"
            className="md:ml-3">
            <IconButton
              className="bg-slate-300 hover:bg-orange-300 h-10 align-top"
            >
              <Link href={"/settings"} className=""><SettingsApplicationsIcon sx={{ color: "#FF6600", height:'60px' }} /></Link>
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Card sx={{ minWidth: "400px" }}>
        <CardContent>
          <Typography className="text-center" fontFamily={"monospace"} variant="h5">
            Calendriers disponibles
          </Typography>
          <Typography variant="body2" className="text-center">
            impression des calendriers de données disponibles
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" className="bg-orange-600 text-white mx-auto hover:bg-orange-300 hover:text-orange-900">
            <Link href={"/calendar"}>Calendriers</Link>
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ minWidth: "400px" }}>
        <CardContent>
          <Typography className="text-center" fontFamily={"monospace"} variant="h5">
            Saisie migraine
          </Typography>
          <Typography variant="body2" className="text-center">
            suivi des crises et médication
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" className="bg-orange-600 text-white mx-auto  hover:bg-orange-300 hover:text-orange-900">
            <Link href={"/suivi"}>Saisie</Link>
          </Button>
        </CardActions>
      </Card>

    </main>
  );
}
