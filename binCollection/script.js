document.addEventListener('DOMContentLoaded', function() {
    const calendarBody = document.getElementById('calendar-body');
    const year = 2024;
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let greenBinNext = true; 

    function getDayInfo(date) {
        const day = date.getDay();
        const dateNumber = date.getDate();

        
        if (day === 2) { 
            let binInfo = '';
            if (greenBinNext) {
                binInfo = 'green';
            } else {
                binInfo = 'brown-black';
            }
          
            greenBinNext = !greenBinNext;
            return binInfo;
        }
        return '';
    }

    function renderCalendar(year) {
        for (let month = 0; month < 12; month++) {
            const monthDiv = document.createElement('div');
            monthDiv.className = 'month';

            const monthName = document.createElement('div');
            monthName.className = 'month-name';
            monthName.textContent = months[month];
            monthDiv.appendChild(monthName);

            const weekdaysDiv = document.createElement('div');
            weekdaysDiv.className = 'weekdays';
            weekdays.forEach(day => {
                const dayDiv = document.createElement('div');
                dayDiv.textContent = day;
                weekdaysDiv.appendChild(dayDiv);
            });
            monthDiv.appendChild(weekdaysDiv);

            const daysDiv = document.createElement('div');
            daysDiv.className = 'days';

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            
            for (let i = 0; i < firstDay; i++) {
                const emptyDiv = document.createElement('div');
                daysDiv.appendChild(emptyDiv);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = new Date(year, month, day);
                const dayDiv = document.createElement('div');
                dayDiv.className = 'calendar-day';
                dayDiv.innerHTML = `<div class="day-number">${day}</div>`;

                const dayInfo = getDayInfo(currentDate);
                if (dayInfo) {
                    dayDiv.classList.add(dayInfo);
                    dayDiv.innerHTML += `<div class="bin-info">${dayInfo.replace('-', ' & ')}</div>`;
                }

                daysDiv.appendChild(dayDiv);
            }

            
            const lastDay = new Date(year, month, daysInMonth).getDay();
            const daysToEndOfWeek = (7 - lastDay - 1 + 7) % 7; 
            for (let i = 0; i < daysToEndOfWeek; i++) {
                const emptyDiv = document.createElement('div');
                daysDiv.appendChild(emptyDiv);
            }

            monthDiv.appendChild(daysDiv);
            calendarBody.appendChild(monthDiv);
        }
    }

    renderCalendar(year);
});
