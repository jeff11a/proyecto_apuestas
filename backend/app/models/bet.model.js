module.exports = (mongoose, mongoosePaginate) => {
    var schema = mongoose.Schema(
      {
        player1:    String, 
        player2:    String, 
        torneo:     String, 
        modalidad:  String, 
        totalP1:    Number, 
        saldoP1:    Number, 
        totalP2:    Number, 
        saldoP2:    Number, 
        saldoTotal: Number, 
        estado:     String, 
        activo:     Boolean, 
        ganador:    String,
        apostadores: [
            {
                id: String, 
                name: String,
                dineroAp: Number,
                playerAp: String,
                fechaAp: Date
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

    schema.plugin(mongoosePaginate);
  
    const Bet = mongoose.model("bet", schema);
    return Bet;
  };
  
  
  
  