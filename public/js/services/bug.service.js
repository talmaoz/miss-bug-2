


function query(filterBy) {
    var queryString = `?page=${filterBy.page}`;
    if (filterBy.txt) queryString += `&txt=${filterBy.txt}`

    return axios.get(`/api/bug${queryString}`)
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(`/api/bug/${bugId}`)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.delete(`/api/bug/${bugId}`)
        .then(res => res.data)
        .catch(err => {
            console.log('Could not delete Bug', err);
            throw err;
        })
}
function save(bug) {
    if (bug._id) {
        return axios.put(`/api/bug/${bug._id}`, bug)
        .then(res => res.data)
    } else {
        return axios.post(`/api/bug`, bug)
            .then(res => res.data)
    }

}

export default {
    query,
    getById,
    remove,
    save
}