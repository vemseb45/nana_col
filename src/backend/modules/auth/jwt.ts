export interface AdminJwtPayload {
  sub: string;
  username: string;
  name: string;
  role: string;
  jti: string;
  iat: number;
  exp: number;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function getJwtSecret(): string {
  const secret = process.env.AUTH_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_TOKEN_SECRET no está configurado o es demasiado corto.');
  }
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(input: string): Uint8Array {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((input.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Firma un JWT HS256 usando Web Crypto API.
 */
export async function signAdminJwt(
  claims: Omit<AdminJwtPayload, 'iat' | 'exp'>,
  expiresInHours: number
): Promise<string> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload: AdminJwtPayload = {
    ...claims,
    iat: nowSeconds,
    exp: nowSeconds + Math.floor(expiresInHours * 3600),
  };

  const headerEncoded = toBase64Url(
    textEncoder.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  );
  const payloadEncoded = toBase64Url(textEncoder.encode(JSON.stringify(payload)));
  const signingInput = `${headerEncoded}.${payloadEncoded}`;

  const key = await importHmacKey(getJwtSecret());
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    textEncoder.encode(signingInput)
  );

  const signatureEncoded = toBase64Url(new Uint8Array(signatureBuffer));
  return `${signingInput}.${signatureEncoded}`;
}

/**
 * Verifica un JWT HS256 (firma y expiración). Devuelve el payload o null si es inválido.
 */
export async function verifyAdminJwt(token: string): Promise<AdminJwtPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerEncoded, payloadEncoded, signatureEncoded] = parts;
    if (!headerEncoded || !payloadEncoded || !signatureEncoded) return null;

    const headerJson = JSON.parse(textDecoder.decode(fromBase64Url(headerEncoded))) as {
      alg?: string;
      typ?: string;
    };
    if (headerJson.alg !== 'HS256') return null;

    const key = await importHmacKey(getJwtSecret());
    const signingInput = `${headerEncoded}.${payloadEncoded}`;
    const signatureBytes = fromBase64Url(signatureEncoded);
    const signatureCopy = new Uint8Array(signatureBytes.length);
    signatureCopy.set(signatureBytes);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureCopy.buffer,
      textEncoder.encode(signingInput)
    );
    if (!isValid) return null;

    const payload = JSON.parse(
      textDecoder.decode(fromBase64Url(payloadEncoded))
    ) as AdminJwtPayload;

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (!payload.sub || !payload.jti || !payload.exp || payload.exp <= nowSeconds) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
