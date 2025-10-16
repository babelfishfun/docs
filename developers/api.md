# Babelfish API Documentation

Comprehensive API documentation for integrating Babelfish's universal translation services into your applications.

## Overview

The Babelfish API enables third-party applications to integrate our AI-powered translation services, community features, and Web3 functionality. Our API is designed for scalability, reliability, and ease of use.

### Key Features
- **Real-time Translation**: Text, audio, and video translation
- **Community Management**: Create and manage communities
- **User Authentication**: Flexible identity integration
- **Web3 Integration**: $BABEL token and wallet functionality
- **Rate Limiting**: Fair usage policies and rate limiting

## Getting Started

### API Access
- **Public API**: Available Q1 2027
- **Authentication**: API key-based authentication
- **Rate Limits**: 1000 requests per hour for free tier
- **Base URL**: `https://api.babelfish.app/v1`

### Authentication
All API requests require an API key in the header:

```http
Authorization: Bearer YOUR_API_KEY
```

### API Keys
- **Free Tier**: 1000 requests/hour
- **Pro Tier**: 10,000 requests/hour
- **Enterprise**: Custom limits and features
- **Get API Key**: [Register at developer.babelfish.app](https://developer.babelfish.app)

## Translation Endpoints

### Text Translation

#### POST /translate/text
Translate text between languages with cultural context.

**Request:**
```json
{
  "text": "Hello, how are you?",
  "source_language": "en",
  "target_language": "es",
  "context": "casual_conversation",
  "cultural_context": true
}
```

**Response:**
```json
{
  "success": true,
  "translated_text": "Hola, ¿cómo estás?",
  "confidence": 0.95,
  "cultural_notes": "Casual greeting, appropriate for friends",
  "processing_time": 0.2
}
```

#### Parameters
- `text` (string, required): Text to translate
- `source_language` (string, required): Source language code (ISO 639-1)
- `target_language` (string, required): Target language code (ISO 639-1)
- `context` (string, optional): Translation context (casual_conversation, business, technical, etc.)
- `cultural_context` (boolean, optional): Include cultural context in translation

### Audio Translation

#### POST /translate/audio
Translate audio content with voice preservation.

**Request:**
```json
{
  "audio_url": "https://example.com/audio.mp3",
  "source_language": "en",
  "target_language": "fr",
  "preserve_voice": true,
  "format": "mp3"
}
```

**Response:**
```json
{
  "success": true,
  "translated_audio_url": "https://api.babelfish.app/audio/translated_123.mp3",
  "confidence": 0.92,
  "duration": 15.5,
  "processing_time": 3.2
}
```

#### Parameters
- `audio_url` (string, required): URL of audio file to translate
- `source_language` (string, required): Source language code
- `target_language` (string, required): Target language code
- `preserve_voice` (boolean, optional): Preserve original voice characteristics
- `format` (string, optional): Output format (mp3, wav, ogg)

### Video Translation

#### POST /translate/video
Translate video content with lip-sync technology.

**Request:**
```json
{
  "video_url": "https://example.com/video.mp4",
  "source_language": "en",
  "target_language": "de",
  "lip_sync": true,
  "subtitle_track": true,
  "format": "mp4"
}
```

**Response:**
```json
{
  "success": true,
  "translated_video_url": "https://api.babelfish.app/video/translated_456.mp4",
  "subtitle_url": "https://api.babelfish.app/subtitles/456.srt",
  "confidence": 0.89,
  "duration": 120.0,
  "processing_time": 45.8
}
```

#### Parameters
- `video_url` (string, required): URL of video file to translate
- `source_language` (string, required): Source language code
- `target_language` (string, required): Target language code
- `lip_sync` (boolean, optional): Apply lip-sync technology
- `subtitle_track` (boolean, optional): Generate subtitle track
- `format` (string, optional): Output format (mp4, webm, avi)

## Community Endpoints

### Community Management

#### GET /communities
List communities with optional filtering.

**Request:**
```http
GET /communities?category=technology&language=en&limit=20&offset=0
```

**Response:**
```json
{
  "success": true,
  "communities": [
    {
      "id": "comm_123",
      "name": "Web3 Developers",
      "description": "Community for Web3 developers",
      "member_count": 150,
      "category": "technology",
      "languages": ["en", "es", "fr"],
      "created_at": "2025-01-15T10:30:00Z"
    }
  ],
  "total": 150,
  "limit": 20,
  "offset": 0
}
```

#### POST /communities
Create a new community.

**Request:**
```json
{
  "name": "My Community",
  "description": "A community for my interests",
  "category": "general",
  "is_public": true,
  "max_members": 200,
  "languages": ["en", "es"]
}
```

**Response:**
```json
{
  "success": true,
  "community": {
    "id": "comm_789",
    "name": "My Community",
    "description": "A community for my interests",
    "category": "general",
    "is_public": true,
    "max_members": 200,
    "languages": ["en", "es"],
    "created_at": "2025-01-15T10:30:00Z"
  }
}
```

### Message Management

#### POST /communities/{id}/messages
Send a message to a community.

**Request:**
```json
{
  "content": "Hello everyone!",
  "type": "text",
  "language": "en",
  "reply_to": null
}
```

**Response:**
```json
{
  "success": true,
  "message": {
    "id": "msg_456",
    "content": "Hello everyone!",
    "translated_content": {
      "es": "¡Hola a todos!",
      "fr": "Bonjour tout le monde!"
    },
    "type": "text",
    "language": "en",
    "author": "user_123",
    "created_at": "2025-01-15T10:30:00Z"
  }
}
```

## User Management

### User Authentication

#### POST /auth/login
Authenticate user with various methods.

**Request:**
```json
{
  "method": "social",
  "provider": "twitter",
  "access_token": "twitter_access_token",
  "wallet_address": "optional_solana_address"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "username": "johndoe",
    "email": "john@example.com",
    "wallet_address": "Solana_wallet_address",
    "primary_language": "en",
    "created_at": "2025-01-15T10:30:00Z"
  },
  "access_token": "jwt_access_token",
  "refresh_token": "jwt_refresh_token"
}
```

### User Profile

#### GET /users/{id}
Get user profile information.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "username": "johndoe",
    "email": "john@example.com",
    "wallet_address": "Solana_wallet_address",
    "primary_language": "en",
    "languages": ["en", "es", "fr"],
    "communities": ["comm_123", "comm_456"],
    "created_at": "2025-01-15T10:30:00Z"
  }
}
```

## Web3 Integration

### $BABEL Token

#### GET /users/{id}/babel
Get user's $BABEL token balance and information.

**Response:**
```json
{
  "success": true,
  "balance": {
    "total": 1000.5,
    "staked": 500.0,
    "available": 500.5,
    "usd_value": 125.75
  },
  "rewards": {
    "invitation_rewards": 50.0,
    "community_rewards": 25.0,
    "staking_rewards": 10.5
  }
}
```

#### POST /users/{id}/stake
Stake $BABEL tokens.

**Request:**
```json
{
  "amount": 100.0,
  "duration": 12,
  "wallet_signature": "solana_wallet_signature"
}
```

**Response:**
```json
{
  "success": true,
  "stake": {
    "id": "stake_789",
    "amount": 100.0,
    "duration": 12,
    "apy": 0.10,
    "start_date": "2025-01-15T10:30:00Z",
    "end_date": "2026-01-15T10:30:00Z"
  }
}
```

### Governance

#### GET /governance/proposals
Get active governance proposals.

**Response:**
```json
{
  "success": true,
  "proposals": [
    {
      "id": "prop_123",
      "title": "Increase community size limit",
      "description": "Proposal to increase community size from 200 to 500 members",
      "status": "active",
      "votes_for": 1500,
      "votes_against": 300,
      "end_date": "2025-01-22T10:30:00Z"
    }
  ]
}
```

#### POST /governance/proposals/{id}/vote
Vote on a governance proposal.

**Request:**
```json
{
  "vote": "for",
  "wallet_signature": "solana_wallet_signature"
}
```

**Response:**
```json
{
  "success": true,
  "vote": {
    "proposal_id": "prop_123",
    "vote": "for",
    "weight": 100.0,
    "timestamp": "2025-01-15T10:30:00Z"
  }
}
```

## Rate Limits

### Free Tier
- **Requests per hour**: 1,000
- **Requests per day**: 10,000
- **Concurrent requests**: 10

### Pro Tier
- **Requests per hour**: 10,000
- **Requests per day**: 100,000
- **Concurrent requests**: 50

### Enterprise
- **Custom limits** based on agreement
- **Priority support**
- **Custom features**

### Rate Limit Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 3600 seconds.",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "reset_time": 1640995200
    }
  }
}
```

