const taskListContainer = document.querySelector('.app__section-task-list');
const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`
const formTask = document.querySelector('.app__form-add-task');
const toggleFormTaskBtn = document.querySelector('.app__button--add-task');
const formLabel = document.querySelector('.app__form-label');
const textArea = document.querySelector('.app__form-textarea');
const cancelFormTaskBtn = document.querySelector('.app__form-footer__button--cancel');
const taskAtiveDescription = document.querySelector('.app__section-active-task-description');

//para pegar uma tarefa salva no local storage
const localStorageTarefas = localStorage.getItem('tarefas');
//se tiver algo no localStorage, o JSON.parse vai transformar de string para objeto js
//se não, o array fica vazio []
let tarefas = localStorageTarefas ? JSON.parse(localStorageTarefas) : [];

//array de objetos (tarefas)
/*let tarefas = [
    {
        descricao: 'Tarefa Concluída',
        concluida: true
    }
]*/

let tarefaSelecionada = null;
let itemTarefaSelecionada = null;

//precisamos passar o elemento (li) pois estamos chamando uma função externa
// então é preciso mandar para a função uma referência do li que está sendo clicado
const selecionaTarefa = (tarefa, elemento) => {
    //percorremos os elementos ativos (selecionados) e removemos a classe que os deixa assim
    //isso garante que não haverá nenhuma tarefa selecionada anteriormente
    document.querySelectorAll('.app__section-task-list-item-active').forEach(function (item) {
        item.classList.remove('app__section-task-list-item-active')
    })

    //verifica se a tarefa selecionada da vez é a mesma que já estava selecionada
    //se for, limpa as variáveis e retorna, desmarcando a tarefa
    if (tarefaSelecionada == tarefa) {
        taskAtiveDescription.textContent = null;
        itemTarefaSelecionada = null;
        tarefaSelecionada = null;
        return
    }

    //se não for, atualiza as variáveis com a nova tarefa selecionada
    tarefaSelecionada = tarefa;
    itemTarefaSelecionada = elemento;
    taskAtiveDescription.textContent = tarefa.descricao;
    elemento.classList.add('app__section-task-list-item-active');
}

//função para limpar a caixa de texto do forms e escondê-lo
const limparForm = () => {
    textArea.value = '';
    formTask.classList.add('hidden');
}

//cria a tarefa (visualmente) com os dados do array
function createTask(tarefa) {
    //criando um li e atribuindo uma classe (aparência) a ele
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svgIcon = document.createElement('svg');
    svgIcon.innerHTML = taskIconSvg; //svg já vem configurado, n precisa de classe

    const paragraph = document.createElement('p');
    paragraph.classList.add('app__section-task-list-item-description');
    paragraph.textContent = tarefa.descricao;

    const button = document.createElement('button');
    button.classList.add('app_button-edit');
    const imgButton = document.createElement('img');
    imgButton.setAttribute('src', '/imagens/edit.png');

    //ao clicar no botão de edição, aparecerá um prompt para colocar o novo nome
    button.onclick = () => {
        const attDescription = prompt('Qual é o novo nome da tarefa?');
        if (attDescription){
           paragraph.textContent = attDescription;
            //atualizamos a descrição do objeto tarefa e atualizamos o LS
            tarefa.descricao = attDescription;
            updateLocalStorage(); 
        }
    }

    li.onclick = () => {
        selecionaTarefa(tarefa, li);
    }

    //adicionando a imagem do botão ao botão
    button.append(imgButton);
    //adicionar o svg, o p e o button como filhos do li
    li.appendChild(svgIcon);
    li.appendChild(paragraph);
    li.appendChild(button);

    return li;
}

tarefas.forEach(task => {
    //para cada tarefa vamos criá-la (como um li)
    const taskItem = createTask(task);
    //adicionamos o li como filho do ul (taskListContainer)
    taskListContainer.appendChild(taskItem);
})

toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa';
    //toggle é um método que retira e adiciona algo, dependendo se ela já está lá ou não
    formTask.classList.toggle('hidden');
})

//fazendo o botão cancelar chamar a função limparForm
cancelFormTaskBtn.addEventListener('click', limparForm)

const updateLocalStorage = () => {
    //a key é 'tarefas' e seu valor vai ser o array de tarefas
    //aqui o JSON vai ajudar a converter de objeto para string
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

//acionar um evento ao dar um submit no formulário
formTask.addEventListener('submit', (evento) => {
    //para prevenir de dar um submit automático sozinho (comportamento padrão)
    evento.preventDefault();
    const task = {
        //a descrição será o valor na área de texto do form
        descricao: textArea.value,
        //falso pois está sendo adicionada agora
        concluida: false
    }
    //enviar a tarefa no array
    tarefas.push(task);
    //criando a tarefa
    const taskItem = createTask(task);
    //mostrando a tarefa
    taskListContainer.appendChild(taskItem);
    //atualizar o localStorage com a tarefa
    updateLocalStorage();
    limparForm();
})
