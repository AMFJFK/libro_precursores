// --- BASE DE DATOS DE LECCIONES Y CONTENIDO ---
const lessonsData = [
    {
        id: "1A",
        title: "¿Qué te espera en la Escuela del Servicio de Precursor?",
        lema: "Aunque Jehová les dé a ustedes pan en forma de angustia y agua en forma de opresión, tu Gran Instructor ya no se esconderá, y verás a tu Gran Instructor con tus propios ojos.",
        lemaSource: "Isaías 30:20",
        image: "pioneer_studying.png",
        imageCaption: "Un precursor dedicado profundizando en la Palabra de Dios para efectuar plenamente su ministerio.",
        intro: `
            <p>¡Qué gran bendición es estar matriculado en esta escuela! Jehová, el <strong><span class="scripture-link" onclick="showScripture('Is. 30:20')">Gran Instructor (Is. 30:20)</span></strong>, siempre ha educado a su pueblo con amor. Desde que enseñó a su Hijo primogénito <strong><span class="scripture-link" onclick="showScripture('Juan 8:28')">(Juan 8:28)</span></strong> hasta las asambleas del antiguo Israel <strong><span class="scripture-link" onclick="showScripture('Deut. 4:10')">(Deut. 4:10;</span> <span class="scripture-link" onclick="showScripture('Deut. 6:4-9')">6:4-9)</span></strong> y las reuniones del primer siglo <strong><span class="scripture-link" onclick="showScripture('1 Cor. 14:23-31')">(1 Cor. 14:23-31)</span></strong>, la educación divina ha sido el pilar de su pueblo.</p>
            <p>Hoy en día, mediante el esclavo fiel y prudente <strong><span class="scripture-link" onclick="showScripture('Mat. 24:45-47')">(Mat. 24:45-47)</span></strong>, se nos da alimento espiritual al tiempo debido. Esta escuela es un regalo para ayudarte a:</p>
            <ul>
                <li>Tener una amistad más fuerte con Jehová y con Jesús <strong><span class="scripture-link" onclick="showScripture('Juan 17:3')">(Juan 17:3)</span></strong>.</li>
                <li>Amar intensamente a los hermanos <strong><span class="scripture-link" onclick="showScripture('1 Ped. 2:17')">(1 Ped. 2:17)</span></strong>.</li>
                <li>Mejorar en todas las facetas del ministerio <strong><span class="scripture-link" onclick="showScripture('2 Tim. 3:17')">(2 Tim. 3:17)</span></strong>.</li>
                <li>Conocer y aplicar principios bíblicos <strong><span class="scripture-link" onclick="showScripture('Col. 1:9, 10')">(Col. 1:9, 10)</span></strong>.</li>
            </ul>
        `,
        questions: [
            {
                id: "1A_q1",
                question: "¿Cómo demuestra la historia bíblica que Jehová siempre ha deseado educar a su pueblo con amor?",
                directAnswer: "A lo largo de la historia, Jehová ha establecido sistemas constantes de enseñanza. Desde instruir a su Hijo primogénito en el cielo, pasando por mandar a los cabezas de familia en Israel a enseñar la Ley a sus hijos, hasta establecer las asambleas y reuniones organizadas del primer siglo y el canal moderno del esclavo fiel. Su deseo siempre ha sido guiarnos por nuestro propio bien.",
                deepAnswer: "Jehová es nuestro Gran Instructor (Is. 30:20). Él comenzó instruyendo a su Hijo primogénito (Juan 8:28) en una comunión tan íntima que forjó la obediencia perfecta de Jesús. Tras la rebelión en Edén, Jehová no se dio por vencido con la humanidad imperfecta. Estableció sistemas de educación nacional en Israel (Deut. 4:10; 6:4-9) e instruyó a los cabezas de familia para que grabaran su Ley en el corazón de sus hijos. En el siglo primero, el orden de las reuniones cristianas reflejaba esta instrucción (1 Cor. 14:23-31). Hoy en día, a través del 'esclavo fiel y prudente' (Mat. 24:45-47), Jehová continúa vertiendo un caudal inagotable de alimento espiritual al tiempo debido, del cual esta Escuela de Precursores es una muestra selecta.",
                shortAnswer: "La educación divina no es un invento moderno; es el latido del amor de Jehová desde el jardín de Edén.",
                references: "Is. 30:20; Juan 8:28; Deut. 4:10; Deut. 6:4-9; 1 Cor. 14:23-31; Mat. 24:45-47"
            },
            {
                id: "1A_q2",
                question: "¿Cuáles son los cuatro pilares fundamentales en los que te ayudará este curso de precursor?",
                directAnswer: "Este curso te ayudará a: 1) Estrechar tu amistad personal con Jehová y Jesús mediante un conocimiento íntimo; 2) Desarrollar un amor intenso y desinteresado por todos los hermanos de la congregación; 3) Mejorar y pulir todas las facetas del ministerio de casa en casa, público e informal; y 4) Entender y aplicar principios bíblicos prácticos para tomar decisiones sabias.",
                deepAnswer: "Este curso de 40 horas no busca acumular conocimiento académico, sino transformar tu corazón en cuatro áreas críticas:<br><br><strong>1. Amistad con Dios:</strong> Llegar a conocer íntimamente a Jehová y a Jesucristo (Juan 17:3). No es solo saber de Dios, sino ser su amigo de confianza y hablarle con el corazón.<br><br><strong>2. Amor a la hermandad:</strong> Amar con intensidad a todos los hermanos (1 Ped. 2:17), superando diferencias de personalidad y fortaleciendo el vínculo de la unidad.<br><br><strong>3. Pulir tu ministerio:</strong> Capacitarte para que seas enteramente competente y estés completamente equipado para predicar y enseñar con habilidad en las calles, en los negocios y de casa en casa (2 Tim 3:17).<br><br><strong>4. Vivir por principios:</strong> Pasar del cumplimiento rígido de reglas a una comprensión madura de los principios bíblicos y cómo aplicarlos en cada decisión diaria (Col. 1:9, 10).",
                shortAnswer: "Crecer en amistad con Jehová, amar a la hermandad, pulir el ministerio y vivir por principios.",
                references: "Juan 17:3; 1 Ped. 2:17; 2 Tim. 3:17; Col. 1:9, 10"
            },
            {
                id: "1A_q3",
                question: "Según Lucas 6:38b y Marcos 4:24, ¿de qué dependerá el provecho espiritual que obtengamos de este curso?",
                directAnswer: "El provecho dependerá directamente de tu nivel de esfuerzo personal y participación. La instrucción divina es abundante, pero la medida de bendición espiritual que recibas será proporcional a la medida de tu dedicación previa, estudio y deseo de aplicar los consejos.",
                deepAnswer: "Jesús declaró en Lucas 6:38b que 'con la medida con que ustedes midan, se les medirá a ustedes'. En Marcos 4:24 añade: 'Presten atención a lo que oyen'. Jehová pone ante ti un banquete de 40 horas de instrucción detallada, talleres y análisis interactivos. Sin embargo, el provecho espiritual será directamente proporcional a tu preparación previa, tu meditación sincera y tu disposición a participar con humildad. Si das con generosidad tu tiempo, atención y energía, Jehová te bendecirá de vuelta con una medida desbordante de paz, sabiduría y gozo espiritual. ¡No te compares con los demás (Gál. 6:4); da lo mejor de ti mismo!",
                shortAnswer: "La escuela es un campo fértil; el tamaño de tu cosecha dependerá de la profundidad con la que metas tu pala.",
                references: "Luc. 6:38b; Mar. 4:24; Gál. 6:4"
            },
            {
                id: "1A_q4",
                question: "¿Qué cinco preguntas clave debemos hacernos continuamente durante la escuela para poner en práctica lo aprendido?",
                directAnswer: "Durante el curso debemos preguntarnos constantemente: 1) ¿Cómo me beneficia a mí esta información?; 2) ¿Qué principios bíblicos están envueltos y cómo puedo ponerlos en práctica?; 3) ¿Cómo me ayuda esto a mejorar mi ministerio?; 4) ¿Cómo me ayudará al tratar con los hermanos de la congregación?; y 5) ¿Cómo fortalecerá mi amistad con Jehová?",
                deepAnswer: "El proverbio dice: 'Dale al sabio y se hará más sabio' (Prov. 9:9). La escuela solo cumple su propósito si lo aprendido se traduce en acción. Durante todo el curso, debes meditar en estas cinco preguntas fundamentales:<br><br>1. <strong>¿Cómo me beneficia a mí esta información?</strong> (Aplicación personal e interiorización).<br>2. <strong>¿Qué principios bíblicos están envueltos y cómo puedo ponerlos en práctica?</strong> (Sabiduría espiritual).<br>3. <strong>¿Cómo me ayuda lo que estoy aprendiendo a mejorar mi ministerio?</strong> (Evangelización hábil).<br>4. <strong>¿Cómo me ayudará al tratar con los hermanos de la congregación?</strong> (Edificación de la congregación).<br>5. <strong>¿Cómo fortalecerá mi amistad con Jehová?</strong> (El núcleo de tu servicio).<br><br>Esta meditación constante te capacitará para cumplir plenamente tu ministerio (2 Tim. 4:5).",
                shortAnswer: "Para que el conocimiento eche raíces, debes interrogar a tu corazón con sabiduría: ¿cómo me beneficia, qué principios implica, cómo mejora mi ministerio, cómo ayuda a otros y cómo me acerca a Jehová?",
                references: "Prov. 9:9; 2 Tim. 4:5"
            }
        ],
        flashcards: [
            { ref: "Isaías 30:20", text: "Tu Gran Instructor ya no se esconderá, y verás a tu Gran Instructor con tus propios ojos." },
            { ref: "Lucas 6:38b", text: "Porque con la medida con que ustedes midan se les volverá a medir." },
            { ref: "2 Timoteo 4:5", text: "...haz el trabajo de un evangelizador, cumple plenamente tu ministerio." }
        ]
    },
    {
        id: "1B",
        title: "Fortalece tu amistad con Jehová",
        lema: "Tu amor leal es mejor que la vida; por eso mis propios labios te darán gloria.",
        lemaSource: "Salmo 63:3",
        image: "public_preaching.png",
        imageCaption: "Un precursor valiente testificando públicamente, reflejando el amor leal de Jehová a las personas.",
        intro: `
            <p>No hay nada más importante en la vida que nuestra amistad con Jehová. Como expresó el rey David en el <strong><span class="scripture-link" onclick="showScripture('Sal. 63:3')">Salmo 63:3</span></strong>, el amor leal de Dios es mejor que la vida misma.</p>
            <p>El amor que sentimos por Dios es como un ser vivo: necesita ser alimentado y protegido diariamente para que no se marchite y muera. Incluso Jesús se esforzó durante toda su vida terrenal por mantener fuerte su amor por su Padre. Esta lección te ayudará a examinar cómo puedes cultivar un deseo ferviente de estudiar la Biblia <strong><span class="scripture-link" onclick="showScripture('1 Ped. 2:2')">(1 Ped. 2:2)</span></strong>, meditar de corazón y acercarte a Jehová mediante la oración constante.</p>
        `,
        questions: [
            {
                id: "1B_q1",
                question: "Según la profecía de Isaías, ¿cómo contribuyó la instrucción que Jehová le dio a su Hijo unigénito a crear una estrecha relación entre ellos? (Is. 50:4, 5).",
                directAnswer: "Jehová le despertaba el oído al Hijo mañana tras mañana para instruirlo en el cielo. El Hijo escuchaba de buena gana, sin rebeldía. Esta educación diaria y la obediencia voluntaria del Hijo forjaron un lazo inquebrantable de amor y confianza mutua antes de venir a la Tierra.",
                deepAnswer: "La profecía de Isaías 50:4, 5 revela la hermosa relación educativa entre Jehová y su Hijo en la existencia prehumana. Jehová despertaba 'mañana tras mañana' el oído de su Hijo para escuchar como discípulo. El Hijo no fue rebelde ni se volvió atrás. Esta instrucción constante no solo le dio a Jesús la capacidad de 'sostener con una palabra al fatigado', sino que forjó una confianza inquebrantable entre Padre e Hijo. Muestra que la cercanía espiritual se nutre de una comunicación diaria donde escuchamos con atención y sumisión la voz de Jehová a través de sus escritos.",
                shortAnswer: "El Padre le despertaba el oído mañana tras mañana; y el Hijo escuchaba con el corazón de un discípulo sumiso.",
                references: "Is. 50:4, 5"
            },
            {
                id: "1B_q2",
                question: "¿Cuál debe ser tu objetivo al estudiar? (Mat. 22:37).",
                directAnswer: "Tu objetivo principal al estudiar nunca debe ser acumular simples datos o preparar una respuesta mecánica. El objetivo es encender tu amor por Jehová con todo tu corazón, alma y mente, permitiendo que la verdad toque tus sentimientos profundos y te acerque más a él.",
                deepAnswer: "Jesús declaró en Mateo 22:37: 'Ama a Jehová tu Dios con todo tu corazón, con toda tu alma y con toda tu mente'. Por lo tanto, el objetivo supremo de tu estudio personal no es el mero intelecto, ni memorizar datos para responder en clase. El verdadero objetivo es avivar tu amor por Jehová. Cada sesión de estudio debe ser un encuentro íntimo con tu Creador, donde analice sus cualidades, medite en su bondad y permita que la verdad modele tus pensamientos y emociones.",
                shortAnswer: "No estudies solo para llenar tu mente de datos; estudia para encender el fuego del amor a Jehová en todo tu corazón.",
                references: "Mat. 22:37"
            },
            {
                id: "1B_q3",
                question: "¿Qué les pedía Jehová a los reyes de Israel en Deuteronomio 17:18-20, y por qué?",
                directAnswer: "Jehová pedía a los reyes que escribieran su propia copia de la Ley y la leyeran todos los días de su vida. Esto era para que aprendieran a temer a Jehová, evitaran llenarse de orgullo sobre sus hermanos y no se desviaran jamás de los mandamientos de Dios.",
                deepAnswer: "En Deuteronomio 17:18-20, Jehová mandaba que cuando el rey se sentara en su trono, debía escribir para sí mismo una copia de la Ley en un libro. Este libro debía estar con él y debía leerlo 'todos los días de su vida'. Los objetivos eran claros:<br><br>1. <strong>Aprender a temer a Jehová:</strong> para observar y poner en práctica todas sus palabras.<br>2. <strong>Evitar el orgullo:</strong> 'para que su corazón no se ensalce sobre sus hermanos'.<br>3. <strong>Permanecer en el camino recto:</strong> sin desviarse a la derecha ni a la izquierda.<br><br>Si un rey, con todas sus responsabilidades, necesitaba leer la Biblia diariamente para mantenerse humilde y sabio, ¡cuánto más nosotros como precursores en la línea de batalla del ministerio!",
                shortAnswer: "El rey debía escribir una copia de la Ley y leerla todos los días de su vida para aprender a temer a Dios y mantenerse humilde.",
                references: "Deut. 17:18-20"
            },
            {
                id: "1B_q4",
                question: "¿Cómo puedes desarrollar un fuerte deseo de leer y estudiar la Biblia? (1 Ped. 2:2).",
                directAnswer: "El deseo se cultiva de manera constante. Pídele a Jehová que te dé las fuerzas y medita en sus promesas. Disciplínate a leer todos los días aunque al principio requiera esfuerzo; con la regularidad, la Palabra pasará de ser un deber a ser tu delicia espiritual y alimento indispensable.",
                deepAnswer: "En 1 Pedro 2:2 se nos insta a 'desear ardientemente la leche espiritual no adulterada'. La palabra griega traducida como 'desear ardientemente' implica un anhelo intenso. A veces, al principio del precursorado, la lectura de la Biblia puede sentirse como un deber debido al cansancio. Sin embargo, el apetito espiritual se cultiva de forma deliberada. Disciplínate a leer con regularidad, medita en los relatos y pídele a Jehová que te ayude a ver la belleza en su Palabra. Con el tiempo, pasarás de la disciplina al deleite absoluto, viendo la lectura de la Biblia no como una tarea, sino como el sustento diario que mantiene viva tu amistad con Jehová.",
                shortAnswer: "El apetito espiritual se educa: 'desea ardientemente' la leche de la Palabra hasta que se convierta en una delicia indispensable.",
                references: "1 Ped. 2:2"
            },
            {
                id: "1B_q5",
                question: "¿Por qué es necesario ser disciplinados? (w13 15/9 pág. 30 párr. 13).",
                directAnswer: "La autodisciplina es fundamental porque los precursores tienen agendas muy cargadas. Sin disciplina, las tareas menos importantes o las distracciones consumirán el tiempo dedicado a las actividades esenciales como la lectura bíblica y la meditación.",
                deepAnswer: "El párrafo 13 del artículo de La Atalaya del 15 de septiembre de 2013 indica que el estudio personal y la oración diaria deben formar parte del horario fijo del precursor. El diablo busca saturar nuestro día con tareas aparentemente urgentes pero espiritualmente vacías. Disciplinarse a apagar dispositivos, establecer un lugar silencioso y cumplir con el horario de estudio protege nuestra salud espiritual a largo plazo.",
                shortAnswer: "Necesitamos controlarnos para que las actividades secundarias no nos roben el tiempo apartado para las cosas esenciales.",
                references: "w13 15/9 pág. 30 párr. 13"
            },
            {
                id: "1B_q6",
                question: "¿Por qué leer la Biblia todos los días te acerca más a Dios? (Jos. 1:8; 2 Crón. 15:2).",
                directAnswer: "Porque la lectura diaria nos expone constantemente a los pensamientos de Jehová. Josué 1:8 muestra que meditar en la Ley día y noche nos da sabiduría y éxito espiritual, mientras que 2 Crónicas 15:2 nos recuerda que Jehová responde acercándose a nosotros si le buscamos activamente.",
                deepAnswer: "Nuestra amistad con Dios no es estática. Jehová nos habla a través de su Palabra escrita. Si leemos la Biblia a diario, mantenemos un canal abierto de entrada. Meditar en ella nos ayuda a ver cómo piensa Dios ante cada situación y nos impulsa a tomar decisiones rectas que alegran su corazón. La promesa en 2 Crónicas 15:2 es una ley espiritual inmutable: la distancia entre Dios y tú depende de cuánto te esfuerces por buscarlo.",
                shortAnswer: "Jehová estará con nosotros mientras nosotros estemos con él; búscalo a diario en su Palabra y él se dejará encontrar.",
                references: "Jos. 1:8; 2 Crón. 15:2"
            },
            {
                id: "1B_q7",
                question: "¿Qué significa meditar, y en qué cosas deberíamos meditar? (Sal. 19:14; 77:12; 1 Tim. 4:13-15).",
                directAnswer: "Meditar significa concentrarse profundamente y reflexionar con aprecio en verdades espirituales. Debemos meditar en las cualidades y las actividades de Jehová, en su Ley protectora y en cómo aplicar las enseñanzas bíblicas en nuestra vida personal y ministerio.",
                deepAnswer: "Meditar no es solo leer con la menti; es digerir la información con el corazón. David cantó en Salmo 77:12 que reflexionaría en todas las actividades de Dios. Pablo instó a Timoteo a dedicarse de lleno y a reflexionar en su enseñanza (1 Tim. 4:13-15). Debemos apartar momentos de tranquilidad libres de ruido externo para reflexionar en cómo los relatos bíblicos se relacionan con nosotros. Esto graba la verdad en lo más íntimo y le da poder a nuestras oraciones y predicación.",
                shortAnswer: "La meditación no es un lujo intelectual; es el motor que transporta la verdad de la Biblia desde la mente hasta el corazón.",
                references: "Sal. 19:14; Sal. 77:12; 1 Tim. 4:13-15"
            }
        ],
        flashcards: [
            { ref: "Salmo 63:3", text: "Tu amor leal es mejor que la vida; por eso mis propios labios te darán gloria." },
            { ref: "Mateo 22:37", text: "Ama a Jehová tu Dios con todo tu corazón, con toda tu alma y con toda tu mente." },
            { ref: "1 Pedro 2:2", text: "Deseen ardientemente la leche espiritual no adulterada, para que por medio de ella crezcan hacia la salvación." }
        ]
    },
    {
        id: "2A",
        title: "La Traducción del Nuevo Mundo (parte 1)",
        lema: "Maneja la palabra de la verdad correctamente.",
        lemaSource: "2 Timoteo 2:15",
        image: "pioneer_studying.png",
        imageCaption: "Una traducción confiable de la Biblia nos permite enseñar con autoridad en el ministerio.",
        intro: `
            <p>¿Usas eficazmente la <em>Traducción del Nuevo Mundo</em> en el ministerio? ¿Se la recomiendas a las personas y les enseñas a aprovechar todas las ayudas que tiene? Esta lección te ayudará a valorar todavía más esta maravillosa herramienta, y te animará a utilizarla más en la predicación y en tu estudio personal <strong><span class="scripture-link" onclick="showScripture('2 Tim. 2:15')">(2 Tim. 2:15)</span></strong>.</p>
        `,
        questions: [
            {
                id: "2A_q1",
                question: "¿Por qué hacía falta una nueva traducción? (w15 15/12 pág. 8 párrs. 16, 17).",
                directAnswer: "Hacía falta una nueva traducción por dos razones principales: primero, el descubrimiento de manuscritos bíblicos más antiguos y exactos requería corregir errores acumulados en traducciones anteriores; segundo, la evolución constante del idioma exigía verter el mensaje divino en un lenguaje contemporáneo y claro para llegar al corazón.",
                deepAnswer: "Con el paso de los años, los idiomas cambian y muchas expresiones se vuelven obsoletas o difíciles de entender. Además, se han descubierto manuscritos bíblicos más antiguos y confiables que nos acercan más al texto original en hebreo, arameo y griego. Para que la Palabra de Dios siga teniendo fuerza, debe estar en el lenguaje que la gente común habla hoy en día, sin adulterar su sentido original. Por eso, el Comité de Traducción de la Biblia del Nuevo Mundo realizó este gran trabajo.",
                shortAnswer: "Para que la verdad brille, debe hablar en el idioma del corazón de la gente del día de hoy.",
                references: "w15 15/12 pág. 8 párrs. 16, 17"
            },
            {
                id: "2A_q2",
                question: "¿Por qué razón en particular es la Traducción del Nuevo Mundo mejor que otras traducciones de la Biblia? (kr pág. 39 párr. 2).",
                directAnswer: "La Traducción del Nuevo Mundo sobresale porque ha restituido el nombre personal de Dios, Jehová, más de 7.000 veces en los lugares donde aparecía originalmente en el texto hebreo y griego. Además, evita sesgos basados en dogmas o credos humanos, apegándose a la exactitud.",
                deepAnswer: "La característica más destacada es la restauración del nombre divino, Jehová. La mayoría de las traducciones comerciales lo han reemplazado por títulos como 'SEÑOR' debido a tradiciones supersticiosas. Restaurar el nombre de Dios en las Escrituras permite que las personas entiendan que Dios es una persona real con la que pueden tener una relación estrecha. Además, es una traducción que busca ser lo más literal posible siempre que el idioma receptor lo permita, asegurando la transmisión fiel del pensamiento de Dios.",
                shortAnswer: "Una traducción que honra el nombre de su Autor está destinada a guiar a las personas al Dios verdadero.",
                references: "kr pág. 39 párr. 2"
            }
        ],
        flashcards: [
            { ref: "2 Timoteo 2:15", text: "Esfuérzate al máximo por presentarte aprobado ante Dios, como un trabajador que no tiene de qué avergonzarse, que maneja la palabra de la verdad correctamente." }
        ]
    },
    {
        id: "2B",
        title: "La Traducción del Nuevo Mundo (parte 2)",
        lema: "¡Cuánto amo tu ley! Todo el día medito en ella.",
        lemaSource: "Salmo 119:97",
        image: "pioneer_studying.png",
        imageCaption: "Meditar en las herramientas de estudio bíblico nos ayuda a valorar las ayudas del esclavo fiel.",
        intro: `
            <p>En esta lección repasaremos algunos puntos destacados del apéndice A de la <em>Traducción del Nuevo Mundo</em> revisada. También veremos otras ayudas que tiene esta Biblia para facilitar nuestro estudio profundo <strong><span class="scripture-link" onclick="showScripture('Sal. 119:97')">(Sal. 119:97)</span></strong>.</p>
        `,
        questions: [
            {
                id: "2B_q1",
                question: "Explica para qué sirven las cuatro categorías de notas en la revisión de la Traducción del Nuevo Mundo (nwt pág. 1853).",
                directAnswer: "Las notas sirven para dar mayor claridad al texto bíblico. Las notas 'O' ofrecen lecturas alternativas válidas; las notas 'O quizás' sugieren expresiones más modernas; las notas 'Lit.' muestran la traducción palabra por palabra del idioma original; y las notas de información adicional explican detalles geográficos, históricos o de pesos y medidas.",
                deepAnswer: "El apéndice A2 de la Biblia de estudio detalla la utilidad de las notas a pie de página:<br><br>1. <strong>'O' (Alternativas):</strong> Muestra otra forma aceptable de traducir el texto según los manuscritos.<br>2. <strong>'O quizás' (Moderna/Sugerida):</strong> Brinda un sentido más claro o contemporáneo del pasaje.<br>3. <strong>'Lit.' (Literal):</strong> Indica exactamente cómo está escrito en hebreo, arameo o griego antiguo, ayudando a ver la estructura mental de los escritores bíblicos.<br>4. <strong>Información adicional:</strong> Aclara términos difíciles, monedas, distancias y trasfondo cultural.",
                shortAnswer: "Las notas a pie de página son pequeñas ventanas que nos permiten contemplar los matices de los idiomas originales.",
                references: "Sal. 119:97"
            }
        ],
        flashcards: [
            { ref: "Salmo 119:97", text: "¡Cuánto amo tu ley! Todo el día medito en ella." }
        ]
    },
    // PLANTILLAS COMPLETAS DE PREGUNTAS CON TEMAS REALES PARA TODAS LAS DEMÁS LECCIONES
    { id: "3A", title: "Mantente al día", lema: "El espíritu santo les enseñará.", lemaSource: "Lucas 12:12", image: "pioneer_studying.png", imageCaption: "La luz de la verdad brilla cada vez más.", intro: "<p>Hoy día, Jehová sigue haciendo que la luz de la verdad brille cada vez más. ¿Estamos al día con las aclaraciones de nuestras creencias?</p>", questions: [{ id: "3A_q1", question: "Explica en qué sentido es Jehová el origen de toda luz espiritual (Sal. 43:3; Is. 42:6, 7).", directAnswer: "Jehová es la fuente de la verdad y de la revelación. Él disipa la oscuridad espiritual guiando a sus siervos progresivamente a medida que se cumple su propósito divino.", deepAnswer: "Jehová no revela todo su propósito de una sola vez, sino que guía a sus siervos paso a paso. Él es el Padre de las luces celestes, y su guía nos libra de la confusión doctrinal de este mundo.", shortAnswer: "La luz de Jehová brilla de manera progresiva, iluminando el sendero de los justos.", references: "Sal. 43:3; Is. 42:6, 7" }] },
    { id: "3B", title: "Repaso del día 1", lema: "Meditaré en todas tus actividades.", lemaSource: "Salmo 77:12", image: "pioneer_studying.png", imageCaption: "Repasar lo aprendido graba las verdades en nuestro corazón.", intro: "<p>Un repaso de las lecciones del primer día de clase para afianzar el conocimiento adquirido.</p>", questions: [{ id: "3B_q1", question: "¿Por qué sacamos tiempo para estudiar, meditar y orar a pesar de nuestra ocupada vida como precursores?", directAnswer: "Sacamos tiempo porque nuestra relación con Jehová es nuestro combustible espiritual. Si descuidamos la oración y el estudio, nuestro ministerio perderá fuerza.", deepAnswer: "El servicio a tiempo completo requiere una recarga constante de energía espiritual. Meditar en las actividades de Jehová nos ayuda a mantener el enfoque y a de nuevo el amor por las personas en el territorio.", shortAnswer: "La meditación es el puente que conecta el conocimiento con el corazón.", references: "Salmo 77:12" }] },
    { id: "4A", title: "La soberanía de Jehová y la santificación de su nombre", lema: "Enséñame a hacer tu voluntad.", lemaSource: "Salmo 143:10", image: "pioneer_studying.png", imageCaption: "Vindicar la soberanía de Jehová es nuestra meta principal.", intro: "<p>La soberanía de Jehová y la santificación de su nombre es la cuestión más importante del universo.</p>", questions: [{ id: "4A_q1", question: "Define la palabra soberanía y explica por qué Jehová es el legítimo Soberano.", directAnswer: "La soberanía es el derecho supremo a gobernar. Jehová es el soberano legítimo porque es el Creador de todas las cosas y el origen de la vida.", deepAnswer: "Como Creador universal, Jehová tiene el derecho absoluto de gobernar. Su soberanía es perfecta porque se basa enteramente en el amor, a diferencia de los gobiernos humanos corruptos.", shortAnswer: "Jehová es nuestro Soberano legítimo porque de él proceden todas las cosas.", references: "Job 41:11; Sal. 24:1" }] },
    { id: "4B", title: "Interésate sinceramente por los demás", lema: "Busquen no solo sus propios intereses, sino también los de los demás.", lemaSource: "Filipenses 2:4", image: "public_preaching.png", imageCaption: "El interés sincero abre las puertas del corazón de las personas.", intro: "<p>El interés por los demás es una cualidad del corazón. Nos ayuda a ser mejores evangelizadores.</p>", questions: [{ id: "4B_q1", question: "¿Cómo demostraba el apóstol Pablo interés sincero al predicar?", directAnswer: "Pablo se adaptaba a las circunstancias y al modo de pensar de las personas a las que predicaba, buscando terreno común.", deepAnswer: "En Atenas y ante reyes, Pablo usaba argumentos razonables y adaptados a su auditorio. Escuchaba y observaba antes de hablar para poder llegar a su corazón de forma efectiva.", shortAnswer: "El amor nos impulsa a adaptarnos a las personas para poder salvar a algunas.", references: "Hech. 17:22, 23; 26:2, 3" }] },
    { id: "5A", title: "La predicación de casa en casa: método principal", lema: "Hagan discípulos de gente de todas las naciones.", lemaSource: "Mateo 28:19", image: "public_preaching.png", imageCaption: "La predicación de casa en casa tiene un claro fundamento bíblico.", intro: "<p>Analicemos la base bíblica de la predicación de casa en casa y cómo nos ayuda a ser felices.</p>", questions: [{ id: "5A_q1", question: "¿Por qué es el método de casa en casa el más eficaz?", directAnswer: "Es el más eficaz porque nos permite tomar la iniciativa para buscar directamente a las personas en sus hogares, siguiendo el modelo de Jesús y los apóstoles.", deepAnswer: "Jesús mandó a sus apóstoles a buscar a los merecedores casa por casa. Los cristianos del siglo primero lo hacían 'sin cesar' en los templos y de casa en casa (Hechos 5:42), demostrando que es el método más directo y personal.", shortAnswer: "Buscamos a las personas donde se encuentran, siguiendo las pisadas de Cristo.", references: "Mat. 10:11-14; Hech. 20:20" }] },
    { id: "5B", title: "Taller 1. La predicación de casa en casa", lema: "Todos los días, sin parar, enseñaban.", lemaSource: "Hechos 5:42", image: "public_preaching.png", imageCaption: "Los talleres prácticos nos ayudan a pulir nuestras presentaciones.", intro: "<p>Un taller práctico para mejorar nuestras conversaciones e iniciar temas de la Biblia de forma natural.</p>", questions: [{ id: "5B_q1", question: "¿Cómo podemos prepararnos para mantener una actitud positiva en la predicación?", directAnswer: "Preparándonos de corazón mediante la oración, ensayando introducciones sencillas y recordando que colaboramos con Jehová y los ángeles.", deepAnswer: "La predicación es un privilegio espiritual. Cuando nos enfocamos en que estamos dando testimonio sobre el nombre de Jehová, el rechazo en las puertas no afecta nuestro gozo interior.", shortAnswer: "Predicamos con valor porque no estamos solos; Jehová camina a nuestro lado.", references: "Hech. 5:42; 2 Cor. 2:17" }] },
    { id: "6A", title: "Mujeres que alegran a Jehová", lema: "Las mujeres que proclaman las buenas noticias son un ejército grande.", lemaSource: "Salmo 68:11", image: "public_preaching.png", imageCaption: "Las hermanas cristianas desempeñan un papel fundamental en la predicación.", intro: "<p>Valoremos y comprendamos el papel y los privilegios de las mujeres en la congregación cristiana.</p>", questions: [{ id: "6A_q1", question: "¿Cómo indica la Biblia que Jehová le da a la mujer un lugar digno en su organización?", directAnswer: "Jehová las creó como un complemento digno del hombre y las utiliza como un gran ejército de proclamadoras del Reino. Jesús mismo las trató con gran respeto y dignidad.", deepAnswer: "A diferencia de la cultura machista de la antigüedad, Jesús enseñó públicamente a las mujeres y las eligió como las primeras en anunciar su resurrección. Jehová las valora por su espiritualidad y lealtad.", shortAnswer: "La fidelidad de nuestras hermanas es una corona de belleza para la congregación.", references: "Sal. 68:11; Gál. 3:26-28" }] },
    { id: "6B", title: "Repaso del día 2", lema: "Estudiaremos tu ley.", lemaSource: "Salmo 119:109", image: "pioneer_studying.png", imageCaption: "Repaso interactivo del segundo día de la escuela.", intro: "<p>Un espacio para repasar los principios doctrinales, la soberanía de Jehová y el papel de las mujeres en su propósito.</p>", questions: [{ id: "6B_q1", question: "¿Qué lecciones prácticas del ejemplo de Jesús en la predicación te han ayudado más hoy?", directAnswer: "Su compasión por las personas y su uso de preguntas para llegar al corazón. Su ejemplo nos motiva a no juzgar a las personas del territorio.", deepAnswer: "Jesús veía a las personas como ovejas sin pastor. Esa compasión lo impulsaba a predicar sin importar el cansancio físico. Como precursores, debemos imitar ese amor entrañable.", shortAnswer: "Predicamos por amor, imitando la compasión infinita de nuestro Amo.", references: "Mat. 9:36" }] },
    { id: "7A", title: "Cómo te ayudan las instrucciones y los consejos", lema: "Traten de corregir al hombre con espíritu apacible.", lemaSource: "Gálatas 6:1", image: "pioneer_studying.png", imageCaption: "Aceptar los consejos nos ayuda a crecer en sentido espiritual.", intro: "<p>El valor de ser sumisos a la jefatura de Cristo a través de los ancianos y el esclavo fiel.</p>", questions: [{ id: "7A_q1", question: "¿Por qué debemos colaborar con los ancianos de la congregación?", directAnswer: "Porque son 'hombres como regalos' nombrados por el espíritu santo para pastorear y proteger a la congregación, y rinden cuentas ante Jehová.", deepAnswer: "Los ancianos velan por nuestra salud espiritual (Hebreos 13:17). Al colaborar con ellos y seguir sus pautas, mantenemos la unidad y demostramos nuestra sumisión a Jesucristo, la Cabeza de la congregación.", shortAnswer: "La obediencia a los pastores es reflejo de nuestra lealtad a Cristo.", references: "Heb. 13:17; Efes. 4:8" }] },
    { id: "7B", title: "Lucha contra 'el espíritu del mundo'", lema: "Nosotros no hemos recibido el espíritu del mundo.", lemaSource: "1 Corintios 2:12", image: "pioneer_studying.png", imageCaption: "El espíritu del mundo es sutil; debemos combatirlo con el espíritu de Dios.", intro: "<p>Identifica y combate las influencias sutiles del materialismo, el entretenimiento y la inmoralidad.</p>", questions: [{ id: "7B_q1", question: "¿Qué es el espíritu del mundo y cómo influye en la gente?", directAnswer: "Es la fuerza activa que domina la sociedad alejada de Dios, promoviendo el egoísmo, la independencia y los deseos de la carne.", deepAnswer: "Satanás usa este espíritu para influir en los pensamientos y deseos de las personas de forma sutil. Debemos contrarrestarlo pidiendo constantemente el espíritu santo de Dios y cultivando su fruto.", shortAnswer: "No permitas que el molde de este mundo apague el espíritu de Jehová en ti.", references: "1 Cor. 2:12; Efes. 2:2, 3" }] },
    { id: "8A", title: "Lleva una vida íntegra", lema: "Te gusta la integridad.", lemaSource: "1 Crónicas 29:17", image: "pioneer_studying.png", imageCaption: "Mantenerse íntegro alegra el corazón de Jehová.", intro: "<p>El significado de la integridad cristiana y la neutralidad en tiempos de prueba y persecución.</p>", questions: [{ id: "8A_q1", question: "¿Qué significa ser íntegro a los ojos de Jehová?", directAnswer: "Significa amar a Jehová con todo el corazón de forma inquebrantable, manteniéndose leal a sus principios incluso en las pruebas más difíciles.", deepAnswer: "La integridad está vinculada a la santificación del nombre de Dios. Al ser íntegros, demostramos que Satanás es un mentiroso y que servimos a Jehová por amor y no por interés.", shortAnswer: "La integridad es el regalo de un corazón indiviso hacia su Creador.", references: "Job 27:5; Prov. 27:11" }] },
    { id: "8B", title: "Participa en las diferentes formas de predicación", lema: "Hago todas las cosas por las buenas noticias.", lemaSource: "1 Corintios 9:23", image: "public_preaching.png", imageCaption: "Existen múltiples maneras de llevar la verdad a las personas.", intro: "<p>Estrategias prácticas para predicar de forma informal, pública con carritos, en las calles y comercios.</p>", questions: [{ id: "8B_q1", question: "¿Cómo podemos aprovechar las oportunidades para predicar informalmente?", directAnswer: "Iniciando una conversación amigable sin forzar el tema de inmediato, mostrando interés personal y usando noticias o preguntas sencillas.", deepAnswer: "Jesús predicó informalmente a la samaritana en el pozo comenzando con una petición sencilla ('dame de beber'). Imitar su tacto nos ayuda a sembrar la semilla del Reino en cualquier lugar.", shortAnswer: "Cada encuentro cotidiano es una oportunidad para reflejar la luz de la verdad.", references: "Juan 4:7-26" }] },
    { id: "9A", title: "Taller 2. Diferentes formas de predicación", lema: "Ofrezcamos siempre a Dios sacrificio de alabanza.", lemaSource: "Hebreos 13:15", image: "public_preaching.png", imageCaption: "La práctica constante nos hace más hábiles al testificar.", intro: "<p>Ensayos prácticos de predicación pública e informal utilizando las publicaciones del kit de enseñanza.</p>", questions: [{ id: "9A_q1", question: "¿Cómo nos ayuda el uso de los carritos de literatura a ser más eficaces?", directAnswer: "Nos hace visibles y accesibles para las personas que buscan la verdad, permitiéndoles acercarse a nosotros a su propio ritmo.", deepAnswer: "La predicación pública complementa el trabajo de casa en casa. Estar bien arreglados y mostrar una actitud amigable invita a las personas a llevarse publicaciones o iniciar cursos bíblicos.", shortAnswer: "Los carritos son faros de esperanza en medio del bullicio de las ciudades.", references: "Heb. 13:15" }] },
    { id: "9B", title: "Repaso del día 3", lema: "¡Cuánto amo tu ley!", lemaSource: "Salmo 119:97", image: "pioneer_studying.png", imageCaption: "Repaso de las lecciones del tercer día.", intro: "<p>Repaso de la integridad, las diferentes formas de predicación y la lucha contra el espíritu del mundo.</p>", questions: [{ id: "9B_q1", question: "¿Cómo podemos ayudar a otros a mantener una postura neutral ante los asuntos políticos del mundo?", directAnswer: "Mostrando con la Biblia que el Reino de Dios es el único gobierno legítimo y que nuestra lealtad pertenece por completo a Cristo.", deepAnswer: "Mantenerse neutral requiere fe. Al estudiar los principios bíblicos sobre la obediencia al César pero la devoción exclusiva a Dios, ayudamos a la congregación a permanecer unida.", shortAnswer: "Somos embajadores del Reino; nuestra bandera es el amor de Dios.", references: "Juan 18:36; Mat. 22:21" }] },
    { id: "10A", title: "Valora el papel de Jesús", lema: "El testimonio acerca de Jesús inspira las profecías.", lemaSource: "Apocalipsis 19:10", image: "pioneer_studying.png", imageCaption: "Jesús es el Camino, la Verdad y la Vida.", intro: "<p>Profundicemos en los títulos de Jesús y su papel esencial en el propósito salvador de Jehová.</p>", questions: [{ id: "10A_q1", question: "¿Qué significa que Jesús sea 'el camino, la verdad y la vida'?", directAnswer: "Significa que Jesús es el único conducto para reconciliarnos con Dios, el cumplimiento de todas las profecías y el medio para obtener vida eterna.", deepAnswer: "Nadie puede acercarse al Padre si no es a través del sacrificio y la mediación de Cristo (Juan 14:6). Valorar su papel nos motiva a predicar con mayor aprecio por su rescate.", shortAnswer: "Cristo es el puente celestial que nos devuelve la amistad con nuestro Creador.", references: "Juan 14:6; Heb. 7:25" }] },
    { id: "10B", title: "Piensa en principios", lema: "La sabiduría es lo más importante.", lemaSource: "Proverbios 4:7", image: "pioneer_studying.png", imageCaption: "Los principios bíblicos educan nuestra conciencia para tomar buenas decisiones.", intro: "<p>Aprende a diferenciar las leyes de los principios y cómo estos reflejan la sabiduría divina.</p>", questions: [{ id: "10B_q1", question: "¿Cuál es la diferencia fundamental entre una ley y un principio?", directAnswer: "Las leyes son normas específicas para circunstancias concretas, mientras que los principios son verdades fundamentales que no cambian y guían nuestro juicio.", deepAnswer: "Las leyes nos dicen qué hacer; los principios nos enseñan a pensar como Jehová. Pensar en principios nos ayuda a tomar decisiones correctas cuando no existe una ley bíblica explícita.", shortAnswer: "Las leyes marcan límites; los principios educan el corazón.", references: "Prov. 3:6; Heb. 5:14" }] },
    { id: "11A", title: "Evalúa tu progreso espiritual", lema: "Corran de tal modo que lo ganen.", lemaSource: "1 Corintios 9:24", image: "pioneer_studying.png", imageCaption: "El autoexamen constante nos ayuda a mantenernos fuertes en la fe.", intro: "<p>Analicemos las diferencias entre una persona física y una espiritual y cómo evaluar nuestro crecimiento.</p>", questions: [{ id: "11A_q1", question: "¿Cómo se diferencia una persona espiritual de una física?", directAnswer: "La persona espiritual busca la guía de Dios en todo y tiene la mente de Cristo, mientras que la persona física se guía por deseos carnales y criterios humanos.", deepAnswer: "La espiritualidad influye en nuestras oraciones, estudio, habla, vestido y trato familiar. Evaluar nuestro progreso con humildad nos protege de estancarnos espiritualmente.", shortAnswer: "La persona espiritual mira la vida a través de los ojos de Jehová.", references: "1 Cor. 2:14-16; Rom. 8:6" }] },
    { id: "11B", title: "Haz buenas revisitas", lema: "Yo planté, Apolos regó, pero Dios lo hizo crecer.", lemaSource: "1 Corintios 3:6", image: "public_preaching.png", imageCaption: "Cultivar el interés de las personas requiere constancia y preparación.", intro: "<p>Aprende a preparar el terreno para volver a visitar a las personas y comenzar cursos de la Biblia.</p>", questions: [
        { 
            id: "11B_q1", 
            question: "¿Cuáles son las tres claves para hacer una buena revisita?", 
            directAnswer: "1) Mostrar interés sincero en la persona; 2) Elegir un tema bíblico atrayente; y 3) Dejar una pregunta pendiente al final de la visita anterior.", 
            deepAnswer: "Hacer revisitas eficaces requiere un objetivo claro: iniciar un curso bíblico. Volver pronto (en uno o dos días) ayuda a mantener vivo el interés de la persona.", 
            shortAnswer: "La revisita es el agua que permite que la semilla de la verdad eche raíces.", 
            references: "1 Cor. 3:6; Mat. 28:19, 20" 
        },
        {
            id: "11B_q2",
            question: "Lee y comenta Hechos 9:10-17. ¿Cómo nos ayuda el relato de Ananías y Saulo a ver las revisitas?",
            directAnswer: "El relato nos enseña que debemos ver las revisitas con una actitud positiva y fe. Ananías temía a Saulo debido a su reputación de perseguidor, pero obedeció a Jesús y lo trató como a un hermano ('Saulo, hermano'). Debemos ver a las personas del territorio no por su pasado, sino por lo que pueden llegar a ser: siervos escogidos de Jehová.",
            deepAnswer: "Ananías al principio dudó debido al temor humano (Hech. 9:13, 14), pero al escuchar la aclaración de Jesús de que Saulo era un 'vaso escogido' (Hech. 9:15), superó sus perjuicios. Al llegar a la casa, colocó sus manos sobre él y lo llamó cariñosamente 'Saulo, hermano' (Hech. 9:17). Esto curó la ceguera física y espiritual de Saulo. En nuestro ministerio, nos encontraremos con personas prejuiciosas o difíciles; si las visitamos con empatía y viéndolas con los ojos de Jehová, podemos ayudarlas a transformarse por completo.",
            shortAnswer: "Visita a las personas no por lo que son hoy, sino por lo que pueden llegar a ser cuando conozcan a Jehová.",
            references: "Hech. 9:10-17"
        }
    ] },
    { id: "12A", title: "Taller 3. Haz buenas revisitas", lema: "Busca a Saulo en la calle Recta.", lemaSource: "Hechos 9:11", image: "public_preaching.png", imageCaption: "Las demostraciones prácticas nos preparan para las objeciones del territorio.", intro: "<p>Prácticas de revisitas enfocadas en iniciar estudios bíblicos con el libro Disfrute de la vida.</p>", questions: [{ id: "12A_q1", question: "¿Cómo podemos vencer el temor a volver a visitar a alguien?", directAnswer: "Orando a Jehová por valor, preparando bien los textos que leeremos y recordando que es la verdad la que tiene poder para ayudar a la persona.", deepAnswer: "El temor se disipa cuando nos centramos en las necesidades de la persona y no en nosotros mismos. Jehová bendice el esfuerzo de los que siembran con constancia.", shortAnswer: "Vence el temor con amor por las personas cansadas del territorio.", references: "Hech. 9:11; 2 Tim. 1:7" }] },
    { id: "12B", title: "Repaso del día 4", lema: "Enseña al justo y aprenderá más.", lemaSource: "Proverbios 9:9", image: "pioneer_studying.png", imageCaption: "Repaso del cuarto día de escuela.", intro: "<p>Un repaso sobre la espiritualidad, el valor de los principios y el arte de hacer revisitas eficaces.</p>", questions: [{ id: "12B_q1", question: "¿Cómo influye el temor de Dios al buscar su guía en la Biblia?", directAnswer: "Nos ayuda a aceptar y aplicar sus consejos con respeto profundo, sin buscar excusas para desobedecer sus principios.", deepAnswer: "El temor reverente a desagradar a Jehová nos motiva a escudriñar las Escrituras con sinceridad, buscando su aprobación por encima de la nuestra.", shortAnswer: "El temor de Dios es el principio de la verdadera sabiduría práctica.", references: "Neh. 5:15; Prov. 9:10" }] },
    { id: "13A", title: "Aprende del Amo", lema: "Si alguien me ama, obedecerá mis palabras.", lemaSource: "Juan 14:23", image: "pioneer_studying.png", imageCaption: "Jesús es nuestro modelo supremo de pastor y maestro.", intro: "<p>Analicemos la personalidad de Jesús: su compasión, accesibilidad, humildad y laboriosidad.</p>", questions: [{ id: "13A_q1", question: "¿Cómo demostró Jesús compasión y accesibilidad con la gente?", directAnswer: "Jesús era apacible y hacía sentir bien a las personas; siempre estaba dispuesto a escucharlas y a ayudarlas, incluso cuando interrumpían su descanso.", deepAnswer: "Jesús imitó a la perfección a Jehová. Se ponía en el lugar de los demás y actuaba por amor. Su compasión nos motiva a ser precursores accesibles y bondadosos.", shortAnswer: "Un maestro accesible es un reflejo de la ternura de nuestro Padre Jehová.", references: "Mat. 11:28-30; Mar. 6:31-34" }] },
    { id: "13B", title: "Da cursos bíblicos (part 1)", lema: "Enseña a obedecer lo que les he mandado.", lemaSource: "Mateo 28:20", image: "public_preaching.png", imageCaption: "Dar clases de la Biblia es el método principal para hacer discípulos.", intro: "<p>Cómo prepararse bien para cada sesión de estudio pensando en las necesidades del estudiante.</p>", questions: [{ id: "13B_q1", question: "Qué implica prepararse bien para dirigir un curso bíblico?", directAnswer: "Implica estudiar la lección pensando en el estudiante: identificar qué ideas le costará comprender y cómo llegar a su corazón con oraciones específicas.", deepAnswer: "Prepararse no es solo subrayar las respuestas del libro. Debemos orar por el estudiante (Hechos 16:14) y buscar comparaciones sencillas que toquen sus sentimientos.", shortAnswer: "Prepárate pensando en la persona, no solo en la lección.", references: "Esd. 7:10; Prov. 15:28" }] },
    { id: "14A", title: "Da cursos bíblicos (part 2)", lema: "El estudiante instruido será como su maestro.", lemaSource: "Lucas 6:40", image: "public_preaching.png", imageCaption: "El uso de preguntas y ejemplos ayuda al estudiante a razonar.", intro: "<p>Cómo imitar a Jesús usando preguntas eficaces y ejemplos que capten la atención y toquen el corazón.</p>", questions: [{ id: "14A_q1", question: "¿Por qué utilizaba Jesús preguntas adicionales en su enseñanza?", directAnswer: "Las utilizaba para descubrir lo que el estudiante piensa y siente, ayudándole a llegar por sí mismo a la conclusión adecuada.", deepAnswer: "Las preguntas de opinión (como ¿Le parece lógico esto?) nos permiten saber si el estudiante realmente acepta lo que la Biblia enseña en su corazón.", shortAnswer: "Las preguntas revelan el corazón; los ejemplos iluminan la mente.", references: "Mat. 16:13, 15; Prov. 20:5" }] },
    { id: "14B", title: "Taller 4. Dirigir cursos bíblicos", lema: "Nada me da más alegría que oír que siguen en la verdad.", lemaSource: "3 Juan 4", image: "public_preaching.png", imageCaption: "Ensayos interactivos del uso del libro Disfrute de la vida.", intro: "<p>Taller práctico sobre cómo dirigir a los estudiantes a la organización de Jehová y evaluar su progreso.</p>", questions: [{ id: "14B_q1", question: "¿Cómo podemos ayudar al estudiante a progresar hacia la dedicación y el bautismo?", directAnswer: "Guiándole con franqueza y amor, enseñándole a tomar decisiones basadas en principios y animándolo a asistir a las reuniones.", deepAnswer: "Debemos repasar con regularidad las metas espirituales del estudiante. Si no progresa a pesar del esfuerzo constante, debemos pedir ayuda a Jehová para tomar una decisión sabia.", shortAnswer: "Nuestra meta es construir discípulos arraigados y firmes en la fe de Cristo.", references: "Col. 2:6, 7; 3 Juan 4" }] },
    { id: "15A", title: "Ayúdalos a ser cristianos maduros", lema: "Avancemos hacia la madurez.", lemaSource: "Hebreos 6:1", image: "pioneer_studying.png", imageCaption: "Debemos seguir ayudando a los nuevos publicadores aun después del bautismo.", intro: "<p>El papel del precursor al capacitar a los estudiantes para predicar y acompañarlos después de bautizarse.</p>", questions: [{ id: "15A_q1", question: "¿Por qué es importante seguir estudiando con el estudiante después de su bautismo?", directAnswer: "Porque los nuevos bautizados necesitan continuar madurando espiritualmente, estar bien fundamentados y aprender a tomar decisiones sólidas.", deepAnswer: "Debemos terminar de estudiar el libro 'Disfrute de la vida' con ellos para que queden firmes en la fe y puedan resistir los ataques del mundo y las tentaciones.", shortAnswer: "El bautismo es la puerta de entrada; la madurez es el camino a recorrer.", references: "Heb. 6:1; Col. 2:6, 7" }] },
    { id: "15B", title: "Repaso del día 5", lema: "Sigan en las cosas que aprendieron.", lemaSource: "2 Timoteo 3:14", image: "pioneer_studying.png", imageCaption: "Repaso final de la semana de escuela.", intro: "<p>Repaso del ejemplo de Jesús, el arte de dar cursos bíblicos y la capacitación de los nuevos discípulos.</p>", questions: [{ id: "15B_q1", question: "¿Qué cambios prácticos en tus métodos de enseñanza piensas implementar en tu precursorado?", directAnswer: "Utilizar explicaciones más sencillas, centrarme en los buenos motivos del estudiante y dirigirlo a las reuniones desde el principio.", deepAnswer: "Este repaso nos recuerda que el Gran Instructor es Jehová. Nosotros somos solo colaboradores. Mejorar nuestra enseñanza glorifica su nombre y salva vidas.", shortAnswer: "Enseñar con sencillez es la marca del verdadero maestro espiritual.", references: "2 Tim. 3:14; 1 Tim. 4:16" }] },
    { id: "16A", title: "La felicidad que viene de Jehová", lema: "La felicidad de Jehová es la fortaleza de ustedes.", lemaSource: "Nehemías 8:10", image: "public_preaching.png", imageCaption: "El gozo en el servicio a Jehová es nuestro escudo contra el desánimo.", intro: "<p>La felicidad es una cualidad espiritual que nos sostiene en las dificultades del precursorado.</p>", questions: [{ id: "16A_q1", question: "De dónde proviene la verdadera felicidad según las Escrituras?", directAnswer: "Proviene de hacer la voluntad de Jehová, contar con su espíritu santo y mantener una limpia amistad con él.", deepAnswer: "La felicidad de Jehová es una fortaleza (Neh. 8:10). No depende de que nuestras circunstancias sean fáciles, sino de saber que agradamos a Dios y tenemos una esperanza maravillosa.", shortAnswer: "El gozo del precursor no nace del territorio, sino de su relación con Dios.", references: "Sal. 119:1; Gál. 5:22" }] },
    { id: "16B", title: "Jehová bendice a los que confían en él", lema: "Confía en Jehová con todo tu corazón.", lemaSource: "Proverbios 3:5", image: "public_preaching.png", imageCaption: "Poner nuestra vida en manos de Jehová nos da paz mental.", intro: "<p>Aprende a no apoyarte en tu propio entendimiento y a confiar plenamente en las promesas divinas.</p>", questions: [{ id: "16B_q1", question: "¿Qué contraste presenta Proverbios 3:5, 6 sobre la confianza?", directAnswer: "Presenta el contraste entre confiar en la sabiduría superior de Jehová o apoyarse en el limitado y engañoso entendimiento propio.", deepAnswer: "Confiar en Jehová significa tener la seguridad de que él actuará por nuestro bien. Implica dejar que sus pensamientos guíen nuestras decisiones en todo momento.", shortAnswer: "Apoyarse en uno mismo es edificar sobre arena; confiar en Jehová es anclarse en la roca eterna.", references: "Prov. 3:5, 6; Is. 55:8, 9" }] },
    { id: "17A", title: "Nunca dejes de orar", lema: "Oren constantemente.", lemaSource: "1 Tesalonicenses 5:17", image: "pioneer_studying.png", imageCaption: "La oración es nuestro canal directo de comunicación con nuestro Padre celestial.", intro: "<p>El valor de la oración específica y sincera para obtener fuerzas y sabiduría en el ministerio.</p>", questions: [{ id: "17A_q1", question: "¿Cómo nos ayuda ser específicos en nuestras oraciones?", directAnswer: "Nos ayuda a desahogar el corazón por completo, a sentirnos más tranquilos y a percibir con mayor claridad la respuesta de Jehová.", deepAnswer: "Como Ana en el templo (1 Sam. 1:11), detallar nuestras angustias, temores y problemas nos une más a Jehová y nos ayuda a ver su mano protectora en nuestra vida.", shortAnswer: "La oración específica desarma la ansiedad y abre paso a la paz de Dios.", references: "1 Sam. 1:11; Filip. 4:6, 7" }] },
    { id: "17B", title: "Jehová aprueba a los que aguantan", lema: "Ustedes necesitan aguantar.", lemaSource: "Hebreos 10:36", image: "public_preaching.png", imageCaption: "El aguante cristiano nos hace completos a los ojos de Dios.", intro: "<p>El verdadero significado del aguante cristiano y cómo mantener el gozo bajo dificultades cotidianas.</p>", questions: [{ id: "17B_q1", question: "¿Qué es el aguante según la Biblia?", directAnswer: "Es la cualidad de mantenerse firme y no retroceder ante las pruebas, impulsados por una esperanza viva y no por simple resignación.", deepAnswer: "El aguante (Hebreos 10:36) transmuta la prueba en victoria espiritual, refinando nuestro carácter y fortaleciendo nuestra fe para resistir hasta el fin.", shortAnswer: "El aguante no es resignarse a sufrir; es avanzar con la vista fija en la corona de la vida.", references: "Sant. 1:2-4; Heb. 12:2" }] },
    { id: "18", title: "Palabras finales", lema: "Hagan todo para la gloria de Dios.", lemaSource: "1 Corintios 10:31", image: "pioneer_studying.png", imageCaption: "La conclusión del curso es solo el inicio de un ministerio fiel.", intro: "<p>Discursos finales, reflexiones de los estudiantes y resoluciones para efectuar plenamente nuestro ministerio.</p>", questions: [{ id: "18_q1", question: "¿Cómo ha influido la Escuela del Servicio de Precursor en tus metas y personalidad?", directAnswer: "Me ha ayudado a valorar más el nombre de Jehová, a amar a la hermandad de forma práctica y a depender más de la oración en el ministerio.", deepAnswer: "Al terminar el curso, la meta es poner por obra todo lo aprendido. Glorificar a Jehová con nuestro ministerio fiel y constante es la mayor satisfacción del precursor.", shortAnswer: "La escuela termina; tu ministerio continuará reflejando la sabiduría divina para siempre.", references: "1 Cor. 10:31; 2 Tim. 4:5" }] }
];

