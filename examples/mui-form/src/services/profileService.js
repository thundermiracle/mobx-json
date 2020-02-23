import sleep from './sleep';
import DB from './DB';

class ProfileService {
  select = async id => {
    console.info(`searching ${id} from DB...`);
    await sleep(Math.random() * 2000);
    return DB.profile.find(dt => dt.id.toString() === id);
  };
  update = async (id, { id: dId, ...restData }) => {
    console.info(`saving ${id} to DB...`, restData);
    await sleep(Math.random() * 2000);
    const targetInd = DB.profile.findIndex(dt => dt.id.toString() === id);

    if (targetInd > -1) {
      DB.profile[targetInd] = {
        id,
        ...restData,
      };
      return true;
    }

    return false;
  };
}

const profileService = new ProfileService();

export default profileService;
