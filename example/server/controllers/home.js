import Controller from '../../../controller';

class Home extends Controller {
  async index(params){
    const { name = 'world' } = params;
  	return 'hello ' + name;
  }
}

module.exports = Home;