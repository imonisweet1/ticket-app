// frontend/script.js

// Simulated database for tickets
const ticketsDB = [];

// Purchase Ticket Functionality
document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const event = document.getElementById('event').value.trim();

    // Validate input fields
    if (!name || !email || !event) {
        alert("Please fill in all fields.");
        return;
    }

    // Generate a unique ticket code
    const ticketCode = generateTicketCode();

    // Save ticket to the simulated database
    ticketsDB.push({ name, email, event, ticketCode, status: 'valid' });

    // Create QR Code image
    const qrCanvas = document.createElement('canvas');
    qrcode.toCanvas(qrCanvas, ticketCode, function(error) {
        if (error) console.error(error);
        document.getElementById('ticketQR').src = qrCanvas.toDataURL();
    });

    // Display ticket details
    document.getElementById('ticketDetails').textContent = `Name: ${name}, Event: ${event}, Ticket Code: ${ticketCode}`;
    document.querySelector('.ticket-container').style.display = 'flex';

    // Show validation system
    document.querySelector('.validation-system').style.display = 'block';

    // Clear the form
    document.getElementById('purchaseForm').reset();
});

// Ticket Validation Functionality
document.getElementById('validateButton').addEventListener('click', function() {
    const enteredCode = document.getElementById('validateTicketCode').value.trim();

    // Find the ticket in the database
    const ticket = ticketsDB.find(ticket => ticket.ticketCode === enteredCode);

    if (!ticket) {
        document.getElementById('validationResult').textContent = "Invalid ticket.";
        document.getElementById('validationResult').style.color = "red";
        return;
    }

    if (ticket.status === 'used') {
        document.getElementById('validationResult').textContent = "Ticket already used.";
        document.getElementById('validationResult').style.color = "red";
        return;
    }

    // Mark the ticket as used
    ticket.status = 'used';
    document.getElementById('validationResult').textContent = "Ticket validated successfully!";
    document.getElementById('validationResult').style.color = "green";
});

// Helper function to generate a unique ticket code
function generateTicketCode() {
    return Math.random().toString(36).substr(2, 9); // Random alphanumeric string of length 9
}
