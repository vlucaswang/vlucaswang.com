export const GET = async () => {
  return new Response(JSON.stringify({
    message: 'Hello from the Astro API!',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