### Common Error Codes
- `INVALID_API_KEY`: Invalid or missing API key
- `RATE_LIMIT_EXCEEDED`: Rate limit exceeded
- `INVALID_REQUEST`: Malformed request
- `TRANSLATION_FAILED`: Translation service error
- `INSUFFICIENT_BALANCE`: Insufficient $BABEL balance
- `COMMUNITY_NOT_FOUND`: Community not found
- `USER_NOT_FOUND`: User not found

## SDKs and Libraries

### Official SDKs
- **JavaScript/Node.js**: `npm install babelfish-sdk`
- **Python**: `pip install babelfish-sdk`
- **Go**: `go get github.com/babelfish/sdk-go`
- **PHP**: `composer require babelfish/sdk-php`

### Example Usage (JavaScript)
```javascript
import { BabelfishSDK } from 'babelfish-sdk';

const sdk = new BabelfishSDK('your-api-key');

// Translate text
const translation = await sdk.translate.text({
  text: 'Hello, world!',
  source_language: 'en',
  target_language: 'es'
});

console.log(translation.translated_text); // "¡Hola, mundo!"
```

## Webhooks

### Webhook Events
- `message.created`: New message in community
- `user.joined`: User joined community
- `translation.completed`: Translation job completed
- `governance.vote`: Governance vote cast

### Webhook Configuration
```json
{
  "url": "https://your-app.com/webhooks/babelfish",
  "events": ["message.created", "user.joined"],
  "secret": "webhook_secret_key"
}
```

## Testing

### Sandbox Environment
- **Base URL**: `https://sandbox-api.babelfish.app/v1`
- **Test API Key**: Available in developer dashboard
- **Mock Data**: Pre-populated test data
- **Rate Limits**: Higher limits for testing

### Test Scenarios
- Translation accuracy testing
- Community management testing
- Web3 integration testing
- Rate limit testing

## Support

### Documentation
- **API Reference**: [docs.babelfish.app/api](https://docs.babelfish.app/api)
- **SDK Documentation**: [docs.babelfish.app/sdk](https://docs.babelfish.app/sdk)
- **Examples**: [github.com/babelfish/examples](https://github.com/babelfish/examples)

### Community Support
- **Discord**: [discord.gg/babelfish-dev](https://discord.gg/babelfish-dev)
- **GitHub**: [github.com/babelfish/api-issues](https://github.com/babelfish/api-issues)
- **Email**: [api-support@babelfish.app](mailto:api-support@babelfish.app)

---

**Ready to integrate?** [Get your API key](https://developer.babelfish.app) or [explore our SDKs](../sdk).
