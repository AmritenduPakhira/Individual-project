
const API_URL = 'http://localhost:5000/api';

// Fetch and render device data
function renderDevices() {
  $.get(`${API_URL}/airsystem`)
    .then(response => {
      $('#dev tbody').empty();
      response.forEach(device => {
        $('#dev tbody').append(`
          <tr>
            <td>${device.user}</td>
            <td>${device.name}</td>
            <td><button class="delete-btn" data-id="${device._id}" data-name="${device.name}">Delete</button></td>
          </tr>
        `);
      });
    })
    .catch(error => {
      console.error(`Failed to fetch device data: ${error}`);
    });
}


// Add device
$('#add-devices').on('click', () => {
  const name = $('#name').val();
  const user = $('#user').val();
  
  // Check if user and name fields are empty
  if (!user || !name) {
    alert('Please fill in the form before adding a device.');
    return;
  }

  // Check if user and name fields contain only string values
 

  const body = {
    name,
    user,
    sensorData: []
  };

  $.post(`${API_URL}/airsystem`, body)
    .then(response => {
     
      window.location.replace('http://localhost:3001/aws') ;
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
    window.location.replace('http://localhost:3001/aws') ;
});

// Reset data
$('#reset-data').on('click', function () {
  localStorage.clear();
  location.href = '';
});



async function deleteDevice(idToDelete) {
  try {
    // Delete device from MongoDB
    const response = await fetch(`${API_URL}/airsystem/${idToDelete}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      console.error(`Failed to delete device with ID ${idToDelete}.`);
      return;
    }

    // Remove the corresponding row from the table
    $(`button[data-id='${idToDelete}']`).closest('tr').remove();
    console.log(`Device with ID ${idToDelete} has been deleted.`);
  } catch (error) {
    console.error(`Failed to delete device with ID ${idToDelete}: ${error}`);
  }
}


// Event listener for delete button
// Event listener for delete button
$('#dev tbody').on('click', '.delete-btn', function () {
  const id = $(this).data('id');
  const name = $(this).data('name');
  if (confirm(`Are you sure you want to delete ${name}?`)) {
    deleteDevice(id);
  }
});


// Initial render of devices
renderDevices();
