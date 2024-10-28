const baseUrl = 'https://servicodados.ibge.gov.br';
import axios from 'axios';
type Uf = {
  id: number;
  sigla: string;
  nome: string;
  regiao: Region;
};
type Region = {
  id: number;
  sigla: string;
  nome: string;
};

export const getUFs = async () => {
  const { data } = await axios.get(`${baseUrl}/api/v1/localidades/estados`);
  return data.map((uf: Uf) => {
    return { label: `${uf.nome}, ${uf.sigla}`, value: uf.id };
  });
};

type County = {
  id: number;
  nome: string;
  microrregiao: Microrregiao;
  'regiao-imediata': Regiaoimediata;
};
type Regiaoimediata = {
  id: number;
  nome: string;
  'regiao-intermediaria': Mesorregiao;
};
type Microrregiao = {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
};
type Mesorregiao = {
  id: number;
  nome: string;
  UF: UF;
};
type UF = {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
};
type Regiao = {
  id: number;
  sigla: string;
  nome: string;
};
export const getCounties = async (ufId: string) => {
  const { data } = await axios.get(`${baseUrl}/api/v1/localidades/estados/${ufId}/municipios`);
  return data.map((county: County) => {
    return { label: `${county.nome}`, value: county.id };
  });
};
