class WorkersCacheClient {
  private cache = caches.default;

  async get(key: string): Promise<string | null> {
    const request = new Request(key);
    const response = await this.cache.match(request);

    if (!response) return null;

    // Check if response is still valid (not expired)
    const cacheControl = response.headers.get('Cache-Control');
    if (cacheControl) {
      const maxAge = parseInt(cacheControl.match(/max-age=(\d+)/)?.[1] || '0');
      const headersDate = response.headers.get('Date');
      const now = Date.now();
      const responseTime = headersDate ? new Date(headersDate).getTime() : now;

      if (now - responseTime > maxAge * 1000) {
        // Expired, remove from cache
        await this.cache.delete(request);
        return null;
      }
    }

    return await response.text();
  }

  async set({
    key,
    value,
    mode = 'EX',
    ttl = 300,
  }: {
    key: string;
    value: string;
    mode?: string;
    ttl?: number;
  }): Promise<boolean> {
    const request = new Request(key);
    const finalTtl = mode === 'EX' ? ttl : 300; // Default 5 minutes

    const response = new Response(value, {
      headers: {
        'Cache-Control': `max-age=${finalTtl}`,
        'Content-Type': 'text/plain',
        Date: new Date().toUTCString(),
      },
    });

    await this.cache.put(request, response);
    return true;
  }

  async del(key: string): Promise<boolean> {
    const request = new Request(key);
    const deleted = await this.cache.delete(request);
    return deleted;
  }
}

export { WorkersCacheClient };
