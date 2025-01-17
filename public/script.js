$(document).ready(function () {
  $('#prospectForm').submit(function (event) {
    event.preventDefault();

    const prospectData = {
      name: $('#name').val(),
      email: $('#email').val(),
      phone: $('#phone').val()
    };

    $.ajax({
      url: '/prospect',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(prospectData),
      success: function (response) {
        $('#responseMessage').html('<div class="alert alert-success">' + response.message + '</div>');
        $('#prospectForm')[0].reset();
      },
      error: function () {
        $('#responseMessage').html('<div class="alert alert-danger">Erreur lors de l\'ajout du prospect.</div>');
      }
    });
  });
});
async function loadProspects() {
  try {
    const response = await fetch('/prospects');
    const prospects = await response.json();
    let prospectsList = '';

    prospects.forEach(prospect => {
      prospectsList += `
        <li>${prospect.name} - ${prospect.email} (${prospect.phone}) 
          <button class="btn btn-sm btn-warning mx-2" onclick="editProspect(${prospect.id})">Modifier</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProspect(${prospect.id})">Supprimer</button>
        </li>`;
    });

    document.getElementById('prospectsList').innerHTML = `<ul>${prospectsList}</ul>`;
  } catch (err) {
    console.error('Erreur:', err);
  }
}

loadProspects();
function editProspect(id) {
  // Ouvrir un formulaire pré-rempli pour modification
  alert(`Modifier le prospect avec ID : ${id}`);
}
async function deleteProspect(id) {
  if (confirm('Voulez-vous vraiment supprimer ce prospect ?')) {
    try {
      const response = await fetch(`/prospect/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Prospect supprimé avec succès.');
        loadProspects(); // Recharger la liste
      } else {
        alert('Erreur lors de la suppression du prospect.');
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  }
}
$(document).ready(function () {
// Lorsque l'on clique sur le bouton, afficher le formulaire
$('#reserveButton').click(function (event) {
  event.preventDefault(); // Empêche l'action par défaut du lien

  // Afficher le formulaire de gestion des prospects
  $('#prospectFormSection').fadeIn();
  
  // Scroller vers le formulaire
  $('html, body').animate({
    scrollTop: $('#prospectFormSection').offset().top
  }, 500);
});

// Lors de la soumission du formulaire, envoyer les données
$('#prospectForm').submit(function (event) {
  event.preventDefault();

  const prospectData = {
    name: $('#name').val(),
    email: $('#email').val(),
    phone: $('#phone').val()
  };

  $.ajax({
    url: '/prospect',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(prospectData),
    success: function(response) {
      $('#responseMessage').html('<div class="alert alert-success">' + response.message + '</div>');
      $('#prospectForm')[0].reset();
    },
    error: function() {
      $('#responseMessage').html('<div class="alert alert-danger">Erreur lors de l\'ajout du prospect.</div>');
    }
  });
});
});
$(document).ready(function () {
// Affichage du formulaire lors du clic sur le bouton
$('#reserveButton').click(function (event) {
  event.preventDefault(); // Empêche le comportement par défaut du lien
  $('#prospectFormSection').fadeIn(); // Afficher le formulaire
  $('html, body').animate({ scrollTop: $('#prospectFormSection').offset().top }, 500); // Scroll vers le formulaire
});

// Soumission du formulaire de prospect
$('#prospectForm').submit(function (event) {
  event.preventDefault();
  const prospectData = {
    name: $('#name').val(),
    email: $('#email').val(),
    phone: $('#phone').val()
  };

  $.ajax({
    url: '/prospect',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(prospectData),
    success: function (response) {
      $('#responseMessage').html(`<div class="alert alert-success">${response.message}</div>`);
      $('#prospectForm')[0].reset(); // Réinitialiser le formulaire
    },
    error: function () {
      $('#responseMessage').html('<div class="alert alert-danger">Erreur lors de l\'ajout du prospect.</div>');
    }
  });
});

// Chargement des prospects
async function loadProspects() {
  try {
    const response = await fetch('/prospects');
    const prospects = await response.json();
    let prospectsList = '';
    prospects.forEach(prospect => {
      prospectsList += `
        <li>
          ${prospect.name} - ${prospect.email} (${prospect.phone})
          <button class="btn btn-sm btn-warning mx-2" onclick="editProspect(${prospect.id})">Modifier</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProspect(${prospect.id})">Supprimer</button>
        </li>`;
    });
    $('#prospectsList').html(`<ul class="list-group">${prospectsList}</ul>`);
  } catch (err) {
    console.error('Erreur:', err);
  }
}

loadProspects();

// Fonction d'édition
function editProspect(id) {
  alert(`Modifier le prospect avec ID: ${id}`);
}

// Fonction de suppression
async function deleteProspect(id) {
  if (confirm('Voulez-vous vraiment supprimer ce prospect ?')) {
    try {
      const response = await fetch(`/prospect/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Prospect supprimé avec succès.');
        loadProspects(); // Recharger la liste
      } else {
        alert('Erreur lors de la suppression du prospect.');
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  }
}
});

  