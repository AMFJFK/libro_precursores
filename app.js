// --- LÓGICA DE LA APLICACIÓN ---
// --- VARIABLES DE ESTADO ---
let currentLessonIndex = 0;
let currentFlashcardIndex = 0;
let isCardFlipped = false;
let currentUtterance = null;
let activeSpeakButton = null;
let isGlobalFlashcardMode = false;
let globalFlashcards = [];
let currentGlobalFlashcardIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Cargar Tema Guardado (Forzado a JW.ORG)
    changeTheme("jw");

    // Cargar Menú de Lecciones
    renderLessonsMenu();

    // Cargar Lección Inicial
    loadLesson(currentLessonIndex);

    // Inicializar Resaltador de Texto
    initTextHighlighter();
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

    // Actualizar Horario de la Lección en el Badge
    if (typeof updateLessonScheduleBadge === "function") {
        updateLessonScheduleBadge(lesson.id);
    }

    // Resaltar coincidencias de búsqueda si las hay
    const rawQuery = document.getElementById("syllabus-search").value;
    if (rawQuery) {
        highlightMatches(document.querySelector(".main-content"), rawQuery);
    }
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

        if (q.subtitle) {
            const subtitleEl = document.createElement("h3");
            subtitleEl.className = "lesson-subtitle";
            subtitleEl.textContent = q.subtitle;
            container.appendChild(subtitleEl);
        }

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

        let contentHtml = "";

        if (q.subQuestions && q.subQuestions.length > 0) {
            // Render sub-accordion container
            let subItemsHtml = "";
            q.subQuestions.forEach((subQ, sIdx) => {
                const isSubCompleted = completedState[subQ.id] || false;
                const subDirectHtml = localStorage.getItem(`pioneer_html_text-direct-${subQ.id}`) || subQ.directAnswer;
                const subDeepHtml = localStorage.getItem(`pioneer_html_text-deep-${subQ.id}`) || subQ.deepAnswer;
                const subQuoteHtml = localStorage.getItem(`pioneer_html_text-quote-${subQ.id}`) || `“${subQ.shortAnswer}”`;
                
                // Generar spans clicables para las referencias de la subpregunta
                let subRefsHtml = "";
                let subWolSearchUrl = "https://wol.jw.org/es/wol/s/r4/lp-s?q=";
                if (subQ.references) {
                    const refsArray = subQ.references.split(";").map(r => r.trim());
                    subRefsHtml = refsArray.map(ref => `
                        <span class="scripture-link" onclick="showScripture('${ref}')">${ref}</span>
                    `).join(" | ");
                    subWolSearchUrl += encodeURIComponent(refsArray[0]);
                } else {
                    subWolSearchUrl += encodeURIComponent(subQ.question);
                }

                subItemsHtml += `
                    <div class="sub-accordion-item" id="sub-accordion-${subQ.id}">
                        <div class="sub-accordion-header" onclick="toggleSubAccordion('${subQ.id}')">
                            <div class="sub-accordion-title-container">
                                <div class="sub-item-checkbox ${isSubCompleted ? 'checked' : ''}" 
                                     id="sub-checkbox-${subQ.id}" 
                                     onclick="toggleSubCheck(event, '${lesson.id}', '${q.id}', '${subQ.id}')">
                                </div>
                                <span class="sub-accordion-title">${String.fromCharCode(97 + sIdx)}) ${subQ.question}</span>
                            </div>
                            <span class="sub-accordion-icon">▼</span>
                        </div>
                        <div class="sub-accordion-content">
                            ${subQ.note ? `
                            <div class="question-note-callout" style="margin: 8px 12px 16px 12px;">
                                <div class="question-note-title">Nota / Observación</div>
                                <p class="question-note-text">${subQ.note}</p>
                            </div>
                            ` : ''}
                            <!-- Cabecera de 3 Pestañas para el hijo -->
                            <div class="tab-header sub-tab-header">
                                <button class="tab-btn active" id="tab-btn-direct-${subQ.id}" onclick="switchTab('${subQ.id}', 'direct')">Respuesta Directa</button>
                                <button class="tab-btn" id="tab-btn-deep-${subQ.id}" onclick="switchTab('${subQ.id}', 'deep')">Estudio Profundo</button>
                                <button class="tab-btn" id="tab-btn-quote-${subQ.id}" onclick="switchTab('${subQ.id}', 'quote')">Lema</button>
                            </div>
                            
                            <!-- Contenido Pestaña Directa -->
                            <div class="tab-content active" id="tab-content-direct-${subQ.id}">
                                <div class="direct-answer">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                                        <h4>Respuesta Directa</h4>
                                        <button class="speak-btn" onclick="speakText(event, 'text-direct-${subQ.id}', 'speak-direct-${subQ.id}')" id="speak-direct-${subQ.id}" title="Escuchar respuesta">🔊</button>
                                    </div>
                                    <p id="text-direct-${subQ.id}">${subDirectHtml}</p>
                                </div>
                            </div>
                            
                            <!-- Contenido Pestaña Profunda -->
                            <div class="tab-content" id="tab-content-deep-${subQ.id}">
                                <div class="deep-answer">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                                        <div id="text-deep-${subQ.id}" style="flex: 1;">${subDeepHtml}</div>
                                        <button class="speak-btn" onclick="speakText(event, 'text-deep-${subQ.id}', 'speak-deep-${subQ.id}')" id="speak-deep-${subQ.id}" style="margin-left: 8px;" title="Escuchar estudio profundo">🔊</button>
                                    </div>
                                    <div class="ref-section">
                                        <div class="ref-header">
                                            <span>Referencias y Textos Clave</span>
                                            <a href="${subWolSearchUrl}" target="_blank" class="wol-link">Ver en wol.org ↗</a>
                                        </div>
                                        <div style="font-size:0.85rem; font-weight:600; color:var(--text-light);">
                                            ${subRefsHtml || 'Sin referencias registradas.'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Contenido Pestaña Lema -->
                            <div class="tab-content" id="tab-content-quote-${subQ.id}">
                                <div class="short-answer">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                                        <h4>Lema del Precursor</h4>
                                        <button class="speak-btn" onclick="speakText(event, 'text-quote-${subQ.id}', 'speak-quote-${subQ.id}')" id="speak-quote-${subQ.id}" title="Escuchar lema">🔊</button>
                                    </div>
                                    <p id="text-quote-${subQ.id}">${subQuoteHtml}</p>
                                </div>
                            </div>
                            
                            <!-- Sección de Respuesta Personal -->
                            <div class="personal-answer-container">
                                <div class="personal-answer-title">
                                    <span>Mi Respuesta Personal</span>
                                    <span class="personal-answer-status" id="personal-ans-status-${subQ.id}"></span>
                                </div>
                                <textarea class="personal-answer-textarea" 
                                          id="personal-ans-${subQ.id}" 
                                          placeholder="Escribe tu propia respuesta o notas aquí... Se guardan automáticamente." 
                                          oninput="savePersonalAnswer('${lesson.id}', '${subQ.id}')"></textarea>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            contentHtml = `
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
                        <div class="sub-accordion-container">
                            ${subItemsHtml}
                        </div>
                    </div>
                </div>
            `;
        } else {
            const directHtml = localStorage.getItem(`pioneer_html_text-direct-${q.id}`) || q.directAnswer;
            const deepHtml = localStorage.getItem(`pioneer_html_text-deep-${q.id}`) || q.deepAnswer;
            const quoteHtml = localStorage.getItem(`pioneer_html_text-quote-${q.id}`) || `“${q.shortAnswer}”`;

            // Render standard layout
            contentHtml = `
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
                        ${q.note ? `
                        <div class="question-note-callout">
                            <div class="question-note-title">Observación / Nota</div>
                            <p class="question-note-text">${q.note}</p>
                        </div>
                        ` : ''}
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
                                <p id="text-direct-${q.id}">${directHtml}</p>
                            </div>
                        </div>

                        <!-- Contenido Pestaña Profunda -->
                        <div class="tab-content" id="tab-content-deep-${q.id}">
                            <div class="deep-answer">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                                    <div id="text-deep-${q.id}" style="flex: 1;">${deepHtml}</div>
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
                                <p id="text-quote-${q.id}">${quoteHtml}</p>
                            </div>
                        </div>

                        <!-- Sección de Respuesta Personal -->
                        <div class="personal-answer-container">
                            <div class="personal-answer-title">
                                <span>Mi Respuesta Personal</span>
                                <span class="personal-answer-status" id="personal-ans-status-${q.id}"></span>
                            </div>
                            <textarea class="personal-answer-textarea" 
                                      id="personal-ans-${q.id}" 
                                      placeholder="Escribe tu propia respuesta o notas para esta pregunta aquí... Se guardan automáticamente." 
                                      oninput="savePersonalAnswer('${lesson.id}', '${q.id}')"></textarea>
                        </div>
                    </div>
                </div>
            `;
        }

        accordion.innerHTML = contentHtml;
        container.appendChild(accordion);

        // Cargar respuestas personales
        if (q.subQuestions && q.subQuestions.length > 0) {
            q.subQuestions.forEach(subQ => {
                const subPersonalAnswer = localStorage.getItem(`pioneer_personal_ans_${subQ.id}`) || "";
                const subTa = accordion.querySelector(`#personal-ans-${subQ.id}`);
                if (subTa) {
                    subTa.value = subPersonalAnswer;
                }
            });
        } else {
            const personalAnswer = localStorage.getItem(`pioneer_personal_ans_${q.id}`) || "";
            const ta = accordion.querySelector(`#personal-ans-${q.id}`);
            if (ta) {
                ta.value = personalAnswer;
            }
        }
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

