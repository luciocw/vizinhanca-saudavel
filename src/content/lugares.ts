import type { Place, PlaceCategory, Tip, WalkRoute } from '../types'

// Coordenadas: OpenStreetMap (Nominatim), conferidas em outubro de 2026.
// Pontos de partida do "Mapa Afetivo e Geográfico do Bairro Auxiliadora" (TIS, PUCRS).

export const categoryMeta: Record<PlaceCategory, { readonly label: string; readonly color: string }> = {
  verde: { label: 'Praça e parque', color: '#2f7d4f' },
  pracinha: { label: 'Pracinha', color: '#c98a00' },
  'ar-livre': { label: 'Ginástica ao ar livre', color: '#5f7d16' },
  academia: { label: 'Academia', color: '#a3446e' },
  bike: { label: 'Bike compartilhada', color: '#d0650c' },
  saude: { label: 'Saúde', color: '#c0452b' },
  feira: { label: 'Feira', color: '#7a4a78' },
  comunidade: { label: 'Comunidade', color: '#2f6584' },
}

/** centro aproximado do bairro Auxiliadora */
export const mapCenter = { lat: -30.0225, lng: -51.1915 }

export const places: readonly Place[] = [
  // ---------- praças e parques ----------
  {
    id: 'parcao',
    name: 'Parque Moinhos de Vento (Parcão)',
    category: 'verde',
    lat: -30.02661,
    lng: -51.20038,
    bairro: 'Moinhos de Vento',
    address: 'Av. Goethe com Rua Comendador Caminha',
    features: ['área verde', 'caminhada', 'brinquedos', 'cachorródromo'],
    note: 'O parque grande mais perto. Da igreja da Auxiliadora são uns 20 minutos a pé pela 24 de Outubro.',
  },
  {
    id: 'oscar-boeira',
    name: 'Praça Oscar Boeira',
    category: 'verde',
    lat: -30.02019,
    lng: -51.18613,
    bairro: 'Auxiliadora',
    address: 'Perto da Av. Plínio Brasil Milano',
    features: ['área verde'],
    note: 'A praça que fica dentro do bairro.',
  },
  {
    id: 'alberto-ramos',
    name: 'Praça Alberto Ramos',
    category: 'verde',
    lat: -30.02113,
    lng: -51.18272,
    bairro: 'Higienópolis',
    address: 'Junto à Av. Plínio Brasil Milano',
    features: ['área verde'],
  },
  {
    id: 'melvin-jones',
    name: 'Largo Melvin Jones',
    category: 'verde',
    lat: -30.02156,
    lng: -51.1842,
    bairro: 'Higienópolis',
    address: 'Av. Plínio Brasil Milano',
    features: ['área verde'],
  },
  {
    id: 'japao',
    name: 'Praça do Japão',
    category: 'verde',
    lat: -30.02723,
    lng: -51.17951,
    bairro: 'Boa Vista',
    address: 'Perto da Av. Carlos Gomes',
    features: ['área verde', 'brinquedos'],
  },
  {
    id: 'shiga',
    name: 'Praça Província de Shiga',
    category: 'verde',
    lat: -30.01905,
    lng: -51.17771,
    bairro: 'Passo da Areia',
    address: 'Perto da Av. Plínio Brasil Milano',
    features: ['área verde'],
  },
  {
    id: 'macedonia',
    name: 'Praça Professor Leonardo Macedônia',
    category: 'verde',
    lat: -30.02047,
    lng: -51.17682,
    bairro: 'Boa Vista',
    address: 'Perto da Av. Plínio Brasil Milano',
    features: ['área verde', 'brinquedos'],
  },
  {
    id: 'athos',
    name: 'Praça Athos Damasceno Ferreira',
    category: 'verde',
    lat: -30.0184,
    lng: -51.19772,
    bairro: 'Moinhos de Vento',
    address: 'Perto da Rua Dona Laura',
    features: ['área verde'],
  },
  {
    id: 'bela-vista',
    name: 'Praça Bela Vista',
    category: 'verde',
    lat: -30.03222,
    lng: -51.19168,
    bairro: 'Bela Vista',
    address: 'Bairro Bela Vista',
    features: ['área verde', 'brinquedos'],
  },
  {
    id: 'pasqualini',
    name: 'Praça Arlindo Pasqualini',
    category: 'verde',
    lat: -30.03288,
    lng: -51.19625,
    bairro: 'Rio Branco',
    address: 'Bairro Rio Branco',
    features: ['área verde', 'brinquedos'],
  },

  // ---------- pracinhas ----------
  {
    id: 'parquinho-igreja',
    name: 'Parquinho da Igreja Auxiliadora',
    category: 'pracinha',
    lat: -30.02199,
    lng: -51.19093,
    bairro: 'Auxiliadora',
    address: 'Rua 24 de Outubro com Av. Plínio Brasil Milano',
    features: ['brinquedos'],
    note: 'Fica junto à igreja. Vale confirmar o horário de abertura.',
  },
  {
    id: 'quintino',
    name: 'Pracinha da Quintino Bocaiúva',
    category: 'pracinha',
    lat: -30.02282,
    lng: -51.19729,
    bairro: 'Moinhos de Vento',
    address: 'Rua Quintino Bocaiúva',
    features: ['brinquedos'],
  },
  {
    id: 'recanto-infantil',
    name: 'Recanto Infantil do Parcão',
    category: 'pracinha',
    lat: -30.02608,
    lng: -51.20048,
    bairro: 'Moinhos de Vento',
    address: 'Dentro do Parque Moinhos de Vento',
    features: ['brinquedos'],
  },

  // ---------- saúde ----------
  {
    id: 'iapi',
    name: 'Centro de Saúde IAPI (Postão do IAPI)',
    category: 'saude',
    lat: -30.01445,
    lng: -51.17784,
    bairro: 'Passo da Areia',
    address: 'Rua 3 de Abril, 90',
    features: ['SUS'],
    note: 'Unidade pública da região. Para saber qual posto atende o teu endereço, liga 156.',
  },
  {
    id: 'cruz-azul',
    name: 'Pronto Socorro Cruz Azul',
    category: 'saude',
    lat: -30.029,
    lng: -51.20487,
    bairro: 'Rio Branco',
    address: 'Rua Mostardeiro, 233',
    features: ['pronto-socorro'],
  },
  {
    id: 'moinhos',
    name: 'Hospital Moinhos de Vento',
    category: 'saude',
    lat: -30.02563,
    lng: -51.20797,
    bairro: 'Moinhos de Vento',
    address: 'Rua Ramiro Barcelos, 910',
    features: ['hospital privado'],
  },

  // ---------- ginástica ao ar livre ----------
  // OpenStreetMap (áreas "Área de Ginástica" dentro do Parcão), conferido em novembro de 2026.
  {
    id: 'ginastica-parcao-goethe',
    name: 'Área de ginástica do Parcão (lado da Goethe)',
    category: 'ar-livre',
    lat: -30.02633,
    lng: -51.19986,
    bairro: 'Moinhos de Vento',
    address: 'Dentro do Parque Moinhos de Vento, perto da Av. Goethe',
    features: ['de graça', 'dentro do parque'],
    note: 'Aparelho quebrado ou faltando? Pede o conserto à prefeitura pelo 156.',
  },
  {
    id: 'ginastica-parcao-poty',
    name: 'Área de ginástica do Parcão (lado da Poty Medeiros)',
    category: 'ar-livre',
    lat: -30.02545,
    lng: -51.1988,
    bairro: 'Moinhos de Vento',
    address: 'Dentro do Parque Moinhos de Vento, perto da Rua Dr. Poty Medeiros',
    features: ['de graça', 'dentro do parque'],
    note: 'Aparelho quebrado ou faltando? Pede o conserto à prefeitura pelo 156.',
  },

  // ---------- academias ----------
  // OpenStreetMap, conferido em novembro de 2026. Horário e preço mudam: confirma direto com a academia.
  {
    id: 'smart-fit-anita',
    name: 'Smart Fit',
    category: 'academia',
    lat: -30.02663,
    lng: -51.18974,
    bairro: "Mont'Serrat",
    address: 'Rua Anita Garibaldi',
    features: ['academia particular'],
  },
  {
    id: 'bodytech-silva-jardim',
    name: 'Bodytech',
    category: 'academia',
    lat: -30.02536,
    lng: -51.19056,
    bairro: "Mont'Serrat",
    address: 'Rua Silva Jardim, 375',
    features: ['academia particular'],
  },
  {
    id: 'bio-express-parcao',
    name: 'Bio Express Parcão',
    category: 'academia',
    lat: -30.02488,
    lng: -51.2016,
    bairro: 'Moinhos de Vento',
    address: 'Rua 24 de Outubro, 684',
    features: ['academia particular'],
  },
  {
    id: 'fit-academia',
    name: 'Fit Academia',
    category: 'academia',
    lat: -30.02708,
    lng: -51.20303,
    bairro: 'Moinhos de Vento',
    address: 'Rua Doutor Florêncio Ygartua, 64',
    features: ['academia particular'],
  },

  // ---------- bike compartilhada ----------
  // Estações do Bike PoA a até ~1 km da igreja, do feed oficial do sistema (GBFS), conferido em novembro de 2026.
  {
    id: 'bike-mata-bacelar',
    name: 'Bike PoA: Mata Bacelar / Mariland',
    category: 'bike',
    lat: -30.02071,
    lng: -51.19384,
    bairro: 'Auxiliadora',
    address: 'Rua Mata Bacelar, na lateral do nº 696 da Av. Mariland',
    features: ['estação 96', '11 vagas'],
  },
  {
    id: 'bike-bordini',
    name: 'Bike PoA: Rua Bordini',
    category: 'bike',
    lat: -30.02288,
    lng: -51.19693,
    bairro: 'Auxiliadora',
    address: 'Rua Coronel Bordini, em frente ao nº 555',
    features: ['estação 68', '15 vagas'],
  },
  {
    id: 'bike-atos-damaceno',
    name: 'Bike PoA: Praça Atos Damaceno Ferreira',
    category: 'bike',
    lat: -30.0182,
    lng: -51.19759,
    bairro: 'Auxiliadora',
    address: 'Rua Coronel Bordini, oposto ao nº 22',
    features: ['estação 89', '11 vagas'],
  },
  {
    id: 'bike-opus-one',
    name: 'Bike PoA: Opus One',
    category: 'bike',
    lat: -30.02371,
    lng: -51.1834,
    bairro: 'Boa Vista',
    address: 'Rua Campos Sales, ao lado do nº 222 da Av. Carlos Gomes',
    features: ['estação 66', '11 vagas'],
  },
  {
    id: 'bike-parcao',
    name: 'Bike PoA: Parcão',
    category: 'bike',
    lat: -30.02471,
    lng: -51.2009,
    bairro: 'Moinhos de Vento',
    address: 'Rua 24 de Outubro, em frente ao Parque Moinhos de Vento',
    features: ['estação 40', '23 vagas'],
  },

  // ---------- feira ----------
  {
    id: 'feira-auxiliadora',
    name: 'Feira Ecológica da Auxiliadora',
    category: 'feira',
    lat: -30.0211,
    lng: -51.1962,
    bairro: 'Auxiliadora',
    address: 'Travessa dos Lanceiros Negros, entre a Mata Bacelar e a Coronel Bordini',
    features: ['terça de manhã', 'orgânicos'],
    note: 'Ponto no mapa aproximado: a feira fica na passagem de pedestres entre as duas ruas.',
  },

  // ---------- comunidade ----------
  {
    id: 'igreja-auxiliadora',
    name: 'Igreja Nossa Senhora Auxiliadora',
    category: 'comunidade',
    lat: -30.02217,
    lng: -51.19135,
    bairro: 'Auxiliadora',
    address: 'Rua 24 de Outubro',
    features: ['ponto de encontro'],
    note: 'A igreja que dá nome ao bairro. Bom ponto de saída para as caminhadas.',
  },
  {
    id: 'igreja-montserrat',
    name: "Igreja Nossa Senhora de Mont'Serrat",
    category: 'comunidade',
    lat: -30.02673,
    lng: -51.18433,
    bairro: "Mont'Serrat",
    address: 'Rua Anita Garibaldi',
    features: ['ponto de encontro'],
  },
]

