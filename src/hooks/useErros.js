import { useState } from 'react';

function criarEstadoInicial(validacoes) {
    const estadoInicial = {};
    const validacoesKeys = Object.keys(validacoes);
    validacoesKeys.forEach((campo) => {
        estadoInicial[campo] = { valido: true, texto: "" };
    });

    return estadoInicial;
}

function useErros(validacoes) {

    const estadoInicial = criarEstadoInicial(validacoes);

    const [erros, setErros] = useState(estadoInicial);

    function validarCampos(event) {
        const { name, value } = event.target;
        const novoEstado = { ...erros };
        novoEstado[name] = validacoes[name](value);
        setErros(novoEstado);
    }

    function possoEnviar() {
        const errosKeys = Object.keys(erros);
        const checkErros = errosKeys.forEach((campo) => {
            if (!errosKeys[campo].valido) {
                return false;
            }
            return true;
        });
        return checkErros.some(false);
    }

    return [erros, validarCampos, possoEnviar];
}

export default useErros;