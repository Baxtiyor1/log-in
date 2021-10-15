const elForm = document.querySelector('#form');
const elEmail = document.querySelector('#email');
const elPassword = document.querySelector('#password');



elForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let emailValue = elEmail.value.trim()
    let passwordValue = elPassword.value.trim()
    
    
    async function fetchLogin(){
        const respons = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            email: emailValue,
            password : passwordValue
        })
    })
    const data = await respons.json()
    
    if(data){
        window.localStorage.setItem('login', JSON.stringify(data))
        window.location.replace('index.html')
    }
}
fetchLogin()
})