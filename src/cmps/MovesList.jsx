import React from 'react'

export function MovesList({ title, movesList }) {
    function formatTime(time) {
        return Date(time).slice(4, 21)
    }

    return (
        <section className='moves-list'>
            <div className='title'>{title}</div>
            <ul className='moves-details'>
                {movesList.map((move, idx) => (
                    <li className='flex row align-center gap-2rem' key={move.at} >
                        <div className='bullet flex auto-center'> {idx + 1}</div>
                        <article>
                            <h3>Date: {formatTime(move.at)}</h3>
                            <h3 className='move-amount'>Amount: ${move.amount}</h3>
                        </article>
                    </li>
                ))}
            </ul>
        </section >
    )
}
