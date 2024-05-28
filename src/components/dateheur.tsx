
type Props = {
    date: string;
}

const Dateheur = ({ date }: Props) => {

    const m = date.split("T")
    const la_date = m[0];
    const heure = m[1];
    return (
        <div className='flex flex-row space-x-2 align-bottom flex-wrap'>
            <span className='text-orange-100 font-bold'>{la_date}</span>
            <span className='text-blue-300'>{heure}</span>
        </div>
    )
}

export default Dateheur;