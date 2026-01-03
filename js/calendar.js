class CalendarManager {
    constructor() {
        this.year = 2026;
        this.records = StorageManager.getDailyRecords();
    }

    render() {
        const container = document.getElementById('allMonthsContainer');
        if (!container) return;

        container.innerHTML = '';

        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        // Renderizar todos os 12 meses
        for (let month = 0; month < 12; month++) {
            this.renderMonth(container, month, monthNames[month], this.year);
        }
    }

    renderMonth(container, month, monthName, year) {
        // Container do mês
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month-container';

        // Cabeçalho do mês
        const monthHeader = document.createElement('div');
        monthHeader.className = 'month-header';
        monthHeader.textContent = monthName;
        monthContainer.appendChild(monthHeader);

        // Dias da semana
        const weekdays = document.createElement('div');
        weekdays.className = 'calendar-weekdays';
        const weekdayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        weekdayNames.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            weekdays.appendChild(dayDiv);
        });
        monthContainer.appendChild(weekdays);

        // Grid do calendário
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        // Primeiro dia do mês
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Dia da semana do primeiro dia (0 = Domingo, 6 = Sábado)
        const startDay = firstDay.getDay();
        
        // Dias do mês anterior para preencher
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        
        // Renderizar dias do mês anterior (opacidade reduzida)
        for (let i = startDay - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            const date = new Date(year, month - 1, day);
            this.createDayCell(date, true, grid);
        }

        // Renderizar dias do mês atual
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            this.createDayCell(date, false, grid);
        }

        // Preencher até completar 6 semanas (42 dias)
        const totalCells = grid.children.length;
        const remainingCells = 42 - totalCells;
        
        for (let day = 1; day <= remainingCells; day++) {
            const date = new Date(year, month + 1, day);
            this.createDayCell(date, true, grid);
        }

        monthContainer.appendChild(grid);
        container.appendChild(monthContainer);
    }

    createDayCell(date, isOtherMonth, container) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = date.getDate();

        if (isOtherMonth) {
            dayDiv.classList.add('other-month');
        }

        // Verificar se é hoje
        const today = new Date();
        if (this.isSameDay(date, today)) {
            dayDiv.classList.add('today');
        }

        // Verificar se há registro para este dia
        const record = this.getRecordForDate(date);
        if (record) {
            dayDiv.classList.add('has-record');
            dayDiv.classList.add(this.getScoreClass(record.score));
        }

        // Event listener para mostrar detalhes
        dayDiv.addEventListener('click', () => {
            if (record) {
                this.showDayDetails(date, record);
            }
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

    showDayDetails(date, record) {
        const detailsDiv = document.getElementById('dayDetails');
        const titleDiv = document.getElementById('dayDetailsTitle');
        const contentDiv = document.getElementById('dayDetailsContent');

        if (!detailsDiv || !titleDiv || !contentDiv) return;

        const dateStr = date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        titleDiv.textContent = dateStr;

        contentDiv.innerHTML = `
            <p><strong>Nota:</strong> ${Math.round(record.score)}/100</p>
            <p><strong>Itens completados:</strong> ${record.completedItems || 0} de ${record.totalItems || 0}</p>
            <div class="score-color" style="background-color: ${this.getScoreColor(record.score)}"></div>
        `;

        detailsDiv.classList.remove('hidden');
    }

    getScoreColor(score) {
        if (score >= 80) return '#22c55e';
        if (score >= 60) return '#4ade80';
        if (score >= 40) return '#eab308';
        if (score >= 20) return '#f97316';
        return '#ef4444';
    }

    refresh() {
        this.records = StorageManager.getDailyRecords();
        this.render();
    }
}
