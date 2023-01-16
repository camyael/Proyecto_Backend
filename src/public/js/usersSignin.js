const form = document.getElementById('formSignIn')

form.addEventListener('submit',evt=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {}
    data.forEach((value,key)=>obj[key] = value)
    fetch('/register',{
        method:'POST',
        body: JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>{
        console.log(json)
        if(json.status ==="success") {
            setTimeout(window.location.replace('/login'), 2000)
        }
    })
})