import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 80;

dotenv.config({ path: ".env" });

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routing
import * as index from './routes/index';
app.use('/', index);
import * as api from './routes/api';
app.use('/api', api);


// http server
const httpServer = http.createServer(app)
                    .listen(PORT, () => {
                      console.log("dir == " + __dirname);
                      console.log(`Server listening on port ${PORT}`);
                    });

// https server!
const options: Object = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const httpsServer = https.createServer(options, app).listen(443, () => {console.log("https server")});
