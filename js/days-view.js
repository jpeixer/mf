class DaysViewManager {
    constructor() {
        this.year = 2026;
        this.records = StorageManager.getDailyRecords();
    }

    // Calcular o número do dia do ano (1-365)
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    // Obter data a partir do número do dia do ano
    getDateFromDayOfYear(year, dayOfYear) {
        const date = new Date(year, 0, 1);
        date.setDate(dayOfYear);
        return date;
    }

    render() {
        const container = document.getElementById('daysContainer');
        if (!container) return;

        container.innerHTML = '';

        // Criar 365 quadrados (um para cada dia do ano)
        for (let dayNum = 1; dayNum <= 365; dayNum++) {
            const date = this.getDateFromDayOfYear(this.year, dayNum);
            this.createDaySquare(container, dayNum, date);
        }
    }

    createDaySquare(container, dayNum, date) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-square';
        dayDiv.textContent = String(dayNum).padStart(3, '0');

        // Verificar se há registro para este dia
        const record = this.getRecordForDate(date);
        if (record) {
            dayDiv.classList.add('has-record');
            dayDiv.classList.add(this.getScoreClass(record.score));
        }

        // Verificar se é hoje
        const today = new Date();
        if (this.isSameDay(date, today)) {
            dayDiv.classList.add('today');
        }

        // Event listener para abrir checklist
        dayDiv.addEventListener('click', () => {
            // Passar o número do dia e a data via URL ou localStorage
            const dayData = {
                dayNumber: dayNum,
                date: date.toISOString(),
                dateStr: date.toLocaleDateString('pt-BR')
            };
            localStorage.setItem('currentDayData', JSON.stringify(dayData));
            window.location.href = getRelativePath('checklist.html');
        });

        container.appendChild(dayDiv);
    }

    getRecordForDate(date) {
        const dateKey = StorageManager.getDateKey(date);
        return this.records.find(r => {
            const recordDate = new Date(r.date);
            return StorageManager.getDateKey(recordDate) === dateKey;
        });
    }

    getScoreClass(score) {
        if (score >= 80) return 'score-excellent';
        if (score >= 60) return 'score-good';
        if (score >= 40) return 'score-regular';
        if (score >= 20) return 'score-bad';
        return 'score-very-bad';
    }

    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    refresh() {
        this.records = StorageManager.getDailyRecords();
        this.render();
    }
}

