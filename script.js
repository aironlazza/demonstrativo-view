$(document).ready(function() {
    $('h1').click(function() {
        $(this).css('color', 'blue');
    });
    $.ajax({
        url: "http://localhost:3000/data",
        method: "GET",
        dataType: "json",
        success: function(data) {
            data.forEach(row => {
                row.data = new Date(row.data).toLocaleDateString('pt-BR')
                if(row.posto == "01"){
                    row.posto = "LEUCKERT";
                }
                if(row.tipolancamento == 1){
                    row.tipolancamento = "ENTRADA";
                }
                else if(row.tipolancamento == -1){
                    row.tipolancamento = "SAÍDA";
                }
                if(row.forma_pgto == 1){
                    row.forma_pgto = "CHEQUE";
                }
                else if(row.forma_pgto == 2){
                    row.forma_pgto = "DINHEIRO";
                }
                if(row.cod_ip == "r1taq"){
                    row.cod_ip = "taquara";
                }
                else if(row.cod_ip == "r2taq"){
                    row.cod_ip = "recepçaoc";
                }
                
            });
            
            $("#tabela").DataTable({
                paging: true,
                searching: true,
                ordering: true,
                data: data,
                columns: [
                    {data: "data"},
                    {data: "posto"},
                    {data: "cod_ip"},
                    {data: "tipolancamento"},
                    {data: "destinatario_nome"},
                    {data: "forma_pgto"},
                    {data: "cod_usu"},
                    {data: "valorprevisto"},
                    {data: "desconto"},
                    {data: "acrescimo"},
                    {data: "valor"},
                    {data: "descricao"},
                    {data: "nf_id"},
                    {data: "nf_id"},
                ],
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching data:", error);
        }
    });
    
});