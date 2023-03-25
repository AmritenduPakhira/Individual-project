
$('#navbar').load('navbar.html');


const smartDevices = JSON.parse(localStorage.getItem('smart-devices')) || [];

function renderSmartDevices() {
  $('#smart-devices tbody').empty();
  smartDevices.forEach(function (device) {
    $('#smart-devices tbody').append(`
        <tr>
          <td>${device.user}</td>
          <td>${device.name}</td>
          <td><button class="delete-btn" data-name="${device.name}">Delete</button></td>
        </tr>`
    );
  });
}

renderSmartDevices();

$('#add-device').on('click', function () {
  const user = $('#user').val();
  const name = $('#name').val();
  smartDevices.push({ user, name });
  localStorage.setItem('smart-devices', JSON.stringify(smartDevices));
  location.href = 'device-list2.html';
});

$('#reset-data').on('click', function () {
  localStorage.clear();
  location.href = 'device-list2.html';
});

$('#smart-devices tbody').on('click', '.delete-btn', function () {
  const name = $(this).data('name');
  const index = smartDevices.findIndex(function (device) {
    return device.name === name;
  });
  if (index !== -1) {
    smartDevices.splice(index, 1);
    localStorage.setItem('smart-devices', JSON.stringify(smartDevices)); 
    renderSmartDevices();
  }
});
