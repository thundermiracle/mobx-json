import sleep from './sleep';
import DB from './DB';

class FilmService {
  get = async word => {
    if (word == null) {
      console.info(`[film]getting all from DB...`);

      await sleep(Math.random() * 2000);
      return DB.films;
    }

    console.info(`searching ${word} from DB...`);
    await sleep(Math.random() * 1000);

    return DB.films.find(dt => dt.value.includes(word));
  };
}

const filmService = new FilmService();

export default filmService;
