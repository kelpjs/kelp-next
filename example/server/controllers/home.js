
class Home {
  async index(params, query){
    const { name } = query;
  	return 'hello ' + name;
  }
}

module.exports = Home;