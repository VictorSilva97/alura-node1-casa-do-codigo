const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = app => {
    
    app.get('/', (req, res) => res.marko(require('../views/index/index.marko')));
    
    app.get('/livros', (req, res) => {
        const livroDao = new LivroDao(db);
        
        livroDao.listar()
        .then(livros => {
            res.marko(
                require('../views/livros/lista/lista.marko'),
                {livros}
            );
        })
        .catch(erro => console.log(erro));
    });

    app.get('/livros/form', (req, res) => res.marko(require('../views/livros/form/form.marko'), {livro: {}}));

    app.post('/livros', (req, res) => {
        const livro = req.body;
        const livroDao = new LivroDao(db);

        livroDao.adicionar(livro)
        .then(() => res.redirect('/livros'))
        .catch(erro => console.log(erro));
    });

    app.put('/livros', (req, res) => {
        const livro = req.body;
        const livroDao = new LivroDao(db);

        livroDao.atualizar(livro)
        .then(() => res.redirect('/livros'))
        .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', (req, res) => {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.remover(id)
        .then(() => res.status(200).end())
        .catch(erro => console.log(erro));

    });

    app.get('/livros/form/:id', (req, res) => {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscarPorId(id)
        .then( livro => res.marko( require('../views/livros/form/form.marko'), {livro} ) )
        .catch( erro => console.log(erro) );
    });
}