function toggleCheck(event, lessonId, qId) {
    event.stopPropagation(); // Evitar que abra el acordeón al hacer clic en el checkbox

    const checkbox = document.getElementById(`checkbox-${qId}`);
    const completedState = JSON.parse(localStorage.getItem(`pioneer_completed_${lessonId}`)) || {};
    const isCurrentlyChecked = checkbox.classList.contains("checked");
    
    // Buscar la pregunta
    const lesson = lessonsData.find(l => l.id === lessonId);
    let subQuestions = [];
    if (lesson) {
        const q = lesson.questions.find(item => item.id === qId);
        if (q && q.subQuestions) {
            subQuestions = q.subQuestions;
        }
    }

    if (isCurrentlyChecked) {
        checkbox.classList.remove("checked");
        completedState[qId] = false;
        // Desmarcar todos los hijos
        subQuestions.forEach(sq => {
            completedState[sq.id] = false;
            const subCheckbox = document.getElementById(`sub-checkbox-${sq.id}`);
            if (subCheckbox) subCheckbox.classList.remove("checked");
        });
    } else {
        checkbox.classList.add("checked");
        completedState[qId] = true;
        // Marcar todos los hijos
        subQuestions.forEach(sq => {
            completedState[sq.id] = true;
            const subCheckbox = document.getElementById(`sub-checkbox-${sq.id}`);
            if (subCheckbox) subCheckbox.classList.add("checked");
        });
    }

    localStorage.setItem(`pioneer_completed_${lessonId}`, JSON.stringify(completedState));
    updateProgressBar();
}
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

    // Calcular progreso global
    let totalQuestions = 0;
    let totalCompleted = 0;

    lessonsData.forEach(l => {
        const comp = JSON.parse(localStorage.getItem(`pioneer_completed_${l.id}`)) || {};
        l.questions.forEach(q => {
            totalQuestions++;
            if (comp[q.id]) {
                totalCompleted++;
            }
        });
    });

    const globalPercent = totalQuestions > 0
        ? Math.round((totalCompleted / totalQuestions) * 100)
        : 0;

    const globalPercentEl = document.getElementById("global-progress-percent");
    const globalBarEl = document.getElementById("global-progress-bar");
    if (globalPercentEl && globalBarEl) {
        globalPercentEl.textContent = `${globalPercent}% (${totalCompleted}/${totalQuestions})`;
        globalBarEl.style.width = `${globalPercent}%`;
    }
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

    // Resaltar términos de búsqueda en el contenido de la lección activa
    highlightMatches(document.querySelector(".main-content"), rawQuery);
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
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function compileGlobalFlashcards() {
    globalFlashcards = [];
    lessonsData.forEach(lesson => {
        if (lesson.flashcards) {
            lesson.flashcards.forEach(card => {
                globalFlashcards.push({
                    ...card,
                    lessonId: lesson.id
                });
            });
        }
    });
    shuffleArray(globalFlashcards);
}

