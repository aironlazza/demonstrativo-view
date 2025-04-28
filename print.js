let body = $("body");
let lastDate = null;
let valorComNota = 0;
let valorSemNota = 0;
let total = 0;
body.find(".header").before(`<div>teste</div>`)
body.find("table tbody tr").each(function () {
    let row = $(this);
    console.log(row)
    let date = row.find("td").eq(0).text();
    if (lastDate && date !== lastDate) {
        console.log("appending footer")
        row.before(`
            <tr>
                <th colspan="4">${lastDate}</th>
                <th colspan="1">Valor Sem Nota: R$${valorSemNota.toFixed(2)}</th>
                <th colspan="5">Valor Com Nota: R$${valorComNota.toFixed(2)}</th>
                <th colspan="4">Valor Total: R$${total.toFixed(2)}</th>
			</tr>
            `);
        valorComNota = 0;
        valorSemNota = 0;
        total = 0;
    }
    if (row.find("td").eq(3).text().trim() === "ENTRADA") {
        let valor = parseFloat(row.find("td").eq(10).text().replace(",", "."));
        if (row.find("td").eq(12).text().trim()) {
            valorComNota += valor;
        } else {
            valorSemNota += valor;
        }
        total += valor;
    }
    lastDate = date;
});