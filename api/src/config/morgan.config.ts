import morgan from 'morgan';

export default morgan('[HTTP] :method :url :status - :response-time ms', {
  skip: (req) => req.method === 'OPTIONS',
});
