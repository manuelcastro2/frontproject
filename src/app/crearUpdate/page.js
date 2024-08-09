"use client"
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react"
import "./../styles/index.css"
import { AgregarProject } from '../../apiProject.js'

export default function Page() {

    const [Name, setName] = useState('')
    const [dateFinal, setdateFinal] = useState('')
    const [dateInitial, setdateInitial] = useState('')

    const router = useRouter();
    const create = () => {
        const project = {
            name: Name,
            dateFinal: dateFinal,
            dateInitial: dateInitial,
            stateProject:'start',
            progressing:0,
            tasks:[]
        }
        AgregarProject(project)
        router.push('/')
    }

    return (
        <div className="col-xs-12 col-s-12 Crear">
            <Link className="col-xs-2 col-s-1 Link buttonExit" href="/">X</Link>
            <h1 className="col-s-12 titleCrear">Crear proyecto</h1>

            <label className="col-s-12">Name Project</label>
            <input className="col-s-12" type="text"
                name="" placeholder="Name project"
                value={Name} onChange={(e) => setName(e.target.value)} />

            <label className="col-s-12">Date initial</label>
            <input className="col-s-12" type="date"
                name="" placeholder="Date Initial"
                value={dateInitial} onChange={(e) => setdateInitial(e.target.value)} />

            <label className="col-s-12">Date Final</label>
            <input className="col-s-12" type="date"
                name="" placeholder="Date final"
                value={dateFinal} onChange={(e) => setdateFinal(e.target.value)} />
            <button className="col-s-12" type="submit" onClick={create}>crear</button>
        </div>

    )
}
