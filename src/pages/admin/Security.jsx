import { useState } from 'react';
import { Copy, LoaderCircle, ShieldCheck } from 'lucide-react';
import { account } from '../../lib/appwrite';
import { describeError } from '../../lib/errors';
import { useAuth } from '../../auth/useAuth';
import { AdminNotice } from '../../components/admin/AdminNotice';

const fieldClass = 'w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm disabled:opacity-60';

/**
 * Two-factor (TOTP) enrolment for the signed-in admin.
 * Appwrite order: create authenticator → verify a code → turn MFA on → create recovery codes.
 */
export function Security() {
  const { user, refresh } = useAuth();
  const [phase, setPhase] = useState('idle'); // idle | starting | verifying | done
  const [secret, setSecret] = useState('');
  const [uri, setUri] = useState('');
  const [code, setCode] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function start() {
    setError('');
    setPhase('starting');
    try {
      const result = await account.createMFAAuthenticator({ type: 'totp' });
      setSecret(result.secret);
      setUri(result.uri);
      setPhase('verifying');
    } catch (err) {
      setPhase('idle');
      setError(
        err?.type === 'user_authenticator_already_exists'
          ? 'An authenticator is already set up for this account.'
          : describeError(err, 'Could not start the setup.'),
      );
    }
  }

  async function verify(event) {
    event.preventDefault();
    if (!code.trim()) return setError('Enter the 6-digit code from your authenticator app.');
    setError('');
    setPhase('starting');
    try {
      await account.updateMFAAuthenticator({ type: 'totp', otp: code.trim() });
      await account.updateMFA({ mfa: true });
      const result = await account.createMFARecoveryCodes();
      setRecoveryCodes(result.recoveryCodes);
      setPhase('done');
      await refresh();
    } catch (err) {
      setPhase('verifying');
      setError(
        err?.type === 'user_invalid_token'
          ? 'That code was not accepted. Check the code and try again.'
          : describeError(err, 'Could not finish the setup.'),
      );
    }
  }

  async function copySecret() {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const busy = phase === 'starting';

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="text-3xl text-forest">Security</h1>

      {user?.mfa && phase !== 'done' && (
        <AdminNotice tone="success" title="Two-factor authentication is on">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} aria-hidden="true" /> You will be asked for an authenticator code each time you sign in.
          </span>
        </AdminNotice>
      )}

      {!user?.mfa && phase === 'idle' && (
        <div className="flex flex-col gap-4 rounded-3xl border border-forest/10 bg-white/70 p-6">
          <h2 className="text-xl text-forest">Turn on two-factor authentication</h2>
          <p className="text-sm leading-relaxed text-ink/75">
            You will need an authenticator app (Google Authenticator, Microsoft Authenticator, Authy, 1Password…). It
            adds a 6-digit code to every sign-in, which protects the enquiry data even if the password leaks.
          </p>
          {error && <AdminNotice tone="error">{error}</AdminNotice>}
          <button type="button" onClick={start} className="w-fit rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-light">
            Start setup
          </button>
        </div>
      )}

      {(phase === 'verifying' || (phase === 'starting' && secret)) && (
        <form onSubmit={verify} className="flex flex-col gap-4 rounded-3xl border border-forest/10 bg-white/70 p-6">
          <h2 className="text-xl text-forest">1. Add this account to your authenticator app</h2>
          <p className="text-sm text-ink/75">
            Choose “enter a setup key” in your app and paste this key (account name: your email, type: time-based).
          </p>
          <div className="flex items-center gap-2">
            <code className="min-w-0 flex-1 break-all rounded-xl bg-forest/5 px-3 py-2.5 text-sm">{secret}</code>
            <button type="button" onClick={copySecret} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-forest/25 px-3.5 py-2 text-xs font-semibold text-forest">
              <Copy size={13} aria-hidden="true" /> {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          {uri && (
            <p className="text-xs text-ink/60">
              On a phone, you can also{' '}
              <a href={uri} className="font-medium text-forest underline underline-offset-2">
                open the setup link
              </a>
              .
            </p>
          )}
          <h2 className="text-xl text-forest">2. Enter the 6-digit code it shows</h2>
          <div>
            <label htmlFor="mfa-code" className="sr-only">
              6-digit code
            </label>
            <input id="mfa-code" inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} disabled={busy} className={fieldClass} placeholder="123456" />
          </div>
          {error && <AdminNotice tone="error">{error}</AdminNotice>}
          <button type="submit" disabled={busy} className="inline-flex w-fit items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-light disabled:opacity-60">
            {busy && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />} Verify and turn on
          </button>
        </form>
      )}

      {phase === 'done' && (
        <div className="flex flex-col gap-4 rounded-3xl border border-forest/10 bg-white/70 p-6">
          <AdminNotice tone="success" title="Two-factor authentication is now on" />
          <h2 className="text-xl text-forest">Save your recovery codes</h2>
          <p className="text-sm leading-relaxed text-ink/75">
            Each code works once if you lose your phone. Store them somewhere safe (a password manager or a printed copy).
            They are shown <strong>only now</strong>.
          </p>
          <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
            {recoveryCodes.map((c) => (
              <li key={c} className="rounded-lg bg-forest/5 px-3 py-2">
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Security;
