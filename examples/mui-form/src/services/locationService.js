import sleep from './sleep';
import DB from './DB';

class LocationService {
  get = async props => {
    const { inputValue: word, params, name } = props;

    console.info(`[location]getting all from DB...`);

    await sleep(Math.random() * 2000);
    return DB.locations;
  };
}

const locationService = new LocationService();

export default locationService;
