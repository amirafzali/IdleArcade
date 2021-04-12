$(document).ready(() => {

    buildTable()
    async function buildTable() {
        let users = await db.collection('users').orderBy('score', 'desc').get()
        let i = 1;
        build = []
        for(let user of users.docs) {
            let data = user.data()
            let row = `<tr>
                <th scope="row">${i}</th>
                <td>${data.username}</td>
                <td>${data.score}</td>
            </tr>`
            build.push(row)
            i+=1
        }
        $('#tableBody').append(build.join(""));
    }


    
})