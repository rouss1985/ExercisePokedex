$(document).foundation()
$(document).ready(function(){
                $.ajax({
                   type: "GET",
                   dataType: "json",
                   cache: true,
                   data:{types:'fire'},
                   url: "https://api.pokemontcg.io/v1/cards",
                   beforeSend: function(){
                       $(".respuesta").html('Esperando respuesta...');
                   },
                   success: function(data){
                     template(data);
                     $(".respuesta").html('¡Aquí tienes a tus pokemones!');
                   },
                   fail: function(jqXHR, textStatus, errorThrown){
                     $(".respuesta").html('Hubo un error al llamar a la API. Error: '+ errorThrown);
                   }
                });
            });


            const template = pokemons => {
                let template = ``;
                $.each(pokemons.cards,function(key, pokemon){
                    console.log(pokemon);
                    template += `
                    <div class="pokemon">
                        <a href="" class="modal">
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
