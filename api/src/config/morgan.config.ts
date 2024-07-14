import morgan from 'morgan';

export default morgan('[HTTP] :method :url :status - :response-time ms', {
  skip: (req, res) => req.method === 'OPTIONS',
});
