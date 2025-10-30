// Versículos bíblicos inspiradores com profundidade espiritual
const versiculos = [
  {
    texto: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu.",
    referencia: "Eclesiastes 3:1"
  },
  {
    texto: "O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.",
    referencia: "Salmos 23:1-2"
  },
  {
    texto: "Posso todas as coisas naquele que me fortalece.",
    referencia: "Filipenses 4:13"
  },
  {
    texto: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará. E ele fará sobressair a tua justiça como a luz, e o teu juízo como o meio-dia.",
    referencia: "Salmos 37:5-6"
  },
  {
    texto: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
    referencia: "Jeremias 29:11"
  },
  {
    texto: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.",
    referencia: "Isaías 41:10"
  },
  {
    texto: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei. Tomai sobre vós o meu jugo, e aprendei de mim, que sou manso e humilde de coração; e encontrareis descanso para as vossas almas.",
    referencia: "Mateus 11:28-29"
  },
  {
    texto: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
    referencia: "Romanos 8:28"
  },
  {
    texto: "Lança sobre o Senhor a tua ansiedade, e ele te susterá; nunca permitirá que o justo seja abalado.",
    referencia: "Salmos 55:22"
  },
  {
    texto: "Porque onde estiver o vosso tesouro, aí estará também o vosso coração.",
    referencia: "Mateus 6:21"
  },
  {
    texto: "Buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.",
    referencia: "Mateus 6:33"
  },
  {
    texto: "Aquietai-vos e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.",
    referencia: "Salmos 46:10"
  },
  {
    texto: "O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece.",
    referencia: "1 Coríntios 13:4"
  },
  {
    texto: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.",
    referencia: "Efésios 2:8"
  },
  {
    texto: "Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos.",
    referencia: "Filipenses 4:4"
  },
  {
    texto: "A palavra de Deus é viva e eficaz, e mais penetrante do que espada alguma de dois gumes.",
    referencia: "Hebreus 4:12"
  },
  {
    texto: "Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.",
    referencia: "Isaías 40:31"
  },
  {
    texto: "Grande é a sua fidelidade; as suas misericórdias se renovam cada manhã.",
    referencia: "Lamentações 3:23"
  },
  {
    texto: "Porque eu sou o Senhor, teu Deus, que te toma pela tua mão direita e te diz: Não temas, que eu te ajudo.",
    referencia: "Isaías 41:13"
  },
  {
    texto: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
    referencia: "1 Tessalonicenses 5:18"
  },
  {
    texto: "Confiai no Senhor perpetuamente; porque em Deus, o Senhor, há uma rocha eterna.",
    referencia: "Isaías 26:4"
  },
  {
    texto: "Porque o Senhor, teu Deus, está contigo, por onde quer que andares.",
    referencia: "Josué 1:9"
  },
  {
    texto: "O Senhor é bom, uma fortaleza no dia da angústia; e conhece os que confiam nele.",
    referencia: "Naum 1:7"
  },
  {
    texto: "Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes.",
    referencia: "Jeremias 33:3"
  },
  {
    texto: "Porque os meus pensamentos não são os vossos pensamentos, nem os vossos caminhos os meus caminhos, diz o Senhor.",
    referencia: "Isaías 55:8"
  },
  {
    texto: "Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios.",
    referencia: "Salmos 103:2"
  },
  {
    texto: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.",
    referencia: "Salmos 23:4"
  },
  {
    texto: "Porque nele vivemos, e nos movemos, e existimos; como também alguns dos vossos poetas disseram: Pois somos também sua geração.",
    referencia: "Atos 17:28"
  },
  {
    texto: "Ora, àquele que é poderoso para fazer tudo muito mais abundantemente além daquilo que pedimos ou pensamos.",
    referencia: "Efésios 3:20"
  },
  {
    texto: "Mas buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.",
    referencia: "Mateus 6:33"
  },
  {
    texto: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.",
    referencia: "Filipenses 4:7"
  }
]

