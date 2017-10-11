const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");
const Booking = require("../models/booking");

mongoose.connect("mongodb://localhost/bookacook", {
  useMongoClient: true
});

var users = [];

User.remove({})
  .then(() => Booking.remove({}))
  .then(() => {
    users = [
      {
        name: "Barbara Dupont",
        email: "barbara.dupont@hotmail.fr",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0657987987",
        address: "33 rue Lafayette",
        isCook: false
      },
      {
        name: "Jean Rousseau",
        email: "jean.rousseau@gmail.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0651234987",
        address: "14 rue de Rivoli",
        isCook: false
      },
      {
        name: "Marc Henri",
        email: "marc.henri@gmail.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0651234741",
        address: "6 rue de la Paix",
        isCook: false
      },
      {
        name: "Philippe Moreau",
        email: "philppe.moreau@laposte.fr",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0605034741",
        address: "66 avenue de la République",
        isCook: false
      },
      {
        name: "Sylvette Florentin",
        email: "sylvette.florentin@gmail.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0605034331",
        address: "34 avenue des Gobelins",
        isCook: false
      },
      {
        name: "Baptiste Crozat",
        email: "baptiste.crozat@hotmail.fr",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0657987237",
        address: "35 rue de Provence",
        isCook: true,
        cookData: {
          cuisine: "French",
          experience: "less than 2 years",
          description:
            "Passionate about cooking. I am especially good at cooking meats. You must taste my 'boeuf bourguigon' and my 'ratatouille provençale' !",
          location: "Paris",
          availability: true
        }
      },
      {
        name: "Dev Gupta",
        email: "christelle.voisin@hotmail.fr",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0664987237",
        address: "10 rue de la Victoire",
        isCook: true,
        cookData: {
          cuisine: "Indian",
          experience: "more than 10 years",
          description:
            "Graduated from the School of the Culinary Arts of Andhra Pradesh, my special biryani recipe has been in the family for generations !",
          location: "Paris",
          availability: true
        }
      },
      {
        name: "Mario Liugiano",
        email: "mario.luigiano@gmail.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0664982337",
        address: "3 rue de Rome",
        isCook: true,
        cookData: {
          cuisine: "Italian",
          experience: "more than 10 years",
          description:
            "As a member of the cooking squadra at the Cinecitta studio, Roma, I have had the privilege to cook for Marcello Mastroianni and Claudia Cardinale. Today I can bring taste and glamour to your kitchen",
          location: "Paris",
          availability: true
        }
      },
      {
        name: "Lu Chen",
        email: "lu.chen@gmail.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0664985837",
        address: "3 avenue de Choisy",
        isCook: true,
        cookData: {
          cuisine: "Chinese",
          experience: "more than 10 years",
          description:
            "Born and raised in the Sichuan province, my cuisine is hot and spicy. I guarantee that you will also be impressed by my choping techniques.",
          location: "Paris",
          availability: true
        }
      },
      {
        name: "Wassim Adbou",
        email: "wassim.abdou@gmail.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0664985327",
        address: "8 rue de la Pompe",
        isCook: true,
        cookData: {
          cuisine: "Lebanese",
          experience: "more than 10 years",
          description:
            "I bring Meditarrean flavours to your kitchen. My homous is exquisite, forget the supermarket plaster...",
          location: "Lyon",
          availability: true
        }
      },
      {
        name: "Paquito Hernandez",
        email: "paquito.hernandez@gmail.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
        phone: "0648985327",
        address: "8 rue de Passy",
        isCook: true,
        cookData: {
          cuisine: "Mexican",
          experience: "less than 2 years",
          description:
            "The Donald tasted my quesadillas and said : 'this one latino I won't deport !'",
          location: "Lyon",
          availability: true
        }
      }
    ];
  })
  .then(() => User.create(users))
  .then(value => console.log("Number of new users created: ", value.length))
  .then(() => mongoose.connection.close());
