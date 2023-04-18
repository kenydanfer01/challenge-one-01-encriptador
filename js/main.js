// letra "e" se convierte a "enter"
// letra "i" se convierte a "imes"
// letra "a" se convierte a "ai"
// letra "o" se convierte a "ober"
// letra "u" se convierte a "ufat"

/* ---------------------> input, output and actions <--------------------- */
const container = document.querySelector(".container");
const input = document.querySelector(".input-textarea");
const btnEncript = document.querySelector(".btn-encript");
const btnDecript = document.querySelector(".btn-desencript");
const btnCopiar = document.querySelector(".btn-copy");
const result = document.querySelector(".result");
const visibilities = document.querySelector(".block-output");
const closeModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const fade = document.querySelector(".fade");

/* ---------------------> array objects <--------------------- */
const codigoVogais = [
  { id: "a", text: "ai" },
  { id: "e", text: "enter" },
  { id: "i", text: "imes" },
  { id: "o", text: "ober" },
  { id: "u", text: "ufat" },
];

/* ---------------------> Functions for aplication <--------------------- */
container.addEventListener("click", (evento) => {
  const elTarget = evento.target;
  if (elTarget.className.includes("btn-encript")) {
    (isInvalid(input.value) || input.value === "") && fechaModal();
    result.innerHTML = encript(input.value);
    exibiInputSaida();
  }

  if (elTarget.className.includes("btn-desencript")) {
    (isInvalid(input.value) || input.value === "") && fechaModal();
    result.innerHTML = desencript(input.value);
    exibiInputSaida();
  }

  if (elTarget.className.includes("close-modal")) fechaModal();

  if (elTarget.className.includes("btn-copy"))
    copiaParaAreaDeTranferencia(result.innerHTML);
});

/* ---------------------> View Modal <--------------------- */

const fechaModal = () => {
  // resume.
  result.innerHTML = "";
  [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

/* ---------------------> Validation <--------------------- */
const isInvalid = (input) => {
  const reg = /[A-Z]+/g;
  const expresion = /[\u0300-\u036f]/g;

  const result = [...input].some(
    (c) => reg.test(c) || expresion.test(c.normalize("NFD"))
  );
  return result;
};

/* ---------------------> visible output  <--------------------- */

const exibiInputSaida = () => {
  visibilities.classList.add("invisivel");
  result.classList.remove("invisivel");
  btnCopiar.classList.remove("invisivel");
};

/* ---------------------> copy text <--------------------- */
const copiaParaAreaDeTranferencia = (str) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject("The Clipboard API is not available.");
};

/* ---------------------> Encriptar <--------------------- */
function encript(str) {
  const arrayEncriptada = [];
  for (const char of str) {
    const codigo = codigoVogais.find((item) => item.id === char);
    if (codigo) {
      arrayEncriptada.push(codigo.text);
    } else {
      arrayEncriptada.push(char);
    }
  }
  return arrayEncriptada.join("");
}

/* ---------------------> Desencriptar <--------------------- */
function desencript(str) {
  codigoVogais.forEach((item) => {
    if (str.includes(item.text)) {
      str = str.replaceAll(item.text, item.id);
    }
  });
  return str;
}
