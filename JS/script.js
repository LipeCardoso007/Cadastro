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

const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("input", function (e) {
  let v = e.target.value;

  // Remove tudo que não é número
  v = v.replace(/\D/g, "");

  // Limita a 11 dígitos
  v = v.slice(0, 11);

  // Aplica a máscara
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  e.target.value = v;
});

const form = document.getElementById("formulario");

form.addEventListener("submit", function (e) {
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

  // Tudo ok, remove o listener e envia o formulário
  form.removeEventListener("submit", arguments.callee);
  form.submit();
});

function formatarTelefone(input) {
  let tel = input.value.replace(/\D/g, ""); // Remove tudo que não for número

  if (tel.length > 11) tel = tel.slice(0, 11);

  if (tel.length >= 2) tel = `(${tel.slice(0, 2)}) ${tel.slice(2)}`;
  if (tel.length >= 8) tel = `${tel.slice(0, 10)}-${tel.slice(10)}`;

  input.value = tel;
}
