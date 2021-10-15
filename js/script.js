const elLogOutBtn = document.querySelector('#log__out');

// tempale
const elTemplate = document.querySelector('#template').content;
const elList = document.querySelector('.users__list');

let token  = JSON.parse(window.localStorage.getItem('login'))

if(!token?.token){
    window.location.replace('login.html')
}

elLogOutBtn.addEventListener('click', ()=>{
    window.localStorage.removeItem('login')
    location.reload()
})

async function renderUsers(){
    const respons = await fetch('https://reqres.in/api/users?page=2')
    const data = await respons.json()
    let resultData = data.data

    resultData.forEach(obj =>{
        let cloneTemplate = elTemplate.cloneNode(true)

        cloneTemplate.querySelector('.users__img').src = obj.avatar;
        cloneTemplate.querySelector('#users__name').textContent = obj.first_name;
        cloneTemplate.querySelector('#users__surmane').textContent = obj.last_name;
        let userEmail = cloneTemplate.querySelector('.users__email')
        userEmail.textContent = obj.email
        console.log(userEmail.setAttribute('href', `mailto: ${obj.email}`))

        elList.appendChild(cloneTemplate)
        // console.log(obj)
    })

}
renderUsers()