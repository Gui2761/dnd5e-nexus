// Compêndio Canônico D&D 5ª Edição Oficial (Baseado no Livro do Jogador - Biblioteca Élfica - 315 págs)
// Contém Armas, Armaduras, Magias, Habilidades de Classe, Antecedentes, Regras de Jogo, Talentos e Condições

export const WEAPONS = [
  // Armas Simples Corpo a Corpo
  { name: "Adaga", type: "Simples Corpo a Corpo", damage: "1d4", damageType: "perfurante", properties: "Acuidade, leve, arremesso (distância 6/18)", cost: "2 po", weight: "0,5 kg", desc: "Uma lâmina afiada perfeita para combate furtivo ou arremesso rápido." },
  { name: "Azagaia", type: "Simples Corpo a Corpo", damage: "1d6", damageType: "perfurante", properties: "Arremesso (distância 9/36)", cost: "5 pp", weight: "1 kg", desc: "Lança curta e balanceada para arremessos precisos a média distância." },
  { name: "Bordão", type: "Simples Corpo a Corpo", damage: "1d6", damageType: "concussão", properties: "Versátil (1d8)", cost: "2 pp", weight: "2 kg", desc: "Cajado resistente comumente empunhado por magos, druidas e monges." },
  { name: "Clava Grande", type: "Simples Corpo a Corpo", damage: "1d8", damageType: "concussão", properties: "Pesada, duas mãos", cost: "2 pp", weight: "5 kg", desc: "Pedaço maciço de madeira rústica empunhado com ambas as mãos." },
  { name: "Foice Curta", type: "Simples Corpo a Corpo", damage: "1d4", damageType: "cortante", properties: "Leve", cost: "1 po", weight: "1 kg", desc: "Lâmina curva simples, tradicional entre camponeses e druidas." },
  { name: "Lança", type: "Simples Corpo a Corpo", damage: "1d6", damageType: "perfurante", properties: "Arremesso (distância 6/18), versátil (1d8)", cost: "1 po", weight: "1,5 kg", desc: "Uma haste de madeira com ponta de metal afiada. Pode ser usada com uma ou duas mãos." },
  { name: "Maça", type: "Simples Corpo a Corpo", damage: "1d6", damageType: "concussão", properties: "—", cost: "5 po", weight: "2 kg", desc: "Arma contundente com cabeça pesada com flange ou cravos." },
  { name: "Machadinha", type: "Simples Corpo a Corpo", damage: "1d6", damageType: "cortante", properties: "Leve, arremesso (distância 6/18)", cost: "5 po", weight: "1 kg", desc: "Machado compacto perfeito para combates rápidos ou arremesso." },
  { name: "Martelo Leve", type: "Simples Corpo a Corpo", damage: "1d4", damageType: "concussão", properties: "Leve, arremesso (distância 6/18)", cost: "2 po", weight: "1 kg", desc: "Martelo balanceado para combate corporal ou arremesso." },
  { name: "Porrete", type: "Simples Corpo a Corpo", damage: "1d4", damageType: "concussão", properties: "Leve", cost: "1 pp", weight: "1 kg", desc: "Clava pequena e simples para atordoamento rápido." },

  // Armas Simples à Distância
  { name: "Arco Curto", type: "Simples à Distância", damage: "1d6", damageType: "perfurante", properties: "Munição (distância 24/96), duas mãos", cost: "25 po", weight: "1 kg", desc: "Arco ágil para caçadores e arqueiros rápidos." },
  { name: "Besta Leve", type: "Simples à Distância", damage: "1d8", damageType: "perfurante", properties: "Munição (distância 24/96), recarga, duas mãos", cost: "25 po", weight: "2,5 kg", desc: "Dispara virotes com mecanismo de gatilho mecânico." },
  { name: "Dardo", type: "Simples à Distância", damage: "1d4", damageType: "perfurante", properties: "Acuidade, arremesso (distância 6/18)", cost: "5 pc", weight: "0,1 kg", desc: "Projétil leve arremessável à mão." },
  { name: "Funda", type: "Simples à Distância", damage: "1d4", damageType: "concussão", properties: "Munição (distância 9/36)", cost: "1 pp", weight: "—", desc: "Tira de couro para arremessar pedras ou esferas metálicas com força." },

  // Armas Marciais Corpo a Corpo
  { name: "Alabarda", type: "Marcial Corpo a Corpo", damage: "1d10", damageType: "cortante", properties: "Pesada, alcance, duas mãos", cost: "20 po", weight: "3 kg", desc: "Lâmina de machado em haste longa permitindo atacar a 3 metros de distância." },
  { name: "Cimitarra", type: "Marcial Corpo a Corpo", damage: "1d6", damageType: "cortante", properties: "Acuidade, leve", cost: "25 po", weight: "1,5 kg", desc: "Lâmina curva refinada excelente para golpes cortantes velozes." },
  { name: "Chicote", type: "Marcial Corpo a Corpo", damage: "1d4", damageType: "cortante", properties: "Acuidade, alcance", cost: "2 po", weight: "1,5 kg", desc: "Tira trançada de couro para controle tático a distância." },
  { name: "Espada Curta", type: "Marcial Corpo a Corpo", damage: "1d6", damageType: "perfurante", properties: "Acuidade, leve", cost: "10 po", weight: "1 kg", desc: "Arma favorita de ladinos e duelistas ágeis." },
  { name: "Espada Grande (Montante)", type: "Marcial Corpo a Corpo", damage: "2d6", damageType: "cortante", properties: "Pesada, duas mãos", cost: "50 po", weight: "3 kg", desc: "Lâmina massiva devastadora que exige força física e duas mãos." },
  { name: "Espada Longa", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "cortante", properties: "Versátil (1d10)", cost: "15 po", weight: "1,5 kg", desc: "A icônica lâmina de guerreiros e paladinos. Usável com 1 mão (1d8) ou 2 mãos (1d10)." },
  { name: "Glaive", type: "Marcial Corpo a Corpo", damage: "1d10", damageType: "cortante", properties: "Pesada, alcance, duas mãos", cost: "20 po", weight: "3 kg", desc: "Haste com lâmina curva cortante de alcance ampliado." },
  { name: "Lança de Montaria", type: "Marcial Corpo a Corpo", damage: "1d12", damageType: "perfurante", properties: "Alcance, especial", cost: "10 po", weight: "3 kg", desc: "Arma pesada de cavalaria para investidas devastadoras montadas." },
  { name: "Lança Longa (Pique)", type: "Marcial Corpo a Corpo", damage: "1d10", damageType: "perfurante", properties: "Pesada, alcance, duas mãos", cost: "5 po", weight: "4 kg", desc: "Haste militar extremamente comprida para deter cargas inimigas." },
  { name: "Maça Estrela", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "perfurante", properties: "—", cost: "15 po", weight: "2 kg", desc: "Esfera metálica com cravos afiados em cabo de madeira reforçado." },
  { name: "Machado de Batalha", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "cortante", properties: "Versátil (1d10)", cost: "10 po", weight: "2 kg", desc: "Machado robusto usado com frequência por anões e guerreiros." },
  { name: "Machado Grande", type: "Marcial Corpo a Corpo", damage: "1d12", damageType: "cortante", properties: "Pesada, duas mãos", cost: "30 po", weight: "3,5 kg", desc: "A arma de fúria máxima dos bárbaros e guerreiros brutais." },
  { name: "Malho (Maul)", type: "Marcial Corpo a Corpo", damage: "2d6", damageType: "concussão", properties: "Pesada, duas mãos", cost: "10 po", weight: "5 kg", desc: "Marreta maciça de aço capaz de quebrar ossos através da armadura." },
  { name: "Mangual", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "concussão", properties: "—", cost: "10 po", weight: "1 kg", desc: "Esfera de ferro presa por corrente que contorna escudos." },
  { name: "Martelo de Guerra", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "concussão", properties: "Versátil (1d10)", cost: "15 po", weight: "1 kg", desc: "Esmaga armaduras pesadas com facilidade." },
  { name: "Picareta de Guerra", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "perfurante", properties: "—", cost: "5 po", weight: "1 kg", desc: "Ponta de perfuração reforçada para transpassar armaduras." },
  { name: "Rapieira", type: "Marcial Corpo a Corpo", damage: "1d8", damageType: "perfurante", properties: "Acuidade", cost: "25 po", weight: "1 kg", desc: "Estoque elegante de precisão suprema para duelistas." },
  { name: "Tridente", type: "Marcial Corpo a Corpo", damage: "1d6", damageType: "perfurante", properties: "Arremesso (distância 6/18), versátil (1d8)", cost: "5 po", weight: "2 kg", desc: "Arma com três dentes farpados clássica de gladiadores e marinheiros." },

  // Armas Marciais à Distância
  { name: "Arco Longo", type: "Marcial à Distância", damage: "1d8", damageType: "perfurante", properties: "Munição (distância 45/180), pesada, duas mãos", cost: "50 po", weight: "1 kg", desc: "Arma de tiro de elite com alcance superior." },
  { name: "Besta de Mão", type: "Marcial à Distância", damage: "1d6", damageType: "perfurante", properties: "Munição (distância 9/36), leve, recarga", cost: "75 po", weight: "1,5 kg", desc: "Besta compacta usável com uma mão só, favorita de assassinos." },
  { name: "Besta Pesada", type: "Marcial à Distância", damage: "1d10", damageType: "perfurante", properties: "Munição (distância 30/120), pesada, recarga, duas mãos", cost: "50 po", weight: "4,5 kg", desc: "Mecanismo massivo capaz de perfurar as mais duras armaduras." },
  { name: "Zarabatana", type: "Marcial à Distância", damage: "1", damageType: "perfurante", properties: "Munição (distância 7,5/30), recarga", cost: "10 po", weight: "0,5 kg", desc: "Tubo fino para disparar dardos sutis, comumente banhados em veneno." },
  { name: "Rede", type: "Marcial à Distância", damage: "—", damageType: "especial", properties: "Especial, arremesso (distância 1,5/4,5)", cost: "1 po", weight: "1,5 kg", desc: "Prende uma criatura Grande ou menor na condição Impedido até que ela escape (CD 10 FOR)." }
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
  { name: "Cota de Malha", category: "Pesada", acFormula: "16", baseAC: 16, strReq: 13, stealthDisadv: true, cost: "75 po", weight: "25 kg", desc: "Entrelaçado completo de elos de metal. Padrão inicial de paladinos e guerreiros." },
  { name: "Cota de Talas", category: "Pesada", acFormula: "17", baseAC: 17, strReq: 15, stealthDisadv: true, cost: "200 po", weight: "30 kg", desc: "Tiras verticais de aço rebitadas a forro acolchoado." },
  { name: "Armadura de Placas (Full Plate)", category: "Pesada", acFormula: "18", baseAC: 18, strReq: 15, stealthDisadv: true, cost: "1.500 po", weight: "32 kg", desc: "A cúspide da defesa mundana: placas esculpidas que cobrem todo o corpo com forro e cotas articuladas." },

  // Escudos
  { name: "Escudo", category: "Escudo", acFormula: "+2 CA", baseAC: 2, strReq: 0, stealthDisadv: false, cost: "10 po", weight: "3 kg", desc: "Escudo de madeira ou metal empunhado em uma das mãos, concedendo +2 na CA." }
];

