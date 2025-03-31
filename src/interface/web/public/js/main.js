const form = document.getElementById('calc-form');
const historyList = document.getElementById('history-list');

async function fetchHistory() {
    const res = await fetch('/history');
    const data = await res.json();

    historyList.innerHTML = '';
    data.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.operand1} ${item.operator} ${item.operand2} = ${item.result}`;

        const reuseBtn = document.createElement('button');
        reuseBtn.textContent = '↺ Réutiliser';
        reuseBtn.onclick = async () => {
            const res = await fetch('/history/clone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    operand1: item.operand1,
                    operand2: item.operand2,
                    operator: item.operator,
                }),
            });
            await fetchHistory();
        };

        li.appendChild(reuseBtn);
        historyList.appendChild(li);
    });
}

form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.operand1 = Number(data.operand1);
    data.operand2 = Number(data.operand2);

    await fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    await fetchHistory();
    form.reset();
};

window.onload = fetchHistory;
