import axios from "axios";

const endpoint = 'http://localhost:1234';
const projectEndpoint = `${endpoint}/project`;

export async function ConsultarTodosProjects() {
    const response = await axios.get(`${projectEndpoint}/`)
    return response.data
}

export async function ConsultarProject(name, project) {
    const response = await axios.get(`${projectEndpoint}/${name}`, project)
    return response.data
}

export async function ConsultarProjectId(id, project) {
    const response = await axios.get(`${projectEndpoint}/id/${id}`, project)
    return response.data
}

export async function AgregarProject(project) {
    console.log(project);

    const response = await axios.post(`${projectEndpoint}/`, project)
    return response.data
}

export async function ActualizarProject(id, project) {
    const response = await axios.patch(`${projectEndpoint}/${id}`, project)
    return response.data
}

export async function EliminarProject(id) {
    const response = await axios.delete(`${projectEndpoint}/${id}`)
    return response.data
}

export async function AgregarTask(id, project) {
    console.log(project);

    const response = await axios.post(`${projectEndpoint}/${id}`, project)
    return response.data
}

export async function ActualizarTask(id, project) {
    console.log(project);
    console.log(id);


    const response = await axios.patch(`${projectEndpoint}/task/${id}`,  project )
    return response.data
}