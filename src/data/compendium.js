// Compêndio D&D 5e Completo (Edição 2024 / SRD Oficial em Português)
// Contém Armas, Armaduras, Magias, Habilidades de Classe, Talentos e Condições

export const WEAPONS = [
  // Armas Simples Corpo a Corpo
  { name: "Adaga", type: "Simples Corpo a Corpo", damage: "1d4", damageType: "perfurante", properties: "Acuidade, arremesso (distância 6/18), leve", cost: "2 po", weight: "0,5 kg", desc: "Uma lâmina afiada perfeita para combate furtivo ou arremesso rápido." },
  { name: "Clava", type: "Simples Corpo a Corpo", damage: "1d4", damageType: "concussão", properties: "Leve", cost: "1 pp", weight: "1 kg", desc: "Um pedaço pesado de madeira entalhada para atordoar inimigos." },
  { name: "Lança", type: "Simples Corpo a Corpo", damage: "1d6", damageType: "perfurante", properties: "Arremesso (distância 6/18), versátil (1d8)", cost: "1 po", weight: "1,5 kg", desc: "Uma haste de madeira com ponta de metal afiada. Pode ser usada com uma ou duas mãos." },
  { name: "Maça", type: "Simples Corpo a Corpo", damage: "1d6", damageType: "concussão", properties: "—", cost: "5 po", weight: "2 kg", desc: "Arma contundente com cabeça pesada com flange ou cravos." },
  { name: "Machadinha", type: "Simples Corpo a Corpo", damage: "1d6", damageType: "cortante", properties: "Leve, arremesso (distância 6/18)", cost: "5 po", weight: "1 kg", desc: "Machado compacto perfeito para combates rápidos com as duas mãos." },
  { name: "Bordão", type: "Simples Corpo a Corpo", damage: "1d6", damageType: "concussão", properties: "Versátil (1d8)", cost: "2 pp", weight: "2 kg", desc: "Cajado resistente comumente empunhado por magos, druidas e monges." },
  { name: "Martelo Leve", type: "Simples Corpo a Corpo", damage: "1d4", damageType: "concussão", properties: "Leve, arremesso (distância 6/18)", cost: "2 po", weight: "1 kg", desc: "Martelo balanceado para combate corporal ou arremesso." },

  // Armas Simples à Distância
  { name: "Arco Curto", type: "Simples à Distância", damage: "1d6", damageType: "perfurante", properties: "Munição (distância 24/96), duas mãos", cost: "25 po", weight: "1 kg", desc: "Arco ágil para caçadores e arqueiros rápidos." },
  { name: "Besta Leve", type: "Simples à Distância", damage: "1d8", damageType: "perfurante", properties: "Munição (distância 24/96), recarga, duas mãos", cost: "25 po", weight: "2,5 kg", desc: "Dispara virotes com mecanismo de gatilho mecânico." },
  { name: "Dardo", type: "Simples à Distância", damage: "1d4", damageType: "perfurante", properties: "Acuidade, arremesso (distância 6/18)", cost: "5 pc", weight: "0,1 kg", desc: "Projétil leve arremessável à mão." },
  { name: "Funda", type: "Simples à Distância", damage: "1d4", damageType: "concussão", properties: "Munição (distância 9/36)", cost: "1 pp", weight: "—", desc: "Tira de couro para arremessar pedras ou esferas metálicas com força." },

  // Armas Marciais Corpo a Corpo
  { name: "Espada Longa", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "cortante", properties: "Versátil (1d10)", cost: "15 po", weight: "1,5 kg", desc: "A icônica lâmina de cavalheiros e paladinos. Usável com 1 mão (1d8) ou 2 mãos (1d10)." },
  { name: "Espadão (Montante)", type: "Marcial Corpo a Corpo", damage: "2d6", damageType: "cortante", properties: "Pesada, duas mãos", cost: "50 po", weight: "3 kg", desc: "Lâmina massiva devastadora que exige força física e duas mãos." },
  { name: "Espada Curta", type: "Marcial Corpo a Corpo", damage: "1d6", damageType: "perfurante", properties: "Acuidade, leve", cost: "10 po", weight: "1 kg", desc: "Arma favorita de ladinos e duelistas ágeis." },
  { name: "Cimitarra", type: "Marcial Corpo a Corpo", damage: "1d6", damageType: "cortante", properties: "Acuidade, leve", cost: "25 po", weight: "1,5 kg", desc: "Lâmina curva refinada excelente para golpes cortantes velozes." },
  { name: "Rapieira", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "perfurante", properties: "Acuidade", cost: "25 po", weight: "1 kg", desc: "Estoque elegante de precisão suprema para duelistas." },
  { name: "Machado de Batalha", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "cortante", properties: "Versátil (1d10)", cost: "10 po", weight: "2 kg", desc: "Machado robusto usado com frequência por anões e guerreiros." },
  { name: "Machado Grande", type: "Marcial Corpo a Corpo", damage: "1d12", damageType: "cortante", properties: "Pesada, duas mãos", cost: "30 po", weight: "3,5 kg", desc: "A arma de fúria máxima dos bárbaros e guerreiros brutais." },
  { name: "Martelo de Guerra", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "concussão", properties: "Versátil (1d10)", cost: "15 po", weight: "1 kg", desc: "Esmaga armaduras pesadas com facilidade." },
  { name: "Mangual", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "concussão", properties: "—", cost: "10 po", weight: "1 kg", desc: "Esfera de ferro com cravos presa por corrente." },
  { name: "Alabarda", type: "Marcial Corpo a Corpo", damage: "1d10", damageType: "cortante", properties: "Pesada, alcance, duas mãos", cost: "20 po", weight: "3 kg", desc: "Lâmina de machado em haste longa permitindo atacar a 3 metros de distância." },
  { name: "Glaive", type: "Marcial Corpo a Corpo", damage: "1d10", damageType: "cortante", properties: "Pesada, alcance, duas mãos", cost: "20 po", weight: "3 kg", desc: "Haste com lâmina curva cortante de alcance ampliado." },
  { name: "Lança Longa (Pique)", type: "Marcial Corpo a Corpo", damage: "1d10", damageType: "perfurante", properties: "Pesada, alcance, duas mãos", cost: "5 po", weight: "9 kg", desc: "Haste militar extremamente comprida para deter cargas inimigas." },
  { name: "Tridente", type: "Marcial Corpo a Corpo", damage: "1d6", damageType: "perfurante", properties: "Arremesso (distância 6/18), versátil (1d8)", cost: "5 po", weight: "2 kg", desc: "Arma com três dentes farpados clássica de gladiadores e marinheiros." },
  { name: "Chicote", type: "Marcial Corpo a Corpo", damage: "1d4", damageType: "cortante", properties: "Acuidade, alcance", cost: "2 po", weight: "1,5 kg", desc: "Tira trançada de couro para controle tático a distância." },

  // Armas Marciais à Distância
  { name: "Arco Longo", type: "Marcial à Distância", damage: "1d8", damageType: "perfurante", properties: "Munição (distância 45/180), pesada, duas mãos", cost: "50 po", weight: "1 kg", desc: "Arma de tiro de elite com alcance superior." },
  { name: "Besta Pesada", type: "Marcial à Distância", damage: "1d10", damageType: "perfurante", properties: "Munição (distância 30/120), pesada, recarga, duas mãos", cost: "50 po", weight: "9 kg", desc: "Mecanismo massivo capaz de perfurar as mais duras armaduras." },
  { name: "Besta de Mão", type: "Marcial à Distância", damage: "1d6", damageType: "perfurante", properties: "Munição (distância 9/36), leve, recarga", cost: "75 po", weight: "1,5 kg", desc: "Besta compacta usável com uma mão só, favorita de assassinos." }
];

