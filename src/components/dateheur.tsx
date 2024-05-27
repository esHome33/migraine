import React from 'react'

type Props = {
    date: string;
}

const DateHeure = ({ date }: Props) => {

    const m = date.split("T")
    const la_date = m[0];
    const heure = m[1];
    return (
        <div className='flex flex-col sm:flex-row justify-center align-bottom mr-2'>
            <span className='text-orange-100 font-bold sm:mr-2'>{la_date}</span>
            <span className='text-blue-300'>{heure}</span>
        </div>
    )
}

export default DateHeure