// Reflexões diárias profundas e transformadoras
const reflexoes = [
  {
    titulo: "O Tempo Sagrado de Deus",
    texto: "Na pressa do mundo moderno, esquecemos que Deus opera em um tempo diferente do nosso. Cada estação da vida tem seu propósito divino. As dificuldades de hoje são o preparo para as vitórias de amanhã. Quando aprendemos a confiar no cronômetro celestial, descobrimos que não há atrasos em Seus planos, apenas preparação. Sua alma está sendo moldada para algo maior do que você pode imaginar."
  },
  {
    titulo: "A Intimidade da Oração Verdadeira",
    texto: "A oração não é apenas um pedido, mas um encontro íntimo com o Criador. É no silêncio do coração que ouvimos Sua voz suave. Cada palavra sussurrada em oração ecoa na eternidade. Quando oramos, não apenas falamos com Deus - permitimos que Ele transforme nossa perspectiva, cure nossas feridas e renove nossa esperança. A verdadeira oração muda primeiro quem ora, depois as circunstâncias."
  },
  {
    titulo: "Gratidão: A Chave da Abundância Espiritual",
    texto: "Um coração grato é um ímã para as bênçãos divinas. Quando reconhecemos a mão de Deus nas pequenas coisas, Ele nos confia as grandes. A gratidão transforma o comum em sagrado, o simples em extraordinário. Cada manhã é um presente não merecido, cada respiração é uma nova oportunidade de glorificar Aquele que nos deu a vida. Pratique a gratidão e veja como sua perspectiva se transforma."
  },
  {
    titulo: "Fé Inabalável nas Tempestades da Vida",
    texto: "As tempestades não vêm para nos destruir, mas para revelar a solidez de nossos alicerces espirituais. É na adversidade que descobrimos a verdadeira medida de nossa fé. Deus não promete ausência de problemas, mas Sua presença constante em meio a eles. Cada desafio superado com fé se torna um testemunho vivo do poder divino operando em nossa vida. Suas cicatrizes contam histórias de vitórias conquistadas com Deus."
  },
  {
    titulo: "O Poder Transformador do Perdão",
    texto: "Perdoar não é esquecer, mas escolher a liberdade sobre o ressentimento. Quando perdoamos, não libertamos apenas quem nos feriu, mas principalmente a nós mesmos das correntes da amargura. O perdão é um ato de fé que declara: 'Deus é maior que esta dor'. É um presente que damos primeiro a nós mesmos, permitindo que a graça divina flua livremente em nosso coração."
  },
  {
    titulo: "Propósito Divino em Cada Respiração",
    texto: "Você não é um acidente cósmico, mas uma criação intencional de Deus. Cada talento, cada experiência, cada relacionamento foi cuidadosamente orquestrado para cumprir um propósito eterno. Sua vida tem significado que transcende suas circunstâncias atuais. Quando alinhamos nossa vontade com a vontade divina, descobrimos que fomos criados para algo muito maior do que podemos imaginar."
  },
  {
    titulo: "A Força da Esperança Cristã",
    texto: "A esperança cristã não é um otimismo vazio, mas uma certeza ancorada nas promessas eternas de Deus. Mesmo quando as circunstâncias gritam desespero, a esperança sussurra: 'Deus não terminou ainda'. Ela nos sustenta nos vales mais profundos e nos impulsiona para os montes mais altos. A esperança é a luz que brilha nas trevas, lembrando-nos que o melhor ainda está por vir."
  },
  {
    titulo: "Servir com Amor Genuíno",
    texto: "O verdadeiro serviço cristão nasce do amor, não da obrigação. Quando servimos com coração genuíno, transformamos atos simples em adoração viva. Cada gesto de bondade é uma oração em ação, cada ato de compaixão é um reflexo do amor divino. Servir aos outros é servir ao próprio Cristo, e nessa entrega encontramos nossa maior realização."
  },
  {
    titulo: "A Sabedoria do Silêncio Sagrado",
    texto: "No silêncio, encontramos Deus de forma mais profunda. É na quietude que Sua voz se torna mais clara, Sua presença mais tangível. O mundo barulhento nos distrai da essência divina, mas no silêncio sagrado, nossa alma se aquieta e nosso espírito se renova. Aprenda a valorizar os momentos de silêncio como encontros sagrados com o Criador."
  },
  {
    titulo: "Crescimento Através das Provações",
    texto: "As provações são as ferramentas que Deus usa para nos moldar à imagem de Cristo. Cada dificuldade é uma oportunidade de crescimento, cada desafio é um convite para confiar mais profundamente. Não desperdice suas dores - permita que elas se tornem pontes para uma fé mais madura e um caráter mais semelhante ao de Jesus."
  },
  {
    titulo: "A Beleza da Comunhão Cristã",
    texto: "Fomos criados para a comunhão, não para o isolamento. Na comunidade cristã, encontramos apoio, encorajamento e crescimento mútuo. Cada irmão é um presente de Deus, cada relacionamento é uma oportunidade de refletir o amor divino. Invista em relacionamentos genuínos e veja como sua fé se fortalece através da comunhão."
  },
  {
    titulo: "Confiança Inabalável na Providência Divina",
    texto: "Deus é o grande provedor que conhece nossas necessidades antes mesmo que as expressemos. Sua providência não falha, Seus cuidados não cessam. Quando aprendemos a confiar plenamente em Sua provisão, descobrimos uma paz que transcende as circunstâncias. Ele que alimenta os pássaros e veste os lírios certamente cuidará de você."
  },
  {
    titulo: "A Transformação Pelo Amor de Cristo",
    texto: "O amor de Cristo não apenas nos aceita como somos, mas nos transforma no que devemos ser. É um amor que cura feridas, restaura sonhos e renova esperanças. Quando experimentamos verdadeiramente esse amor, somos compelidos a compartilhá-lo com outros. Deixe o amor de Cristo ser a força transformadora em sua vida."
  },
  {
    titulo: "Vivendo com Propósito Eterno",
    texto: "Cada dia é uma oportunidade de viver com propósito eterno. Nossas ações, palavras e pensamentos ecoam na eternidade. Quando alinhamos nossa vida com os propósitos de Deus, descobrimos significado em cada momento, direção em cada decisão. Viva hoje pensando na eternidade, e veja como sua perspectiva se transforma."
  },
  {
    titulo: "A Paz que Excede Todo Entendimento",
    texto: "A paz de Deus não depende das circunstâncias externas, mas da certeza de Sua presença constante. É uma paz que permanece firme mesmo nas tempestades, que traz calma mesmo no caos. Essa paz não é ausência de problemas, mas a presença de Deus em meio aos problemas. Busque essa paz e permita que ela guarde seu coração."
  },
  {
    titulo: "Renovação Diária da Mente",
    texto: "Cada manhã é uma oportunidade de renovar nossa mente com as verdades de Deus. Os pensamentos que alimentamos determinam a direção de nossa vida. Quando enchemos nossa mente com a Palavra de Deus, transformamos nossa perspectiva e renovamos nossa esperança. Faça da renovação mental um hábito diário."
  },
  {
    titulo: "A Alegria do Senhor é Nossa Força",
    texto: "A alegria cristã não é superficial, mas profunda e duradoura. É uma alegria que brota da certeza de nossa salvação e do amor incondicional de Deus. Mesmo nas dificuldades, essa alegria permanece como fonte de força e esperança. Cultive a alegria do Senhor e veja como ela se torna sua fortaleza."
  },
  {
    titulo: "Caminhando pela Fé, Não pela Vista",
    texto: "A fé nos convida a confiar em Deus mesmo quando não conseguimos ver o caminho completo. É dar o próximo passo mesmo na incerteza, sabendo que Deus ilumina nossa jornada passo a passo. A fé não elimina as dúvidas, mas nos dá coragem para seguir em frente apesar delas. Caminhe pela fé e descubra a fidelidade de Deus."
  },
  {
    titulo: "O Poder da Palavra de Deus",
    texto: "A Palavra de Deus é viva e eficaz, capaz de transformar corações e renovar mentes. Cada versículo é uma promessa, cada capítulo é uma revelação do caráter divino. Quando meditamos na Palavra, ela se torna luz para nossos passos e lâmpada para nossos pés. Faça da leitura bíblica um encontro diário com Deus."
  },
  {
    titulo: "Humildade: O Caminho para a Grandeza",
    texto: "A verdadeira grandeza aos olhos de Deus é medida pela humildade, não pela posição ou poder. Jesus, sendo Deus, se humilhou para nos servir. Quando cultivamos a humildade, abrimos espaço para que Deus opere poderosamente em nossa vida. A humildade não é pensar menos de si mesmo, mas pensar menos em si mesmo."
  },
  {
    titulo: "Perseverança na Jornada da Fé",
    texto: "A vida cristã é uma maratona, não uma corrida de velocidade. Requer perseverança, disciplina e determinação. Haverá momentos de cansaço, mas Deus nos dá forças para continuar. Cada passo dado em fé nos aproxima mais do alvo. Não desista - a recompensa eterna vale toda a perseverança."
  },
  {
    titulo: "Generosidade: Reflexo do Coração de Deus",
    texto: "Deus é generoso por natureza, e quando O conhecemos verdadeiramente, essa generosidade se reflete em nossa vida. Ser generoso não é apenas dar dinheiro, mas compartilhar tempo, talentos e amor. A generosidade abre canais de bênção e nos aproxima do coração de Deus. Seja generoso e experimente a alegria de dar."
  },
  {
    titulo: "Descanso na Presença do Senhor",
    texto: "Em um mundo agitado, Deus nos convida ao descanso verdadeiro. Não apenas o descanso físico, mas o descanso da alma que encontra paz em Sua presença. É no descanso que somos renovados, restaurados e fortalecidos. Aprenda a descansar em Deus e descubra a paz que sua alma tanto busca."
  },
  {
    titulo: "Santidade: Separados para Deus",
    texto: "A santidade não é perfeição, mas separação para Deus. É viver de forma que honre Seu nome e reflita Seu caráter. A santidade é um processo diário de escolhas que nos aproximam mais de Cristo. Quando buscamos a santidade, experimentamos a plenitude da vida cristã e nos tornamos instrumentos úteis nas mãos de Deus."
  },
  {
    titulo: "Adoração: O Propósito da Nossa Existência",
    texto: "Fomos criados para adorar a Deus. A adoração não se limita aos momentos de louvor, mas permeia toda nossa existência. Cada ato de obediência é adoração, cada gesto de amor é adoração. Quando vivemos uma vida de adoração, encontramos nosso verdadeiro propósito e experimentamos a plenitude da alegria divina."
  },
  {
    titulo: "Esperança Além das Circunstâncias",
    texto: "Nossa esperança não está fundamentada nas circunstâncias temporais, mas nas promessas eternas de Deus. Mesmo quando tudo parece perdido, a esperança cristã permanece firme. É uma âncora para a alma, segura e firme. Cultive essa esperança e permita que ela ilumine seus dias mais sombrios."
  },
  {
    titulo: "Unidade no Corpo de Cristo",
    texto: "Somos muitos membros, mas um só corpo em Cristo. A unidade cristã não significa uniformidade, mas harmonia na diversidade. Cada pessoa tem dons únicos que contribuem para o bem comum. Quando vivemos em unidade, refletimos a natureza trina de Deus e demonstramos Seu amor ao mundo."
  },
  {
    titulo: "Sabedoria Divina para Decisões Diárias",
    texto: "Deus promete dar sabedoria àqueles que a pedem com fé. Sua sabedoria transcende o entendimento humano e nos guia nas decisões mais complexas. Quando buscamos a sabedoria divina, nossas escolhas se alinham com Sua vontade perfeita. Peça sabedoria e confie na direção que Deus lhe dará."
  },
  {
    titulo: "Compaixão: O Coração de Jesus",
    texto: "Jesus foi movido de compaixão pelas multidões, e nós somos chamados a ter o mesmo coração compassivo. A compaixão nos leva à ação, nos motiva a servir e nos conecta com o sofrimento alheio. Quando cultivamos a compaixão, nos tornamos instrumentos de cura e esperança no mundo."
  },
  {
    titulo: "Fidelidade de Deus em Todas as Estações",
    texto: "A fidelidade de Deus não muda com as estações da vida. Ele é fiel na primavera da alegria, no verão da prosperidade, no outono das mudanças e no inverno das dificuldades. Sua fidelidade é nossa segurança, Sua constância é nossa paz. Confie na fidelidade imutável de Deus."
  },
  {
    titulo: "Renovação Através da Graça",
    texto: "A graça de Deus não apenas nos salva, mas nos renova diariamente. É pela graça que somos transformados, capacitados e sustentados. A graça nos dá uma nova chance a cada manhã, um novo começo a cada momento. Viva na plenitude da graça e permita que ela transforme sua vida completamente."
  }
]

