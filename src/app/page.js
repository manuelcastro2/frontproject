"use client";
import { useRouter } from "next/navigation";
import "./styles/index.css";
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import { ConsultarTodosProjects, EliminarProject, ConsultarProject, ActualizarProject } from "./../apiProject.js"

export default function Home() {
  const [project, setProject] = useState([])
  const [busqueda, setbusqueda] = useState([])
  const router = useRouter()

  const consultarProject = () => {
    if (busqueda != '') {
      const dates = ConsultarProject(busqueda)
      dates.then(date => {
        setProject([date])
        console.log(date);
      })
    } else {
      const dates = ConsultarTodosProjects()
      dates.then(date => {
        setProject(date)
        console.log(date);
      })
    }
  }

  useEffect(() => {
    consultarProject()
    consultarProject()
  }, [20])

  const deleteProject = (id) => {
    EliminarProject(id)
    consultarProject()
    consultarProject()
  }

  const updateStateProject = (id) => {
    ActualizarProject(id, { stateProject: "finally" })
    consultarProject()
    consultarProject()
  }

  return (
    <div className="row contenderVista">
      <h1 className="col-s-12 col-l-12 ">MANAGE OF PROJECTS</h1>
      <div className="col-s-12 col-l-4">
        <div className="col-s-12 col-m-6 col-l-12 contentSearch">
          <h2 className="col-xs-12 col-s-12 ">BUSQUEDA</h2>
          <input className="col-xs-12 col-s-12" type="search"
            name="Search" placeholder="Search Project" value={busqueda} onChange={(e) => setbusqueda(e.target.value)} />
          <button className="col-xs-12 col-s-12" type="button" onClick={() => consultarProject()}>SEARCH</button>
        </div>
        <div className="col-l-3 col-l-12 col-m-6 contentCreate">
          <h2 className="col-s-12">CREATE A PROJECT</h2>
          <Link className="col-s-12 Link" href="/crearUpdate">CREATE</Link>
        </div >
      </div>
      <div className="col-s-12 col-l-8 contentProjects">
        <h3 className="col-s-12">PROJECTS</h3>
        <div className="col-s-12">
          {
            project.map((projects) => (
              <div className="col-s-12 Project">
                <h4 className="col-s-12">Project: {projects.name}</h4>
                <div className="col-s-12 Data">
                  <p className="col-s-12">State project: {projects.stateProject}</p>
                  <p className="col-s-12">Progressing: {projects.progressing}%</p>
                  <p className="col-s-12">Date Initial: {projects.dateInitial}</p>
                  <p className="col-s-12">Date Final: {projects.dateFinal}</p>
                  <button className="col-xs-12 col-s-3 Link"
                    type="button" onClick={() => router.push(`/task/${projects.id}`)}>WATCH TASK</button>
                  {projects.stateProject != "finally" && <button className="col-xs-12 col-s-2 Link"
                    type="button" onClick={() => router.push(`/crearUpdate/${projects.id}`)}>UPDATE</button>}
                  <button className="col-xs-12 col-s-2 Link"
                    type="button" onClick={() => { deleteProject(projects.id) }}>DELETE</button>
                  {projects.stateProject != "finally" && <button className="col-xs-12 col-s-2 Link"
                    type="button" onClick={() => updateStateProject(projects.id)}>Finally</button>}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>

  );
}
