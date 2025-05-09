class Usuario {
    constructor(nome, cpf, dataNascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }
}

class Cadastro {
    constructor() {
        this.usuarios = [];
        this.index = 0;
    }

    adicionarUsuario(usuario) {
        this.usuarios.push(usuario);
        this.index = this.usuarios.length - 1;
        this.mostrarUsuario();
    }

    mostrarUsuario() {
        if (this.usuarios.length > 0) {
            const usuario = this.usuarios[this.index];
            document.getElementById("displayNome").innerText = usuario.nome;
            document.getElementById("displayCpf").innerText = usuario.cpf;
            document.getElementById("displayDataNascimento").innerText = usuario.dataNascimento;
        } else {
            document.getElementById("displayNome").innerText = "---";
            document.getElementById("displayCpf").innerText = "---";
            document.getElementById("displayDataNascimento").innerText = "---";
        }
    }

    proximoUsuario() {
        if (this.index < this.usuarios.length - 1) {
            this.index++;
            this.mostrarUsuario();
        }
    }

    usuarioAnterior() {
        if (this.index > 0) {
            this.index--;
            this.mostrarUsuario();
        }
    }

    removerUsuario() {
        if (this.usuarios.length > 0) {
            this.usuarios.splice(this.index, 1);
            if (this.index >= this.usuarios.length) {
                this.index = this.usuarios.length - 1;
            }
            this.mostrarUsuario();
        }
    }
}

const cadastro = new Cadastro();

document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const dataNascimento = document.getElementById("dataNascimento").value;

    if (!nome || !cpf || !dataNascimento) {
        document.getElementById("mensagem").innerText = "Preencha todos os campos!";
        document.getElementById("mensagem").style.color = "red";
        return;
    }

    if (cpf.length !== 11 || isNaN(cpf)) {
        document.getElementById("mensagem").innerText = "CPF inválido! Deve conter exatamente 11 números.";
        document.getElementById("mensagem").style.color = "red";
        return;
    }

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    if (nascimento > hoje) {
        document.getElementById("mensagem").innerText = "Data de nascimento inválida!";
        document.getElementById("mensagem").style.color = "red";
        return;
    }

    const usuario = new Usuario(nome, cpf, dataNascimento);
    cadastro.adicionarUsuario(usuario);

    document.getElementById("mensagem").innerText = "Cadastro realizado com sucesso!";
    document.getElementById("mensagem").style.color = "green";
    this.reset();
});

document.getElementById("next").addEventListener("click", () => cadastro.proximoUsuario());
document.getElementById("prev").addEventListener("click", () => cadastro.usuarioAnterior());
document.getElementById("deleteUser").addEventListener("click", () => cadastro.removerUsuario());