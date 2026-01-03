class ChecklistManager {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        // Carregar dados do dia atual
        const dayDataStr = localStorage.getItem('currentDayData');
        if (dayDataStr) {
            const dayData = JSON.parse(dayDataStr);
            this.dayNumber = dayData.dayNumber;
            this.date = new Date(dayData.date);
            this.dateStr = dayData.dateStr;
            
            // Atualizar título do checklist
            const titleEl = document.getElementById('checklistTitle');
            if (titleEl) {
                titleEl.textContent = `${this.dateStr} - ${String(this.dayNumber).padStart(3, '0')}/365`;
            }
        } else {
            // Se não houver dados, usar data atual
            const today = new Date();
            this.date = today;
            this.dateStr = today.toLocaleDateString('pt-BR');
            const start = new Date(today.getFullYear(), 0, 0);
            const diff = today - start;
            this.dayNumber = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            const titleEl = document.getElementById('checklistTitle');
            if (titleEl) {
                titleEl.textContent = `${this.dateStr} - ${String(this.dayNumber).padStart(3, '0')}/365`;
            }
        }

        // Carregar itens do checklist
        this.items = StorageManager.getChecklistItems().map(item => ({
            ...item,
            status: 'pending' // pending, completed, skipped
        }));

        // Verificar se há checklist em andamento
        const currentChecklist = StorageManager.getCurrentChecklist();
        if (currentChecklist) {
            this.items = currentChecklist.items;
        }

        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const backBtn = document.getElementById('backBtn');
        const addItemBtn = document.getElementById('addItemBtn');
        const finishBtn = document.getElementById('finishBtn');
        const addItemModal = document.getElementById('addItemModal');
        const newItemInput = document.getElementById('newItemInput');
        const cancelAddBtn = document.getElementById('cancelAddBtn');
        const confirmAddBtn = document.getElementById('confirmAddBtn');

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.saveState();
                window.location.href = getRelativePath('index.html');
            });
        }

        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => {
                addItemModal.classList.remove('hidden');
                newItemInput.focus();
            });
        }

        if (cancelAddBtn) {
            cancelAddBtn.addEventListener('click', () => {
                addItemModal.classList.add('hidden');
                newItemInput.value = '';
            });
        }

        if (confirmAddBtn) {
            confirmAddBtn.addEventListener('click', () => {
                const title = newItemInput.value.trim();
                if (title) {
                    this.addItem(title);
                    addItemModal.classList.add('hidden');
                    newItemInput.value = '';
                }
            });
        }

        if (finishBtn) {
            finishBtn.addEventListener('click', () => {
                // Mostrar seção de pontuação
                this.showFinishSection();
                // Scroll para a seção
                const finishSection = document.getElementById('finishSection');
                if (finishSection) {
                    finishSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    // Adicionar botão de salvar na seção
                    setTimeout(() => {
                        const existingSaveBtn = document.getElementById('saveFinishBtn');
                        if (!existingSaveBtn) {
                            const saveBtn = document.createElement('button');
                            saveBtn.id = 'saveFinishBtn';
                            saveBtn.className = 'btn btn-primary';
                            saveBtn.textContent = 'Salvar e Finalizar';
                            saveBtn.style.width = '100%';
                            saveBtn.style.marginTop = '1rem';
                            saveBtn.addEventListener('click', () => {
                                this.finishChecklist();
                            });
                            finishSection.appendChild(saveBtn);
                        }
                    }, 100);
                }
            });
        }

        // Enter key no input
        if (newItemInput) {
            newItemInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    confirmAddBtn.click();
                }
            });
        }
    }

    addItem(title) {
        const newItem = {
            id: Date.now().toString(),
            title: title,
            status: 'pending'
        };
        this.items.push(newItem);
        this.render();
        this.saveState();
    }

    toggleItem(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            if (item.status === 'completed') {
                item.status = 'pending';
            } else {
                item.status = 'completed';
            }
            this.render();
            this.saveState();
        }
    }

    skipItem(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.status = 'skipped';
            this.render();
            this.saveState();
        }
    }

    unskipItem(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.status = 'pending';
            this.render();
            this.saveState();
        }
    }

    calculateScore() {
        if (this.items.length === 0) return 0;
        
        const completed = this.items.filter(i => i.status === 'completed').length;
        const total = this.items.length;
        const percentage = (completed / total) * 100;
        
        return Math.round(percentage);
    }

    getScoreColor(score) {
        if (score >= 80) return '#22c55e';
        if (score >= 60) return '#4ade80';
        if (score >= 40) return '#eab308';
        if (score >= 20) return '#f97316';
        return '#ef4444';
    }

    showFinishSection() {
        const finishSection = document.getElementById('finishSection');
        if (finishSection) {
            finishSection.classList.remove('hidden');
            this.render(); // Atualizar pontuação
        }
    }

    finishChecklist() {
        const score = this.calculateScore();
        const completedItems = this.items.filter(i => i.status === 'completed').length;
        const totalItems = this.items.length;
        
        // Usar a data do dia selecionado
        const recordDate = this.date || new Date();
        
        const record = {
            id: StorageManager.getDateKey(recordDate),
            date: recordDate,
            score: score,
            completedItems: completedItems,
            totalItems: totalItems
        };

        StorageManager.saveDailyRecord(record);
        StorageManager.clearCurrentChecklist();
        
        // Redirecionar para home
        window.location.href = getRelativePath('index.html');
    }

    render() {
        const container = document.getElementById('checklistItems');
        const completedCount = document.getElementById('completedCount');
        const totalCount = document.getElementById('totalCount');
        const progressBar = document.getElementById('progressBar');
        const finishSection = document.getElementById('finishSection');
        const finishBtn = document.getElementById('finishBtn');

        if (!container) return;

        container.innerHTML = '';

        this.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `checklist-item ${item.status === 'completed' ? 'completed' : ''} ${item.status === 'skipped' ? 'skipped' : ''}`;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `item-${item.id}`;
            checkbox.checked = item.status === 'completed';
            checkbox.disabled = item.status === 'skipped';
            checkbox.addEventListener('change', () => this.toggleItem(item.id));

            const label = document.createElement('label');
            label.htmlFor = `item-${item.id}`;
            label.textContent = item.title;
            if (item.status === 'skipped') {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.6';
            }

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'item-actions';

            if (item.status === 'skipped') {
                const unskipBtn = document.createElement('button');
                unskipBtn.className = 'skip-btn';
                unskipBtn.textContent = 'Desfazer';
                unskipBtn.title = 'Desfazer pular';
                unskipBtn.addEventListener('click', () => this.unskipItem(item.id));
                actionsDiv.appendChild(unskipBtn);
            } else {
                const skipBtn = document.createElement('button');
                skipBtn.className = 'skip-btn';
                skipBtn.textContent = 'Pular';
                skipBtn.title = 'Pular este item';
                skipBtn.addEventListener('click', () => this.skipItem(item.id));
                actionsDiv.appendChild(skipBtn);
            }

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            itemDiv.appendChild(actionsDiv);
            container.appendChild(itemDiv);
        });

        const completed = this.items.filter(i => i.status === 'completed').length;
        const total = this.items.length;
        const progress = total > 0 ? (completed / total) * 100 : 0;

        if (completedCount) completedCount.textContent = completed;
        if (totalCount) totalCount.textContent = total;
        if (progressBar) progressBar.style.width = `${progress}%`;

        // Atualizar seção de pontuação sempre (será mostrada quando necessário)
        if (finishSection) {
            const finalScore = document.getElementById('finalScore');
            const completedInfo = document.getElementById('completedInfo');
            const scoreColor = document.getElementById('scoreColor');

            const score = this.calculateScore();
            if (finalScore) finalScore.textContent = `${score}/100`;
            
            if (completedInfo) {
                const skipped = this.items.filter(i => i.status === 'skipped').length;
                let info = `${completed} de ${total} completados`;
                if (skipped > 0) {
                    info += ` (${skipped} pulados)`;
                }
                completedInfo.textContent = info;
            }

            if (scoreColor) {
                scoreColor.style.backgroundColor = this.getScoreColor(score);
            }
        }

        // Mostrar botão de finalizar sempre que houver itens
        if (finishBtn) {
            finishBtn.style.display = total > 0 ? 'block' : 'none';
        }
    }

    saveState() {
        const state = {
            items: this.items
        };
        StorageManager.saveCurrentChecklist(state);
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new ChecklistManager();
});