export const ARMORS = [
  // Armaduras Leves
  { name: "Acolchoada", category: "Leve", acFormula: "11 + mod DES", baseAC: 11, strReq: 0, stealthDisadv: true, cost: "5 po", weight: "4 kg", desc: "Camadas acolchoadas de pano e estofo." },
  { name: "Couro", category: "Leve", acFormula: "11 + mod DES", baseAC: 11, strReq: 0, stealthDisadv: false, cost: "10 po", weight: "5 kg", desc: "Couro endurecido fervido em óleo para proteção ágil." },
  { name: "Couro Batido", category: "Leve", acFormula: "12 + mod DES", baseAC: 12, strReq: 0, stealthDisadv: false, cost: "45 po", weight: "6,5 kg", desc: "Couro reforçado com rebites ou cravos metálicos." },

  // Armaduras Médias
  { name: "Gibão de Peles", category: "Média", acFormula: "12 + mod DES (máx 2)", baseAC: 12, strReq: 0, stealthDisadv: false, cost: "10 po", weight: "6 kg", desc: "Peles grossas e couro rústico comum entre bárbaros e tribos." },
  { name: "Camisão de Malha", category: "Média", acFormula: "13 + mod DES (máx 2)", baseAC: 13, strReq: 0, stealthDisadv: false, cost: "50 po", weight: "10 kg", desc: "Anéis de metal entrelaçados vestidos sob a túnica sem barulho." },
  { name: "Brunea", category: "Média", acFormula: "14 + mod DES (máx 2)", baseAC: 14, strReq: 0, stealthDisadv: true, cost: "50 po", weight: "22 kg", desc: "Escamas de metal sobrepostas presas a couro." },
  { name: "Peitoral", category: "Média", acFormula: "14 + mod DES (máx 2)", baseAC: 14, strReq: 0, stealthDisadv: false, cost: "400 po", weight: "10 kg", desc: "Placa metálica que protege o torso sem atrapalhar a furtividade." },
  { name: "Meia-Armadura", category: "Média", acFormula: "15 + mod DES (máx 2)", baseAC: 15, strReq: 0, stealthDisadv: true, cost: "750 po", weight: "20 kg", desc: "Placas articuladas sobre a maior parte do corpo com cota de malha." },

  // Armaduras Pesadas
  { name: "Cota de Anéis", category: "Pesada", acFormula: "14", baseAC: 14, strReq: 0, stealthDisadv: true, cost: "30 po", weight: "20 kg", desc: "Argolas de ferro cosidas diretamente sobre tecido grosso." },
  { name: "Cota de Malha", category: "Pesada", acFormula: "16", baseAC: 16, strReq: 13, stealthDisadv: true, cost: "75 po", weight: "25 kg", desc: "Entrelaçado completo de elos de metal. Padrão inicial de paladinos e clérigos de guerra." },
  { name: "Cota de Talas", category: "Pesada", acFormula: "17", baseAC: 17, strReq: 15, stealthDisadv: true, cost: "200 po", weight: "30 kg", desc: "Tiras verticais de aço rebitadas a forro acolchoado." },
  { name: "Armadura de Placas (Full Plate)", category: "Pesada", acFormula: "18", baseAC: 18, strReq: 15, stealthDisadv: true, cost: "1.500 po", weight: "32 kg", desc: "A cúspide da defesa mundana: placas esculpidas que cobrem todo o corpo com forro e cotas articuladas." },

  // Escudos
  { name: "Escudo", category: "Escudo", acFormula: "+2 CA", baseAC: 2, strReq: 0, stealthDisadv: false, cost: "10 po", weight: "3 kg", desc: "Escudo de madeira ou metal empunhado em uma das mãos, concedendo +2 na CA." }
];

