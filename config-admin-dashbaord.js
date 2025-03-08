    // Kunin ang mga order mula sa localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersTable = document.getElementById('orders');
    
    // Function para i-display ang mga order
    function displayOrders() {
      ordersTable.innerHTML = ''; // I-clear muna ang table
      orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td><img src="${order.image}" alt="${order.name}" width="50"></td>
                <td>${order.name}</td>
                <td>${order.size}</td>
                <td>${order.quantity}</td>
                <td>₱${(parseFloat(order.price.replace('₱', '')) * order.quantity).toFixed(2)}</td>
                <td>
                    <button class="remove-btn" onclick="removeOrder(${index})">Remove</button>
                </td>
            `;
        ordersTable.appendChild(row);
      });
    }
    
    // Function para mag-remove ng order (hindi na ililipat sa archive)
    function removeOrder(index) {
      if (confirm("Admin Confirmation")) {
        orders.splice(index, 1); // Alisin ang order sa main list
        localStorage.setItem('orders', JSON.stringify(orders)); // I-update ang localStorage
        displayOrders(); // I-update ang table
      }
    }
    
    displayOrders(); // I-display ang mga order sa simula
    