function toggleFlashcardMode() {
    isGlobalFlashcardMode = !isGlobalFlashcardMode;
    const btn = document.getElementById("flashcard-mode-btn");
    
    if (isGlobalFlashcardMode) {
        btn.textContent = "Modo: Global";
        btn.classList.add("active");
        compileGlobalFlashcards();
        currentGlobalFlashcardIndex = 0;
    } else {
        btn.textContent = "Modo: Lección";
        btn.classList.remove("active");
        currentFlashcardIndex = 0;
    }
    
    isCardFlipped = false;
    document.getElementById("flashcard").classList.remove("flipped");
    updateFlashcard();
}

function updateFlashcard() {
    let card = null;
    if (isGlobalFlashcardMode) {
        if (globalFlashcards.length === 0) {
            compileGlobalFlashcards();
        }
        card = globalFlashcards[currentGlobalFlashcardIndex];
    } else {
        const lesson = lessonsData[currentLessonIndex];
        card = (lesson.flashcards && lesson.flashcards.length > 0) ? lesson.flashcards[currentFlashcardIndex] : null;
    }

    if (card) {
        document.getElementById("flashcard-ref").textContent = card.ref + (isGlobalFlashcardMode ? ` (Lección ${card.lessonId})` : "");
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
    if (event) event.stopPropagation();
    if (isGlobalFlashcardMode) {
        if (globalFlashcards.length > 0) {
            currentGlobalFlashcardIndex = (currentGlobalFlashcardIndex + 1) % globalFlashcards.length;
            isCardFlipped = false;
            document.getElementById("flashcard").classList.remove("flipped");
            setTimeout(updateFlashcard, 150);
        }
    } else {
        const lesson = lessonsData[currentLessonIndex];
        if (lesson.flashcards && lesson.flashcards.length > 0) {
            currentFlashcardIndex = (currentFlashcardIndex + 1) % lesson.flashcards.length;
            isCardFlipped = false;
            document.getElementById("flashcard").classList.remove("flipped");
            setTimeout(updateFlashcard, 150);
        }
    }
}

function prevFlashcard(event) {
    if (event) event.stopPropagation();
    if (isGlobalFlashcardMode) {
        if (globalFlashcards.length > 0) {
            currentGlobalFlashcardIndex = (currentGlobalFlashcardIndex - 1 + globalFlashcards.length) % globalFlashcards.length;
            isCardFlipped = false;
            document.getElementById("flashcard").classList.remove("flipped");
            setTimeout(updateFlashcard, 150);
        }
    } else {
        const lesson = lessonsData[currentLessonIndex];
        if (lesson.flashcards && lesson.flashcards.length > 0) {
            currentFlashcardIndex = (currentFlashcardIndex - 1 + lesson.flashcards.length) % lesson.flashcards.length;
            isCardFlipped = false;
            document.getElementById("flashcard").classList.remove("flipped");
            setTimeout(updateFlashcard, 150);
        }
    }
}

// --- GESTIÓN DE TEMAS VISUALES ---
function changeTheme(themeName) {
    // Forzado a tema JW.ORG azul
    document.body.classList.remove("theme-amanecer", "theme-atardecer", "theme-nocturno", "theme-jw");
    document.body.classList.add("theme-jw");
    localStorage.setItem("pioneer_theme", "jw");
}

// --- AUTO-GUARDADO DE RESPUESTA PERSONAL ---
function savePersonalAnswer(lessonId, qId) {
    const textarea = document.getElementById(`personal-ans-${qId}`);
    if (!textarea) return;
    const value = textarea.value;
    localStorage.setItem(`pioneer_personal_ans_${qId}`, value);
    
    const statusSpan = document.getElementById(`personal-ans-status-${qId}`);
    if (statusSpan) {
        statusSpan.textContent = "Guardando...";
        if (textarea.saveTimeout) clearTimeout(textarea.saveTimeout);
        textarea.saveTimeout = setTimeout(() => {
            statusSpan.textContent = "Guardado localmente";
        }, 500);
    }
}

// --- COPIA DE SEGURIDAD (BACKUP) Y RESTAURACIÓN ---
function exportBackup() {
    const backupData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("pioneer_")) {
            backupData[key] = localStorage.getItem(key);
        }
    }
    
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Copia_Seguridad_Precursores_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            let importedCount = 0;
            for (const key in data) {
                if (key.startsWith("pioneer_")) {
                    localStorage.setItem(key, data[key]);
                    importedCount++;
                }
            }
            if (importedCount > 0) {
                alert(`¡Copia de seguridad importada con éxito! Se restauraron ${importedCount} elementos. La página se recargará ahora.`);
                window.location.reload();
            } else {
                alert("El archivo no contiene datos válidos de esta aplicación (claves 'pioneer_').");
            }
        } catch (err) {
            alert("Error al leer el archivo. Asegúrate de que es un archivo JSON de copia de seguridad válido.");
            console.error(err);
        }
    };
    reader.readAsText(file);
}

