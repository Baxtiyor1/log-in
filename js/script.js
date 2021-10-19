const elLogOutBtn = document.querySelector('#log__out');

// tempale
const elTemplate = document.querySelector('#template').content;
const elList = document.querySelector('.users__list');

let token  = JSON.parse(window.localStorage.getItem('login'))

// log out from index.html
if(!token?.token){
    window.location.replace('login.html')
}

elLogOutBtn.addEventListener('click', ()=>{
    window.localStorage.removeItem('login')
    location.reload()
})

// localStorage data
let localData = JSON.parse(window.localStorage.getItem('data'))


// async function
async function renderUsers(){
    const respons = await fetch('https://reqres.in/api/users?page=2')
    const data = await respons.json()
    let resultData = data.data
    window.localStorage.setItem('data', JSON.stringify(resultData))
    // let resultData = data.data
    function renderUser(array, element){
        element.innerHTML = null;

        array.forEach(obj =>{
            let cloneTemplate = elTemplate.cloneNode(true)
            
            cloneTemplate.querySelector('.users__img').src = obj.avatar;
            cloneTemplate.querySelector('#users__name').textContent = obj.first_name;
            cloneTemplate.querySelector('#users__surmane').textContent = obj.last_name;
            let userEmail = cloneTemplate.querySelector('.users__email')
            userEmail.textContent = obj.email
            userEmail.setAttribute('href', `mailto: ${obj.email}`)
            let deleteBtn = cloneTemplate.querySelector('#user__id')
            deleteBtn.dataset.id = obj.id
            
            deleteBtn.addEventListener('click', (e)=>{
                async function deleteUser(){
                    const resDetele = await fetch('https://reqres.in/api/users/'  + e.target.dataset.id, {
                    method: 'DELETE',
                })
                console.log(resDetele.status)
                if(resDetele.status === 204){
                    let userId = e.target.dataset.id
                    
                    let findUser = localData.findIndex(user => user.id == userId)
                    
                    resultData.splice(findUser, 1)
                    window.localStorage.setItem('data', JSON.stringify(resultData))
                    localData = JSON.parse(window.localStorage.getItem('data'))
                    renderUser(localData, elList)
                    // location.reload()
                }
            }
            deleteUser()
        })
        
        element.appendChild(cloneTemplate)
    })
}
renderUser(localData, elList)

}
renderUsers()