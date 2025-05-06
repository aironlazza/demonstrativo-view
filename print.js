if (typeof jQuery === "undefined") {
	const script = document.createElement("script");
	script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
	script.onload = function () {
		console.log("jQuery loaded dynamically.");
		initializePrintLogic(); // Call your dependent logic here
	};
	document.head.appendChild(script);
} else {
	console.log("jQuery is already loaded.");
	initializePrintLogic(); // jQuery is already loaded
}

function initializePrintLogic() {
	// Your dependent code here
	let lastDate = null;
	let valorComNota = 0;
	let valorSemNota = 0;
	let valorDia = 0;
	let totalComNota = 0;
	let totalSemNota = 0;
	let totalPeriodo = 0;
	let body = $("body");

	body.find("table tbody tr").each(function () {
		let row = $(this);
		let date = row.find("td").eq(0).text();
		if (lastDate && date !== lastDate) {
			console.log("appending footer");
			row.before(`
                <tr class="footerRow page-break-after">
                    <td colspan="4">Dia: ${lastDate}</td>
                    <td colspan="1">Valor Sem Nota: R$${valorSemNota.toFixed(2)}</td>
                    <td colspan="5">Valor Com Nota: R$${valorComNota.toFixed(2)}</td>
                    <td colspan="4">Valor Total: R$${valorDia.toFixed(2)}</td>
                </tr>
                `);
			valorComNota = 0;
			valorSemNota = 0;
			valorDia = 0;
		}
        else if(row.is(":last-child")){
            row.after(`
                <tr class="footerRow page-break-after">
                    <td colspan="4">Dia: ${date}</td>
                    <td colspan="1">Valor Sem Nota: R$${valorSemNota.toFixed(2)}</td>
                    <td colspan="5">Valor Com Nota: R$${valorComNota.toFixed(2)}</td>
                    <td colspan="4">Valor Total: R$${valorDia.toFixed(2)}</td>
                </tr>
                `);
        }
		if (row.find("td").eq(3).text().trim() === "ENTRADA") {
			let valor = parseFloat(row.find("td").eq(10).text().replace(",", "."));
			if (row.find("td").eq(12).text().trim()) {
				valorComNota += valor;
				totalComNota += valor;
			} else {
				valorSemNota += valor;
				totalSemNota += valor;
			}
			valorDia += valor;
			totalPeriodo += valor;
		}
		lastDate = date;
	});
	//find a table with the class dataTable and place a div after it with the totalPeriodo value
	body.find("table.dataTable").after(`
        <div id="valores">
            <div>
                <p>Período: ${$("#headerStartDate").text().trim()}</p>
                <p>Até: ${$("#headerEndDate").text().trim()}</p>
            </div>
            <div>
                <p>Total Com Nota: R$${totalComNota.toFixed(2)}</p>
                <p>Total Sem Nota: R$${totalSemNota.toFixed(2)}</p>
            </div>
            <div>
                <p>Total Período: R$${totalPeriodo.toFixed(2)}</p>
            </div>
        </div>
    `);
}
