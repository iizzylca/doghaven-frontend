/* 
1. (Rescue List)
- Fetch request for Rescues. *Check!*
- Access my Dom Elements in the html to use them in my render Functions. *Check!*
- Create Render Functions to render the Data to my page. *Check!*
- Slap the Rescue's information to my page *Check!*
- Make an Event Listener for each Rescue ????
- Retrieve each Dog name for each Rescue and render it to my Dog bar *Check!*

2. (Dog Bar)
- Fetch Request for Dogs *Check!*
- Use a render Function to go through the Dog objects and Find the Property of 
    name. *Check!*
- Use that name, and Slap on the DOM with Span Tags and its Id. *Check!*
- Make an addEventListener for each Span and pull another fetch Request for that
    specific dog. *Check!*
- Render another Function for just one Dog and create the elements you need for 
    the information you want to display. *Check!*
- Slap everything to the DOM. *Check!*
- Create a like Btn, and a Delete Btn. *Check!*
- addEventListeners for Update, and Delete Requests. (Update: Increase-Like) (Delete: Delete-Dog-Object). *Check!*
- Create a Submit Form to Create a Dog. *Check!*

2. (Rescue Container)

-Same steps for the rescue Container. 2. *Check!*

*/

// * DOM Elements * 

// * Elements for my Rescue Nav Container *
const dogsUrl = 'http://localhost:3000/api/v1/dogs'
const rescuesUrl = 'http://localhost:3000/api/v1/rescues'
const rescueDiv = document.querySelector('#adoption-center-info')
const dogBar = document.querySelector('#dog-bar')


// * Elements for my Main Grid Container *
const dogCont = document.querySelector('.main-container')
const imgCont = document.querySelector('#dog-image')
const img = document.querySelector('#dog-image img')
const dogLikes = document.querySelector('.like-btn p')
const dogInfo = document.querySelector('#dog-info')
const likeBtnId = document.querySelector('.like-btn')
const button = document.querySelector('.like-btn button')
const deleteDogButton = document.querySelector('.delete-dog')
const dogForm = document.querySelector('#add-dog-form')
const rescueCont = document.querySelector("#adoption-center-info")
const rescueForm = document.querySelector('#rescue-form')

// * Render Function * 

const renderRescues = (rescuesObj) => {
    rescueCont.innerHTML = ""
    rescuesObj.forEach(rescue => {
        renderRescue(rescue)
    });
}
const renderRescue = (rescue) => {
    // console.log(rescue)
    const rescueUl = document.createElement('ul')
    const rescueLi = document.createElement('li')
    const pTag1 = document.createElement('p')
    const pTag2 = document.createElement('p')
    const deleteBtn = document.createElement('button')
    
    rescueUl.className = 'rescue-ul'
    deleteBtn.className = 'delete'
    deleteBtn.dataset.id = rescue.id
    deleteBtn.textContent = '❎'
    rescueLi.className = 'li-list'
    pTag1.className = 'p-tag-one'
    pTag2.className = 'p-tag-two'
    rescueLi.dataset.id = rescue.id 
    rescueLi.textContent = rescue.name 
    pTag1.textContent = 'Location: ' +rescue.location
    pTag2.textContent = 'Organization: ' +rescue.organization
    
    rescueLi.append(pTag1, pTag2, deleteBtn)
    rescueUl.append(rescueLi)
    rescueDiv.append(rescueUl)
    
}

const renderOptions = (rescuesObj) => {
    console.log(rescuesObj)
    rescuesTag.innerHTML =""
    rescuesObj.forEach(rescueEle => {
        renderOneOption(rescueEle)
    })
    
}

const rescuesTag = document.querySelector('#rescues')

const renderOneOption = (rescueEle) => {
    
    const option = document.createElement('option')
    option.value = rescueEle.name
    option.textContent = rescueEle.name
    rescuesTag.append(option)

}

const renderDogs = (dogsObj) => {
    dogsObj.forEach(dog => {
        renderDog(dog)
    })
}

const renderDog = (dog) => {
    const span = document.createElement('span')
    span.className = 'span-tag'
    span.dataset.id = dog.id
    span.textContent = dog.name
    dogBar.append(span)
}

const infoUl = document.createElement('ul')
const dogBreed = document.createElement('li')
const dogAge = document.createElement('li')
const dogName = document.createElement('li')
const dogSex = document.createElement('li')
const dogDesc = document.createElement('li')
const dogRescue = document.createElement('li')

