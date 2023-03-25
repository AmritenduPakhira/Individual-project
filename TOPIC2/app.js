
$('#navbar').load('navbar.html');


const devices = JSON.parse(localStorage.getItem('devices')) || [];

function renderDevices() {
  $('#devices tbody').empty();
  devices.forEach(function (device) {
    $('#devices tbody').append(`
        <tr>
          <td>${device.user}</td>
          <td>${device.name}</td>
          <td><button class="delete-btn" data-name="${device.name}">Delete</button></td>
        </tr>`
    );
  });
}

renderDevices();

$('#add-device').on('click', function () {
  const user = $('#user').val();
  const name = $('#name').val();
  devices.push({ user, name });
  localStorage.setItem('devices', JSON.stringify(devices));
  location.href = 'device-list.html';
});




$('#reset-data').on('click', function () {
  localStorage.clear();
  location.href = 'device-list.html';
});


$('#devices tbody').on('click', '.delete-btn', function () {
  const name = $(this).data('name');
  const index = devices.findIndex(function (device) {
    return device.name === name;
  });
  if (index !== -1) {
    devices.splice(index, 1);
    localStorage.setItem('devices', JSON.stringify(devices)); 
    renderDevices();
  }
});