// Santos e personagens bíblicos com histórias inspiradoras e profundas
const santos = [
  {
    nome: "São Francisco de Assis",
    historia: "Nascido em uma família rica, Francisco renunciou a todas as riquezas materiais para seguir Cristo de forma radical. Fundou a Ordem Franciscana e dedicou sua vida aos pobres e marginalizados. Conhecido por sua profunda conexão com a natureza e por ter recebido os estigmas de Cristo, ele revolucionou a espiritualidade de sua época através da simplicidade e do amor incondicional.",
    licao: "A verdadeira riqueza não está no que possuímos, mas no amor que compartilhamos. A simplicidade de vida nos aproxima da essência divina e nos liberta das amarras do materialismo."
  },
  {
    nome: "Rei Davi",
    historia: "O jovem pastor que enfrentou o gigante Golias com apenas uma funda e cinco pedras, confiando inteiramente em Deus. Tornou-se o maior rei de Israel, mas também enfrentou grandes falhas pessoais. Seus Salmos revelam um coração que buscava constantemente a Deus, tanto na alegria quanto na dor, no triunfo quanto no arrependimento.",
    licao: "Não importa quão grandes sejam os gigantes em nossa vida - com Deus ao nosso lado, a vitória é certa. A verdadeira grandeza está em manter um coração humilde e arrependido diante do Senhor."
  },
  {
    nome: "Maria, Mãe de Jesus",
    historia: "Uma jovem simples de Nazaré que recebeu o chamado mais extraordinário da história: ser a mãe do Salvador. Mesmo sem compreender completamente o plano divino, ela disse 'sim' com fé absoluta. Acompanhou Jesus desde o nascimento até a cruz, guardando todas as coisas em seu coração e sendo exemplo de fé, obediência e amor maternal.",
    licao: "Dizer 'sim' a Deus, mesmo quando não compreendemos Seus planos, abre portas para milagres extraordinários. A fé verdadeira confia na bondade divina mesmo nas circunstâncias mais desafiadoras."
  },
  {
    nome: "Apóstolo Paulo",
    historia: "De perseguidor feroz dos cristãos a maior evangelista da história. Após seu encontro com Cristo no caminho de Damasco, Paulo dedicou sua vida a levar o Evangelho aos gentios. Enfrentou prisões, naufrágios, açoites e perseguições, mas nunca desistiu de sua missão. Suas cartas formam grande parte do Novo Testamento.",
    licao: "Nunca é tarde demais para uma transformação radical. Deus pode usar nosso passado, por mais sombrio que seja, para cumprir propósitos gloriosos em nosso futuro."
  },
  {
    nome: "Santa Teresa de Calcutá",
    historia: "Missionária que dedicou sua vida aos mais pobres entre os pobres nas ruas de Calcutá. Cuidou de leprosos, órfãos e moribundos com amor incondicional, vendo em cada pessoa o rosto de Cristo. Mesmo enfrentando períodos de 'noite escura da alma', nunca cessou de servir aos necessitados.",
    licao: "O amor verdadeiro se manifesta no serviço aos mais necessitados. Cada ato de compaixão é uma oração viva que transforma tanto quem serve quanto quem é servido."
  },
  {
    nome: "Profeta Elias",
    historia: "Profeta corajoso que enfrentou reis ímpios e profetas de Baal, demonstrando o poder do Deus verdadeiro. No Monte Carmelo, sua oração trouxe fogo do céu. Mesmo sendo um homem de grande fé, também experimentou momentos de desânimo e depressão, mostrando sua humanidade.",
    licao: "A fé verdadeira não nos isenta das lutas emocionais, mas nos dá recursos divinos para superá-las. Deus sussurra Sua presença tanto no vento forte quanto na brisa suave."
  },
  {
    nome: "Santa Teresinha do Menino Jesus",
    historia: "Jovem carmelita francesa que desenvolveu o 'pequeno caminho' da confiança e abandono total a Deus. Morreu aos 24 anos, mas deixou um legado espiritual profundo através de sua autobiografia. Tornou-se doutora da Igreja e padroeira das missões, mostrando que a santidade está ao alcance de todos.",
    licao: "A santidade não requer grandes feitos, mas grande amor nas pequenas coisas. A confiança infantil em Deus é o caminho mais direto para a perfeição cristã."
  },
  {
    nome: "São João Batista",
    historia: "O precursor de Jesus, que viveu no deserto preparando o caminho do Senhor. Batizou Jesus no rio Jordão e teve a coragem de confrontar até mesmo o rei Herodes por sua imoralidade. Morreu mártir por defender a verdade, mantendo-se fiel à sua missão até o fim.",
    licao: "Preparar o caminho para Cristo em nosso coração e na vida dos outros é nossa missão. A coragem de falar a verdade, mesmo custando nossa vida, é marca da verdadeira fé."
  },
  {
    nome: "Santa Mônica",
    historia: "Mãe de Santo Agostinho, que orou incansavelmente por 17 anos pela conversão de seu filho. Enfrentou um casamento difícil e a dor de ver o filho se afastar da fé, mas nunca desistiu de orar. Suas lágrimas e orações foram fundamentais para a conversão de Agostinho.",
    licao: "A oração perseverante de uma mãe pode mover montanhas. Nunca devemos desistir de orar pelos nossos entes queridos, pois Deus ouve cada súplica sincera."
  },
  {
    nome: "Profeta Daniel",
    historia: "Jovem hebreu levado cativo para a Babilônia, que manteve sua fé inabalável mesmo em terra estrangeira. Interpretou sonhos, enfrentou a cova dos leões e permaneceu fiel a Deus mesmo sob ameaça de morte. Sua vida é exemplo de integridade e coragem.",
    licao: "A fidelidade a Deus não depende das circunstâncias externas. Mesmo em ambientes hostis à fé, podemos manter nossa integridade e ser luz para outros."
  },
  {
    nome: "Santa Rita de Cássia",
    historia: "Conhecida como a santa dos casos impossíveis, enfrentou um casamento violento e a morte trágica do marido e filhos. Tornou-se religiosa agostiniana e recebeu os estigmas da coroa de espinhos. Sua vida foi marcada pelo perdão e pela intercessão pelos necessitados.",
    licao: "Não existem casos impossíveis para Deus. O perdão e a oração podem transformar as situações mais desesperadoras em testemunhos de fé e esperança."
  },
  {
    nome: "São José",
    historia: "O pai adotivo de Jesus, homem justo e obediente que aceitou o plano de Deus mesmo sem compreendê-lo completamente. Protegeu e cuidou da Sagrada Família, sendo modelo de paternidade, trabalho e fé silenciosa. Morreu nos braços de Jesus e Maria.",
    licao: "A obediência silenciosa e a fé sem questionamentos são virtudes preciosas. Ser protetor e provedor da família é uma vocação sagrada que reflete o amor de Deus."
  },
  {
    nome: "Profeta Jeremias",
    historia: "Chamado por Deus ainda jovem para ser profeta das nações, enfrentou rejeição, perseguição e solidão. Conhecido como o 'profeta das lágrimas', chorou pela infidelidade de seu povo, mas nunca abandonou sua missão. Suas profecias incluem promessas de restauração e esperança.",
    licao: "Servir a Deus pode trazer sofrimento, mas nossa fidelidade à missão é mais importante que nossa popularidade. As lágrimas de hoje podem ser sementes de restauração amanhã."
  },
  {
    nome: "Santa Clara de Assis",
    historia: "Seguidora de São Francisco, fundou a Ordem das Clarissas e viveu em pobreza radical. Defendeu corajosamente sua cidade contra invasores através da oração e da exposição do Santíssimo Sacramento. Viveu 40 anos em clausura, sendo exemplo de contemplação e oração.",
    licao: "A vida contemplativa e a oração têm poder transformador não apenas para quem ora, mas para o mundo inteiro. A pobreza voluntária liberta o coração para amar verdadeiramente."
  },
  {
    nome: "Rei Salomão",
    historia: "Filho de Davi, conhecido por sua sabedoria extraordinária concedida por Deus. Construiu o primeiro templo de Jerusalém e seu reino foi próspero e pacífico. Escreveu provérbios, cânticos e reflexões sobre a vida, mas no final se afastou de Deus por influência de suas esposas pagãs.",
    licao: "A sabedoria é o maior tesouro que podemos buscar, mas deve ser acompanhada de humildade e fidelidade a Deus. O sucesso sem Deus pode levar à ruína espiritual."
  },
  {
    nome: "Santa Bernadette",
    historia: "Jovem camponesa francesa que recebeu 18 aparições da Virgem Maria em Lourdes. Enfrentou descrédito e perseguição, mas manteve-se firme em seu testemunho. O local das aparições tornou-se centro de peregrinação e cura, e ela se tornou religiosa, vivendo em simplicidade e oração.",
    licao: "Deus escolhe os pequenos e simples para realizar grandes obras. A humildade e a pureza de coração nos tornam receptivos às graças divinas."
  },
  {
    nome: "Profeta Isaías",
    historia: "Um dos maiores profetas do Antigo Testamento, teve visões extraordinárias de Deus e profetizou sobre a vinda do Messias com detalhes impressionantes. Serviu durante o reinado de vários reis de Judá, sendo conselheiro e porta-voz de Deus. Suas profecias messiânicas são fundamentais para a fé cristã.",
    licao: "Quando temos uma visão clara de quem Deus é, nossa vida se transforma e nos tornamos instrumentos de Sua vontade. As profecias de Deus sempre se cumprem no tempo certo."
  },
  {
    nome: "São Padre Pio",
    historia: "Frade capuchinho italiano que recebeu os estigmas de Cristo e tinha dons extraordinários de cura e profecia. Celebrava a missa com profunda devoção, ouvia confissões por horas e fundou um hospital. Enfrentou perseguições e incompreensões, mas permaneceu fiel à sua vocação.",
    licao: "A união com Cristo pode nos levar a participar de Seus sofrimentos, mas também de Sua glória. A oração e os sacramentos são fontes de poder espiritual extraordinário."
  },
  {
    nome: "Rainha Ester",
    historia: "Jovem judia que se tornou rainha da Pérsia e salvou seu povo do extermínio planejado por Hamã. Arriscou sua própria vida ao se apresentar ao rei sem ser chamada, confiando na providência divina. Sua coragem e fé salvaram toda a nação judaica.",
    licao: "Às vezes somos colocados em posições estratégicas 'para um tempo como este'. A coragem de agir no momento certo pode salvar muitas vidas e cumprir os propósitos de Deus."
  },
  {
    nome: "São João da Cruz",
    historia: "Místico espanhol e doutor da Igreja, reformou a Ordem Carmelita junto com Santa Teresa de Ávila. Enfrentou prisão e perseguição por seus ideais de reforma. Escreveu obras profundas sobre a vida espiritual, incluindo 'Noite Escura da Alma', descrevendo o caminho da purificação espiritual.",
    licao: "O caminho para a união com Deus passa pela purificação e às vezes pela 'noite escura'. As dificuldades espirituais podem ser sinais de crescimento, não de abandono divino."
  },
  {
    nome: "Profeta Ezequiel",
    historia: "Profeta do exílio babilônico, teve visões extraordinárias de Deus e da restauração de Israel. Usou símbolos e ações dramáticas para transmitir as mensagens divinas. Profetizou sobre a responsabilidade individual, a restauração do templo e a vinda do Messias.",
    licao: "Mesmo no exílio e na aparente derrota, Deus continua presente e trabalhando. Cada pessoa é responsável por suas próprias escolhas diante de Deus."
  },
  {
    nome: "Santa Catarina de Sena",
    historia: "Mística italiana e doutora da Igreja, teve visões de Cristo desde jovem. Influenciou papas e reis, ajudou a trazer o papado de volta de Avignon para Roma. Cuidou de doentes durante a peste e escreveu cartas espirituais profundas. Morreu jovem, mas deixou grande legado espiritual.",
    licao: "A intimidade com Deus na oração nos capacita para grandes obras no mundo. A coragem profética pode transformar até mesmo as estruturas mais estabelecidas da Igreja e da sociedade."
  },
  {
    nome: "Apóstolo Pedro",
    historia: "Pescador simples que se tornou líder dos apóstolos. Negou Jesus três vezes durante a crucificação, mas foi restaurado pelo Senhor ressurreto. Pregou no Pentecostes, foi o primeiro papa da Igreja e morreu mártir em Roma, crucificado de cabeça para baixo por se considerar indigno de morrer como Cristo.",
    licao: "Nossas falhas não nos desqualificam do amor e dos planos de Deus. O arrependimento sincero e a restauração divina podem transformar nossos maiores fracassos em testemunhos poderosos."
  },
  {
    nome: "Santa Faustina",
    historia: "Freira polaca que recebeu visões de Jesus Cristo e promoveu a devoção à Divina Misericórdia. Escreveu um diário espiritual detalhado sobre suas experiências místicas. Morreu jovem de tuberculose, mas sua devoção se espalhou pelo mundo inteiro após sua canonização.",
    licao: "A misericórdia de Deus é infinita e está disponível para todos. Confiar na misericórdia divina e proclamá-la ao mundo é uma missão de todo cristão."
  },
  {
    nome: "Profeta Moisés",
    historia: "Libertador do povo de Israel do Egito, recebeu os Dez Mandamentos no Monte Sinai e conduziu o povo pelo deserto por 40 anos. Enfrentou a rebeldia constante do povo, mas intercedeu por eles diante de Deus. Morreu aos 120 anos vendo a Terra Prometida de longe.",
    licao: "A liderança segundo Deus requer sacrifício pessoal e intercessão constante pelo povo. Nem sempre veremos o fruto completo de nosso trabalho, mas nossa fidelidade é o que importa."
  },
  {
    nome: "São Maximiliano Kolbe",
    historia: "Frade franciscano polaco que se ofereceu para morrer no lugar de um pai de família no campo de concentração de Auschwitz. Promoveu a devoção à Imaculada Conceição e usou meios de comunicação modernos para evangelizar. Morreu por inanição e injeção letal, perdoando seus algozes.",
    licao: "O amor verdadeiro se manifesta no sacrifício pelos outros. Dar a vida por um irmão é o maior ato de amor que podemos realizar, imitando o próprio Cristo."
  },
  {
    nome: "Profeta Habacuque",
    historia: "Profeta que questionou Deus sobre a injustiça e o sofrimento dos justos. Recebeu a resposta divina de que o justo viverá pela fé, mesmo sem compreender todos os caminhos de Deus. Sua oração final é um hino de confiança absoluta na providência divina.",
    licao: "É legítimo questionar Deus sobre as injustiças da vida, mas devemos estar prontos para aceitar Sua resposta e confiar em Sua justiça perfeita, mesmo quando não compreendemos."
  },
  {
    nome: "Santa Teresa de Ávila",
    historia: "Mística espanhola e doutora da Igreja, reformou a Ordem Carmelita e fundou vários conventos. Teve experiências místicas extraordinárias e escreveu obras clássicas sobre a vida espiritual. Enfrentou oposição e perseguição, mas perseverou em sua missão de reforma.",
    licao: "A vida de oração profunda nos capacita para grandes reformas e transformações. A perseverança diante das oposições é essencial para cumprir a vontade de Deus."
  },
  {
    nome: "Apóstolo João",
    historia: "O discípulo amado de Jesus, esteve presente na crucificação e foi o único apóstolo que não morreu mártir. Escreveu o Evangelho de João, três cartas e o Apocalipse. Viveu até idade avançada em Éfeso, sendo conhecido por sua mensagem constante sobre o amor de Deus.",
    licao: "O amor é a marca distintiva do verdadeiro discípulo de Cristo. A intimidade com Jesus nos capacita para compreender e transmitir as verdades mais profundas da fé."
  },
  {
    nome: "Santa Edith Stein (Teresa Benedita da Cruz)",
    historia: "Filósofa judia alemã que se converteu ao catolicismo após ler a autobiografia de Santa Teresa de Ávila. Tornou-se carmelita e morreu em Auschwitz por ser de origem judaica. Combinou profundidade intelectual com vida mística profunda.",
    licao: "A busca sincera da verdade pode levar ao encontro com Cristo. A fé e a razão não se opõem, mas se complementam na busca da verdade plena."
  }
]

