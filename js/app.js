const calendar = document.getElementById("calendar");

let currentMonth = new Date().getMonth();

let currentYear = new Date().getFullYear();

let selectedDay = null;

const firstDay =
    new Date(currentYear, currentMonth, 1).getDay();

const daysInMonth =
    new Date(currentYear, currentMonth + 1, 0).getDate();

for(let i = 0; i < firstDay; i++){

    const empty =
        document.createElement("div");

    calendar.appendChild(empty);
}

for(let day = 1; day <= daysInMonth; day++){

    const cell =
        document.createElement("div");

    cell.className = "day";

    cell.innerHTML = `
        <div class="day-number">${day}</div>
        <div id="events-${day}"></div>
    `;

    cell.onclick = () => openModal(day);

    calendar.appendChild(cell);

    loadEvents(day);
}

function openModal(day){

    selectedDay = day;

    document.getElementById("modal")
        .style.display = "block";

    document.getElementById("selectedDate")
        .innerText =
        `Compromissos - ${day}/${currentMonth + 1}/${currentYear}`;
}

function closeModal(){

    document.getElementById("modal")
        .style.display = "none";

    document.getElementById("eventText")
        .value = "";
}

function saveEvent(){

    const text =
        document.getElementById("eventText")
        .value;

    if(!text) return;

    const key = `nov2026_${selectedDay}`;

    const events =
        JSON.parse(
            localStorage.getItem(key)
        ) || [];

    events.push(text);

    localStorage.setItem(
        key,
        JSON.stringify(events)
    );

    loadEvents(selectedDay);

    closeModal();
}

function loadEvents(day){

    const key =
        `nov2026_${day}`;

    const events =
        JSON.parse(
            localStorage.getItem(key)
        ) || [];

    const container =
        document.getElementById(
            `events-${day}`
        );

    if(!container) return;

    container.innerHTML = "";

    events.forEach(event => {

        const div =
            document.createElement("div");

        div.className = "event";

        div.innerText = event;

        container.appendChild(div);
    });
}