// --- DICCIONARIO DE CITAS BÍBLICAS COMPLETAS ---
const scripturesText = {
    "Is. 30:20": "Aunque Jehová les dé a ustedes pan en forma de angustia y agua en forma de opresión, tu Gran Instructor ya no se esconderá, y verás a tu Gran Instructor con tus propios ojos.",
    "Isaías 30:20": "Aunque Jehová les dé a ustedes pan en forma de angustia y agua en forma de opresión, tu Gran Instructor ya no se esconderá, y verás a tu Gran Instructor con tus propios ojos.",
    "Juan 8:28": "Por eso Jesús dijo: 'Cuando hayan levantado al Hijo del Hombre, entonces sabrán que yo soy ese y que no hago nada por mi propia iniciativa, sino que hablo de estas cosas tal como el Padre me enseñó'.",
    "Deut. 4:10": "Acuérdate del día en que estuviste de pie ante Jehová tu Dios en Horeb, cuando Jehová me dijo: 'Reúneme al pueblo para que yo les haga oír mis palabras, a fin de que aprendan a temerme todos los días que vivan en la tierra y se las enseñen a sus hijos'.",
    "Deut. 6:4-9": "Escucha, oh Israel: Jehová nuestro Dios es un solo Jehová. Ama a Jehová tu Dios con todo tu corazón, con toda tu alma y con todas tus fuerzas. Estas palabras que te estoy mandando hoy tienen que estar en tu corazón. Tienes que inculcarlas en tus hijos y hablar de ellas cuando te sientes en tu casa, cuando andes por el camino, cuando te acuestes y cuando te levantes. Átalas como un recordatorio en tu mano y que sean como una diadema en tu frente. Escríbelas en los marcos de las puertas de tu casa y en tus puertas.",
    "1 Cor. 14:23-31": "Porque todos ustedes pueden profetizar uno por uno, para que todos aprendan y todos reciban consuelo. Y los dones espirituales de los profetas deben ser controlados por los profetas. Porque Dios no es un Dios de desorden, sino de paz.",
    "Mat. 24:45-47": "¿Quién es en realidad el esclavo fiel y prudente a quien su amo nombró sobre sus sirvientes para darles su alimento al tiempo debido? Feliz es aquel esclavo si su amo, al llegar, lo encuentra haciendo eso. En verdad les digo que lo nombrará sobre todos sus bienes.",
    "Juan 17:3": "Esto significa vida eterna: que te conozcan a ti, el único Dios verdadero, y a aquel a quien tú enviaste, Jesús el Cristo.",
    "1 Ped. 2:17": "Honren a personas de todo tipo, tengan amor a toda la hermandad, teman a Dios, honren al rey.",
    "2 Tim. 3:17": "...para que el hombre de Dios sea enteramente competente y esté completamente equipado para toda buena obra.",
    "Col. 1:9, 10": "...pedir que se les llene del conocimiento exacto de su voluntad con toda sabiduría y comprensión espiritual, para que anden de una manera digna de Jehová a fin de agradarle plenamente mientras siguen dando fruto en toda buena obra y aumentando en el conocimiento exacto de Dios.",
    "Luc. 6:38b": "Porque con la medida con que ustedes midan se les volverá a medir.",
    "Mar. 4:24": "También les dijo: 'Presten atención a lo que oyen. Con la medida con que ustedes midan se les medirá a ustedes, sí, se les añadirá aún más'.",
    "Rom. 1:11, 12": "Porque tengo muchos deseos de verlos para compartir con ustedes algún don espiritual a fin de hacerlos firmes; o, más bien, para que nos animemos unos a otros mediante nuestra fe, tanto la de ustedes como la mía.",
    "Gál. 6:4": "Pero que cada uno examine sus propias acciones, y entonces tendrá motivos para alegrarse por sí mismo y no por compararse con otra persona.",
    "Prov. 9:9": "Dale al sabio y se hará más sabio. Enseña al justo y aprenderá más.",
    "2 Tim. 4:5": "Tú, sin embargo, mantén el buen juicio en todas las situaciones, soporta las dificultades, haz el trabajo de un evangelizador, cumple completamente tu ministerio.",
    "Sal. 63:3": "Porque tu amor leal es mejor que la vida, mis propios labios te darán gloria.",
    "1 Ped. 2:2": "Deseen ardientemente la leche espiritual no adulterada, para que por medio de ella crezcan hacia la salvación.",
    "Is. 50:4, 5": "El Señor Soberano Jehová me ha dado la lengua de los enseñados para que sepa responderle con las palabras adecuadas al cansado. Él me despierta mañana tras mañana; despierta mi oído para que escuche como los enseñados. El Señor Soberano Jehová me ha abierto el oído, y yo no fui rebelde. No me volví en la dirección contraria.",
    "Mat. 22:37": "Él le dijo: 'Ama a Jehová tu Dios con todo tu corazón, con toda tu alma y con toda tu mente'.",
    "Deut. 17:18-20": "Cuando se siente en el trono de su reino, tiene que escribir para sí en un libro una copia de esta Ley... Debe tenerla consigo y leerla todos los días de su vida para que aprenda a temer a Jehová su Dios... para que su corazón no se eleve por encima de sus hermanos y no se desvíe del mandamiento ni a la derecha ni a la izquierda...",
    "Salmo 63:3": "Porque tu amor leal es mejor que la vida, mis propios labios te darán gloria.",
    "Mateo 22:37": "Él le dijo: 'Ama a Jehová tu Dios con todo tu corazón, con toda tu alma y con toda tu mente'.",
    "1 Pedro 2:2": "Deseen ardientemente la leche espiritual no adulterada, para que por medio de ella crezcan hacia la salvación.",
    "Jos. 1:8": "Este libro de la Ley no debe apartarse de tu boca. Tienes que leerlo y meditar en él día y noche, a fin de que obedezcas cuidadosamente todo lo que está escrito en él; porque entonces te irá bien en tu camino y actuarás con sabiduría.",
    "2 Crón. 15:2": "Jehová estará con ustedes mientras ustedes estén con él; si lo buscan, él se dejará encontrar, pero, si lo abandonan, él los abandonará.",
    "Sal. 19:14": "Que las palabras de mi boca y la meditación de mi corazón te agraden, oh Jehová, mi Roca y mi Redentor.",
    "Sal. 77:12": "Meditaré con mucho gusto en todas tus actividades y reflexionaré en tus obras.",
    "1 Tim. 4:13-15": "Sigue dedicándote a la lectura pública, a aconsejar y a enseñar... Reflexiona en estas cosas, dedícate de lleno a ellas, para que tu progreso sea evidente a todos.",
    "1 Sam. 3:7-10": "Samuel todavía no conocía a Jehová... Entonces Jehová llamó por tercera vez: '¡Samuel!'... Y Samuel dijo: 'Habla, que tu siervo está escuchando'.",
    "Hech. 4:13": "Al ver la seguridad con que hablaban Pedro y Juan, y al darse cuenta de que eran hombres comunes y con poca educación, se quedaron asombrados. Y empezaron a reconocer que ellos habían estado con Jesús.",
    "Heb. 5:12-14": "Porque... deberían ser maestros... el alimento sólido es para personas maduras, para las que con el uso han entrenado su capacidad de discernir...",
    "Sal. 25:4": "Hazme conocer tus caminos, oh Jehová; enséñame tus sendas.",
    "Hech. 9:10-17": "En Damasco había un discípulo llamado Ananías... Y el Señor le dijo: 'Levántate, ve a la calle llamada Recta y busca en la casa de Judas a un hombre de Tarso llamado Saulo... es un vaso escogido para llevar mi nombre a las naciones...'"
};