const renderOneDog = (oneDogObj) => {

    // console.log(oneDogObj)
    img.src = oneDogObj.image
    img.alt = oneDogObj.name
    dogLikes.textContent = oneDogObj.like
    button.textContent = ' ❤️ '
    deleteDogButton.textContent = '❎'

    infoUl.className = 'information'
    infoUl.dataset.id = oneDogObj.id
    likeBtnId.dataset.id = oneDogObj.id

    dogName.textContent = oneDogObj.name
    dogBreed.textContent = oneDogObj.breed
    dogAge.textContent = oneDogObj.age
    dogSex.textContent = oneDogObj.sex
    dogDesc.textContent = oneDogObj.description
    dogRescue.textContent = oneDogObj.rescue.name
    dogRescue.dataset.id = oneDogObj.rescue.id
    
    dogInfo.append(infoUl)
    infoUl.append(dogName, dogBreed, dogAge, dogSex, dogDesc, dogRescue)

}  

// * Event Listeners * 

dogBar.addEventListener('click', e => {
    // debugger
    imgCont.style.display = "block"
    // console.log(e.target)
    if (e.target.tagName === 'SPAN') {
        getOneDog(e.target.dataset.id)
        // console.log('first')
    }
    
})  

button.addEventListener('click' , e => {
    const dogId = e.target.closest('div').dataset.id
    let counter = parseInt(dogLikes.textContent) + 1

    const newLike = {
        id: dogId,
        like: counter
    }
    updateLikes(dogId, newLike)

})

deleteDogButton.addEventListener('click' , e => {
    const deleteDogId = e.target.closest('div').dataset.id
    const spanTag = document.querySelector(`span[data-id='${deleteDogId}']`)
    console.log(spanTag)
    deleteDog(deleteDogId, spanTag)
})

rescueCont.addEventListener('click', e => {
    const deleteRescueId = e.target.dataset.id
    const ulTag = e.target.closest('ul')
    // console.log(ulTag)
    
    deleteRescue(deleteRescueId, ulTag)
    // console.log(deleteRescueId)
})

dogForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e.target.name.value)
    
    const name = e.target.name.value
    const breed = e.target.breed.value
    const age = e.target.age.value
    const sex = e.target.sex.value
    const description = document.querySelector('#description').value
    const rescue = document.querySelector('#rescues').value
    const image = e.target.image.value
    console.log(name,breed,age,sex)

    const addDog = {
        breed: breed, 
        age: age,
        sex: sex,
        name: name,
        image: image,
        description: description, 
        like: 0,
        rescue: rescue
    }
    newDog(addDog)
    e.target.reset()

})

rescueForm.addEventListener('submit', e => {
    e.preventDefault()
    const name = e.target.name.value
    const location = e.target.location.value
    const organization = e.target.organization.value
    
    const newForm = {
        name: name,
        location: location, 
        organization: organization
    }
    newRescue(newForm) 
    e.target.reset()

})

// * Fetch Requests 

const getRescue = () => {
    fetch(rescuesUrl)
    .then(r => r.json())
    .then(rescuesObj => {
        renderOptions(rescuesObj)

        renderRescues(rescuesObj)
    })
}

const getDogs = () => {
    fetch(dogsUrl)
    .then(r => r.json())
    .then(dogsObj => {
        renderDogs(dogsObj)
    })
}

const getOneDog = (id) => {
    fetch(`${dogsUrl}/${id}`)
    .then(r => r.json())
    .then(oneDogObj => {
        renderOneDog(oneDogObj)
    })
}

const updateLikes = (id, newLike) => {
    fetch(`${dogsUrl}/${id}`,{
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(newLike)
        
    })
    .then(r => r.json())
    .then(updatedDog => {
        console.log('fourth')
        dogLikes.textContent = updatedDog.like
    })
}

const deleteDog = (id, spanTag) => {
    fetch(`${dogsUrl}/${id}`, {
        method: "DELETE", 
    })
    .then(() => {
        spanTag.remove()
        imgCont.style.display= 'none'
    })
}
const newDog = (addDog) => {
    fetch(`${dogsUrl}`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(addDog)
    })
    .then( r => r.json())
    .then( addedDog => {
        console.log(addedDog)
        renderDog(addedDog)
        renderOneDog(addedDog)
    })
}

const deleteRescue = (id, ulTag) => {
    fetch(`${rescuesUrl}/${id}`, {
        method: "DELETE", 
    })
    .then(() => {
        ulTag.remove()
        // imgCont.style.display= 'none'
        getRescue()
    })
}

const newRescue = (newForm) => {
    fetch(`${rescuesUrl}`, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newForm)

    })
    .then(r => r.json())
    .then(newRescueObj => {
        getRescue()
    })
}


// Initializers()

getRescue();
getDogs();