export const SPELLS_DATABASE = [
  // Truques (Nível 0)
  { name: "Golpe Certeiro (True Strike)", level: 0, school: "Adivinhação", castingTime: "1 ação", range: "9 metros", components: "S", duration: "Concentração, até 1 rodada", desc: "Você aponta para um alvo no alcance. No seu próximo turno, você ganha vantagem na sua primeira jogada de ataque contra o alvo." },
  { name: "Raio de Fogo (Fire Bolt)", level: 0, school: "Evocação", castingTime: "1 ação", range: "36 metros", components: "V, S", duration: "Instantâneo", damage: "1d10 fogo", desc: "Você arremessa um feixe de fogo num alvo. Faça um ataque mágico à distância. Se acertar, causa 1d10 de dano de fogo (2d10 no 5º nível, 3d10 no 11º, 4d10 no 17º)." },
  { name: "Chicote de Espinhos (Thorn Whip)", level: 0, school: "Transmutação", castingTime: "1 ação", range: "9 metros", components: "V, S, M", duration: "Instantâneo", damage: "1d6 perfurante", desc: "Você cria um chicote longo de vinhas espinhosas. Se acertar, causa 1d6 de dano e se o alvo for Grande ou menor, você o puxa até 3 metros na sua direção." },
  { name: "Chama Sagrada (Sacred Flame)", level: 0, school: "Evocação", castingTime: "1 ação", range: "18 metros", components: "V, S", duration: "Instantâneo", damage: "1d8 radiante", desc: "Luz flamejante desce sobre uma criatura visível. O alvo deve ter sucesso num teste de resistência de Destreza ou sofrer 1d8 de dano radiante. O alvo não recebe benefício de cobertura para este teste." },
  { name: "Rajada Mística (Eldritch Blast)", level: 0, school: "Evocação", castingTime: "1 ação", range: "36 metros", components: "V, S", duration: "Instantâneo", damage: "1d10 energia", desc: "Um feixe de energia crepitante atinge uma criatura. Ataque mágico à distância: 1d10 de dano de energia. Cria mais feixes nos níveis 5 (2 feixes), 11 (3 feixes) e 17 (4 feixes)." },
  { name: "Orientação (Guidance)", level: 0, school: "Adivinhação", castingTime: "1 ação", range: "Toque", components: "V, S", duration: "Concentração, até 1 minuto", desc: "Você toca uma criatura disposta. Uma vez antes da magia acabar, o alvo pode rolar um d4 e adicionar o resultado a um teste de habilidade de sua escolha." },
  { name: "Luz (Light)", level: 0, school: "Evocação", castingTime: "1 ação", range: "Toque", components: "V, M", duration: "1 hora", desc: "Você toca um objeto emitindo luz brilhante num raio de 6 metros e penumbra por mais 6 metros." },
  { name: "Mãos Mágicas (Mage Hand)", level: 0, school: "Conjuração", castingTime: "1 ação", range: "9 metros", components: "V, S", duration: "1 minuto", desc: "Uma mão espectral flutuante surge no alcance. Você pode usá-la para manipular objetos, abrir portas ou pegar itens até 4,5 kg." },
  { name: "Mensagem (Message)", level: 0, school: "Transmutação", castingTime: "1 ação", range: "36 metros", components: "V, S, M", duration: "1 rodada", desc: "Você aponta para uma criatura no alcance e sussurra uma mensagem. O alvo ouve e pode responder em um sussurro que só você escuta." },
  { name: "Zombaria Viciosa (Vicious Mockery)", level: 0, school: "Encantamento", castingTime: "1 ação", range: "18 metros", components: "V", duration: "Instantâneo", damage: "1d4 psíquico", desc: "Você lança uma sequência de insultos enlaçados com magia sutil. Teste de Sabedoria do alvo: falha causa 1d4 psíquico e desvantagem na próxima jogada de ataque." },
  { name: "Consertar (Mending)", level: 0, school: "Transmutação", castingTime: "1 minuto", range: "Toque", components: "V, S, M", duration: "Instantâneo", desc: "Repara uma única quebra ou rasgo em um objeto que você toca, como uma corrente quebrada, uma chave partida ou uma capa rasgada." },
  { name: "Preservar os Mortos (Spare the Dying)", level: 0, school: "Necromancia", castingTime: "1 ação", range: "Toque", components: "V, S", duration: "Instantâneo", desc: "Você toca uma criatura viva que tenha 0 pontos de vida. A criatura fica estabilizada imediatamente." },

  // Nível 1
  { name: "Cura pelas Mãos / Curar Ferimentos (Cure Wounds)", level: 1, school: "Evocação", castingTime: "1 ação", range: "Toque", components: "V, S", duration: "Instantâneo", damage: "1d8 + mod", desc: "Uma criatura que você tocar recupera pontos de vida iguais a 1d8 + modificador da sua habilidade de conjuração. (+1d8 por nível superior)." },
  { name: "Palavra Curativa (Healing Word)", level: 1, school: "Evocação", castingTime: "1 ação bônus", range: "18 metros", components: "V", duration: "Instantâneo", damage: "1d4 + mod", desc: "Você profere uma palavra de poder. Uma criatura à sua vista no alcance recupera 1d4 + seu mod de conjuração em PVs. Pode ser usada como Ação Bônus!" },
  { name: "Bênção (Bless)", level: 1, school: "Encantamento", castingTime: "1 ação", range: "9 metros", components: "V, S, M", duration: "Concentração, até 1 minuto", desc: "Você abençoa até três criaturas. Sempre que um alvo fizer uma jogada de ataque ou teste de resistência, adiciona +1d4 ao teste." },
  { name: "Destruição Cólera (Wrathful Smite)", level: 1, school: "Evocação", castingTime: "1 ação bônus", range: "Pessoal", components: "V", duration: "Concentração, até 1 minuto", damage: "1d6 psíquico", desc: "No seu próximo acerto com arma corpo a corpo, causa +1d6 psíquico e o alvo deve ter sucesso num teste de Sabedoria ou fica Amedrontado até a magia acabar." },
  { name: "Destruição Trovejante (Thunderous Smite)", level: 1, school: "Evocação", castingTime: "1 ação bônus", range: "Pessoal", components: "V", duration: "Concentração, até 1 minuto", damage: "2d6 trovão", desc: "Seu ataque ressoa com estrondo divino: +2d6 de dano de trovão, empurra o alvo 3 metros para trás e o derruba no chão se falhar em teste de Força." },
  { name: "Mísseis Mágicos (Magic Missile)", level: 1, school: "Evocação", castingTime: "1 ação", range: "36 metros", components: "V, S", duration: "Instantâneo", damage: "3x (1d4+1) energia", desc: "Você dispara três dardos brilhantes que acertam infalivelmente alvos à sua escolha no alcance. Cada dardo causa 1d4 + 1 de dano de energia." },
  { name: "Escudo Arcano (Shield)", level: 1, school: "Abjuração", castingTime: "1 reação", range: "Pessoal", components: "V, S", duration: "1 rodada", desc: "Uma barreira invisível bloqueia ataques. Concede +5 de bônus na CA até o início do seu próximo turno, e você não sofre dano de Mísseis Mágicos." },
  { name: "Onda Trovejante (Thunderwave)", level: 1, school: "Evocação", castingTime: "1 ação", range: "Pessoal (cubo de 4,5m)", components: "V, S", duration: "Instantâneo", damage: "2d8 trovão", desc: "Uma onda de força trovejante irrompe de você. Criaturas no cubo sofrem 2d8 de trovão e são empurradas 3 metros em falha de Constituição." },
  { name: "Marca do Caçador (Hunter's Mark)", level: 1, school: "Adivinhação", castingTime: "1 ação bônus", range: "27 metros", components: "V", duration: "Concentração, até 1 hora", desc: "Você marca um alvo como sua presa. Você causa +1d6 de dano de arma contra ele sempre que acertar, e tem vantagem em testes para rastreá-lo." },
  { name: "Fogo das Fadas (Faerie Fire)", level: 1, school: "Evocação", castingTime: "1 ação", range: "18 metros", components: "V", duration: "Concentração, até 1 minuto", desc: "Luz colorida contorna todos os objetos e criaturas num cubo de 6m. Ataques contra alvos afetados têm vantagem, e eles não se beneficiam de invisibilidade." },

  // Nível 2
  { name: "Arma Espiritual (Spiritual Weapon)", level: 2, school: "Evocação", castingTime: "1 ação bônus", range: "18 metros", components: "V, S", duration: "1 minuto", damage: "1d8 + mod", desc: "Cria uma arma espectral flutuante que ataca inimigos usando ação bônus nos seus turnos subsequentes, causando 1d8 + modificador de conjuração." },
  { name: "Passo Místico (Misty Step)", level: 2, school: "Conjuração", castingTime: "1 ação bônus", range: "Pessoal", components: "V", duration: "Instantâneo", desc: "Brevemente envolvido em névoa prateada, você se teletransporta instantaneamente até 9 metros para um espaço desocupado visível." },
  { name: "Raios Ardentes (Scorching Ray)", level: 2, school: "Evocação", castingTime: "1 ação", range: "36 metros", components: "V, S", duration: "Instantâneo", damage: "3x 2d6 fogo", desc: "Você cria três raios de fogo e os arremessa contra alvos no alcance. Faça um ataque mágico para cada raio. Cada acerto causa 2d6 de dano de fogo." },
  { name: "Restaurar Menor (Lesser Restoration)", level: 2, school: "Abjuração", castingTime: "1 ação", range: "Toque", components: "V, S", duration: "Instantâneo", desc: "Você toca uma criatura e encerra uma doença ou uma das seguintes condições: cego, surdo, paralisado ou envenenado." },
  { name: "Imobilizar Pessoa (Hold Person)", level: 2, school: "Encantamento", castingTime: "1 ação", range: "18 metros", components: "V, S, M", duration: "Concentração, até 1 minuto", desc: "Escolha um humanoide visível. Ele deve ter sucesso num teste de Sabedoria ou ficará Paralisado pela duração da magia." },
  { name: "Invisibilidade (Invisibility)", level: 2, school: "Ilusão", castingTime: "1 ação", range: "Toque", components: "V, S, M", duration: "Concentração, até 1 hora", desc: "Uma criatura tocada torna-se invisível até a magia acabar. Encerra antecipadamente se a criatura atacar ou conjurar uma magia." },
  { name: "Escuridão (Darkness)", level: 2, school: "Evocação", castingTime: "1 ação", range: "18 metros", components: "V, M", duration: "Concentração, até 10 minutos", desc: "Trevas mágicas preenchem uma esfera de 4,5m de raio. Visão no escuro não penetra estas trevas, e luz não mágica não pode iluminá-la." },

  // Nível 3
  { name: "Bola de Fogo (Fireball)", level: 3, school: "Evocação", castingTime: "1 ação", range: "45 metros", components: "V, S, M", duration: "Instantâneo", damage: "8d6 fogo", desc: "Uma explosão brilhante detona com um estrondo ensurdecedor. Cada criatura numa esfera de 6m de raio deve fazer um teste de Destreza: 8d6 de fogo em falha, metade em sucesso." },
  { name: "Espíritos Guardiões (Spirit Guardians)", level: 3, school: "Conjuração", castingTime: "1 ação", range: "Pessoal (raio de 4,5m)", components: "V, S, M", duration: "Concentração, até 10 minutos", damage: "3d8 radiante/necrótico", desc: "Espíritos protetores circulam ao seu redor. Criaturas hostis no raio têm deslocamento reduzido pela metade e sofrem 3d8 de dano radiante ao entrar na área." },
  { name: "Reviver (Revivify)", level: 3, school: "Necromancia", castingTime: "1 ação", range: "Toque", components: "V, S, M (diamantes de 300 po)", duration: "Instantâneo", desc: "Você toca uma criatura que tenha morrido no último minuto. A criatura retorna à vida com 1 ponto de vida." },
  { name: "Velocidade (Haste)", level: 3, school: "Transmutação", castingTime: "1 ação", range: "9 metros", components: "V, S, M", duration: "Concentração, até 1 minuto", desc: "Dobra o deslocamento do alvo, +2 na CA, vantagem em testes de Destreza e uma ação adicional a cada turno (Atacar, Disparada, etc.)." },
  { name: "Contramágica (Counterspell)", level: 3, school: "Abjuração", castingTime: "1 reação", range: "18 metros", components: "S", duration: "Instantâneo", desc: "Você interrompe o fluxo de magia de um oponente. Se a criatura estiver conjurando uma magia de 3º nível ou inferior, a magia dela falha instantaneamente." },
  { name: "Dissipar Magia (Dispel Magic)", level: 3, school: "Abjuração", castingTime: "1 ação", range: "36 metros", components: "V, S", duration: "Instantâneo", desc: "Escolha uma criatura, objeto ou efeito mágico. Qualquer magia de 3º nível ou inferior sobre o alvo termina imediatamente." }
];

