
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:3000/data",
        method: "GET",
        dataType: "json",
        success: function(data) {
            data.forEach(row => {
                row.data = new Date(row.data).toLocaleDateString('pt-BR');
                if(row.descricao){
                    const match = row.descricao.match(/\d{6}/);
                    if (match) row.descricao = match[0];
                    else row.descricao = null;
                }
                if(row.nf_id) row.nf_id = "NF " + row.nf_id;
                if(row.ano) row.emissao = row.ano + "/" + row.mes;
                else row.emissao = null
                if (row.posto == "01") row.posto = "LEUCKERT";
                if (row.tipolancamento == 1) row.tipolancamento = "ENTRADA";
                else if (row.tipolancamento == -1) row.tipolancamento = "SAÍDA";
                if (row.forma_pgto == 1) row.forma_pgto = "CHEQUE";
                else if (row.forma_pgto == 2) row.forma_pgto = "DINHEIRO";
                if (row.cod_ip == "r1taq") row.cod_ip = "taquara";
                else if (row.cod_ip == "r2taq") row.cod_ip = "recepçaoc";
            });

            
        },
        error: function(xhr, status, error) {
            console.error("Error fetching data:", error);
        }
    });
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
      const startDate = $("#startDate").val();
      const endDate = $("#endDate").val();
      const rowDate = data[0]; // Date is in the first column (index 0)

      if (startDate && endDate) {
          const rowDateObj = moment(rowDate, "DD/MM/YYYY");
          const startDateObj = moment(startDate, "YYYY-MM-DD");
          const endDateObj = moment(endDate, "YYYY-MM-DD");

          return rowDateObj.isBetween(startDateObj, endDateObj, "days", "[]");
      }

      return true; // No filtering if dates are not set
  });

  // Apply the filter when the button is clicked
  $("#filterButton").on("click", function() {
      table.draw();
  });
});