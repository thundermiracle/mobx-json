import sleep from './sleep';
import DB from './DB';

class CityService {
  get = async props => {
    const {
      params: { prefecture = '' },
    } = props;

    console.info(`[city]-[${prefecture}] getting cities from DB...`);

    if (prefecture === '') {
      return [];
    }

    await sleep(Math.random() * 2000);
    return DB.cities[prefecture];
  };
}

const cityService = new CityService();

export default cityService;
