import filmService from 'services/filmService';

const serviceContainer = new Map();

serviceContainer.set('filmService', filmService);

export default serviceContainer;