// --- MOTOR DE RESALTADO DE BÚSQUEDA ---
function highlightMatches(element, query) {
    clearHighlights(element);
    if (!query || !query.trim()) return;
    highlightTextNodes(element, query.trim());
}

function clearHighlights(element) {
    if (!element) return;
    const highlights = element.querySelectorAll('mark.search-highlight');
    highlights.forEach(mark => {
        const parent = mark.parentNode;
        if (parent) {
            const textNode = document.createTextNode(mark.textContent);
            parent.replaceChild(textNode, mark);
            parent.normalize();
        }
    });
}

function highlightTextNodes(element, query) {
    if (!element || !query) return;
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) return;

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const nodesToReplace = [];

    let currentNode = walker.nextNode();
    while (currentNode) {
        if (currentNode.parentNode &&
            currentNode.parentNode.nodeName !== 'MARK' &&
            currentNode.parentNode.nodeName !== 'SCRIPT' &&
            currentNode.parentNode.nodeName !== 'STYLE' &&
            currentNode.parentNode.nodeName !== 'TEXTAREA' &&
            !currentNode.parentNode.classList.contains('wol-link')) {
            
            const normalizedText = normalizeText(currentNode.nodeValue);
            if (normalizedText.includes(normalizedQuery)) {
                nodesToReplace.push(currentNode);
            }
        }
        currentNode = walker.nextNode();
    }

    nodesToReplace.forEach(node => {
        const text = node.nodeValue;
        const normalizedText = normalizeText(text);
        const parent = node.parentNode;
        
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let matchIndex = normalizedText.indexOf(normalizedQuery, lastIndex);
        
        while (matchIndex !== -1) {
            if (matchIndex > lastIndex) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex, matchIndex)));
            }
            
            const mark = document.createElement('mark');
            mark.className = 'search-highlight';
            mark.appendChild(document.createTextNode(text.substring(matchIndex, matchIndex + normalizedQuery.length)));
            fragment.appendChild(mark);
            
            lastIndex = matchIndex + normalizedQuery.length;
            matchIndex = normalizedText.indexOf(normalizedQuery, lastIndex);
        }
        
        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }
        
        parent.replaceChild(fragment, node);
    });
}

