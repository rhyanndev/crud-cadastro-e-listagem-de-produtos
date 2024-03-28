const $registerProduct = document.querySelector(".register-product");
const $nameProduct = document.getElementById("product-name");
const $productDescription = document.getElementById("product-description");
const $productPrice = document.getElementById("product-price");
const $listContainer = document.getElementById("product-list-oak");
const $sortButton = document.getElementById("sort-button");
const $productList = document.querySelector(".product-list");
const $seeListProduct = document.querySelector(".see-list");
const $containerForm = document.querySelector(".container-form");



$registerProduct.addEventListener("click", registerProductinList)
$sortButton.addEventListener("click", sortTableByPrice);
$seeListProduct.addEventListener("click", seeList);

function registerProductinList (){

    event.preventDefault(); // Evitar o comportamento padrão do formulário

    var nameProduct = $nameProduct.value.trim(); 
    var productDesc = $productDescription.value.trim();
    var productPrice = parseFloat($productPrice.value);

    // Verificar se os valores inseridos são válidos
    if (nameProduct && !isNaN(productPrice)) {

        if(productPrice > 0){


            // Cria um objeto com os dados do produto
            var product = {
                name: nameProduct,
                price: productPrice.toFixed(2),
                description : productDesc
            };

            // Recupera os produtos já armazenados no localStorage
            var productList = JSON.parse(localStorage.getItem("products")) || [];

            // Adiciona o novo produto à lista
            productList.push(product);

            // Atualiza os produtos no localStorage
            localStorage.setItem("products", JSON.stringify(productList));

        
                //Mostrando o que foi armazenado no localStorage
                displayProductsFromStorage();


        // Limpa os campos do formulário após o cadastro
        clearLinesInForm();

        // Vai diretamente para a Lista de produtos
        seeList();
        }
        else {
            alert("O preço inválido");
            
        }

    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }

}

// Função para exibir os produtos armazenados no localStorage
function displayProductsFromStorage() {
    // Recupera os produtos armazenados no localStorage
    var productList = JSON.parse(localStorage.getItem("products")) || [];

    // Limpa a lista de produtos atual
    $listContainer.innerHTML = "";

    // Adiciona cada produto à lista na tabela
    productList.forEach(function(product) {
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price} </td>
            <td><button class="remove-button" data-name="${product.name}">X</button></td>
        `;
        $listContainer.appendChild(newRow);
    });
}

// Função para ordenar os elementos da tabela com base no preço do produto
function sortTableByPrice() {
    var rows = Array.from($listContainer.getElementsByTagName('tr'));
    rows.shift(); // Remove o cabeçalho da tabela da matriz

    rows.sort(function(rowA, rowB) {
        var priceA = parseFloat(rowA.cells[1].textContent);
        var priceB = parseFloat(rowB.cells[1].textContent);
        return priceA - priceB;
    });

    // Adiciona as linhas ordenadas à tabela
    rows.forEach(function(row) {
        $listContainer.appendChild(row);
    });

}

// Função para ordenar os produtos no localStorage por preço
function sortProductsInStorageByPrice() {
    var productList = JSON.parse(localStorage.getItem("products")) || [];

    productList.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });

    localStorage.setItem("products", JSON.stringify(productList));
    displayProductsFromStorage(); // Atualiza a exibição dos produtos ordenados
}

// Event listener para o botão de ordenação
$sortButton.addEventListener("click", sortProductsInStorageByPrice);





const $registerProductForm = document.querySelector(".container-form");


function seeList() {
    // Remover classe hide do formulário de cadastro e adicionar à lista de produtos
    $registerProductForm.classList.add("hide");
    $productList.classList.remove("hide");
}

function seeForm() {
    // Remover classe hide da lista de produtos e adicionar ao formulário de cadastro
    $productList.classList.add("hide");
    $registerProductForm.classList.remove("hide");
}

// Adicionar event listeners aos botões para ver a lista de produtos e o formulário de cadastro
$seeListProduct.addEventListener("click", seeList);
document.querySelector(".add-button").addEventListener("click", seeForm);





// Defina uma função para remover um produto do localStorage e atualizar a exibição
function removeProductFromStorage(name) {
    var productList = JSON.parse(localStorage.getItem("products")) || [];
    var index = productList.findIndex(product => product.name === name);
    if (index !== -1) {
        productList.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(productList));
        displayProductsFromStorage(); // Atualize a exibição após a remoção
    }
}

// Adicione um event listener para lidar com cliques nos botões de remoção
$listContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-button")) {
        var productName = event.target.getAttribute("data-name");
        removeProductFromStorage(productName);
    }
});


//Limpar Campos após serem preenchidos
function clearLinesInForm(){

    $nameProduct.value = "";
    $productDescription.value = "";
    $productPrice.value = "";


}

//Para sempre mostrar os produtos no localStorage
displayProductsFromStorage();