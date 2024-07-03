import api from './api'

function getUser(token) {

    let user = true
    api.get('/users/verifyuser', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    if (!res.data) {
        return user = false
    }
    // console.log(res.data)
    return user
}







export default getUser