// --- PROGRAMA DE LA ESCUELA DE PRECURSORES 2026 ---
const schoolTimeline = {
    lunes: [
        { time: "08:25 - 09:00", title: "Apertura y Lección 1(a)", desc: "Canción 81 y oración. ¿Qué te espera en la Escuela del Servicio de Precursor?", lessonId: "1A" },
        { time: "09:00 - 10:15", title: "Lección 1(b)", desc: "Fortalece tu amistad con Jehová", lessonId: "1B" },
        { time: "10:15 - 10:30", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "10:30 - 12:00", title: "Lección 2(a)", desc: "La Traducción del Nuevo Mundo (parte 1)", lessonId: "2A" },
        { time: "12:00 - 13:00", title: "Almuerzo", desc: "Pausa de mediodía (Traer propio almuerzo)", isBreak: true },
        { time: "13:00 - 14:25", title: "Lección 2(b)", desc: "La Traducción del Nuevo Mundo (parte 2)", lessonId: "2B" },
        { time: "14:25 - 14:40", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "14:40 - 16:00", title: "Lección 3(a)", desc: "Mantente al día", lessonId: "3A" },
        { time: "16:00 - 16:35", title: "Lección 3(b) y Cierre", desc: "Repaso del día 1. Canción 73 y oración", lessonId: "3B" }
    ],
    martes: [
        { time: "08:25 - 09:30", title: "Apertura y Lección 4(a)", desc: "Canción 67 y oración. La soberanía de Jehová y la santificación de su nombre", lessonId: "4A" },
        { time: "09:30 - 10:30", title: "Lección 4(b)", desc: "Interésate sinceramente por los demás", lessonId: "4B" },
        { time: "10:30 - 10:45", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "10:45 - 12:00", title: "Lección 5(a)", desc: "La predicación de casa en casa: el método principal para llegar a las personas", lessonId: "5A" },
        { time: "12:00 - 13:00", title: "Almuerzo", desc: "Pausa de mediodía", isBreak: true },
        { time: "13:00 - 14:25", title: "Lección 5(b) - Taller 1", desc: "La predicación de casa en casa: el método principal para llegar a las personas", lessonId: "5B" },
        { time: "14:25 - 14:40", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "14:40 - 16:00", title: "Lección 6(a)", desc: "Mujeres que alegran a Jehová", lessonId: "6A" },
        { time: "16:00 - 16:35", title: "Lección 6(b) y Cierre", desc: "Repaso del día 2. Canción 58 y oración", lessonId: "6B" }
    ],
    miercoles: [
        { time: "08:25 - 09:30", title: "Apertura y Lección 7(a)", desc: "Canción 70 y oración. Cómo te ayudan las instrucciones y los consejos", lessonId: "7A" },
        { time: "09:30 - 10:30", title: "Lección 7(b)", desc: "Lucha contra “el espíritu del mundo”", lessonId: "7B" },
        { time: "10:30 - 10:45", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "10:45 - 12:00", title: "Lección 8(a)", desc: "Lleva una vida íntegra", lessonId: "8A" },
        { time: "12:00 - 13:00", title: "Almuerzo", desc: "Pausa de mediodía", isBreak: true },
        { time: "13:00 - 14:25", title: "Lección 8(b)", desc: "Participa en las diferentes formas de predicación", lessonId: "8B" },
        { time: "14:25 - 14:40", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "14:40 - 16:00", title: "Lección 9(a) - Taller 2", desc: "Participa en las diferentes formas de predicación", lessonId: "9A" },
        { time: "16:00 - 16:35", title: "Lección 9(b) y Cierre", desc: "Repaso del día 3. Canción 57 y oración", lessonId: "9B" }
    ],
    jueves: [
        { time: "08:25 - 09:30", title: "Apertura y Lección 10(a)", desc: "Canción 77 y oración. Valora el papel de Jesús", lessonId: "10A" },
        { time: "09:30 - 10:30", title: "Lección 10(b)", desc: "Piensa en principios", lessonId: "10B" },
        { time: "10:30 - 10:45", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "10:45 - 12:00", title: "Lección 11(a)", desc: "Evalúa tu progreso como persona espiritual", lessonId: "11A" },
        { time: "12:00 - 13:00", title: "Almuerzo", desc: "Pausa de mediodía", isBreak: true },
        { time: "13:00 - 14:25", title: "Lección 11(b)", desc: "Haz buenas revisitas", lessonId: "11B" },
        { time: "14:25 - 14:40", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "14:40 - 16:00", title: "Lección 12(a) - Taller 3", desc: "Haz buenas revisitas", lessonId: "12A" },
        { time: "16:00 - 16:35", title: "Lección 12(b) y Cierre", desc: "Repaso del día 4. Canción 60 y oración", lessonId: "12B" }
    ],
    viernes: [
        { time: "08:25 - 09:30", title: "Apertura y Lección 13(a)", desc: "Canción 68 y oración. Aprende del Amo", lessonId: "13A" },
        { time: "09:30 - 10:30", title: "Lección 13(b)", desc: "Da cursos bíblicos que motiven al estudiante a progresar (parte 1)", lessonId: "13B" },
        { time: "10:30 - 10:45", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "10:45 - 12:00", title: "Lección 14(a)", desc: "Da cursos bíblicos que motiven al estudiante a progresar (parte 2)", lessonId: "14A" },
        { time: "12:00 - 13:00", title: "Almuerzo", desc: "Pausa de mediodía", isBreak: true },
        { time: "13:00 - 14:25", title: "Lección 14(b) - Taller 4", desc: "Da cursos bíblicos que motiven al estudiante a progresar", lessonId: "14B" },
        { time: "14:25 - 14:40", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "14:40 - 16:00", title: "Lección 15(a)", desc: "Ayúdalos a ser cristianos maduros", lessonId: "15A" },
        { time: "16:00 - 16:35", title: "Lección 15(b) y Cierre", desc: "Repaso del día 5. Canción 79 y oración", lessonId: "15B" }
    ],
    sabado: [
        { time: "08:25 - 09:30", title: "Apertura y Lección 16(a)", desc: "Canción 76 y oración. La felicidad que viene de Jehová es tu fortaleza", lessonId: "16A" },
        { time: "09:30 - 10:30", title: "Lección 16(b)", desc: "Jehová bendice a los que confían en él", lessonId: "16B" },
        { time: "10:30 - 10:45", title: "Pausa", desc: "Recreo de 15 minutos", isBreak: true },
        { time: "10:45 - 12:00", title: "Lección 17(a)", desc: "Nunca dejes de orar", lessonId: "17A" },
        { time: "12:00 - 13:00", title: "Almuerzo", desc: "Pausa de mediodía", isBreak: true },
        { time: "13:00 - 14:00", title: "Lección 17(b)", desc: "Jehová da su aprobación a los que aguantan", lessonId: "17B" },
        { time: "14:00 - 14:10", title: "Pausa", desc: "Recreo de 10 minutos", isBreak: true },
        { time: "14:10 - 14:30", title: "Lección 18", desc: "Comentarios finales de los estudiantes (Instructor A)", lessonId: "18" },
        { time: "14:30 - 14:50", title: "Discurso Final", desc: "Impartido por Instructor B" },
        { time: "14:50 - 15:15", title: "Conclusión", desc: "Discurso final y conclusión (Instructor A). Canción 84 y oración" }
    ]
};

