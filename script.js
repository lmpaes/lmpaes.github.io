function expandir(elemento) {
    elemento.classList.add('expandida');
}

function retrair(elemento) {
    elemento.classList.remove('expandida');
}

document.getElementById("erroBotao").onclick = function() {
    alert("Formulário não enviado. Leia o rodapé da pagina");
};