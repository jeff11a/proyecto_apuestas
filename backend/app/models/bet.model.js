module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        player1: String, 
        player2: String, 
        torneo: String, 
        modalidad:  String, 
        totalP1: Number, 
        saldoP1: Number, 
        totalP2: Number, 
        saldoP2: Number, 
        saldoTotal: Number, 
        estado: String, 
        activo: Boolean, 
        ganador: String,
        apostadores: [
            {
                id: String, 
                valorAp: String,
                playerAp: String, 
            }
        ],
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Bet = mongoose.model("bet", schema);
    return Bet;
  };
  
  
  
  