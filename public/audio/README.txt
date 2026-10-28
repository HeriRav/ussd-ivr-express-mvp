Place your own short WAV prompt here as welcome.wav.

If PUBLIC_BASE_URL is set to a publicly reachable HTTPS URL, the IVR will play:
  https://your-public-domain.example/audio/welcome.wav

If welcome.wav is absent or PUBLIC_BASE_URL is empty, the IVR uses Twilio <Say> text-to-speech instead.
For a real deployment, use a public HTTPS URL and test the audio format supported by your telephony provider.
