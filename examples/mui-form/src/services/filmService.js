import sleep from './sleep';
import DB from './DB';

class FilmService {
  get = async props => {
    const { inputValue: word, params, name } = props;

    if (!word) {
      console.info(`[film]getting all from DB...`);

      await sleep(Math.random() * 2000);
      return DB.films;
    }

    console.info(`[film]searching [${word}] from DB...`);
    await sleep(Math.random() * 1000);

    const result = DB.films
      .filter(dt => dt.value.toLowerCase().includes(word.toLowerCase()))
      .slice(0, 5);

    return result;
  };
}

const filmService = new FilmService();

export default filmService;