// Orações profundas e transformadoras por categoria
export const oracoes = {
  cura: [
    "Senhor Jesus Cristo, Médico das almas e dos corpos, Tu que curaste os enfermos e ressuscitaste os mortos, olha com misericórdia para esta necessidade de cura. Toca com Tuas mãos sagradas cada célula, cada órgão, cada pensamento que precisa de restauração. Que Tua luz divina penetre nas trevas da enfermidade e traga renovação completa. Concede-me não apenas a cura física, mas também a paz interior que vem de saber que estou em Tuas mãos amorosas. Amém.",
    
    "Pai Celestial, fonte de toda vida e saúde, coloco diante de Ti esta situação que clama por Tua intervenção divina. Tu conheces cada dor, cada lágrima, cada suspiro de angústia. Derrama sobre mim/nós Teu bálsamo curador, que acalma a dor e restaura a esperança. Que esta provação se transforme em testemunho de Teu poder e amor. Dá-me força para aceitar Tua vontade e sabedoria para compreender Teus caminhos. Em Ti confio minha vida e minha saúde. Amém.",
    
    "Espírito Santo, Consolador divino, vem habitar em meu ser e traz cura para todas as áreas da minha vida que precisam de Teu toque restaurador. Cura as feridas do passado que ainda sangram em meu coração, liberta-me de traumas e memórias dolorosas. Renova minha mente com pensamentos de paz, meu coração com sentimentos de amor, e meu corpo com saúde plena. Que eu seja um vaso de honra para Tua glória. Amém."
  ],
  
  protecao: [
    "Deus Todo-Poderoso, meu refúgio e fortaleza, estende sobre mim e minha família o manto sagrado de Tua proteção. Que Teus anjos acampem ao nosso redor e nos guardem em todos os nossos caminhos. Protege-nos de todo mal visível e invisível, de acidentes, violência, doenças e de toda obra das trevas. Que nossa casa seja um santuário de paz, onde Tua presença habita e Tua bênção permanece. Guarda nossos passos, nossas palavras e nossos pensamentos. Amém.",
    
    "São Miguel Arcanjo, príncipe da milícia celestial, defendei-nos no combate contra as maldades e ciladas do demônio. Sede nosso amparo contra a perversidade e as emboscadas do inimigo. Que Deus o submeta, instantaneamente o pedimos, e vós, príncipe da milícia celestial, pelo divino poder, precipitai no inferno Satanás e os outros espíritos malignos que andam pelo mundo para perder as almas. Protegei nossa família, nosso lar e nossos caminhos. Amém.",
    
    "Senhor Jesus, meu bom Pastor, Tu que deste Tua vida pelas ovelhas, guarda-me sempre perto de Ti. Quando atravessar vales sombrios, que eu sinta Tua presença consoladora. Quando enfrentar perigos, que Tua mão poderosa me sustente. Protege meus entes queridos onde quer que estejam, e que Teu amor seja o escudo que nos defende de todo mal. Confiamos em Teu cuidado paternal e em Tua proteção constante. Amém."
  ],
  
  familia: [
    "Deus de amor e unidade, abençoa abundantemente nossa família com Tua paz que excede todo entendimento. Fortalece os laços que nos unem, ensina-nos a perdoar como Tu nos perdoas, e a amar como Tu nos amas. Que nosso lar seja um reflexo do Teu reino, onde reina a compreensão, a paciência e o respeito mútuo. Protege nossos filhos, orienta nossos passos como pais, e que cada membro da família cresça na graça e no conhecimento de Cristo. Amém.",
    
    "Sagrada Família de Nazaré, Jesus, Maria e José, sede o modelo e a proteção de nossa família. Ensinai-nos a viver em harmonia, a resolver conflitos com amor, e a apoiar uns aos outros em todas as circunstâncias. Que nossa mesa seja sempre um altar de gratidão, nossa conversa seja temperada com bondade, e nosso amor seja um testemunho vivo do amor divino. Intercedei por nós junto ao Pai celestial. Amém.",
    
    "Pai Celestial, Tu que és o fundamento de toda família, derrama Tuas bênçãos sobre nosso lar. Concede-nos sabedoria para educar nossos filhos nos Teus caminhos, paciência para suportar as dificuldades juntos, e alegria para celebrar as vitórias como família. Que nossa união seja indissolúvel, nosso amor seja incondicional, e nossa fé seja transmitida de geração em geração. Protege-nos de toda divisão e fortalece-nos na unidade. Amém."
  ],
  
  gratidao: [
    "Pai de infinita bondade, meu coração transborda de gratidão por Tuas incontáveis bênçãos. Obrigado(a) pelo dom da vida, pela família que me deste, pelos amigos que colocaste em meu caminho. Agradeço pelas alegrias que aquecem meu coração e também pelas dificuldades que me fazem crescer. Cada manhã é um novo presente Teu, cada respiração é uma nova oportunidade de Te glorificar. Que minha vida seja um hino constante de louvor e gratidão. Amém.",
    
    "Senhor Jesus, como posso agradecer suficientemente por Teu amor sacrificial? Tu deste Tua vida para que eu pudesse ter vida eterna. Obrigado(a) por cada momento de Tua presença, por cada oração respondida, por cada porta que abres e por cada proteção silenciosa. Agradeço pelas bênçãos óbvias e também pelas que ainda não consigo enxergar. Que minha gratidão se transforme em ações de amor ao próximo. Amém.",
    
    "Espírito Santo, Doador de todos os dons, agradeço por Tua constante presença em minha vida. Obrigado(a) por me consolar nas tristezas, me fortalecer nas fraquezas, e me guiar nas decisões. Agradeço por cada talento que me concedeste, por cada oportunidade de servir, por cada pessoa que usas para me abençoar. Que eu nunca tome por garantido Tua bondade e que minha vida seja uma oferenda de gratidão. Amém."
  ],
  
  prosperidade: [
    "Deus provedor, Tu que alimentas os pássaros do céu e vestes os lírios do campo, confio plenamente em Tua provisão para minha vida. Abençoa o trabalho das minhas mãos, prospera os caminhos que trilho segundo Tua vontade, e concede-me sabedoria para administrar com fidelidade os recursos que me confias. Que eu busque primeiro Teu reino, sabendo que todas as outras coisas me serão acrescentadas. Ensina-me a ser generoso na abundância e confiante na escassez. Amém.",
    
    "Senhor da colheita, Tu que multiplicas o pouco nas mãos daqueles que confiam em Ti, derrama Tuas bênçãos sobre meus projetos e empreendimentos. Que eu prospere não apenas materialmente, mas principalmente espiritualmente. Concede-me integridade nos negócios, honestidade nas relações, e compaixão pelos necessitados. Que minha prosperidade seja um instrumento de bênção para outros e um testemunho de Tua fidelidade. Amém.",
    
    "Pai Celestial, Tu conheces todas as minhas necessidades antes mesmo que eu as apresente. Confio em Tua sabedoria para suprir tudo o que preciso no tempo certo e da forma certa. Liberta-me da ansiedade quanto ao futuro e da ganância pelo que não preciso. Ensina-me a encontrar contentamento em Ti, sabendo que em Tua presença há plenitude de alegria. Que eu seja um canal de Tuas bênçãos para outros. Amém."
  ]
}

