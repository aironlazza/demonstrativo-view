$(document).ready(function() {
    $('h1').click(function() {
        $(this).css('color', 'blue');
    });
    $("#tabela").DataTable({
      paging: true,
      searching: true,
      ordering: true,
      ajax: {
        url: "http://localhost:3000/data",
        dataSrc: "",
      },
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
});