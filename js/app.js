let datos = '';
$(document).ready(function(){
    $.ajax({
       type: "GET",
       dataType: "json",
       cache: true,
       data:{name:'snorlax'},
       url: "https://api.pokemontcg.io/v1/cards",
       beforeSend: function(){
           $(".respuesta").html('Esperando respuesta...');
       },
       success: function(data){
         datos = data;
         bloque(datos);
         $(".respuesta").html('¡Aquí tienes a tus pokemones!');
       },
       fail: function(jqXHR, textStatus, errorThrown){
         $(".respuesta").html('Hubo un error al llamar a la API. Error: '+ errorThrown);
       }
    });
    //el click para abrir el modal
    //contenedor del ajax ->  evento -> selector al que le voy a dar click
    $(".pokemones").on('click', '.modals',function(){
        var id = $(this).attr('data-id');
        modalcont(id);
        $('#modal').foundation('open');
    });

    const bloque = pokemons => {
        let template = ``;
        $.each(pokemons.cards,function(key, pokemon){
            //console.log(pokemon);
            template += `
            <div class="pokemon">
                <a href="javascript:void(0)" class="modals" data-id="${pokemon.id}">
                    <img src="${pokemon.imageUrl}">
                    <p>${pokemon.name}</p>
                </a>
                <p>Ataques:</p>
                <ul>`;
                $.each(pokemon.attacks,function(key, attack){
                    template +=`<li>${attack.name}</li>`;
                });
            template +=`</ul></div>`;
            $(".pokemones").append(template);
        });
    }


});
$(document).foundation();

const modalcont = id =>{
    let modal = document.getElementById('contmodal');
    //modelo array->prototype->filter
    card = datos.cards.filter(function(elem){
        if(elem.id==id){return elem;}
    });
    console.log(card);
    let template= '';
    template+=`
      <div id=modal>
          <h2>Nombre: ${card[0].name}</h2>
          <img src="${card[0].imageUrl}">
          <p>Rareza: ${card[0].rarity}</p>
          <p>Subtipo: ${card[0].subtype}</p>
          <p>Energía: ${card[0].hp}</p>
          <p>Número de pokemón: ${card[0].number}</p>
          <a class="close-reveal-modal" aria-label="Close">&#215;</a>
      </div>`
    modal.innerHTML=template;
}
