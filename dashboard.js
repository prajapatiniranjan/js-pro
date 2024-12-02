const API_URL = "http://localhost:3000/users"; // Update with your backend URL

// Fetch and display users/products
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Display users in table
function displayUsers(users) {
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    if (users.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5'>No products available.</td></tr>";
    } else {
        users.forEach(user => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.brand}</td>
                <td>${user.product}</td>
                <td>${user.price}</td>
                <td>
                    <button class="edit-btn" data-id="${user.id}">Edit</button>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Attach event listeners to buttons
    attachEventListeners();
}

// Attach event listeners to edit and delete buttons
function attachEventListeners() {
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("data-id");
            showEditModal(userId);
        });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("data-id");
            deleteUser(userId);
        });
    });
}

// Add new product
document.getElementById("addUserForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUser = {
        brand: document.getElementById("brand").value,
        product: document.getElementById("product").value,
        price: document.getElementById("price").value,
    };
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });

    if (response.ok) {
        fetchUsers();
        document.getElementById("addUserForm").reset();
    }
});

// Show edit modal
function showEditModal(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById("editId").value = user.id;
            document.getElementById("editBrand").value = user.brand;
            document.getElementById("editProduct").value = user.product;
            document.getElementById("editPrice").value = user.price;

            document.getElementById("editModal").style.display = "block";
        });
}

// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("editModal").style.display = "none";
});

// Update product
document.getElementById("editUserForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const updatedUser = {
        id: document.getElementById("editId").value,
        brand: document.getElementById("editBrand").value,
        product: document.getElementById("editProduct").value,
        price: document.getElementById("editPrice").value,
    };

    const response = await fetch(`${API_URL}/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
        fetchUsers();
        document.getElementById("editModal").style.display = "none";
    }
});

// Delete product
async function deleteUser(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (response.ok) {
        fetchUsers();
    }
}

// Fetch and display users on page load
fetchUsers();
