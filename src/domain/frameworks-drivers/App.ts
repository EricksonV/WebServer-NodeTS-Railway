import http from 'http';
import path from 'path';
import hbs from 'hbs';
import dotenv from 'dotenv';

import express, {Application} from 'express';


export class App{
    public app: Application;
    private port:any = process.env.PORT;
    constructor(){
        dotenv.config();
        this.app = express();
        this.middlewares();
        this.iniciaServidor();
        this.hbs();
        
    }
    private dirResolve(address:string){
        return path.resolve(__dirname, address);
    }
    //handlebars
    private hbs(){
        this.app.set('view engine','hbs');
        hbs.registerPartials(this.dirResolve('../../../views/partials'));  
    }

    private middlewares(){
        this.app.use( express.static('public/templated-roadtrip') );
    }

    private iniciaServidor():void{
        
        this.app.get('/',async (req,res) => {
            res.render('home',{
                nombre: 'Erickson V',
                titulo: 'WebServer'
            });
        });
        this.app.get('/hola',async (req,res) => {
            res.send('Hola mundo2');
        });
        this.app.get('/generic', async (req,res)=>{
            res.render('generic',{
                nombre: 'Erickson V',
                titulo: 'WebServer'
            });
        });
        this.app.get('/elements', async (req,res)=>{
            res.render('elements',{
                nombre: 'Erickson V',
                titulo: 'WebServer'
            });
        });
        this.app.get('*',async (req,res) => {
            res.render('404');
        });    
        
    }
    async start(){
        this.app.listen(this.port);
        console.log('Escuchando en puerto: ',this.port);
    }
    private iniciaServidorOld():void {
        http.createServer((req:http.IncomingMessage, res:http.ServerResponse)=>{
            
            //res.writeHead(200, {'Content-Type': 'application/json'});
            // res.setHeader('Content-Disposition','attachment; filename=lista.csv');
            // res.writeHead(200, {'Content-Type': 'application/csv'});
            
            //res.write(JSON.stringify(persona));
            // res.write('id; nombre\n');
            // res.write('1; Erickson\n');
            // res.write('2; David\n');
            res.write('hola mundo');
            res.end();
        })
        .listen(8080);
    }

    private startOld(){
        this.iniciaServidorOld();
        console.log('Escuchando en el puerto:',8080);
    }
}