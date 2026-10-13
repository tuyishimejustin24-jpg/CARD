const tableBody = document.querySelector("tbody");
let UserId = underfined;

async function fetchUsers() {
    try {
        const response = await fetch("https://fakestoreapi.com/users");
        const users = await response.json();

        users.map((User) => {
            const tableRow = document.createElement("tr");
            tableRow.setAttribute("data-user-id", user.id)
            

            tableRow.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name.firstname}</td>
                <td>${user.name.lastname}</td>
                <td>${user.email}</td>
                <td>${user.Username}</td>
                <td>${user.address.city}</td>
                <button onclick='updateUser(${JSON.stringify(user)})'><i class="fa-solid fa-pen" style="color: rgb(0, 255, 0);"></i></button>
                <button onclick='deleteUser(${user.id})'><i class="fa-solid fa-trash" style="color: rgb(255, 0, 0);"></i></button>
             `
            tableBody.appendChild(tableRow);

                })

        // tableRow.querySelector('.edit-btn').addEventListener('click', () => updateUser(User))
        // tableRow.querySelector('.delete-btn').addEventListener('click', () => deleteUser(User.id))


         

    
    } catch (error) {
        console.log(`Error is : ${error}`);
    }
}


fetchUsers()

// async function updateUser(User){
//   console.log(`default User:`,User)

//     const firstName = User.name.firstname

const updateUserForm = document.createElement("form");
updateUserForm.id = "updateModal";
updateUserForm.style.display='none'

updateUserForm.innerHTML = `
    <h1>Update User</h1>
    <input class='form-input' id="firstname" type='next' />
    <input class='form-input' id="lastname" type'next' />
    <input class='form-input' id="Username" type'next' />
    <input class='form-input' id="address" type'next' />

    <div>
        <button class='form-button' style="background: red;">Cancele</button>
        <button id='submit-button' class='form-button'style="background: blue;">Update</button>
    </div>

`
document.body.appendChild(updatUserForm)


const submitButton = document.querySelector("#submit-button")
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const UserName = document.querySelector("#UserName")
const address = document.querySelector("#address")

const updateUser = (User) => {
    updatUserForm.style.display = 'block'
    firstName.value = User.name.firstname
    lastName.value = User.name.lastname
    UserName.value = User.Username
    address.value = User.address.city
    UserId = User.id
}

const submitForm = async () => {
    const data = {
        name: { firstname: firstName.value, lastname: lastName.value },
        Username: UserName.value,
        address: { city: address.value }
    }

    try {
        const response = await fetch(`https://fakestoreapi.com/Users/${UserId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        const updatedUser = await response.json()
        console.log(updatedUser);

        const tableRow = document.querySelector(`tr[data-User-id="${UserId}"]`);
        tableRow.children[1].textContent = updatedUser.name.firstName
        tableRow.children[2].textContent = updatedUser.name.lastName
        tableRow.children[4].textContent = updatedUser.UserName
        tableRow.children[5].textContent = updatedUser.address.city
        updatUserForm.style.display = 'none'

    } catch (error) {
        console.log(`error is :${error}`)
    }
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    submitForm();
})

const deleteUser = async (UserId) => {
    console.log(userId)

    try {
        const response = await fetch(`https://fakestoreapi.com/users/${userId}`, { method: 'DELETE' })
        const deletedUser = await response.json()
        console.log(deletedUser);

        document.querySelector(`tr[data-user-id="${userId}"]`).remove();
        alert('User deleted successfully.');
    } catch (error) {
        console.log(`error is :${error}`)
    }
}