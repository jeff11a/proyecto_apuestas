module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        player1:    { type: String, required: true, minlength: 3, maxlength:50 }, 
        player2:    { type: String, required: true, minlength: 3, maxlength:50 }, 
        torneo:     { type: String, required: true, minlength: 3, maxlength:50 }, 
        modalidad:  { type: String, required: true }, 
        totalP1:    { type: Number, default: 0 }, 
        saldoP1:    { type: Number, default: 0 }, 
        totalP2:    { type: Number, default: 0 }, 
        saldoP2:    { type: Number, default: 0 }, 
        saldoTotal: { type: Number, default: 0 }, 
        estado:     { type: String, required: true }, 
        activo:     { type: Boolean, default: false }, 
        ganador:    { type: String, default: ""},
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
  
    const Bet = mongoose.model("bet", schema);
    return Bet;
  };
  
  
  
  