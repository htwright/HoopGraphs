const mongoose = require('mongoose');

const statSchema = mongoose.Schema({
  player: {
    
  }  
});


const Stats = mongoose.model('Stats', statSchema);

module.exports = {Stats}; 