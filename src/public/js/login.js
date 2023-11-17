const form = document.getElementById('registerForm')
form.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",

        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(data)
                window.location.href = '/'
            } else {
                console.log('Credenciales Invalidas')
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales Inválidas',
                    text: 'Por favor, verifica tus credenciales e intenta de nuevo.',
                });
            }
        })
        .catch(error => {
            console.log(error.message)
        })
})