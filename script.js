var registros = [];

document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();
  var id = generateUUID();
  var data = document.getElementById('data').value;
  var horario = document.getElementById('horario').value;
  var tipo_pagamento = document.getElementById('tipo_pagamento').value;
  var placa = document.getElementById('placa').value;

  var registro = {
    ID: id,
    Data: data,
    Horário: horario,
    "Tipo de Pagamento": tipo_pagamento,
    "Placa do Carro": placa
  };

  // Adicionando o registro ao array de registros
  registros.push(registro);

  // Enviando os dados para o Google Sheets
  var payload = {
    id: id,
    data: data,
    horario: horario,
    tipo_pagamento: tipo_pagamento,
    placa: placa
  };

  fetch('https://script.google.com/macros/s/AKfycbxyH0kKm9L6D2szr5Ofj0ZOmItE6fbnuup_mow9cKzxznQcficwzxg02gdhDE9x2NsvKw/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      alert('Registro salvo com sucesso!');
      // Limpar os campos após o registro
      limparCampos();
    } else {
      alert('Erro ao salvar o registro.');
    }
  })
  .catch(error => console.error('Error:', error));
});

function limparCampos() {
  document.getElementById('tipo_pagamento').value = '';
  document.getElementById('placa').value = '';
}

// Função para gerar UUID
function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && (performance.now()*1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if(d > 0){ //Use timestamp until depleted
      r = (d + r)%16 | 0;
      d = Math.floor(d/16);
    } else { //Use microseconds since page-load if supported
      r = (d2 + r)%16 | 0;
      d2 = Math.floor(d2/16);
    }
    return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
  });
}

