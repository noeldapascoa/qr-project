const API_URL = 'http://localhost:3000';

async function criarConta() {
  const nome = document.getElementById('nome').value;
  const senha = document.getElementById('senha').value;

  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({nome, senha})
  });

  const data = await res.json();
  alert(data.message);
}

async function login() {
  const nome = document.getElementById('nome').value;
  const senha = document.getElementById('senha').value;

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({nome, senha})
  });

  const data = await res.json();

  if(data.success){
    window.location.href = 'qr.html';
  } else {
    alert(data.message);
  }
}
