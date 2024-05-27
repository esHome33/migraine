import { Box, List, ListItemButton, Typography } from '@mui/material';

type Props = {
    items: string[];
    filtreur: (filt: string) => void;
    selected: string;
}

const Caldrawer = ({ items,filtreur,selected }: Props) => {
    if (items.length === 0) {
        return (
            <div className='mx-auto mt-10 text-orange-100 bg-orange-700 rounded-md text-center'>
                <Typography variant='h5'>Pas d&apos;items à afficher</Typography>
            </div>
        );
    }

    return (
        <Box
            width={250}
            height={'100vh'}
            className='bg-orange-800'
        >
            <List
                dense>
                {
                    items.map((elt, index) => {
                        return (
                            <ListItemButton
                                key={index}
                                onClick={() => filtreur(elt)}
                                className='bg-orange-800 text-orange-200 
                                hover:font-bold hover:bg-orange-600 hover:text-black my-1'
                            >
                                { elt === selected ?  "=> " + elt : elt}
                            </ListItemButton>)
                    })
                }
                <ListItemButton
                    key={items.length}
                    onClick={() => filtreur("X")}
                    className='text-orange-100 bg-orange-900'
                >
                    Effacer filtre
                </ListItemButton>
            </List>
        </Box>
    )
}

export default Caldrawer