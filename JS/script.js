function mostrarCampoOutraCidade(select) {
  const campo = document.getElementById("campo-outra-cidade");
  campo.style.display = select.value === "outra" ? "block" : "none";
  document.getElementById("outraCidade").required = select.value === "outra";
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

const form = document.getElementById("formulario");
const urlAppsScript =
  "https://script.google.com/macros/s/AKfycbyUxRCCgo-dZsF2A95S7F-gfTZohvbMWFb2sk8gFVOArBJ4_f9vPyDij44RGzOyG86peA/exec";

form.addEventListener("submit", async function handler(e) {
  e.preventDefault();

  const cpfInput = document.getElementById("cpf");
  const cpf = cpfInput.value.trim();

  if (!validarCPF(cpf)) {
    alert("CPF inválido! Digite um CPF válido, apenas números.");
    cpfInput.focus();
    return;
  }

  const cidadeSelect = document.getElementById("cidade");
  if (!cidadeSelect.value || cidadeSelect.value === "") {
    alert("Por favor, selecione uma cidade válida.");
    cidadeSelect.focus();
    return;
  }

  if (cidadeSelect.value === "outra") {
    const outraCidadeInput = document.getElementById("outraCidade");
    if (!outraCidadeInput.value.trim()) {
      alert("Por favor, digite sua cidade.");
      outraCidadeInput.focus();
      return;
    }
  }

  try {
    const response = await fetch(urlAppsScript, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ cpf }),
    });

    const result = await response.json();

    if (result.success === false) {
      alert(result.message);
      return;
    } else if (result.success === true) {
      form.removeEventListener("submit", handler);
      form.submit();
    } else {
      alert("Resposta inesperada do servidor.");
    }
  } catch (err) {
    alert("Erro ao validar o CPF. Tente novamente mais tarde.");
    console.error(err);
  }
});
