self.onmessage = async (event) => {
  const { type, userId, messageIds, messageContent } = event.data;

  try {
    const response = await fetch("/api/messages/get_messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, userId, messageIds, messageContent }),
    });

    const result = await response.json();

    if (result.success) {
      self.postMessage({ success: true, data: result.data });
    } else {
      self.postMessage({ success: false, error: result.error });
    }
  } catch (error: any) {
    self.postMessage({ success: false, error: error.message });
  }
};