let currentScheduleDay = 'lunes';

function updateLessonScheduleBadge(lessonId) {
    const scheduleBadge = document.getElementById("lesson-schedule-badge");
    if (!scheduleBadge) return;
    
    let foundEvent = null;
    let foundDay = "";
    for (const day in schoolTimeline) {
        const ev = schoolTimeline[day].find(e => e.lessonId === lessonId);
        if (ev) {
            foundEvent = ev;
            foundDay = day;
            break;
        }
    }
    
    if (foundEvent) {
        const daySpanish = foundDay.charAt(0).toUpperCase() + foundDay.slice(1)
            .replace('miercoles', 'miércoles')
            .replace('sabado', 'sábado');
        scheduleBadge.textContent = `📅 ${daySpanish}, ${foundEvent.time}`;
        scheduleBadge.style.display = "inline-block";
    } else {
        scheduleBadge.style.display = "none";
    }
}

function openScheduleModal() {
    const modal = document.getElementById("schedule-modal");
    modal.classList.add("open");
    renderScheduleDay(currentScheduleDay);
}

function closeScheduleModal() {
    const modal = document.getElementById("schedule-modal");
    modal.classList.remove("open");
}

function switchScheduleDay(day) {
    currentScheduleDay = day;
    document.querySelectorAll(".modal-tab-btn").forEach(btn => {
        const btnText = btn.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (btnText === day) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    renderScheduleDay(day);
}

function renderScheduleDay(day) {
    const container = document.getElementById("schedule-day-content");
    container.innerHTML = "";
    
    const events = schoolTimeline[day];
    if (!events) return;
    
    const activeLesson = lessonsData[currentLessonIndex];
    
    events.forEach(ev => {
        const item = document.createElement("div");
        const isCurrent = activeLesson && ev.lessonId === activeLesson.id;
        item.className = `schedule-item ${ev.isBreak ? 'break-item' : ''} ${isCurrent ? 'current-item' : ''}`;
        
        let badgeLinkHtml = "";
        if (ev.lessonId) {
            badgeLinkHtml = `<span class="schedule-badge-link" onclick="goToLessonFromSchedule('${ev.lessonId}')">Ir a Lección ${ev.lessonId} ➔</span>`;
        }
        
        item.innerHTML = `
            <div class="schedule-time">${ev.time}</div>
            <div class="schedule-details">
                <div class="schedule-title">${ev.title}</div>
                <div class="schedule-desc">${ev.desc}</div>
                ${badgeLinkHtml}
            </div>
        `;
        container.appendChild(item);
    });
}

function goToLessonFromSchedule(lessonId) {
    closeScheduleModal();
    const lessonIdx = lessonsData.findIndex(l => l.id === lessonId);
    if (lessonIdx !== -1) {
        loadLesson(lessonIdx);
    }
}

function toggleSubAccordion(subId) {
    const item = document.getElementById(`sub-accordion-${subId}`);
    const isOpen = item.classList.contains("open");
    
    // Cerrar todos los sub-acordeones de este padre
    const parentContainer = item.closest(".sub-accordion-container");
    if (parentContainer) {
        parentContainer.querySelectorAll(".sub-accordion-item").forEach(el => {
            el.classList.remove("open");
        });
    }
    
    // Detener audio al cambiar
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        resetSpeakingStates();
    }
    
    if (!isOpen) {
        item.classList.add("open");
    }
}

function toggleSubCheck(event, lessonId, parentId, subId) {
    event.stopPropagation();
    
    const checkbox = document.getElementById(`sub-checkbox-${subId}`);
    const completedState = JSON.parse(localStorage.getItem(`pioneer_completed_${lessonId}`)) || {};
    
    const isCurrentlyChecked = checkbox.classList.contains("checked");
    if (isCurrentlyChecked) {
        checkbox.classList.remove("checked");
        completedState[subId] = false;
    } else {
        checkbox.classList.add("checked");
        completedState[subId] = true;
    }
    
    localStorage.setItem(`pioneer_completed_${lessonId}`, JSON.stringify(completedState));
    
    // Recalcular estado del padre
    const lesson = lessonsData.find(l => l.id === lessonId);
    if (lesson) {
        const parentQ = lesson.questions.find(q => q.id === parentId);
        if (parentQ && parentQ.subQuestions) {
            const allChecked = parentQ.subQuestions.every(sq => completedState[sq.id] === true);
            const parentCheckbox = document.getElementById(`checkbox-${parentId}`);
            if (parentCheckbox) {
                if (allChecked) {
                    parentCheckbox.classList.add("checked");
                    completedState[parentId] = true;
                } else {
                    parentCheckbox.classList.remove("checked");
                    completedState[parentId] = false;
                }
                localStorage.setItem(`pioneer_completed_${lessonId}`, JSON.stringify(completedState));
            }
        }
    }
    updateProgressBar();
}

// --- RESALTADOR DE TEXTO FLOTANTE ---
function initTextHighlighter() {
    // Crear el elemento de la barra flotante
    const toolbar = document.createElement("div");
    toolbar.id = "highlighter-toolbar";
    toolbar.innerHTML = `
        <button class="highlighter-color-btn" style="background-color: #fef08a;" onclick="highlightSelection('#fef08a')" title="Resaltar Amarillo"></button>
        <button class="highlighter-color-btn" style="background-color: #bbf7d0;" onclick="highlightSelection('#bbf7d0')" title="Resaltar Verde"></button>
        <button class="highlighter-color-btn" style="background-color: #bfdbfe;" onclick="highlightSelection('#bfdbfe')" title="Resaltar Azul"></button>
        <button class="highlighter-color-btn" style="background-color: #fbcfe8;" onclick="highlightSelection('#fbcfe8')" title="Resaltar Rosa"></button>
        <button class="highlighter-clear-btn" onclick="clearSelectionHighlight()" title="Quitar Resaltado">Borrar</button>
    `;
    document.body.appendChild(toolbar);

    // Registrar eventos para detectar la selección de texto
    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("keyup", handleTextSelection);
    document.addEventListener("touchend", handleTextSelection);
}

function handleTextSelection() {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) {
        hideHighlighterToolbar();
        return;
    }

    // Buscar el contenedor de respuesta más cercano con ID que empiece por "text-"
    let node = selection.anchorNode;
    let textEl = null;
    while (node) {
        if (node.id && node.id.startsWith("text-")) {
            textEl = node;
            break;
        }
        node = node.parentNode;
    }

    if (!textEl) {
        hideHighlighterToolbar();
        return;
    }

    // Mostrar barra flotante cerca de la selección
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const toolbar = document.getElementById("highlighter-toolbar");
    
    if (toolbar) {
        const toolbarWidth = toolbar.offsetWidth || 230;
        const left = rect.left + window.scrollX + (rect.width / 2) - (toolbarWidth / 2);
        const top = rect.top + window.scrollY - 45;
        
        toolbar.style.left = `${Math.max(10, left)}px`;
        toolbar.style.top = `${top}px`;
        toolbar.style.display = "flex";
    }
}

