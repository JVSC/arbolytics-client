const EMERGENCY_UNIT_CODE = 2;
const baseUrl = 'http://localhost:5000';
import axios from 'axios';

interface UnitList {
  estabelecimentos: Estabelecimento[];
}
interface Estabelecimento {
  bairro_estabelecimento: string;
  codigo_atividade_ensino_unidade: string;
  codigo_cep_estabelecimento: string;
  codigo_cnes: number;
  codigo_esfera_administrativa_unidade?: any;
  codigo_estabelecimento_saude: string;
  codigo_identificador_turno_atendimento: string;
  codigo_motivo_desabilitacao_estabelecimento?: any;
  codigo_municipio: number;
  codigo_natureza_organizacao_unidade?: any;
  codigo_nivel_hierarquia_unidade?: any;
  codigo_tipo_unidade: number;
  codigo_uf: number;
  descricao_esfera_administrativa?: any;
  descricao_natureza_juridica_estabelecimento: string;
  descricao_nivel_hierarquia?: any;
  descricao_turno_atendimento: string;
  endereco_email_estabelecimento: string;
  endereco_estabelecimento: string;
  estabelecimento_faz_atendimento_ambulatorial_sus: string;
  estabelecimento_possui_atendimento_ambulatorial: number;
  estabelecimento_possui_atendimento_hospitalar?: number;
  estabelecimento_possui_centro_cirurgico?: number;
  estabelecimento_possui_centro_neonatal?: number;
  estabelecimento_possui_centro_obstetrico?: number;
  estabelecimento_possui_servico_apoio: number;
  latitude_estabelecimento_decimo_grau: number;
  longitude_estabelecimento_decimo_grau: number;
  natureza_organizacao_entidade?: any;
  nome_fantasia: string;
  nome_razao_social: string;
  numero_cnpj?: string;
  numero_cnpj_entidade?: any;
  numero_estabelecimento: string;
  numero_telefone_estabelecimento?: string;
  tipo_gestao: string;
}

export const getCNESUnits = async (params: { countyCode: string; limit: number; offset: number }) => {
  const { data } = await axios.get<UnitList>(`${baseUrl}/cnes_units`, {
    params: {
      codigo_tipo_unidade: EMERGENCY_UNIT_CODE,
      codigo_municipio: params.countyCode.slice(0, 6),
      limit: params.limit,
      offset: params.offset,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
  return data.estabelecimentos.map((estabelecimento) => {
    return {
      name: estabelecimento.nome_fantasia,
      type: 'scattermap',
      lat: [estabelecimento.latitude_estabelecimento_decimo_grau],
      lon: [estabelecimento.longitude_estabelecimento_decimo_grau],
      mode: 'markers',
      marker: {
        size: 20,
      },
      text: [
        estabelecimento.nome_fantasia,
        `CNES: ${estabelecimento.codigo_cnes}`,
        `Telefone: ${estabelecimento.numero_telefone_estabelecimento}`,
        `Endereço: ${estabelecimento.endereco_estabelecimento}`,
      ],
    };
  });
};
