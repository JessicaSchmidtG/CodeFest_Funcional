// ##############    Ampliar opções do formulário     ##############
document.getElementById("numero").addEventListener("input", function () {
    const numeroFormularios = parseInt(this.value);
    const formulariosContainer = document.getElementById("formularios");
    
    formulariosContainer.innerHTML =`
    <div class="container">
        <div class="row">
           <div id="header" class="container">
                <h3>Cadastro familiar</h3>
            </div>
        </div>
    </div>`;

    if (!isNaN(numeroFormularios) && numeroFormularios > 0) {
        for (let i = 0; i < numeroFormularios; i++) {
            const formulario = `
      
  <form action="/action_page.php">
      <div class="row">
        <div class="col p-2 was-validated">
              <input name="nomeDp" type="text" class="form-control" placeholder="Nome completo"
                  aria-label="Nome completo" required />
        </div>

        <div class="col p-2 was-validated">
              <input name="dtNascDp" type="text" class="form-control" placeholder="Data de Nascimento"
                  aria-label="Data de Nascimento" required />
        </div>
     
      <div class="col p-2 was-validated">
          <input name="cpf" type="number" class="form-control" placeholder="CPF" aria-label="CPF"
              required />
      </div>
      </div>
  </form>

  <form action="/action_page.php">
      <div class="row">
          <div class="col p-2 was-validated">
              <input name="parentesco" type="text" class="form-control" placeholder="Grau de parentesco"
                  aria-label="Grau de parentesco" required />
          </div>
          <div class="col p-2 was-validated">
              <select name="sexoDp" class="form-select form-control was-validated"
              aria-label=".form-select-sm example">
              <option selected>Sexo</option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
              <option value="3">Prefiro não informar</option>
          </select> 
          </div>

          <div class="col p-2 was-validated">
              <select name="pcdDp" class="form-select form-control was-validated"
                  aria-label=".form-select-sm example">
                  <option selected>PCD</option>
                  <option value="1">Sim</option>
                  <option value="2">Não</option>
              </select>
          </div>
      </div>
  </form>
  <div class="form-floating">
      <textarea class="form-control" placeholder="Leave a comment here" name="observacao"></textarea>
      <label for="floatingTextarea">Observações relevantes: doenças, cuidados, etc...</label>
  </div>
  <br>


      `;
        formulariosContainer.innerHTML += formulario;
    }
}
});

// ##############    buscar informações do CEP     ##############

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};


// ##############    Habilitar formulário deficiência    ##############
const hasDisabilitySelect = document.getElementById("hasDisability");
const disabilityTypesDiv = document.getElementById("disabilityTypes");

hasDisabilitySelect.addEventListener("change", () => {
  if (hasDisabilitySelect.value === "sim") {
    disabilityTypesDiv.style.display = "block";
  } else {
    disabilityTypesDiv.style.display = "none";
  }
});

const form = document.getElementById("disability-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const selectedDisabilities = formData.getAll("disabilityType");

  console.log("Possui deficiência:", hasDisabilitySelect.value);
  console.log("Tipos de deficiência selecionados:", selectedDisabilities);

  
});





// ###################   Validar CPF #####################
document.getElementById("cpf").addEventListener("input", function() {
    const cpfInput = this.value;
    const cpfNumeros = cpfInput.replace(/[^\d]/g, '');

    if (cpfNumeros.length !== 11 || /^\d{11}$/.test(cpfNumeros) === false) {
        document.getElementById("resultado").textContent = "CPF inválido";
        document.getElementById("resultado").style.color = "red";
        document.getElementById("resultado").style.fontWeight = "bold";
        document.getElementById("resultado").style.backgroundColor = "rgb(255, 255, 255,0.5";
        document.getElementById("resultado").style.borderRadius= "5px";
      return;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfNumeros.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpfNumeros.charAt(9))) {
        document.getElementById("resultado").textContent = "CPF inválido";
        document.getElementById("resultado").style.color = "red";
        document.getElementById("resultado").style.fontWeight = "bold";
        document.getElementById("resultado").style.backgroundColor = "rgb(255, 255, 255,0.5";
        document.getElementById("resultado").style.borderRadius= "5px";
      return;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfNumeros.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpfNumeros.charAt(10))) {
      document.getElementById("resultado").textContent = "CPF inválido";
      document.getElementById("resultado").style.color = "red";
      document.getElementById("resultado").style.fontWeight = "bold";
      document.getElementById("resultado").style.backgroundColor = "rgb(255, 255, 255,0.5";
      document.getElementById("resultado").style.borderRadius= "5px";
      return;
    }

    document.getElementById("resultado").textContent = "CPF válido";
    document.getElementById("resultado").style.color = "green";
    document.getElementById("resultado").style.fontWeight = "bold";
    document.getElementById("resultado").style.backgroundColor = "rgb(255, 255, 255,0.5";
    document.getElementById("resultado").style.borderRadius= "5px";
});