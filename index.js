import axios from 'axios';
import "./app.sass";


const BASE_URL = "http://localhost:3000/users";


// const click = document.getElementById("click");
// // const p = document.getElementById("p");


// click.addEventListener('click', function () {
// fetch(Base_URL)
//     .then(res => res.json())
//     .then(data => {
//         data.forEach((user) => {
//             p.innerHTML = `${p.innerHTML} <br /> ${user.name}`
//         });
//     })
//     .catch(err => console.log(err));

//     axios(Base_URL)
//         .then(res => {
//             res.data.forEach((user) => {
//                 p.innerHTML = `${p.innerHTML} Name: ${user.name}<br />`
//             });
//         })
//         .catch(err => console.log(err));
// })




const createTDElement = (contact, parentElement) => {
    const tr = document.createElement("tr");
    tr.className = "text-center";

    const tdName = document.createElement("td");

    tdName.innerHTML = contact.name ? contact.name : "N/A";
    tr.appendChild(tdName);

    const tdPhone = document.createElement("td");

    tdPhone.innerHTML = contact.phone ? contact.phone : "N/A";
    tr.appendChild(tdPhone);

    const tdEmail = document.createElement("td");

    tdEmail.innerHTML = contact.email ? contact.email : "N/A";
    tr.appendChild(tdEmail);

    const tdAction = document.createElement("td");

    const tdActionEditBtn = document.createElement("button");
    tdActionEditBtn.className = "btn btn-info";
    tdActionEditBtn.innerHTML = "Update";

    tdActionEditBtn.addEventListener('click', function () {
        let mainModal = $('#contactEditModal')
        mainModal.modal('toggle')

        let editName = document.getElementById("editName")
        let editPhone = document.getElementById("editPhone")
        let editEmail = document.getElementById("editEmail")

        editName.value = contact.name ? contact.name : ''
        editPhone.value = contact.phone ? contact.phone : ''
        editEmail.value = contact.email ? contact.email : ''

        let updateContactSave = document.getElementById("saveContact")

        updateContactSave.addEventListener('click', function () {
            axios.put(`${BASE_URL}/${contact.id}`, {
                name: editName.value,
                phone: editPhone.value,
                email: editEmail.value
            })
                .then(res => {
                    tdName.innerHTML = res.data.name
                    tdPhone.innerHTML = res.data.phone
                    tdEmail.innerHTML = res.data.email

                    mainModal.modal('hide')
                })
                .catch(err => console.log(err))
        })
    })

    tdAction.appendChild(tdActionEditBtn);

    const tdActionDelBtn = document.createElement("button");
    tdActionDelBtn.className = "btn btn-danger mx-1"
    tdActionDelBtn.innerHTML = "Deleat";

    tdActionDelBtn.addEventListener('click', function () {
        axios.delete(`${BASE_URL}/${contact.id}`)
            .then(res => {
                parentElement.removeChild(tr)
            })
            .catch(err => console.log(err))

    })
    tdAction.appendChild(tdActionDelBtn);

    tr.appendChild(tdAction);

    parentElement.appendChild(tr);
}

window.onload = function () {
    let tBody = document.getElementById("tBody");
    axios.get(BASE_URL)
        .then(res => {
            res.data.forEach((contact) => {
                createTDElement(contact, tBody);
            })
        })
        .catch(err => console.log(err))

    const saveNewContactBtn = document.getElementById("saveNewContact")
    saveNewContactBtn.addEventListener('click', createNewContact)
}

const createNewContact = () => {

    const fullName = document.getElementById("fullName")
    const phoneNumber = document.getElementById("phoneNumber")
    const emailAddress = document.getElementById("emailAddress")

    let contact = {
        name: fullName.value,
        phone: phoneNumber.value,
        email: emailAddress.value
    }

    axios.post(BASE_URL, contact)
        .then(res => {
            let tBody = document.getElementById("tBody")
            createTDElement(res.data, tBody)

            fullName.value = ''
            phoneNumber.value = ''
            emailAddress.value = ''
        })
        .catch(err => console.log(err))
}