const igreja = { label: 'Igreja N. S. Auxiliadora (24 de Outubro)', lat: -30.02217, lng: -51.19135 }

export const walkRoutes: readonly WalkRoute[] = [
  {
    id: 'volta-24',
    name: 'Volta da 24 de Outubro',
    minutes: 15,
    level: 'leve',
    description: 'Uma volta curta pela Rua 24 de Outubro, o eixo comercial do bairro, onde sempre tem movimento.',
    stops: [
      igreja,
      { label: '24 de Outubro, perto da Coronel Bordini', lat: -30.02276, lng: -51.19612 },
      { label: 'Rua Mata Bacelar', lat: -30.02084, lng: -51.19512 },
      igreja,
    ],
    tip: 'Na terça de manhã, passa pela Feira Ecológica na Travessa dos Lanceiros Negros.',
  },
  {
    id: 'ate-parcao',
    name: 'Até o Parcão',
    minutes: 30,
    level: 'leve',
    description: 'Ida e volta pela 24 de Outubro até o Parque Moinhos de Vento. Dá para esticar com uma volta dentro do parque.',
    stops: [
      igreja,
      { label: 'Rua 24 de Outubro (Moinhos de Vento)', lat: -30.02513, lng: -51.20146 },
      { label: 'Parque Moinhos de Vento', lat: -30.02661, lng: -51.20038 },
      igreja,
    ],
    tip: 'Levando criança, o Recanto Infantil fica logo na entrada do parque.',
  },
  {
    id: 'pracas-leste',
    name: 'Praças do lado da Plínio',
    minutes: 45,
    level: 'moderada',
    description: 'Um circuito por quatro áreas verdes a leste do bairro, seguindo a Av. Plínio Brasil Milano.',
    stops: [
      igreja,
      { label: 'Praça Oscar Boeira', lat: -30.02019, lng: -51.18613 },
      { label: 'Praça Alberto Ramos', lat: -30.02113, lng: -51.18272 },
      { label: 'Praça do Japão', lat: -30.02723, lng: -51.17951 },
      igreja,
    ],
    tip: 'Leva água. A Praça do Japão tem brinquedos e é um bom ponto para uma pausa.',
  },
]