// --- VARIABLES DE ESTADO ---
let currentLessonIndex = 0;
let currentFlashcardIndex = 0;
let isCardFlipped = false;
let currentUtterance = null;
let activeSpeakButton = null;

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
    // Cargar Tema Guardado
    const savedTheme = localStorage.getItem("pioneer_theme") || "amanecer";
    changeTheme(savedTheme);

    // Cargar Menú de Lecciones
    renderLessonsMenu();

    // Cargar Lección Inicial
    loadLesson(currentLessonIndex);
});

// --- MENÚ DE LECCIONES ---
function renderLessonsMenu() {
    const nav = document.getElementById("lessons-nav");
    nav.innerHTML = "";

    lessonsData.forEach((lesson, index) => {
        const item = document.createElement("div");
        item.className = `nav-item ${index === currentLessonIndex ? 'active' : ''}`;
        item.onclick = () => loadLesson(index);

        item.innerHTML = `
            <div class="nav-number">${lesson.id}</div>
            <div class="nav-title">${lesson.title}</div>
        `;
        nav.appendChild(item);
    });
}

// --- CARGAR LECCIÓN ---
function loadLesson(index) {
    currentLessonIndex = index;
    const lesson = lessonsData[index];

    // Detener audio si estuviera reproduciéndose
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        resetSpeakingStates();
    }

    // Actualizar nav items activos
    document.querySelectorAll(".nav-item").forEach((el, i) => {
        if (i === index) el.classList.add("active");
        else el.classList.remove("active");
    });

    // Actualizar información principal
    document.getElementById("lesson-id-badge").textContent = `Lección ${lesson.id}`;
    document.getElementById("lesson-title").textContent = lesson.title;
    document.getElementById("lesson-lema").textContent = `“${lesson.lema}”`;
    document.getElementById("lesson-lema-source").textContent = lesson.lemaSource;
    document.getElementById("lesson-intro").innerHTML = lesson.intro;

    // Actualizar Imagen e Ilustración
    document.getElementById("visual-img").src = lesson.image;
    document.getElementById("visual-caption").textContent = lesson.imageCaption;

    // Cargar Bloc de Notas
    const notes = localStorage.getItem(`pioneer_notes_${lesson.id}`) || "";
    document.getElementById("notepad").value = notes;
    updateSaveStatus("Guardado");

    // Cargar Flashcards
    currentFlashcardIndex = 0;
    isCardFlipped = false;
    document.getElementById("flashcard").classList.remove("flipped");
    updateFlashcard();

    // Renderizar Preguntas (Acordeones)
    renderQuestions(lesson);

    // Reiniciar visor de citas
    resetScriptureViewer();

    // Actualizar Barra de Progreso
    updateProgressBar();
}

