// Vercel serverless function handler
export default async function handler(req, res) {
    const app = (await import('../server/index.js')).default;
    return app(req, res);
}

