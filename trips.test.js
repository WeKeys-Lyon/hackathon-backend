const request = require('supertest');
const app = require('./app');
const moment = require('moment');

it('GET /trips/request', async () => {
 const date = moment('2026-03-03T20:54:51.812Z').format('YYYY-MM-DD');
 const res = await request(app).get(`/trips/request/marseille/lyon/${date}`);


 expect(res.statusCode).toBe(200);
 expect(res.body.trips).toEqual([{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T07:48:35.833Z"},"price":31},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T08:19:03.100Z"},"price":104},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T08:47:36.042Z"},"price":47},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T09:01:06.224Z"},"price":38},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T09:05:39.939Z"},"price":33},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T10:51:15.779Z"},"price":147},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T12:01:35.371Z"},"price":26},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T13:22:28.843Z"},"price":138},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T14:12:47.721Z"},"price":85},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T17:44:39.153Z"},"price":64},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T18:17:15.325Z"},"price":120},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T21:16:14.822Z"},"price":37},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T23:28:07.612Z"},"price":103},{"departure":"Marseille","arrival":"Lyon","date":{"$date":"2026-03-03T23:54:47.501Z"},"price":76}]);
});