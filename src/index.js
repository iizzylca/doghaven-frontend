
const url = 'http://localhost:3000/api/v1/rescues/1'
const header = document.querySelector('.header')

const getRescue = () => {
    fetch(url)
    .then(r => r.json())
    .then( data => {
        console.log(data)
    })
}

const renderRescue = () => {
    
}

getRescue();