const user = {
    _id: String,  //mongoDB lo crea automaticamente 
    firstName: String, 
    lastName: String, 
    email: String,
    password: String,
    country: String,
    phoneNumber: Number,
    birthday: Date,       // fecha para verificar si es mayor de edad
    typeUser: String,    //A = administrador, C = cliente, I = interno
    active: Boolean,     // Activar o desactivar usuario
    balance: Number,     //Saldo para los clientes
    bets: [
        {
            id: String,  //ID de la apuesta
            status: String, //Ganador, Perdedor, Apostando
            valor: Number,  //valor apostado
            player: string  //jugador o equipo apostado
        }
    ]
}

const bet = {
    _id: String,
    player1: String, //Nombre del jugador o equipo 1
    player2: String, //Nombre del jugador o equipo 2
    torneo: String, //Nombre del torneo en que participan los jugadores
    modalidad:  String, //modalidad de juego (en linea, clasico, rapida, relámpago, bullet)
    totalP1: Number, //número de apuestas al player1
    saldoP1: Number, //total de dinero apostado al player1
    totalP2: Number, //número de apuestas al player2
    saldoP2: Number, //total de dinero apostado al player 2
    saldoTotal: Number, //saldo total
    estado: String, // Finalizado, En juego, Abierto, cancelado
    activo: Boolean, //activar o desactivar apuesta
    apostadores: [
        {
            id: String, //id apostador
            valorAp: String, //cantidad de dinero apostado
            playerAp: String, //player al que aposto
        }
    ],
    ganador: string //ganador del evento
    
}