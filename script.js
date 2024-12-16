function fetchUsers() {
    console.log('Fetching users...'); // Check if the function is being called
    fetch('data.php')
        .then((response) => {
            console.log('Response:', response); // Check if the fetch request was successful
            return response.json();
        })
        .then((data) => {
            console.log('Fetched Data:', data); // Log the data here
            const tbody = document.querySelector('#user-table tbody');
            tbody.innerHTML = ''; // Clear the table

            data.forEach((user) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td> <!-- Display password as well -->
                    <td>
                        <button class="edit-btn" data-id="${user.id}" data-username="${user.name}" data-email="${user.email}" data-password="${user.password}">Edit</button>
                        <button class="delete-btn" data-id="${user.id}">Delete</button>
                    </td>
                `;
                document.getElementById('user-table').querySelector('tbody').appendChild(row);
                
            });

            attachActionListeners(); // Attach event listeners for edit and delete buttons
        })
        .catch((error) => console.error('Error fetching users:', error));
}


// Function to delete a user
function deleteUser(userId) {
    fetch('remove_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${userId}`
    })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            fetchUsers(); // Refresh the user table after deletion
        })
        .catch((error) => console.error('Error deleting user:', error));
}
// Function to attach listeners to edit and delete buttons
// Function to attach listeners to edit and delete buttons
function attachActionListeners() {
    document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const userId = e.target.dataset.id;
            if (confirm('Confirm Delete.')) {
                deleteUser(userId);
            }
        });
    });

    document.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const userId = e.target.dataset.id;
            const username = e.target.dataset.name;
            const password = e.target.dataset.password;

            const newUsername = prompt('Edit Username:', username);
            const newPassword = prompt('Edit Password:', password);

            if (newUsername && newPassword) {
                updateUser(userId, newUsername,newPassword);
            }
        });
    });
}


// Function to update user
// Function to update user
function updateUser(userId, username,password) {
    fetch('update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${userId}&username=${username}&password=${password}`
    })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            fetchUsers(); // Refresh the user table after update
        })
        .catch((error) => console.error('Error updating user:', error));
}


// Fetch users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);