// Função para obter conteúdo do dia baseado na data atual
// SIMULAÇÃO DE MUDANÇA DE DIA: Adicionando +1 ao cálculo para forçar atualização
export function getConteudoDoDia() {
  const hoje = new Date()
  const diaDoAno = Math.floor((hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  
  // SIMULAÇÃO: Adicionando +1 para simular que "virou o dia"
  const diaSimulado = (diaDoAno + 1) % Math.max(versiculos.length, reflexoes.length, santos.length)
  
  return {
    versiculo: versiculos[diaSimulado % versiculos.length],
    reflexao: reflexoes[diaSimulado % reflexoes.length],
    santo: santos[diaSimulado % santos.length]
  }
}

// Funções específicas para compartilhar cada tipo de conteúdo
export function compartilharVersiculo(texto: string, referencia: string) {
  const mensagem = `📖 *Versículo do Dia*\\n\\n"${texto}"\\n\\n— ${referencia}\\n\\n🕊️ Encontro Diário com Deus\\n✨ Que esta palavra abençoe seu dia!`
  
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}

export function compartilharReflexao(titulo: string, texto: string) {
  const mensagem = `💭 *Reflexão do Dia*\\n\\n*${titulo}*\\n\\n${texto}\\n\\n🕊️ Encontro Diário com Deus\\n🙏 Que esta reflexão toque seu coração!`
  
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}

export function compartilharSanto(nome: string, historia: string, licao: string) {
  const mensagem = `✝️ *Santo do Dia*\\n\\n*${nome}*\\n\\n${historia}\\n\\n💡 *Lição de Fé:*\\n${licao}\\n\\n🕊️ Encontro Diário com Deus\\n🌟 Que este exemplo inspire sua jornada!`
  
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}

export function compartilharOracao(categoria: string, oracao: string) {
  const categoriaFormatada = categoria.charAt(0).toUpperCase() + categoria.slice(1)
  const mensagem = `🙏 *Oração de ${categoriaFormatada}*\\n\\n${oracao}\\n\\n🕊️ Encontro Diário com Deus\\n✨ Que esta oração eleve sua alma a Deus!`
  
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}

// Função genérica para compartilhar (mantida para compatibilidade)
export function compartilharWhatsApp(texto: string, referencia?: string) {
  const mensagem = referencia 
    ? `${texto}\\\\n\\\\n${referencia}\\\\n\\\\n🕊️ Encontro Diário com Deus`
    : `${texto}\\\\n\\\\n🕊️ Encontro Diário com Deus`
  
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
}