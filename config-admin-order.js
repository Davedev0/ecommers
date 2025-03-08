// Kunin ang mga user mula sa localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
const userTable = document.getElementById('user-table');

// Function para i-display ang mga user
function displayUsers() {
  userTable.innerHTML = '';// I-clear muna ang table
  users.forEach((user, userIndex) => {
    // Loop sa bawat order ng user
    user.orders.forEach((order, orderIndex) => {
      const userCard = document.createElement('div');
      userCard.classList.add('user-card');
      userCard.innerHTML = `
        <div>
          <p><strong>Name:</strong> ${user.fullname}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Location:</strong> ${user.location}</p>
          <p><strong>Gender:</strong> ${user.gender}</p>
          <h4>Order:</h4>
          <ul>
            <li>
              <img src="${order.image}" alt="${order.name}" class="img"><br>
              <strong>Product:</strong> ${order.name}<br>
              <strong>Price:</strong> ${order.price}<br>
              <strong>Size:</strong> ${order.size}<br>
              <strong>Quantity:</strong> ${order.quantity}
            </li>
          </ul>
        </div>
        <div class="actions">
          <button class="select-btn" onclick="selectUser(${userIndex}, ${orderIndex})">Approve</button>
          <button class="remove-btn" onclick="removeUser(${userIndex}, ${orderIndex})">Remove</button>
        </div>
      `;
      userTable.appendChild(userCard); // Idagdag ang card sa table
    });
  });
}

// Function para mag-select ng order at magpadala ng email notification
function selectUser(userIndex, orderIndex) {
  const customAlert = document.getElementById('select-alert');
  customAlert.style.display = 'block';
  setTimeout(() => {
  customAlert.style.display = 'none';
  }, 3000);
  
  // Magpadala ng email notification gamit ang Email.js
  sendEmailNotification(selectedUser.email, selectedUser.fullname);
}

// Function para mag-remove ng order
function removeUser(userIndex, orderIndex) {
  if (confirm("Admin Confirmation.")) {
    const user = users[userIndex];
    user.orders.splice(orderIndex, 1); 
    // Alisin ang order sa listahan

    // Kung wala nang orders ang user, alisin ang user sa listahan
    if (user.orders.length === 0) {
      users.splice(userIndex, 1);
    }

    localStorage.setItem('users', JSON.stringify(users)); // I-update ang localStorage
    displayUsers(); // I-update ang table
  }
}

// Function para magpadala ng email notification gamit ang Email.js
function sendEmailNotification(userEmail, userName) {
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      to_email: userEmail,
      user_name: userName,
      message: 'You have been selected by the admin. Please check your account for more details.'
    })
    .then(function(response) {
      console.log('Email sent successfully!', response);
    }, function(error) {
      console.error('Failed to send email:', error);
    });
}

// I-display ang mga user sa simula
displayUsers();