// MIN REQUIREMENT
// fiber 10, protein 20, sugar 10 (max)
const confirmHealth = (snack) => {
    return snack.fiber >= 10 && snack.protein >= 20 && snack.added_sugar < 10;
  };
  
  
  module.exports = confirmHealth;