export const CLASS_FEATURES_DB = {
  "Paladino": [
    { name: "Sentido Divino", level: 1, desc: "Sua percepção detecta o mal e bem concentrado. Como uma ação, você sabe a localização de qualquer celestial, corruptor ou morto-vivo a até 18 metros que não esteja atrás de cobertura total. Usos = 1 + mod Carisma por descanso longo." },
    { name: "Cura pelas Mãos (Lay on Hands)", level: 1, desc: "Você possui uma reserva de poder curativo igual ao seu nível de Paladino x 5. Como ação, toque uma criatura e restaure quantos PV desejar da reserva, ou gaste 5 PV para curar uma doença ou neutralizar um veneno." },
    { name: "Estilo de Luta", level: 2, desc: "Você adota um estilo de combate marcial: Defesa (+1 CA), Duelo (+2 dano com 1 arma), Proteção (usar reação e escudo para impor desvantagem em ataque contra aliado) ou Grandes Armas." },
    { name: "Destruição Divina (Divine Smite)", level: 2, desc: "Quando você acertar uma criatura com um ataque corpo a corpo com arma, pode gastar um espaço de magia para causar dano radiante extra (+2d8 para 1º nível, +1d8 para cada nível de espaço acima de 1º, máx 5d8). Causa +1d8 adicional contra mortos-vivos ou corruptores!" },
    { name: "Saúde Divina", level: 3, desc: "A magia divina fluindo através de você concede imunidade total a doenças." },
    { name: "Juramento Sagrado (Arquétipo)", level: 3, desc: "Você faz seu juramento definitivo: Devoção, Vingança, Anciões, Conquista ou Redenção, ganhando magias de juramento e opções de Canalizar Divindade." },
    { name: "Ataque Extra", level: 5, desc: "Você pode atacar duas vezes, em vez de uma, sempre que realizar a ação de Atacar no seu turno." },
    { name: "Aura de Proteção", level: 6, desc: "Sempre que você ou uma criatura amigável a até 3 metros de você tiver que fazer um teste de resistência, o alvo ganha um bônus no teste igual ao seu modificador de Carisma (mínimo de +1)." },
    { name: "Aura de Coragem", level: 10, desc: "Você e criaturas amigáveis a até 3 metros de você não podem ficar amedrontados enquanto você estiver consciente." }
  ],
  "Feiticeiro": [
    { name: "Origem Dracônica: Ancestralidade Dracônica", level: 1, desc: "Você escolhe o tipo de dragão do seu sangue (ex: Vermelho = Fogo, Azul = Eletricidade, Branco = Frio, Preto = Ácido, Ouro = Fogo). Você aprende a falar, ler e escrever Dracônico." },
    { name: "Origem Dracônica: Resiliência Dracônica", level: 1, desc: "Sua pele ganha escamas finas protetoras. Seus pontos de vida máximos aumentam em 1 para cada nível de Feiticeiro. Sem armadura, sua CA base passa a ser 13 + seu modificador de Destreza!" },
    { name: "Fonte de Magia (Pontos de Feitiçaria)", level: 2, desc: "Você ganha Pontos de Feitiçaria iguais ao seu nível de feiticeiro. Pode gastar pontos para criar espaços de magia adicionais ou converter espaços em pontos." },
    { name: "Metamagia", level: 3, desc: "Você molda suas magias: Magia Acelerada (conjura magia de ação como ação bônus), Magia Gêmea (alvo duplo), Magia Sutil (sem componentes V ou S), Magia Potencializada." },
    { name: "Afinidade Elemental Dracônica", level: 6, desc: "Ao conjurar uma magia que cause o dano do seu tipo de dragão, adicione seu modificador de Carisma a uma jogada de dano da magia. Pode gastar 1 ponto de feitiçaria para ganhar resistência ao elemento por 1 hora." },
    { name: "Asas de Dragão", level: 14, desc: "Você brota um par de asas de dragão das suas costas, ganhando deslocamento de voo igual ao seu deslocamento terrestre." }
  ],
  "Guerreiro": [
    { name: "Retomar o Fôlego (Second Wind)", level: 1, desc: "Você possui uma reserva de vigor que pode usar para se proteger do perigo. No seu turno, você pode usar uma ação bônus para recuperar PVs iguais a 1d10 + seu nível de guerreiro. Recarrega com descanso curto ou longo." },
    { name: "Surto de Ação (Action Surge)", level: 2, desc: "Você ultrapassa seus limites por um instante. No seu turno, você pode realizar uma ação adicional além da sua ação normal e eventual ação bônus. Recarrega em descanso curto ou longo." },
    { name: "Arquétipo Marcial (Campeão / Mestre de Batalha / Cavaleiro Místico)", level: 3, desc: "Você se especializa em um estilo marcial supremo. Campeão: seus ataques com arma obtêm acerto crítico em rolagens de 19 e 20 no d20." },
    { name: "Ataque Extra", level: 5, desc: "Você pode atacar duas vezes sempre que realizar a ação Atacar no seu turno (três vezes no 11º nível, quatro vezes no 20º)." },
    { name: "Indomável", level: 9, desc: "Você pode jogar novamente um teste de resistência no qual tenha falhado." }
  ],
  "Bárbaro": [
    { name: "Fúria (Rage)", level: 1, desc: "No combate, você luta com ferocidade primitiva. Como ação bônus, entra em fúria: vantagem em testes e salvaguardas de Força, +2 de dano corpo a corpo com Força, e resistência a dano de concussão, cortante e perfurante." },
    { name: "Defesa Sem Armadura", level: 1, desc: "Enquanto não estiver vestindo armadura, sua CA é igual a 10 + mod Destreza + mod Constituição. Você ainda pode usar escudo!" },
    { name: "Ataque Descuidado (Reckless Attack)", level: 2, desc: "Você abre mão da defesa para atacar com força total: você ganha vantagem em jogadas de ataque corpo a corpo usando Força, mas ataques contra você têm vantagem até o início do seu próximo turno." },
    { name: "Sentido de Perigo", level: 2, desc: "Você tem vantagem em testes de resistência de Destreza contra armadilhas e magias que você possa ver." }
  ],
  "Ladino": [
    { name: "Especialização (Expertise)", level: 1, desc: "Seu bônus de proficiência é dobrado em duas perícias de sua escolha (ou ferramentas de ladrão)." },
    { name: "Ataque Furtivo (Sneak Attack)", level: 1, desc: "Uma vez por turno, você causa dano extra (+1d6 no 1º nível, escalando até 10d6) a uma criatura que acertar com arma de acuidade ou à distância, se tiver vantagem no ataque ou um aliado a até 1,5m do alvo." },
    { name: "Ação Astuta (Cunning Action)", level: 2, desc: "Você pode usar uma ação bônus em cada um dos seus turnos para Disparada, Desengajar ou Esconder-se." },
    { name: "Esquiva Sobrenatural", level: 5, desc: "Quando um atacante visível te acerta com um ataque, você pode usar sua reação para reduzir o dano pela metade." }
  ],
  "Mago": [
    { name: "Conjuração Arcana & Grimório", level: 1, desc: "Você possui um grimório onde registra suas magias. Você prepara uma lista de magias igual ao seu mod de Inteligência + nível de Mago." },
    { name: "Recuperação Arcana", level: 1, desc: "Uma vez por dia após descanso curto, você recupera espaços de magia gastos cujo nível somado não exceda metade do seu nível de Mago (arredondado para cima)." },
    { name: "Tradição Arcana (Escola de Magia)", level: 2, desc: "Você escolhe sua especialização: Evocação, Abjuração, Ilusão, Necromancia, Adivinhação, Encantamento, Transmutação ou Conjuração." }
  ],
  "Clérigo": [
    { name: "Domínio Divino", level: 1, desc: "Você escolhe um domínio do seu deus: Vida, Guerra, Luz, Tempestade, Trapaça, Natureza ou Conhecimento, ganhando magias de domínio sempre preparadas e proficiências bônus." },
    { name: "Canalizar Divindade (Destruir Mortos-Vivos)", level: 2, desc: "Você canaliza energia divina para produzir efeitos mágicos como Expulsar Mortos-Vivos (cada morto-vivo visível a até 9m deve passar em teste de Sabedoria ou fugir)." }
  ],
  "Druida": [
    { name: "Forma Selvagem (Wild Shape)", level: 2, desc: "Você pode assumir magicamente a forma de uma besta que já tenha visto, ganhando os PVs e habilidades físicas da criatura." },
    { name: "Círculo Druídico", level: 2, desc: "Você adota um círculo: Círculo da Terra, da Lua, dos Pastores ou das Estrelas." }
  ],
  "Bardo": [
    { name: "Inspiração Bárdica", level: 1, desc: "Como ação bônus, conceda um dado de inspiração (1d6) a um aliado a até 18m. Ele pode somar o dado a uma jogada de ataque, teste de habilidade ou salvaguarda nos próximos 10 minutos." },
    { name: "Pau pra Toda Obra (Jack of All Trades)", level: 2, desc: "Você adiciona metade do seu bônus de proficiência a qualquer teste de habilidade no qual ainda não possua proficiência." }
  ],
  "Monge": [
    { name: "Artes Marciais", level: 1, desc: "Você usa Destreza em vez de Força para ataques desarmados ou com armas de monge, e pode desferir um golpe desarmado como ação bônus após atacar." },
    { name: "Defesa Sem Armadura", level: 1, desc: "Sem armadura e sem escudo, sua CA é 10 + mod Destreza + mod Sabedoria." },
    { name: "Pontos de Ki", level: 2, desc: "Você ganha Ki para acionar Rajada de Golpes, Defesa Paciente e Passo do Vento." }
  ],
  "Ranger": [
    { name: "Inimigo Favorito & Explorador Natural", level: 1, desc: "Vantagem em rastrear e recordar informações sobre seus tipos favoritos de criaturas e em navegar pelo seu terreno escolhido." },
    { name: "Consciência Primitiva", level: 3, desc: "Sinta a presença de aberrações, celestiais, dragões, elementais e mortos-vivos no raio de até 1,5 km." }
  ],
  "Bruxo": [
    { name: "Patrono Transcendental", level: 1, desc: "Você firma um pacto com um ser de outro mundo: Corruptor, Arquifada ou Grande Antigo." },
    { name: "Magia de Pacto", level: 1, desc: "Seus espaços de magia são sempre do maior nível que você pode conjurar e são restaurados após descansos curtos!" },
    { name: "Invocações Místicas", level: 2, desc: "Você descobre segredos proibidos: Rajada Agonizante (+ mod CAR no dano do Eldritch Blast), Visão do Diabo (enxerga na escuridão mágica), Armadura das Sombras." }
  ]
};

