"use client"
import {useParams} from 'next/navigation'

export default function Page() {
    const params = useParams();
    const gameId = params.id;
    return (
        <div>
            <h1>Game {gameId}</h1>
            <h2>Game {gameId} stats</h2>
        </div>
    )
}