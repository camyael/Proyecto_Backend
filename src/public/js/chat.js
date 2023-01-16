const chat = document.getElementById('chat')
const chatInput = document.getElementById('chatInput')

const socket = io({
    autoConnect:false
})

let mail, first_name, last_name, alias, avatar, age

function sweetAlert(text) {
    return  Swal.fire({
                title:"Identifícate",
                input:'text',
                text:`Ingresa un ${text} que tendrás en el chat`,
                inputPlaceholder: 'Enter your data',
                inputValidator: (value) =>{
                    return !value && `¡Necesitas colocar un ${text} válido para proseguir!`
                },
                allowOutsideClick:false,
                allowEscapeKey : false
        })
}

const alert = async () => {
    const mailValue = await sweetAlert("mail")
    mail = mailValue.value
    const nombreValue = await sweetAlert("nombre")
    first_name = nombreValue.value
    const apellidoValue = await sweetAlert("apellido")
    last_name = apellidoValue.value
    const aliasValue = await sweetAlert("alias")
    alias = aliasValue.value
    const avatarValue = await sweetAlert("avatar (URL)")
    avatar = avatarValue.value
    const edadValue = await sweetAlert("edad")
    age = edadValue.value
    socket.connect()
    socket.emit('authenticated', alias)
}

alert()

chatInput.addEventListener('keyup',evt=>{
    let fecha = new Date().toLocaleString()
    if(evt.key==="Enter"){
        if(chatInput.value.trim().length>0){
            const mensaje = chatInput.value.trim()
            const schema = {
                author: {
                    mail: mail,
                    first_name: first_name,
                    last_name: last_name,
                    alias: alias,
                    avatar: avatar,
                    age: age
                },
                message: {
                    timestamp: fecha,
                    text: mensaje
                }
            }
            socket.emit('message', schema)
        }
    }
})

socket.on('logs', data => {
    let message = ''
    data.forEach(e => {
        message += `
        <p><span class="span-email">${e.author.alias}</span> <span class="span-fecha">[${e.message.timestamp}]</span> : <span class="span-mensaje">${e.message.text}</span></p>
        `
       
    });
    chat.innerHTML = message
})

socket.on('newUserConnected', data => {
    if(!mail) return;
    Swal.fire({
        toast:true,
        position:'top-end',
        showConfirmButton:false,
        timer:2000,
        title:`${data} se ha unido al chat`,
        icon:'success'
    })
})