export const CONDITIONS_DB = [
  { name: "Amedrontado (Frightened)", desc: "Desvantagem em testes de habilidade e jogadas de ataque enquanto a fonte do medo estiver na sua linha de visão. Não pode se aproximar voluntariamente da fonte." },
  { name: "Agarrado (Grappled)", desc: "O deslocamento se torna 0 e não se beneficia de bônus de velocidade. A condição encerra se o agarrador ficar incapacitado." },
  { name: "Caído (Prone)", desc: "A criatura só pode rastejar, a menos que se levante gastando metade do deslocamento. Ataques contra ela a 1,5m têm vantagem; ataques à distância têm desvantagem." },
  { name: "Cego (Blinded)", desc: "A criatura não pode ver e falha automaticamente em testes que requeiram visão. Jogadas de ataque contra ela têm vantagem; seus ataques têm desvantagem." },
  { name: "Enfeitiçado (Charmed)", desc: "A criatura enfeitiçada não pode atacar o encantador ou mirá-lo com habilidades danosas. O encantador tem vantagem em testes sociais contra ela." },
  { name: "Envenenado (Poisoned)", desc: "A criatura sofre desvantagem em jogadas de ataque e testes de habilidade." },
  { name: "Incapacitado (Incapacitated)", desc: "Uma criatura incapacitada não pode realizar ações ou reações." },
  { name: "Inconsciente (Unconscious)", desc: "A criatura cai no chão, solta o que estiver segurando, fica incapacitada e falha automaticamente em testes de Força e Destreza. Ataques a 1,5m que acertam são críticos automáticos!" },
  { name: "Invisível (Invisible)", desc: "Impossível de ser vista sem magia ou sentidos especiais. Ataques contra ela têm desvantagem; seus ataques têm vantagem." },
  { name: "Paralisado (Paralyzed)", desc: "Fica incapacitada, não pode se mover ou falar, falha automaticamente em salvaguardas de Força e Destreza. Ataques contra ela têm vantagem e a até 1,5m são críticos automáticos." },
  { name: "Petrificado (Petrified)", desc: "Transformada em pedra sólida. O peso se multiplica por 10, fica incapacitada, cessa envelhecimento e tem resistência a todos os danos." },
  { name: "Preso / Contido (Restrained)", desc: "Deslocamento 0. Seus ataques sofrem desvantagem; ataques contra ela têm vantagem. Desvantagem em testes de resistência de Destreza." },
  { name: "Surdo (Deafened)", desc: "A criatura não pode ouvir e falha automaticamente em qualquer teste de habilidade que requeira audição." }
];

