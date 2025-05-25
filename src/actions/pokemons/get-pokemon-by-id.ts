import {pokeApi} from '../../config/api/pokeApi';
import {Pokemon} from '../../domain/entities/pokemon';
import {PokeAPIPokemon} from '../../infrastructure/interfaces/poke-api.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemonById = async (pokemonId: number): Promise<Pokemon> => {
  try {
    const {data} = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${pokemonId}`);

    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);

    return pokemon;
  } catch (error) {
    throw new Error(`Error fetching pokémon by id: ${error}`);
  }
};
