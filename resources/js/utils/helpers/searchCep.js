import axios from "axios";

export default async function searchCep(cep) {
    return axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
            const apiData = response.data;
            if (apiData.erro) throw new Error();

            return {
                cep: apiData.cep,
                address: apiData.logradouro,
                neighborhood: apiData.bairro,
                city: apiData.localidade,
                cityCode: apiData.ibge,
                state: apiData.uf,
                country: "Brasil",
                countryCode: "1058",
            };
        });
}