// --- HELPER PARA QUITAR ACENTOS (TILDES) Y HACER BÚSQUEDA INSENSIBLE ---
function normalizeText(str) {
    if (!str) return "";
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// --- RENDERIZAR PREGUNTAS (ACORDEONES) ---
function renderQuestions(lesson) {
    const container = document.getElementById("questions-accordion");
    container.innerHTML = "";

    // Obtener estado de completado
    const completedState = JSON.parse(localStorage.getItem(`pioneer_completed_${lesson.id}`)) || {};

    lesson.questions.forEach((q, qIndex) => {
        const isCompleted = completedState[q.id] || false;

        const accordion = document.createElement("div");
        accordion.className = "accordion-item";
        accordion.id = `accordion-${q.id}`;

        // Generar spans clicables para las referencias bíblicas
        let referencesHtml = "";
        let wolSearchUrl = "https://wol.jw.org/es/wol/s/r4/lp-s?q=";
        
        if (q.references) {
            const refsArray = q.references.split(";").map(r => r.trim());
            referencesHtml = refsArray.map(ref => `
                <span class="scripture-link" onclick="showScripture('${ref}')">${ref}</span>
            `).join(" | ");
            
            wolSearchUrl += encodeURIComponent(refsArray[0]);
        } else {
            wolSearchUrl += encodeURIComponent(q.question);
        }

        accordion.innerHTML = `
            <div class="accordion-header" onclick="toggleAccordion('${q.id}')">
                <div class="accordion-title-container">
                    <div class="item-checkbox ${isCompleted ? 'checked' : ''}" 
                         id="checkbox-${q.id}" 
                         onclick="toggleCheck(event, '${lesson.id}', '${q.id}')">
                    </div>
                    <span class="accordion-title">${qIndex + 1}. ${q.question}</span>
                </div>
                <span class="accordion-icon">▼</span>
            </div>
            
            <div class="accordion-content">
                <div class="accordion-body">
                    <!-- Cabecera de 3 Pestañas -->
                    <div class="tab-header">
                        <button class="tab-btn active" id="tab-btn-direct-${q.id}" onclick="switchTab('${q.id}', 'direct')">Respuesta Directa</button>
                        <button class="tab-btn" id="tab-btn-deep-${q.id}" onclick="switchTab('${q.id}', 'deep')">Estudio Profundo</button>
                        <button class="tab-btn" id="tab-btn-quote-${q.id}" onclick="switchTab('${q.id}', 'quote')">Frase para Recordar</button>
                    </div>

                    <!-- Contenido Pestaña Directa (Sintetizada) -->
                    <div class="tab-content active" id="tab-content-direct-${q.id}">
                        <div class="direct-answer">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                                <h4>Respuesta Directa</h4>
                                <button class="speak-btn" onclick="speakText(event, 'text-direct-${q.id}', 'speak-direct-${q.id}')" id="speak-direct-${q.id}" title="Escuchar respuesta">🔊</button>
                            </div>
                            <p id="text-direct-${q.id}">${q.directAnswer}</p>
                        </div>
                    </div>

                    <!-- Contenido Pestaña Profunda -->
                    <div class="tab-content" id="tab-content-deep-${q.id}">
                        <div class="deep-answer">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                                <div id="text-deep-${q.id}" style="flex: 1;">${q.deepAnswer}</div>
                                <button class="speak-btn" onclick="speakText(event, 'text-deep-${q.id}', 'speak-deep-${q.id}')" id="speak-deep-${q.id}" style="margin-left: 8px;" title="Escuchar estudio profundo">🔊</button>
                            </div>
                            
                            <div class="ref-section">
                                <div class="ref-header">
                                    <span>Referencias y Textos Clave</span>
                                    <a href="${wolSearchUrl}" target="_blank" class="wol-link">Ver en wol.org ↗</a>
                                </div>
                                <div style="font-size:0.85rem; font-weight:600; color:var(--text-light);">
                                    ${referencesHtml || 'Sin referencias registradas.'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contenido Pestaña Corta / Frase para Recordar -->
                    <div class="tab-content" id="tab-content-quote-${q.id}">
                        <div class="short-answer">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                                <h4>Lema del Precursor</h4>
                                <button class="speak-btn" onclick="speakText(event, 'text-quote-${q.id}', 'speak-quote-${q.id}')" id="speak-quote-${q.id}" title="Escuchar lema">🔊</button>
                            </div>
                            <p id="text-quote-${q.id}">“${q.shortAnswer}”</p>
                        </div>
                    </div>

                </div>
            </div>
        `;
        container.appendChild(accordion);
    });
}

// --- CONTROL DE ACORDEONES ---
function toggleAccordion(qId) {
    const item = document.getElementById(`accordion-${qId}`);
    const isOpen = item.classList.contains("open");

    // Cerrar todos los acordeones primero
    document.querySelectorAll(".accordion-item").forEach(el => {
        el.classList.remove("open");
    });

    // Detener audio al cambiar de pregunta
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        resetSpeakingStates();
    }

    // Si no estaba abierto, abrir el actual
    if (!isOpen) {
        item.classList.add("open");
    }
}

