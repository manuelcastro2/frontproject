'use client'
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react"
import "./../../styles/index.css"
import { ActualizarTask, AgregarTask, ConsultarProjectId } from '../../../apiProject.js'

export default function Page() {
    const router = useRouter();
    const params = useParams()
    const [Task, setTask] = useState([])
    const [stateProject, setStateProject] = useState(true)
    const [nameTask, setname] = useState('')
    const [descriptionTask, setdescription] = useState('')
    const [crear, setcrear] = useState(false)
    const [cantTask, setCantTas] = useState(0)

    useEffect(() => {
        consultarTask()
        consultarTask()
        setCantTas((1 * 100) / Task.length)
        console.log(cantTask);
    }, [20])

    const consultarTask = () => {
        const consultProject = ConsultarProjectId(params.id)
        consultProject.then((dato) => {
            setTask(dato.tasks)
            setCantTas((1 * 100) / dato.tasks.length)
            setStateProject(dato.stateProject)
        })


    }
    const update = (id, name) => {
        const updateTask = {
            idTask: id,
            progressing: 0,
            tasks: [
                {
                    name: name,
                    state: true
                }
            ]
        }

        const updateProject = {
            progressing: cantTask
        }
        const response = ActualizarTask(params.id, updateTask)
        consultarTask()
        consultarTask()
    }

    const crearTask = () => {
        const crearTask = {
            progressing: 0,
            tasks: [
                {
                    name: nameTask,
                    description: descriptionTask,
                    state: false
                }
            ]
        }

        const response = AgregarTask(params.id, crearTask)
        const updateProject = {
            progressing: cantTask
        }
        consultarTask()
        consultarTask()
        setcrear(!crear)
    }


    return (
        <div className="row">
            <div className="col-s-12 contentTask">
                <Link className="col-xs-2 col-s-1 Link buttonExit" href="/">X</Link>
                <h1 className="col-s-12">TASK</h1>
                <div className="col-s-3 ">
                    <h5 className="col-s-12">id</h5>
                    {Task.map(tasks => (
                        <p className="col-s-12 tabla">
                            {tasks.id}
                        </p>
                    ))}
                </div>
                <div className="col-s-3 ">
                    <h5 className="col-s-12">task</h5>
                    {Task.map(tasks => (
                        <p className="col-s-12 tabla">
                            {tasks.name}
                        </p>
                    ))}
                </div>
                <div className="col-s-3">
                    <h5 className="col-s-12">description</h5>
                    {Task.map(tasks => (
                        <p className="col-s-12 tabla">
                            {tasks.description}
                        </p>
                    ))}
                </div>
                <div className="col-s-3">
                    <h5 className="col-s-12">state</h5>
                    {Task.map(tasks => (
                        <p className="col-s-12 tabla">
                            {tasks.state ? (
                                "Completado"
                            ) : (
                                <button className="col-s-12" type="button" onClick={() => update(tasks.id, tasks.name)}>completar</button>
                            )}
                        </p>
                    ))}
                </div>
                {stateProject!="finally" && <button className="col-s-3 buttonCreate" type="button" onClick={() => setcrear(!crear)} >Create Task</button>}
            </div>

            {crear &&
                <div className="col-s-12 contentCreateTask">
                    <div className="col-s-12  contentInputsTasks">
                        <button className="col-xs-2 col-s-1 Link buttonExit"
                            type="button" onClick={() => setcrear(!crear)}>x</button>
                        <h1 className="col-s-12">CREATE TASK</h1>
                        <label className="col-s-12 labelTask" for="">Name task</label>
                        <input className="col-s-12" type="text" onChange={(e) => setname(e.target.value)}
                            value={nameTask} />
                        <label className="col-s-12 labelTask" for="">Description task</label>
                        <input className="col-s-12" type="text" onChange={(e) => setdescription(e.target.value)}
                            value={descriptionTask} />
                        <button className="col-s-12" type="submit" onClick={crearTask}>Crear task</button>
                    </div>
                </div>}
        </div>
    )
}