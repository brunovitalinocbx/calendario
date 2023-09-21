// app.js
const express = require('express');
const session = require('express-session');
const passport = require('./auth'); // Importa o arquivo de autenticação

const app = express();

// Configuração da sessão
app.use(session({
  secret: 'sua_chave_secreta',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Configuração para usar EJS como motor de visualização
/*app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Especifique a pasta onde seus arquivos EJS estão localizados
*/
// Configurar o motor de visualização EJS
app.set('view engine', 'ejs');

// Configurar o diretório de arquivos estáticos
app.use(express.static('public'));
// Rota de pagina de login
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/agenda', (req, res) => {
    res.render('agenda'); // 'agenda' é o nome do arquivo EJS da página de agenda
  });

// Rota de login
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/agenda',
    failureRedirect: '/login',
    failureFlash: true
  })
);

// Rota da página de agenda
app.get('/agenda', (req, res) => {
  // Aqui você pode renderizar a página de agenda com a tabela de horários
});

// Outras rotas e lógica de reserva podem ser adicionadas aqui

app.listen(3000, () => {
  console.log('Servidor web rodando na porta 3000');
});