function hideHighlighterToolbar() {
    const toolbar = document.getElementById("highlighter-toolbar");
    if (toolbar) {
        toolbar.style.display = "none";
    }
}

function highlightSelection(color) {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;

    // Buscar el contenedor de respuesta más cercano con ID que empiece por "text-"
    let node = selection.anchorNode;
    let textEl = null;
    while (node) {
        if (node.id && node.id.startsWith("text-")) {
            textEl = node;
            break;
        }
        node = node.parentNode;
    }
    if (!textEl) return;

    const elementId = textEl.id;

    textEl.contentEditable = true;
    document.execCommand("backColor", false, color);
    textEl.contentEditable = false;

    // Guardar el HTML resultante
    localStorage.setItem(`pioneer_html_${elementId}`, textEl.innerHTML);

    // Limpiar selección
    window.getSelection().removeAllRanges();
    hideHighlighterToolbar();
}

function clearSelectionHighlight() {
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;

    // Buscar el contenedor de respuesta más cercano con ID que empiece por "text-"
    let node = selection.anchorNode;
    let textEl = null;
    while (node) {
        if (node.id && node.id.startsWith("text-")) {
            textEl = node;
            break;
        }
        node = node.parentNode;
    }
    if (!textEl) return;

    const elementId = textEl.id;

    textEl.contentEditable = true;
    document.execCommand("backColor", false, "rgba(0,0,0,0)");
    textEl.contentEditable = false;

    // Guardar el HTML resultante
    localStorage.setItem(`pioneer_html_${elementId}`, textEl.innerHTML);

    // Limpiar selección
    window.getSelection().removeAllRanges();
    hideHighlighterToolbar();
}


