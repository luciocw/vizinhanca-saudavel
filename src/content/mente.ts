import type { BreathPattern, Tip } from '../types'

export const breathPatterns: readonly BreathPattern[] = [
  {
    id: 'lenta',
    name: 'Respiração lenta',
    description: 'Solta o ar mais devagar do que puxa. É a mais simples e boa para começar.',
    phases: [
      { label: 'Puxa o ar pelo nariz', seconds: 4, scale: 1 },
      { label: 'Solta devagar pela boca', seconds: 6, scale: 0 },
    ],
    rounds: 6,
  },
  {
    id: 'quadrada',
    name: 'Respiração quadrada',
    description: 'Quatro tempos iguais. Ajuda a focar antes de uma conversa difícil ou de uma prova.',
    phases: [
      { label: 'Puxa o ar', seconds: 4, scale: 1 },
      { label: 'Segura', seconds: 4, scale: 1 },
      { label: 'Solta o ar', seconds: 4, scale: 0 },
      { label: 'Segura vazio', seconds: 4, scale: 0 },
    ],
    rounds: 4,
  },
  {
    id: '478',
    name: 'Respiração 4-7-8',
    description: 'Muita gente usa para pegar no sono. Se der tontura, volta para a respiração lenta.',
    phases: [
      { label: 'Puxa o ar pelo nariz', seconds: 4, scale: 1 },
      { label: 'Segura', seconds: 7, scale: 1 },
      { label: 'Solta pela boca, fazendo som', seconds: 8, scale: 0 },
    ],
    rounds: 4,
  },
]

export const mindfulPractices: readonly Tip[] = [
  {
    title: '5-4-3-2-1 para quando a ansiedade aperta',
    body: 'Repara em 5 coisas que tu vê, 4 que tu consegue tocar, 3 sons, 2 cheiros e 1 gosto. Isso puxa a atenção de volta para o agora.',
  },
  {
    title: 'Caminhada com atenção',
    body: 'Na próxima volta no quarteirão, deixa o fone em casa. Presta atenção nos pés tocando o chão, no vento, nas árvores da rua. Quando a cabeça fugir para as preocupações, só volta para os passos.',
  },
  {
    title: 'Um minuto antes de abrir o celular',
    body: 'De manhã, antes de olhar as mensagens, senta na cama e respira fundo dez vezes. Parece pouco, mas muda o tom do dia.',
  },
  {
    title: 'Dá nome ao que tu sente',
    body: '"Estou ansioso." "Estou irritado." Só dar nome à emoção já diminui a força dela. Escrever num papel ajuda mais ainda.',
  },
]

export const sleepTips: readonly Tip[] = [
  { title: 'Mesmo horário todo dia', body: 'Deitar e acordar mais ou menos na mesma hora, inclusive no fim de semana. O corpo agradece a rotina.' },
  { title: 'Sol de manhã', body: 'Uns minutos de luz natural cedo ajudam a acertar o relógio do corpo. Uma volta na praça antes do trabalho resolve.' },
  { title: 'Café até o meio da tarde', body: 'A cafeína fica horas no corpo. Chimarrão e chá preto também têm, então vale a mesma regra.' },
  { title: 'Tela longe da cama', body: 'Tenta largar o celular uma hora antes de dormir. Se precisar, deixa ele carregando fora do quarto.' },
  { title: 'Quarto escuro e fresco', body: 'Escuro, silencioso e sem calor. Uma cortina mais grossa já ajuda bastante.' },
  { title: 'Não briga com a insônia', body: 'Se passou uns 20 minutos e o sono não veio, levanta, vai para outro cômodo e faz algo calmo com pouca luz. Volta quando der sono.' },
]

export const whenToSeekHelp: readonly string[] = [
  'A tristeza ou a ansiedade duram semanas e atrapalham o trabalho, os estudos ou a convivência.',
  'O sono ou o apetite mudaram muito.',
  'Tu perdeu o interesse por coisas que gostava de fazer.',
  'Tu tá usando álcool ou remédio para aguentar o dia.',
  'Aparecem pensamentos de que não vale a pena viver.',
]
