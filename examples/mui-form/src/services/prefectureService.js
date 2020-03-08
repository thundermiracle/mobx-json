import sleep from './sleep';
import DB from './DB';

class PrefectureService {
  get = async props => {
    const { inputValue: word, params, name } = props;

    console.info(`[prefecture]getting all from DB...`);

    await sleep(Math.random() * 2000);
    return DB.prefectures;
  };
}

const prefectureService = new PrefectureService();

export default prefectureService;