// --- CONTROL DE PESTAÑAS (3 TABS) ---
function switchTab(qId, tabType) {
    const directBtn = document.getElementById(`tab-btn-direct-${qId}`);
    const deepBtn = document.getElementById(`tab-btn-deep-${qId}`);
    const quoteBtn = document.getElementById(`tab-btn-quote-${qId}`);
    
    const directContent = document.getElementById(`tab-content-direct-${qId}`);
    const deepContent = document.getElementById(`tab-content-deep-${qId}`);
    const quoteContent = document.getElementById(`tab-content-quote-${qId}`);

    // Detener audio al cambiar de pestaña
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        resetSpeakingStates();
    }

    // Remover estado activo de todos
    directBtn.classList.remove("active");
    deepBtn.classList.remove("active");
    quoteBtn.classList.remove("active");
    
    directContent.classList.remove("active");
    deepContent.classList.remove("active");
    quoteContent.classList.remove("active");

    // Añadir estado activo a la seleccionada
    if (tabType === 'direct') {
        directBtn.classList.add("active");
        directContent.classList.add("active");
    } else if (tabType === 'deep') {
        deepBtn.classList.add("active");
        deepContent.classList.add("active");
    } else if (tabType === 'quote') {
        quoteBtn.classList.add("active");
        quoteContent.classList.add("active");
    }
}