export const BACKGROUNDS_DB = [
  {
    name: "Acólito",
    desc: "Você viveu a serviço de um templo de um deus específico ou panteão de deuses celestiais. Você realiza ritos sagrados e conduz adorações.",
    skills: "Intuição, Religião",
    tools: "Nenhuma",
    languages: "Dois idiomas à sua escolha",
    equipment: "Um símbolo sagrado (amuleto ou relicário), um livro de preces ou roda de orações, 5 varetas de incenso, vestes comuns e uma algibeira com 15 po.",
    feature: "Abrigo dos Fiéis: Como um acólito, você detém o respeito daqueles que compartilham de sua fé. Você e seus companheiros de aventura podem esperar receber cura e cuidados gratuitos em um templo, santuário ou outro local consagrado de sua fé."
  },
  {
    name: "Artesão de Guilda",
    desc: "Você é membro de uma guilda de artesãos, perito em um campo específico de trabalho manual e associado a outros artífices.",
    skills: "Intuição, Persuasão",
    tools: "Um tipo de ferramenta de artesão",
    languages: "Um idioma à sua escolha",
    equipment: "Um conjunto de ferramentas de artesão, uma carta de apresentação da sua guilda, roupas de viagem e uma algibeira com 15 po.",
    feature: "Membro de Guilda: Como um membro estabelecido e respeitado de uma guilda, você usufrui dos benefícios que essa estrutura proporciona, incluindo hospedagem, proteção jurídica e apoio de seus companheiros artesãos."
  },
  {
    name: "Artista",
    desc: "Você prospera diante de uma plateia. Sabe como encantar, entreter e inspirar corações através da música, dança, teatro ou poesia.",
    skills: "Acrobacia, Atuação",
    tools: "Kit de disfarce, um tipo de instrumento musical",
    languages: "Nenhum",
    equipment: "Um instrumento musical à sua escolha, o favor de um admirador, uma fantasia e uma algibeira contendo 15 po.",
    feature: "Pela Demanda Popular: Você sempre pode encontrar um lugar para se apresentar em tavernas ou estalagens. Em troca, você recebe alojamento e comida gratuitos de padrão modesto ou confortável."
  },
  {
    name: "Charlatão",
    desc: "Você sempre teve jeito com pessoas. Sabe o que elas querem, o que temem, e como entregar ilusões perfeitas para obter lucro.",
    skills: "Enganação, Prestidigitação",
    tools: "Kit de disfarce, kit de falsificação",
    languages: "Nenhum",
    equipment: "Um conjunto de roupas finas, um kit de disfarce, apetrechos para trapaças (dados viciados, cartas marcadas) e uma algibeira com 15 po.",
    feature: "Identidade Falsa: Você criou uma segunda identidade estabelecida com documentos, conhecidos e disfarces completos para transitar sem ser descoberto."
  },
  {
    name: "Criminoso",
    desc: "Você é um criminoso experiente com histórico de quebrar a lei. Sobreviveu nas sombras das vielas urbanas através da astúcia.",
    skills: "Enganação, Furtividade",
    tools: "Um tipo de kit de jogo, ferramentas de ladrão",
    languages: "Nenhum",
    equipment: "Um pé de cabra, um conjunto de roupas escuras comuns com capuz e uma algibeira com 15 po.",
    feature: "Contato Criminal: Você tem um contato confiável e de confiança que age como seu elo com uma rede de criminosos locais para troca de mensagens e contrabando."
  },
  {
    name: "Eremita",
    desc: "Você viveu em reclusão total durante um período formativo da sua vida, em retiro espiritual, contemplação da natureza ou isolamento.",
    skills: "Medicina, Religião",
    tools: "Kit de herbalismo",
    languages: "Um idioma à sua escolha",
    equipment: "Um estojo de pergaminho cheio de anotações e reflexões, um cobertor de inverno, um conjunto de roupas comuns, um kit de herbalismo e 5 po.",
    feature: "Descoberta: A calma reclusão de seu longo eremitério lhe revelou uma verdade cósmica ou um grande segredo sobre o mundo, os deuses ou a história primordial."
  },
  {
    name: "Forasteiro",
    desc: "Você cresceu nos ermos, longe da civilização e do conforto dos vilarejos. Onde outros veem perigo, você vê comida e abrigo.",
    skills: "Atletismo, Sobrevivência",
    tools: "Um instrumento musical",
    languages: "Um idioma à sua escolha",
    equipment: "Um bordão, uma armadilha de caça, um troféu de um animal abatido, um conjunto de roupas de viagem e uma algibeira com 10 po.",
    feature: "Andarilho: Você tem excelente memória para mapas e geografia dos terrenos. Além disso, pode encontrar água fresca e alimento para você e até outras cinco pessoas a cada dia."
  },
  {
    name: "Herói do Povo",
    desc: "Você veio de origens humildes entre os camponeses comuns, mas se ergueu para defendê-los contra uma ameaça monstruosa ou um tirano.",
    skills: "Adestrar Animais, Sobrevivência",
    tools: "Um tipo de ferramentas de artesão, veículos (terrestres)",
    languages: "Nenhum",
    equipment: "Um conjunto de ferramentas de artesão, uma pá, um pote de ferro, roupas comuns e uma algibeira com 10 po.",
    feature: "Hospitalidade Rústica: Como você veio do povo, os plebeus e camponeses o acolhem de bom grado, oferecendo abrigo, comida e proteção contra nobres corruptos."
  },
  {
    name: "Marinheiro",
    desc: "Você serviu a bordo de uma embarcação por anos, enfrentando tempestades, monstros marinhos e os mistérios dos oceanos sem fim.",
    skills: "Atletismo, Percepção",
    tools: "Ferramentas de navegador, veículos (aquáticos)",
    languages: "Nenhum",
    equipment: "Uma malagueta (clava), 15 metros de corda de seda, um amuleto de sorte, roupas comuns e uma algibeira com 10 po.",
    feature: "Passagem de Navio: Quando precisar viajar pelos mares, você pode conseguir passagem gratuita para você e seus companheiros de aventura em navios mercantes ou amigos."
  },
  {
    name: "Nobre",
    desc: "Você nasceu em berço de ouro, rodeado de privilégios, etiqueta e riqueza aristocrática, com laços familiares influentes nos palácios.",
    skills: "História, Persuasão",
    tools: "Um tipo de kit de jogos",
    languages: "Um idioma à sua escolha",
    equipment: "Um conjunto de roupas finas, um anel de sinete, um pergaminho com sua linhagem nobre e uma algibeira com 25 po.",
    feature: "Posição Privilegiada: Graças à sua linhagem nobre, as pessoas comuns tendem a tratá-lo com deferência e você tem acesso imediato à nobreza e governantes locais."
  },
  {
    name: "Órfão",
    desc: "Você cresceu nas ruas sujas e perigosas de uma grande cidade, sozinho, sem pais nem teto, aprendendo a sobreviver de migalhas e astúcia.",
    skills: "Furtividade, Prestidigitação",
    tools: "Kit de disfarce, ferramentas de ladrão",
    languages: "Nenhum",
    equipment: "Uma faca pequena, um mapa da sua cidade natal, um pequeno rato de estimação, uma lembrança dos seus pais e uma bolsinha com 10 po.",
    feature: "Segredos da Cidade: Você conhece os caminhos ocultos, becos escuros e passagens subterrâneas das cidades, permitindo mover-se entre dois pontos urbanos com o dobro da velocidade normal."
  },
  {
    name: "Sábio",
    desc: "Você passou anos de sua vida trancado em grandes bibliotecas, mosteiros e academias, estudando manuscritos antigos e teorias arcanas.",
    skills: "Arcanismo, História",
    tools: "Nenhuma",
    languages: "Dois idiomas à sua escolha",
    equipment: "Um vidro de tinta preta, uma pena, uma faquinha para aparar penas, uma carta com uma pergunta filosófica sem resposta, roupas comuns e 10 po.",
    feature: "Pesquisador: Ao tentar obter ou lembrar um fragmento de informação que não conheça, você geralmente sabe onde e com quem pode encontrá-lo (biblioteca, erudito ou tomo)."
  },
  {
    name: "Soldado",
    desc: "A guerra e a vida militar moldaram você desde a juventude. Você marchou com um exército oficial ou com uma companhia mercenária de aço.",
    skills: "Atletismo, Intimidação",
    tools: "Um tipo de kit de jogos, veículos (terrestres)",
    languages: "Nenhum",
    equipment: "Uma insígnia de patente militar, um troféu de um inimigo abatido, um conjunto de dados ou baralho, roupas comuns e uma algibeira com 10 po.",
    feature: "Patente Militar: Você tem uma patente de seus dias como soldado. Soldados leais ao seu antigo exército ainda reconhecem sua autoridade militar e civis o respeitam como protetor."
  }
];

