import type { Contact, Source, Tip } from '../types'
import { places } from './lugares'

export const phones: readonly Contact[] = [
  { name: 'SAMU', phone: '192', description: 'Emergência médica: desmaio, dor no peito, falta de ar, acidente.' },
  { name: 'CVV', phone: '188', description: 'Apoio emocional e prevenção do suicídio. De graça, 24 horas, também por chat no site cvv.org.br.' },
  { name: 'Disque Saúde', phone: '136', description: 'Informações do Ministério da Saúde sobre doenças, vacinas e serviços do SUS.' },
  { name: 'Prefeitura de Porto Alegre', phone: '156', description: 'Para avisar sobre praça mal cuidada, brinquedo quebrado, iluminação ou calçada ruim.' },
]

export const healthServices = places.filter((p) => p.category === 'saude')

export const communityIdeas: readonly Tip[] = [
  {
    title: 'Grupo de caminhada do prédio',
    body: 'Coloca um bilhete no elevador ou no grupo do condomínio marcando um horário fixo, tipo terça e quinta às 19h na portaria. Começa com duas pessoas, e tá ótimo.',
  },
  {
    title: 'Caminhada por faixa de idade',
    body: 'Uma turma de quem tem mais de 60, outra de pais com crianças, outra de quem sai cedo pro trabalho. Cada grupo no seu ritmo, com um alongamento junto antes de sair. Foi uma das ideias que os moradores deram nas entrevistas.',
  },
  {
    title: 'Onde o bairro já se encontra',
    body: 'Tem igreja no bairro que faz almoço de domingo e campanha do agasalho. Encontros assim são uma boa porta para começar um grupo de caminhada ou uma roda de conversa.',
  },
  {
    title: 'Pracinha com hora marcada',
    body: 'Pais e mães do mesmo prédio podem combinar de levar as crianças juntos à praça no fim da tarde. As crianças brincam e os adultos conversam.',
  },
  {
    title: 'Troca de receitas e mudas',
    body: 'Uma mesa no salão de festas num sábado de manhã: cada um leva uma receita caseira ou uma muda de tempero. Simples e aproxima.',
  },
  {
    title: 'Compartilha este guia',
    body: 'Manda o link no grupo do condomínio. Quanto mais gente usando as praças, mais seguras e cuidadas elas ficam.',
  },
]

export const sources: readonly Source[] = [
  {
    title: 'Guia Alimentar para a População Brasileira (Ministério da Saúde, 2014)',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf',
  },
  {
    title: 'Guia de Atividade Física para a População Brasileira (Ministério da Saúde, 2021)',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/guia_atividade_fisica_populacao_brasileira.pdf',
  },
  {
    title: 'Lançamento do Guia de Atividade Física (OPAS/OMS)',
    url: 'https://www.paho.org/pt/noticias/30-6-2021-ministerio-da-saude-do-brasil-lanca-guia-atividade-fisica-para-populacao',
  },
  {
    title: 'Rotulagem nutricional de alimentos (Anvisa)',
    url: 'https://www.gov.br/anvisa/pt-br/assuntos/alimentos/rotulagem',
  },
  { title: 'CVV: Centro de Valorização da Vida', url: 'https://cvv.org.br/' },
  { title: 'Lei nº 12.864/2013: atividade física como determinante da saúde', url: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12864.htm' },
]