export const FEATS_DB = [
  { name: "Alerta (Alert)", desc: "+5 de bônus na iniciativa. Você não pode ser surpreendido enquanto estiver consciente, e outras criaturas não ganham vantagem ao atacar você escondidas." },
  { name: "Combatente Montado", desc: "Vantagem em ataques corpo a corpo contra criaturas não montadas menores que sua montaria." },
  { name: "Conjurador de Guerra (War Caster)", desc: "Vantagem em testes de resistência de Constituição para manter concentração em magias. Pode usar magia como ataque de oportunidade e realizar gestos mesmo empunhando armas e escudo." },
  { name: "Mestre em Armas Grandes (Great Weapon Master)", desc: "Ao acertar um crítico ou reduzir inimigo a 0 PV, ganha um ataque corpo a corpo bônus. Pode escolher sofrer -5 no ataque para causar +10 de dano!" },
  { name: "Franco-Atirador (Sharpshooter)", desc: "Seus ataques com armas à distância ignoram meia cobertura e três quartos de cobertura. Atacar no alcance máximo não impõe desvantagem. Pode sofrer -5 no ataque para ganhar +10 de dano." },
  { name: "Resiliente (Resilient)", desc: "Aumente um valor de atributo à sua escolha em 1 e ganhe proficiência nos testes de resistência com esse atributo." },
  { name: "Sortudo (Lucky)", desc: "Você tem 3 pontos de sorte para gastar e rolar um d20 extra em ataques, testes ou salvaguardas, escolhendo qual resultado usar." }
];
