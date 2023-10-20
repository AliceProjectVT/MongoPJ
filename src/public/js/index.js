

const socket = io()


const userName = document.querySelector('.userName')
Swal.fire({
    title: 'Ingresa tu Nick',
    input: 'text',
    inputAttributes: {
        autocapitalize: 'on'
    },
    showCancelButton: false,
    confirmButtonText: 'Ingresar.',

}).then((result) => {
    userName.textContent = result.value
    socket.emit("userConnection", {
        user: result.value

    })

})
const messageInnerHTML = (data) => {
    let message = " ";
    for (let i = 0; i < data.length; i++) {
        if (data[i].info === 'connection') {
            message += `<p class="connection" >${data[0].message}</p>`
        } if (data[i].info === 'message') {
            message += `
            <div class="messaeUser" >
            <h5>${data[i].name} dice: </h5>
            <p>${data[i].message}</p>
            </div>
            `
        }

    }
    return message
}
const chatMessage = document.querySelector('.chatMessage')


socket.on('userConnection', (data) => {
    chatMessage.innerHTML = "";
    const connection = messageInnerHTML(data)
    console.log(data)
    chatMessage.innerHTML = connection;
})
const inputMessage = document.getElementById('inputMessage')
const sendMessage = document.getElementById('sendMessage')

sendMessage.addEventListener('click', (e) => {
    e.preventDefault();
       socket.emit("userMessage", {
        message: inputMessage.value
    })

})


socket.on("userMessage", (data) => {
    chatMessage.innerHTML = ""

    const message = messageInnerHTML(data)
    chatMessage.innerHTML = message;

})
