import { Button, Card, CardActions, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography variant="h4">
        GESTION MIGRAINE
        <Tooltip title="Application de suivi des migraines - développé par ESHome33 - mai 2024"
        className="ml-3">
          <IconButton className="bg-slate-300 hover:bg-orange-300">
            <InfoIcon color="primary"/>

          </IconButton>
        </Tooltip>
      </Typography>
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
            Go
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
            Saisie
          </Button>
        </CardActions>
      </Card>

    </main>
  );
}
