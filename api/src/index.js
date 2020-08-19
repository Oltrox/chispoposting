import app from './app';
process.env.TZ = 'Europe/Amsterdam';

async function main() {
    await app.listen(4000);
    console.log('Server on port 4000')
};

main ();