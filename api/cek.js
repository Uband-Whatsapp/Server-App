// api/cek.js
export default async function handler(req, res) {
  const target = 'http://wyiiprivatajaib.srv-cloud.biz.id:2551';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 detik timeout

    const response = await fetch(target, { method: 'GET', signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      return res.status(200).json({ status: 'online', target: target });
    } else {
      return res.status(503).json({ status: 'offline' });
    }
  } catch (error) {
    return res.status(503).json({ status: 'offline' });
  }
}

