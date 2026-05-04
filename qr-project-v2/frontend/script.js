const API_URL = `${window.location.protocol}//${window.location.hostname}:3000`;

function mostrarMensagem(texto, tipo = 'erro') {
  const mensagem = document.getElementById('mensagem');
  mensagem.innerText = texto;
  mensagem.className = tipo;
}

async function criarConta() {
  const nome = document.getElementById('nome').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!nome || !senha) {
    mostrarMensagem('Preencha e-mail/nome e senha.');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, senha })
    });

    const data = await res.json();

    if (data.success) {
      mostrarMensagem(data.message, 'sucesso');
      alert('Conta criada com sucesso! Agora clique em Entrar.');
    } else {
      mostrarMensagem(data.message);
    }
  } catch (error) {
    mostrarMensagem('Erro ao conectar com o backend.');
  }
}

async function login() {
  const nome = document.getElementById('nome').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!nome || !senha) {
    mostrarMensagem('Preencha e-mail/nome e senha.');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, senha })
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = './qr.html';
    } else {
      mostrarMensagem(data.message);
    }
  } catch (error) {
    mostrarMensagem('Erro ao conectar com o backend.');
  }
}
