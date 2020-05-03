import { expect } from 'chai';
import { mutations } from '@/store/modules/movies';

const { setMovies, setPagesVisited } = mutations;

describe('mutations', () => {
  it('setPagesVisited with duplicated values [1, 1]', () => {
    // mock state
    const state = { pagesVisited: [1] };

    setPagesVisited(state, 1);

    expect(state.pagesVisited).to.deep.equal([1]);
  });

  it('SetMovies with empty array', () => {
    // mock state
    const state = { all: [] };

    setMovies(state, []);

    expect(state.all).to.deep.equal([]);
  });

  it('SetMovies with one element', () => {
    // mock state
    const state = { all: [] };

    setMovies(state, [
      {
        id: 1,
        title: 'movie',
        description: 'description',
        actors: []
      }
    ]);

    expect(state.all).to.deep.equal([
      {
        id: 1,
        title: 'movie',
        description: 'description',
        actors: []
      }
    ]);
  });
});
