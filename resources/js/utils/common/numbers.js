/**
 * Convert a series of characters to a valid format to represent money.
 * @param {string} number Receives the number in string format without any formatting.
 * @returns {string|null} Returns the number formatted in string format or null in failure.
 */
export function formatNumbersForMoney(number) {
    // Remove todos os caracteres que não são dígitos
    const value = number.replace(/[^0-9]/g, "");

    // Verifica se o número está vazio após a remoção dos caracteres não-dígitos
    if (value.length === 0) {
        return null;
    }

    let formattedValue = "";

    // Adiciona cada dígito ao valor formatado e insere um ponto a cada três dígitos
    for (let i = 0; i < value.length; i++) {
        formattedValue += value[i];
        if (
            (value.length - i) % 3 === 0 &&
            i !== value.length - 1
        ) {
            formattedValue += ".";
        }
    }

    const lastDotIndex = formattedValue.lastIndexOf(".");
    let beforeLastDot = "";
    let afterLastDot = "";

    // Separa a parte antes e depois do último ponto
    if (lastDotIndex !== -1) {
        beforeLastDot = formattedValue.substring(0, lastDotIndex);
        afterLastDot = formattedValue.substring(lastDotIndex + 1);
    } else {
        beforeLastDot = formattedValue;
    }

    // Reformata a parte antes do último ponto para adicionar pontos como separadores de milhar
    beforeLastDot = beforeLastDot.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Remove o zero à esquerda da parte decimal se houver mais de um dígito nas casas decimais
    if (beforeLastDot.length > 1 && afterLastDot > 1) {
        beforeLastDot = beforeLastDot.replace(/^0+/, "");
    }

    // Adiciona zeros à parte depois do último ponto se necessário
    afterLastDot = afterLastDot ? `,${afterLastDot.padEnd(2, "0")}` : "";

    // Junta a parte antes e depois do último ponto para formar o número final formatado
    formattedValue = `${beforeLastDot}${afterLastDot}`;

    return formattedValue;
}