// --- MARCAR COMPLETADO ---
function toggleCheck(event, lessonId, qId) {
    event.stopPropagation(); // Evitar que abra el acordeón al hacer clic en el checkbox

    const checkbox = document.getElementById(`checkbox-${qId}`);
    const completedState = JSON.parse(localStorage.getItem(`pioneer_completed_${lessonId}`)) || {};

    const isCurrentlyChecked = checkbox.classList.contains("checked");

    if (isCurrentlyChecked) {
        checkbox.classList.remove("checked");
        completedState[qId] = false;
    } else {
        checkbox.classList.add("checked");
        completedState[qId] = true;
    }

    localStorage.setItem(`pioneer_completed_${lessonId}`, JSON.stringify(completedState));
    updateProgressBar();
}

// --- ACTUALIZAR BARRA DE PROGRESO ---
function updateProgressBar() {
    const lesson = lessonsData[currentLessonIndex];
    const completedState = JSON.parse(localStorage.getItem(`pioneer_completed_${lesson.id}`)) || {};
    
    let completedCount = 0;
    lesson.questions.forEach(q => {
        if (completedState[q.id]) completedCount++;
    });

    const percent = lesson.questions.length > 0 
        ? Math.round((completedCount / lesson.questions.length) * 100) 
        : 0;

    document.getElementById("progress-percent").textContent = `${percent}%`;
    document.getElementById("progress-bar").style.width = `${percent}%`;
}