export const CORE_RULES_DB = [
  {
    name: "Descanso Curto (Short Rest)",
    category: "Aventurando-se (Capítulo 8, Pág 188)",
    desc: "Um descanso curto é um período de inatividade de pelo menos 1 hora, durante o qual o personagem não faz nada mais extenuante do que comer, beber, ler e cuidar de seus ferimentos.\n\nUm personagem pode gastar um ou mais Dados de Vida no final de um descanso curto, até o número máximo de Dados de Vida do personagem (que é igual ao nível do personagem). Para cada Dado de Vida gasto dessa forma, o jogador rola o dado e adiciona o modificador de Constituição do personagem a ele. O personagem recupera pontos de vida iguais ao total. O jogador pode decidir gastar um Dado de Vida adicional após cada rolagem."
  },
  {
    name: "Descanso Longo (Long Rest)",
    category: "Aventurando-se (Capítulo 8, Pág 188)",
    desc: "Um descanso longo é um período de repouso prolongado, de pelo menos 8 horas, durante o qual o personagem dorme por pelo menos 6 horas e realiza apenas atividades leves (ler, conversar, comer ou ficar de vigia por no máximo 2 horas).\n\nNo final de um descanso longo, o personagem recupera TODOS os pontos de vida perdidos. O personagem também recupera Dados de Vida gastos, até um número igual à metade do total de Dados de Vida do personagem (mínimo de um dado).\n\nUm personagem não pode se beneficiar de mais de um descanso longo em um período de 24 horas, e deve ter pelo menos 1 ponto de vida no início do descanso para obter seus benefícios."
  },
  {
    name: "Ações em Combate",
    category: "Combate (Capítulo 9, Págs 194-195)",
    desc: "No seu turno, você pode se mover e realizar UMA ação entre as opções canônicas:\n\n• Atacar: Realiza um ataque corpo a corpo ou à distância com arma (ou múltiplos se possuir Ataque Extra).\n• Conjurar uma Magia: Lança uma magia com tempo de conjuração de 1 ação.\n• Disparar (Dash): Ganha movimento adicional igual ao seu deslocamento para o turno atual.\n• Desengajar (Disengage): Seu movimento não provoca ataques de oportunidade até o fim do turno.\n• Esquivar (Dodge): Até o início do seu próximo turno, qualquer jogada de ataque contra você tem desvantagem e você tem vantagem em salvaguardas de Destreza.\n• Ajudar (Help): Concede vantagem ao próximo teste de um aliado ou ao próximo ataque contra um alvo a até 1,5m.\n• Esconder-se (Hide): Realiza teste de Furtividade para tentar sumir da percepção dos inimigos.\n• Preparar (Ready): Define um gatilho perceptível e uma ação para agir fora do seu turno gastando sua Reação.\n• Procurar (Search): Dedica o turno a encontrar algo com teste de Percepção ou Investigação.\n• Usar um Objeto: Interage com um mecanismo complexo ou bebe uma poção."
  },
  {
    name: "Regras de Cobertura (Cover)",
    category: "Combate (Capítulo 9, Pág 198)",
    desc: "Obstáculos no campo de batalha fornecem proteção contra ataques e magias:\n\n• Meia Cobertura (+2 na CA e +2 salvaguardas de Destreza): Ocorre quando pelo menos metade do corpo do alvo está bloqueado (muretas baixas, árvores finas, outra criatura).\n• Três Quartos de Cobertura (+5 na CA e +5 salvaguardas de Destreza): Ocorre quando cerca de 75% do corpo está protegido (grades levadiças, fendas de flecheiro, troncos largos).\n• Cobertura Total: O alvo está 100% encoberto. Ele não pode ser mirado diretamente por ataques ou magias que requeiram linha de visão desimpedida."
  },
  {
    name: "Salvaguardas Contra a Morte",
    category: "Combate (Capítulo 9, Pág 199)",
    desc: "Sempre que você começar seu turno com 0 pontos de vida, você deve rolar 1d20 puro sem somar modificadores:\n\n• 10 ou mais: Sucesso. Três sucessos estabilizam o personagem.\n• 9 ou menos: Falha. Três falhas resultam na morte permanente.\n• 1 Natural: Conta como DUAS falhas imediatas!\n• 20 Natural: Você recupera 1 PV instantaneamente e acorda consciente!\n• Sofrer Dano a 0 PV: Sofre 1 falha automática. Se for um acerto crítico, sofre 2 falhas!"
  },
  {
    name: "Concentração em Magias",
    category: "Conjuração (Capítulo 10, Pág 205)",
    desc: "Algumas magias exigem concentração para permanecer ativas:\n\n• Limite de Uma Magia: Você só pode manter concentração em uma única magia por vez.\n• Sofrendo Dano: Sempre que sofrer dano enquanto concentrado, faça uma salvaguarda de Constituição (CD 10 ou metade do dano sofrido, o que for maior). Se falhar, a magia acaba.\n• Incapacitado: Cair a 0 PV ou ficar Incapacitado encerra a concentração imediatamente."
  },
  {
    name: "Vantagem e Desvantagem",
    category: "Utilizando Habilidades (Capítulo 7, Pág 175)",
    desc: "Circunstâncias especiais podem conceder vantagem ou impor desvantagem numa jogada de d20:\n\n• Vantagem: Rola dois d20s e utiliza o MAIOR resultado.\n• Desvantagem: Rola dois d20s e utiliza o MENOR resultado.\n• Anulação Mútua: Se uma jogada tiver qualquer fonte de vantagem e qualquer fonte de desvantagem, elas se cancelam mutuamente, rolando apenas um d20 normal."
  }
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
  { name: "Fogo das Fadas (Faerie Fire)", level: 1, school: "Evocação", castingTime: "1 ação", range: "18 metros", components: "V, S", duration: "Concentração, até 1 minuto", desc: "Luz colorida contorna todos os objetos e criaturas num cubo de 6m. Ataques contra alvos afetados têm vantagem, e eles não se beneficiam de invisibilidade." },

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
