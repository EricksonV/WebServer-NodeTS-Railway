"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const hbs_1 = __importDefault(require("hbs"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.port = process.env.PORT || "80";
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.middlewares();
        this.iniciaServidor();
        this.hbs();
    }
    dirResolve(address) {
        return path_1.default.resolve(__dirname, address);
    }
    //handlebars
    hbs() {
        this.app.set('view engine', 'hbs');
        hbs_1.default.registerPartials(this.dirResolve('../../../views/partials'));
    }
    middlewares() {
        this.app.use(express_1.default.static('public/templated-roadtrip'));
    }
    iniciaServidor() {
        this.app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('home', {
                nombre: 'Erickson V',
                titulo: 'WebServer'
            });
        }));
        this.app.get('/hola', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send('Hola mundo2');
        }));
        this.app.get('/generic', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('generic', {
                nombre: 'Erickson V',
                titulo: 'WebServer'
            });
        }));
        this.app.get('/elements', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('elements', {
                nombre: 'Erickson V',
                titulo: 'WebServer'
            });
        }));
        this.app.get('*', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('404');
        }));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.listen(this.port);
            console.log('Escuchando en puerto: ', this.port);
        });
    }
    iniciaServidorOld() {
        http_1.default.createServer((req, res) => {
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
    startOld() {
        this.iniciaServidorOld();
        console.log('Escuchando en el puerto:', 8080);
    }
}
exports.App = App;
