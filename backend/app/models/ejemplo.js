/* 

const user = {
    _id: ObjectId,       // id 
    firstName: String,   // Nombres del usuario
    lastName: String,    // Apellidos del usuario
    email: String,       // Correo del usuario
    password: String,    // Contraseña cifrada
    country: String,     // País del usuario
    phoneNumber: Number, // Número de teléfono
    birthday: Date,      // Fecha de nacimiento del usuario para verificar si es mayor de edad
    roles: ObjectId,     // ID del rol del usuario
    active: Boolean,     // Activar o desactivar usuario
    balance: Number,     // Saldo disponible para apostar
    banco: Number,       // Saldo para simular el desposito y retiro de dinero
    bets: [
        {
            id: String,     // ID de la apuesta
            status: String, // Estado de la apuesta (Ganador, Perdedor, Apostando)
            valor: Number,  // Dinero apostado
            player: string, // jugador o equipo al que el jugador aposto
            fecha: Date     // Dia en que se realizo la apuesta
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
    
} */