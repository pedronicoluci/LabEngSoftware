let pessoas = [
    {
        nome: "Pedro",
        idade: 29
    },
    {
        nome: "Carla",
        idade: 27
    },
    {
        nome: "Nicolas",
        idade: 11
    }
];

for (let i = 0; i < pessoas.length; i++) {
    if (pessoas[i].idade >= 18) {
        console.log(pessoas[i].nome);
    }
}