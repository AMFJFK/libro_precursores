// --- LÓGICA DE LA APLICACIÓN ---
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