export const feiraTips: readonly Tip[] = [
  {
    title: 'Feira Ecológica da Auxiliadora',
    body: 'Terça de manhã, na Travessa dos Lanceiros Negros, a passagem de pedestres entre a Mata Bacelar e a Coronel Bordini. Frutas, verduras e produtos orgânicos direto do produtor.',
  },
  {
    title: 'Hortifrútis da 24 de Outubro',
    body: 'O comércio do bairro fica a uma caminhada de casa. Comprar um pouco a cada dois ou três dias garante verdura fresca e ainda vira desculpa para sair a pé.',
  },
  {
    title: 'Fruta da estação sai mais barata',
    body: 'Na primavera, por exemplo, é época de morango. Pergunta ao feirante o que está na safra.',
  },
]

/** dica que aparece quando o filtro do mapa está numa dessas categorias */
export const categoryTips: Partial<Record<PlaceCategory, Tip>> = {
  bike: {
    title: 'Bike e patinete',
    body: 'As bikes do Bike PoA são liberadas pelo aplicativo do sistema, que mostra quantas estão livres em cada estação. Patinete elétrico compartilhado (como o da Whoosh) não tem estação fixa: ele fica espalhado pela rua e aparece no mapa do aplicativo da empresa.',
  },
  'ar-livre': {
    title: 'Aparelho estragado?',
    body: 'A manutenção das áreas de ginástica em parques e praças é da prefeitura. Liga ou manda mensagem para o 156 dizendo o lugar e qual aparelho precisa de conserto. Quanto mais vizinhos pedirem, mais rápido costuma sair.',
  },
  academia: {
    title: 'Sobre as academias',
    body: 'São academias particulares perto do bairro. Horário e preço mudam, então confirma direto com elas. Para treinar de graça, as áreas de ginástica do Parcão e as rotas de caminhada são boas opções.',
  },
}

/** observação do mapa afetivo: falta de praças de proximidade no miolo do bairro */
export const mapInsight =
  'Repara que o miolo da Auxiliadora tem poucas praças: a maioria fica nas bordas do bairro. Isso apareceu nas entrevistas, e é por isso que as rotas do app ligam as áreas verdes mais próximas.'
