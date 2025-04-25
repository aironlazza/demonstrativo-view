$(document).ready(function () {
	let table;
	$.ajax({
		url: "http://localhost:3000/data",
		method: "GET",
		dataType: "json",
		success: function (data) {
			data.forEach((row) => {
				row.data = new Date(row.data).toLocaleDateString("pt-BR");
				if (row.descricao) {
					const match = row.descricao.match(/\d{6}/);
					if (match) row.descricao = match[0];
					else row.descricao = null;
				}
				if (row.nf_id) row.nf_id = "NF " + row.nf_id;
				if (row.ano) row.emissao = row.ano + "/" + row.mes;
				else row.emissao = null;
				if (row.posto == "01") row.posto = "LEUCKERT";
				if (row.tipolancamento == 1) row.tipolancamento = "ENTRADA";
				else if (row.tipolancamento == -1) row.tipolancamento = "SAÍDA";
				if (row.forma_pgto == 1) row.forma_pgto = "CHEQUE";
				else if (row.forma_pgto == 2) row.forma_pgto = "DINHEIRO";
				if (row.cod_ip == "r1taq") row.cod_ip = "taquara";
				else if (row.cod_ip == "r2taq") row.cod_ip = "recepçaoc";
			});
			table = $("#tabela").DataTable({
				lengthChange: false,
				pageLength: 25,
				paging: true,
				searching: true,
				ordering: false,
				language: {
					url: "//cdn.datatables.net/plug-ins/2.2.2/i18n/pt-BR.json",
				},
				data: data,
				columns: [
					{ data: "data" },
					{ data: "posto" },
					{ data: "cod_ip" },
					{ data: "tipolancamento" },
					{ data: "destinatario_nome" },
					{ data: "forma_pgto" },
					{ data: "cod_usu" },
					{ data: "valorprevisto" },
					{ data: "desconto" },
					{ data: "acrescimo" },
					{ data: "valor" },
					{ data: "descricao" },
					{ data: "nf_id" },
					{ data: "emissao" },
				],
			});
		},
		error: function (xhr, status, error) {
			console.error("Error fetching data:", error);
		},
	});
	$.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
		const startDate = $("#startDate").val();
		const endDate = $("#endDate").val();
		const rowDate = data[0]; // Date is in the first column (index 0)
		console.log(startDate);
		console.log(endDate);
		console.log(rowDate);

		if (startDate && endDate) {
			const rowDateObj = moment(rowDate, "DD/MM/YYYY");
			const startDateObj = moment(startDate, "YYYY-DD-MM");
			const endDateObj = moment(endDate, "YYYY-DD-MM");

			return rowDateObj.isBetween(startDateObj, endDateObj, "days", "[]");
		}

		return true; // No filtering if dates are not set
	});

	// Apply the filter when the button is clicked
	$("#filterButton").on("click", function () {
		table.draw();
		
	});
});
