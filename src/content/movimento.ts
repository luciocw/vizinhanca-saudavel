import type { Stretch, Tip } from '../types'

export const activityFacts: readonly Tip[] = [
  {
    title: 'Quanto é o suficiente?',
    body: 'O Guia de Atividade Física do Ministério da Saúde recomenda que adultos façam pelo menos 150 minutos de atividade moderada por semana. Dá uns 30 minutos, cinco dias por semana. Uma caminhada em que tu consegue conversar, mas não cantar, já conta como moderada.',
  },
  {
    title: 'Criança precisa de mais',
    body: 'Para crianças e adolescentes de 6 a 17 anos, a recomendação é 60 minutos por dia. Brincar na pracinha, andar de bicicleta e correr no parque entram nessa conta.',
  },
  {
    title: 'Pouco é melhor que nada',
    body: 'Não precisa começar com 30 minutos. Dez minutos depois do almoço já fazem diferença. O importante é sair do zero e ir aumentando aos poucos.',
  },
  {
    title: 'Menos tempo sentado',
    body: 'Se tu trabalha sentado, levanta a cada hora para dar uma volta, beber água ou subir um lance de escada. Usar a escada do prédio em vez do elevador também conta.',
  },
]

export const stretches: readonly Stretch[] = [
  {
    id: 'marcha',
    name: 'Marcha no lugar',
    seconds: 60,
    when: 'antes',
    steps: [
      'Fica em pé e marcha no lugar, levantando bem os joelhos.',
      'Balança os braços junto, como se já estivesse caminhando.',
      'Começa devagar e vai acelerando um pouco no final.',
    ],
  },
  {
    id: 'ombros',
    name: 'Círculos com os ombros',
    seconds: 30,
    when: 'antes',
    steps: [
      'Com os braços soltos ao lado do corpo, faz círculos grandes com os ombros para trás.',
      'Depois de 15 segundos, inverte para a frente.',
    ],
  },
  {
    id: 'tornozelo',
    name: 'Giro de tornozelo',
    seconds: 30,
    when: 'antes',
    steps: [
      'Apoia uma mão numa parede ou num banco da praça.',
      'Tira um pé do chão e gira o tornozelo devagar, 10 vezes para cada lado.',
      'Troca de pé.',
    ],
  },
  {
    id: 'panturrilha',
    name: 'Panturrilha na parede',
    seconds: 30,
    when: 'depois',
    steps: [
      'Fica de frente para uma parede ou árvore e apoia as duas mãos nela.',
      'Leva uma perna para trás, com o calcanhar no chão e o joelho esticado.',
      'Inclina o corpo para a frente até sentir a batata da perna puxar. Segura 30 segundos e troca.',
    ],
  },
  {
    id: 'coxa-frente',
    name: 'Frente da coxa',
    seconds: 30,
    when: 'depois',
    steps: [
      'Segura num apoio com uma mão.',
      'Dobra o joelho e segura o pé atrás, puxando o calcanhar em direção ao bumbum.',
      'Mantém os joelhos alinhados. Segura 30 segundos e troca.',
    ],
    careful: 'Se o equilíbrio não estiver bom, faz deitado de lado no chão ou numa cama.',
  },
  {
    id: 'coxa-tras',
    name: 'Parte de trás da coxa',
    seconds: 30,
    when: 'depois',
    steps: [
      'Coloca um calcanhar à frente, com a ponta do pé para cima.',
      'Dobra levemente o outro joelho e inclina o tronco para a frente com as costas retas.',
      'Para quando sentir puxar atrás da coxa. Segura 30 segundos e troca.',
    ],
  },
  {
    id: 'peito',
    name: 'Abrir o peito',
    seconds: 30,
    when: 'depois',
    steps: [
      'Entrelaça as mãos atrás das costas.',
      'Estica os braços e leva os ombros para trás, sem arquear a lombar.',
      'Respira fundo enquanto segura.',
    ],
  },
  {
    id: 'pescoco',
    name: 'Lateral do pescoço',
    seconds: 30,
    when: 'ambos',
    steps: [
      'Inclina a cabeça devagar, levando a orelha em direção ao ombro.',
      'Deixa o ombro do outro lado relaxado, bem baixinho.',
      'Segura 15 segundos de cada lado. Sem forçar.',
    ],
  },
]

export const stretchNote =
  'Antes de caminhar, o ideal é aquecer com movimento. Os alongamentos parados ficam melhores no final, com o corpo já quente. Alongamento puxa, mas não dói. Se doer, alivia.'
