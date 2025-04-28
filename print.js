let body = $("body");
let lastDate = null;
let valorComNota = 0;
let valorSemNota = 0;
let total = 0;
console.log("here")
body.find("table tbody tr").each(function () {
    let row = $(this);
    console.log(row)
    console.log(row.find("td").eq(0).text());
    let date = row.find("td").eq(0).text();
    if (lastDate && date !== lastDate) {
        console.log("appending footer")
        row.before(`
            <div class="footerContainer">
                <h4>Data: ${lastDate}</h4>
                <div class="footerValores">
                    <div>Valor sem nota: ${valorSemNota}</div>
                    <div>Valor com nota: ${valorComNota}</div>
                    <div>Valor total: ${total}</div>
                </div>
            </div>
            `);
        lastDate = date;
        valorComNota = 0;
        valorSemNota = 0;
        total = 0;
    }
    if (row.find("td").eq(3).text().trim() === "ENTRADA") {
        console.log("entrada")
        let valor = parseFloat(row.find("td").eq(10).text().replace(",", "."));
        console.log(valor)
        if (row.find("td").eq(12).text().trim()) {
            valorComNota += valor;
        } else {
            valorSemNota += valor;
        }
        total += valor;
    }

});