// --- VISOR DE CITAS BÍBLICAS ---
function showScripture(ref) {
    // Detener audio al cambiar de cita
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        resetSpeakingStates();
    }

    const viewer = document.getElementById("scripture-viewer-content");
    const badge = document.getElementById("scripture-ref-badge");

    // Buscar en el diccionario de citas
    const text = scripturesText[ref] || scripturesText[ref.replace(/\./g, "")];

    if (text) {
        badge.textContent = ref;
        viewer.className = "scripture-text";
        viewer.innerHTML = `
            “${text}”
            <div style="margin-top: 8px; text-align: right;">
                <a href="https://wol.jw.org/es/wol/s/r4/lp-s?q=${encodeURIComponent(ref)}" target="_blank" class="wol-link" style="font-size:0.75rem;">Corroborar en wol.org ↗</a>
            </div>
        `;
    } else {
        badge.textContent = ref;
        viewer.className = "scripture-placeholder";
        viewer.innerHTML = `
            Texto bíblico no pre-cargado. 
            <br><br>
            <a href="https://wol.jw.org/es/wol/s/r4/lp-s?q=${encodeURIComponent(ref)}" target="_blank" class="wol-link">Buscar "${ref}" directamente en la Biblioteca en Línea ↗</a>
        `;
    }

    document.getElementById("scripture-viewer").scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetScriptureViewer() {
    const viewer = document.getElementById("scripture-viewer-content");
    const badge = document.getElementById("scripture-ref-badge");
    badge.textContent = "Selecciona una cita";
    viewer.className = "scripture-placeholder";
    viewer.innerHTML = `Haz clic en cualquier texto bíblico en negrita o en las referencias de las preguntas para ver su contenido completo aquí.`;
}

