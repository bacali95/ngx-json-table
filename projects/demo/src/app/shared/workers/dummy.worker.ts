// This is a dummy worker file to satisfy the tsconfig.worker.json include pattern
// You can replace this with actual worker code if needed

/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  postMessage({ response: 'Received: ' + data });
});
