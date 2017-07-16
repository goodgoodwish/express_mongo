//main.js
function init(argument) {

  var update = document.getElementById('update');

  update.addEventListener('click', function() {
    fetch('quotes', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': 'Yi',
          'quote': 'Schedule the priority.'
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        console.log(data);
        window.location.reload(true);
      });
  });

  var deleteOne = document.getElementById('delete');

  deleteOne.addEventListener('click', function() {
    fetch('quotes', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': 'Yi'
        })
      })
      .then(res => {
        if (res.ok) {
        	console.log('Delete done');
          return res.json();
        }
      })
      .then(data => {
        console.log('Delete', data);
        //window.location.reload(true);
      });
  });
}


window.onload = init;
