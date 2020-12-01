var express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  Strategy = require("../lib").Strategy,
  app = express(),
  Discord = require("discord.js"),
  bot = new Discord.Client(),
  db = require("quick.db");
  var bodyParser = require('body-parser')
const data = require("../config.json");
const fs = require("fs")

var url = bodyParser.urlencoded({ extended: false })
//const body = db.get("server")

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes = [
  "identify" /*, 'connections', (it is currently broken)  'guilds', 'guilds.join'*/
];

passport.use(
  new Strategy(
    {
      clientID: "665306053562466314",
      clientSecret: "sKNQkRjuFR1esSYyUKuvUbqprNWIxcjQ",
      callbackURL: "https://growbot.hanifdwyputra.xyz/callback",
      scope: scopes
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        return done(null, profile);
      });
    }
  )
);

//module.exports = bot => {

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/login", passport.authenticate("discord", { scope: scopes }), function(
  req,
  res
) {});
app.get(
  "/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/");
  } // auth success
);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/shop", checkAuth, function(req, res) {
  res.render("shop.ejs", {
    client: bot,
    db: db,
    user: req.user,
    req:req,
    res:res
  });
});

app.get("/", function(req, res) {
  res.render("home.ejs", {
    client: bot,
    db: db,
    data: data,
    user: req.user
  });
});

app.get("/suggest", checkAuth, function(req, res) {
  res.render("contact.ejs", {
    client: bot,
    user: req.user,
    res: res,
    req: req
  });
});

/*app.post("/suggest", url, function(req, res) {
  bot.channels.cache.get("722027949959938148").send(req.body.suggest)
  res.redirect("/")
});*/

app.get("/server", function(req, res) {
  res.render("server.ejs", {
    bot: bot,
    user: req.user
  });
});

app.get("/log", checkAuth, function(req, res) {
  res.render("log.ejs", {
    client: bot,
    user: req.user
  });
});

app.get("/discord", (req, res) => {
  res.status(200);
  res.redirect('https://discord.gg/kGkSW9m');
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
  req.session.backURL = req.originalURL;
}

function checkAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.id === "580640622235484161")
    return next();
  req.session.backURL = req.originalURL;
  res.redirect("/");
}

//module.exports = bot => {
  
  app.post("/suggest", url, function(req, res) {
    let embed = new Discord.MessageEmbed()
      .setAuthor(`New suggestions`, bot.user.displayAvatarURL())
      .setThumbnail(bot.users.cache.get(req.user.id).displayAvatarURL())
      .addField(`From:`, req.user.username+"#"+req.user.discriminator)
      .addField(`Suggestion:`, `${req.body.suggest}`)
      .setColor(data.color);

    res.redirect('/')
    bot.channels.cache.get("722027949959938148").send(embed).then(m => {
    m.react("✅")
    m.react("✖️")
    });
  });

app.post('/buy', url, async function(req, res) {
  if(db.fetch(`wl_${req.user.id}`) < req.body.wl) {
    res.send('You not have that much world lock')
  }
  
  if(req.body.wl < 5) {
    res.send('Minimal 5 world lock')
  }
  
  if(isNaN(req.body.wl)){
    res.send('Invalid World Lock Number')
  }
  
  let user = await bot.users.fetch(req.user.id)
  
  let test = new Discord.MessageEmbed()
  .setThumbnail(user.displayAvatarURL())
  .setAuthor('[SYSTEM] SHOP', bot.user.displayAvatarURL())
  .addField('User', req.user.username+'#'+req.user.discriminator)
  .addField('Buy:', req.body.wl+' World Lock')
  .addField('Get:', `${req.body.wl*1000/5} gems`)
  .addField('Status:', 'Succes')
  .setTimestamp()
  .setColor(data.color)
  
  res.redirect('/')
  bot.channels.cache.get('713480509648273489').send(test)

db.subtract(`wl_${req.user.id}`, req.body.wl)
  db.add(`gems_${req.user.id}`, req.body.wl*1000/5)
})
//};

app.listen(7000, function(err) {
  if (err) return console.log(err);
  console.log("Listening at " + process.env.PORT);
});

bot.on("ready", () => {
  console.log(`Website aktif dengan: ${bot.user.tag}`);
});

bot.login(process.env.TOKEN);
