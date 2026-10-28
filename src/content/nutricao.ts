import type { FoodGroup, FoodItem, Tip } from '../types'

export const groupInfo: Record<FoodGroup, { readonly label: string; readonly short: string; readonly body: string }> = {
  'in-natura': {
    label: 'In natura ou minimamente processado',
    short: 'Comida de verdade',
    body: 'Vem direto da natureza ou passou só por limpeza, secagem, moagem ou congelamento, sem nada adicionado. Arroz, feijão, frutas, legumes, ovos, carne, leite. Deve ser a base do prato.',
  },
  processado: {
    label: 'Processado',
    short: 'Com moderação',
    body: 'Feito com alimentos de verdade com sal, açúcar ou óleo. Queijo, pão francês, conservas, sardinha em lata. Tudo bem em pequena quantidade, junto com a comida de verdade.',
  },
  ultraprocessado: {
    label: 'Ultraprocessado',
    short: 'Melhor evitar',
    body: 'Fórmula industrial com ingredientes que tu não terias em casa: xarope de glicose, gordura hidrogenada, aromatizante, corante, realçador de sabor. Refrigerante, biscoito recheado, salgadinho, salsicha, macarrão instantâneo.',
  },
}

export const foodQuiz: readonly FoodItem[] = [
  { name: 'Feijão', group: 'in-natura', why: 'Grão seco, só foi colhido e limpo.' },
  { name: 'Refrigerante', group: 'ultraprocessado', why: 'Água, muito açúcar, aromatizante e corante. Nenhum alimento de verdade.' },
  { name: 'Pão francês da padaria', group: 'processado', why: 'Farinha, água, sal e fermento. Processado, mas com ingredientes simples.' },
  { name: 'Pão de forma de pacote', group: 'ultraprocessado', why: 'Costuma levar conservantes, emulsificantes e açúcar para durar semanas.' },
  { name: 'Ovo', group: 'in-natura', why: 'Direto da galinha para a tua cozinha.' },
  { name: 'Biscoito recheado', group: 'ultraprocessado', why: 'Gordura, açúcar, aromatizante. Feito para tu não conseguires parar de comer.' },
  { name: 'Queijo minas', group: 'processado', why: 'Leite com sal e coalho.' },
  { name: 'Iogurte natural sem açúcar', group: 'in-natura', why: 'Leite fermentado, sem nada adicionado. Conta como minimamente processado.' },
  { name: 'Iogurte de sabor com corante', group: 'ultraprocessado', why: 'Açúcar, espessante, aroma e corante. Bem diferente do natural.' },
  { name: 'Sardinha em lata', group: 'processado', why: 'Peixe com óleo e sal. Prática e boa opção com moderação.' },
  { name: 'Salsicha', group: 'ultraprocessado', why: 'Carne reconstituída com amido, conservante e realçador de sabor.' },
  { name: 'Banana', group: 'in-natura', why: 'Fruta é o lanche mais prático que existe. Já vem embalada.' },
  { name: 'Macarrão instantâneo', group: 'ultraprocessado', why: 'O tempero em pó é cheio de sódio e realçador de sabor.' },
  { name: 'Castanhas sem sal', group: 'in-natura', why: 'Só foram secas ou torradas, sem adição de nada.' },
]

export const guideSteps: readonly Tip[] = [
  {
    title: 'Comida de verdade como base',
    body: 'Monta o prato em cima de arroz, feijão, legumes, verduras, frutas, ovos e carnes. É o feijão com arroz que a gente já conhece, e ele funciona.',
  },
  {
    title: 'Óleo, sal e açúcar com mão leve',
    body: 'Eles servem para temperar e cozinhar, não para dominar o prato. Ervas, alho, cebola e limão dão sabor sem pesar.',
  },
  {
    title: 'Processados em pouca quantidade',
    body: 'Queijo, pão e conservas podem acompanhar, mas não substituir a refeição.',
  },
  {
    title: 'Ultraprocessados: melhor evitar',
    body: 'Refrigerante, salgadinho, biscoito recheado, nuggets e macarrão instantâneo. Quanto menos aparecerem na semana, melhor.',
  },
  {
    title: 'Come com calma e, se der, com companhia',
    body: 'Sentar à mesa, longe da TV e do celular, ajuda a perceber quando a fome passou. Comer junto também é cuidar das relações.',
  },
  {
    title: 'Compra onde tem comida fresca',
    body: 'Feiras e hortifrútis do bairro têm mais variedade e, muitas vezes, preço melhor na época certa de cada fruta e verdura.',
  },
  {
    title: 'Cozinha e ensina alguém',
    body: 'Cozinhar é a melhor defesa contra os ultraprocessados. Aprende uma receita nova por mês e passa adiante para os filhos, o vizinho, quem estiver por perto.',
  },
  {
    title: 'Planeja o tempo da comida',
    body: 'Deixar feijão pronto no congelador e legumes picados na geladeira salva a semana corrida.',
  },
  {
    title: 'Fora de casa, prefere comida feita na hora',
    body: 'Um bufê por quilo ou um prato feito costumam ser melhores que lanches de rede de fast food.',
  },
  {
    title: 'Desconfia da propaganda',
    body: 'Embalagem que promete "fit", "zero" ou "rico em vitaminas" quer te vender. Lê a lista de ingredientes.',
  },
]

export const labelTips: readonly Tip[] = [
  {
    title: 'A lupa na frente da embalagem',
    body: 'Desde 2022, a Anvisa exige um selo com uma lupa quando o produto tem muito açúcar adicionado, gordura saturada ou sódio. Viu a lupa, pensa duas vezes.',
  },
  {
    title: 'A lista de ingredientes',
    body: 'Os ingredientes vêm em ordem do que tem mais para o que tem menos. Se açúcar aparece entre os primeiros, ou se a lista é longa e cheia de nomes estranhos, é ultraprocessado.',
  },
  {
    title: 'Açúcar tem muitos nomes',
    body: 'Xarope de glicose, maltodextrina, açúcar invertido, frutose, dextrose. Tudo isso é açúcar.',
  },
]

export const plateTips: readonly Tip[] = [
  { title: 'Metade do prato', body: 'Verduras e legumes, crus ou cozidos. Quanto mais cores, melhor.' },
  { title: 'Um quarto', body: 'Arroz, batata, mandioca, macarrão ou polenta.' },
  { title: 'Um quarto', body: 'Feijão, lentilha ou grão-de-bico com ovo, frango, peixe ou carne.' },
  { title: 'Para beber', body: 'Água. Suco natural de vez em quando, sem açúcar.' },
]
