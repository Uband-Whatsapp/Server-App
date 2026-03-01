// api/cek.js
export default async function handler(req, res) {
  // PENTING: Ganti dengan URL Firebase lu. 
  // WAJIB tambahin "/server_config.json" di paling ujungnya!
  const firebaseUrl = 'https://ekkstore-f73d9-default-rtdb.firebaseio.com/server_config.json';

  try {
    // 1. Ambil target link dari Firebase
    const dbResponse = await fetch(firebaseUrl);
    const data = await dbResponse.json();

    // Kalau data di database kosong, kasih error biar nggak crash
    if (!data || !data.targetUrl) {
      return res.status(500).json({ status: 'error', message: 'Target URL belum diset di Database!' });
    }

    const target = data.targetUrl;

    // 2. Lanjut ngecek status server (kode lu yang asli)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); 

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