// --- LECTOR DE TEXTO POR VOZ (TEXT-TO-SPEECH) ---
function speakText(event, textElementId, buttonId) {
    if (event) event.stopPropagation();
    
    const textElement = document.getElementById(textElementId);
    const button = document.getElementById(buttonId);
    
    if (!textElement || !button) return;
    
    // Si ya está hablando con ESTE mismo botón, detenerlo
    if (window.speechSynthesis.speaking && activeSpeakButton === button) {
        window.speechSynthesis.cancel();
        resetSpeakingStates();
        return;
    }
    
    // Si está hablando con otro botón, detener el anterior
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        resetSpeakingStates();
    }
    
    // Obtener el texto limpio sin etiquetas HTML
    const textToSpeak = textElement.textContent || textElement.innerText;
    
    currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
    currentUtterance.lang = 'es-ES'; // Idioma Español
    
    currentUtterance.onstart = () => {
        button.classList.add("speaking");
        activeSpeakButton = button;
    };
    
    currentUtterance.onend = () => {
        resetSpeakingStates();
    };
    
    currentUtterance.onerror = () => {
        resetSpeakingStates();
    };
    
    window.speechSynthesis.speak(currentUtterance);
}

function resetSpeakingStates() {
    document.querySelectorAll(".speak-btn").forEach(btn => {
        btn.classList.remove("speaking");
    });
    currentUtterance = null;
    activeSpeakButton = null;
}

function speakScripture() {
    const textDiv = document.getElementById("scripture-viewer-content");
    if (textDiv.classList.contains("scripture-placeholder")) {
        alert("Selecciona primero una cita bíblica haciendo clic en los enlaces en negrita para escucharla.");
        return;
    }
    speakText(null, "scripture-viewer-content", "speak-scripture-btn");
}

// --- BUSCADOR TEMÁTICO DE LA ESCUELA CON TOLERANCIA A ACENTOS ---
function filterLessons() {
    const rawQuery = document.getElementById("syllabus-search").value;
    const query = normalizeText(rawQuery);
    const navItems = document.querySelectorAll(".nav-item");
    
    lessonsData.forEach((lesson, index) => {
        const item = navItems[index];
        if (!item) return;

        const matchTitle = normalizeText(lesson.title).includes(query);
        const matchId = normalizeText(lesson.id).includes(query);
        const matchLema = normalizeText(lesson.lema).includes(query);
        const matchIntro = normalizeText(lesson.intro).includes(query);
        
        let matchQuestions = false;
        if (lesson.questions) {
            matchQuestions = lesson.questions.some(q => 
                normalizeText(q.question).includes(query) ||
                normalizeText(q.directAnswer).includes(query) ||
                normalizeText(q.deepAnswer).includes(query) ||
                normalizeText(q.shortAnswer).includes(query) ||
                (q.references && normalizeText(q.references).includes(query))
            );
        }
        
        if (matchTitle || matchId || matchLema || matchIntro || matchQuestions || query === "") {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

// --- MODO CONCENTRACIÓN (MODO ZEN) ---
function toggleZenMode() {
    const container = document.querySelector(".app-container");
    container.classList.toggle("zen-active");
    
    const btn = document.getElementById("zen-toggle-btn");
    if (container.classList.contains("zen-active")) {
        btn.innerHTML = "👁️ Salir Zen";
        btn.classList.add("active");
    } else {
        btn.innerHTML = "👁️ Modo Zen";
        btn.classList.remove("active");
    }
}

// --- BLOC DE NOTAS ---
function saveNotes() {
    const lesson = lessonsData[currentLessonIndex];
    const notes = document.getElementById("notepad").value;
    localStorage.setItem(`pioneer_notes_${lesson.id}`, notes);
    updateSaveStatus("Guardando...");
    
    // Simular un pequeño retardo visual
    setTimeout(() => {
        updateSaveStatus("Guardado localmente");
    }, 500);
}

function updateSaveStatus(status) {
    document.getElementById("save-status").textContent = status;
}

function exportNotes() {
    const lesson = lessonsData[currentLessonIndex];
    const notes = document.getElementById("notepad").value;

    if (!notes.trim()) {
        alert("El bloc de notas está vacío. Escribe algo antes de exportar.");
        return;
    }

    const blob = new Blob([
        `NOTAS DE ESTUDIO - LECCIÓN ${lesson.id}\n`,
        `Tema: ${lesson.title}\n`,
        `Fecha de Exportación: ${new Date().toLocaleDateString()}\n`,
        `==================================================\n\n`,
        notes
    ], { type: "text/plain;charset=utf-8" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Notas_Precursor_Leccion_${lesson.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// --- TARJETAS DE MEMORIZACIÓN (FLASHCARDS) ---
function updateFlashcard() {
    const lesson = lessonsData[currentLessonIndex];
    const card = lesson.flashcards ? lesson.flashcards[currentFlashcardIndex] : null;

    if (card) {
        document.getElementById("flashcard-ref").textContent = card.ref;
        document.getElementById("flashcard-text").textContent = `“${card.text}”`;
    } else {
        document.getElementById("flashcard-ref").textContent = "Estudio Diario";
        document.getElementById("flashcard-text").textContent = "Medita y efectúa tu ministerio plenamente.";
    }
}

function flipCard() {
    const fc = document.getElementById("flashcard");
    isCardFlipped = !isCardFlipped;
    if (isCardFlipped) {
        fc.classList.add("flipped");
    } else {
        fc.classList.remove("flipped");
    }
}

function nextFlashcard(event) {
    event.stopPropagation();
    const lesson = lessonsData[currentLessonIndex];
    if (lesson.flashcards && lesson.flashcards.length > 0) {
        currentFlashcardIndex = (currentFlashcardIndex + 1) % lesson.flashcards.length;
        isCardFlipped = false;
        document.getElementById("flashcard").classList.remove("flipped");
        setTimeout(updateFlashcard, 150);
    }
}

function prevFlashcard(event) {
    event.stopPropagation();
    const lesson = lessonsData[currentLessonIndex];
    if (lesson.flashcards && lesson.flashcards.length > 0) {
        currentFlashcardIndex = (currentFlashcardIndex - 1 + lesson.flashcards.length) % lesson.flashcards.length;
        isCardFlipped = false;
        document.getElementById("flashcard").classList.remove("flipped");
        setTimeout(updateFlashcard, 150);
    }
}

// --- GESTIÓN DE TEMAS VISUALES ---
function changeTheme(themeName) {
    document.body.classList.remove("theme-amanecer", "theme-atardecer", "theme-nocturno", "theme-jw");
    document.body.classList.add(`theme-${themeName}`);

    document.querySelectorAll(".theme-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    document.getElementById(`btn-${themeName}`).classList.add("active");

    localStorage.setItem("pioneer_theme", themeName);
}
