import { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LoaderCircle, Lock } from 'lucide-react';
import { schoolConfig } from '../../config/schoolConfig';
import { useAuth } from '../../auth/useAuth';
import { AdminNotice } from '../../components/admin/AdminNotice';
import { missingEnvNames } from '../../lib/appwriteConfig';

const inputClass =
  'w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-ink focus:border-forest/40 disabled:opacity-60';

export function Login() {
  const { state, mfaFactors, signIn, verifyMfa, signOut } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [factor, setFactor] = useState('totp');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (state === 'admin') {
    const target = location.state?.from?.startsWith('/admin') ? location.state.from : '/admin';
    return <Navigate to={target} replace />;
  }

  async function handleSignIn(event) {
    event.preventDefault();
    if (busy) return;
    setError('');
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setBusy(true);
    const result = await signIn(email.trim(), password);
    setBusy(false);
    if (!result.ok) setError(result.message);
    setPassword('');
  }

  async function handleVerify(event) {
    event.preventDefault();
    if (busy) return;
    setError('');
    if (!code.trim()) {
      setError('Please enter the code.');
      return;
    }
    setBusy(true);
    const result = await verifyMfa(factor, code);
    setBusy(false);
    if (!result.ok) setError(result.message);
    setCode('');
  }

  const availableFactors = [
    mfaFactors.totp && { id: 'totp', label: 'Authenticator app code' },
    mfaFactors.recoverycode && { id: 'recoverycode', label: 'Recovery code' },
  ].filter(Boolean);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-5">
      <Helmet>
        <title>Admin sign in | {schoolConfig.identity.name}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="w-full max-w-md rounded-3xl border border-forest/10 bg-white/80 p-7 shadow-soft sm:p-9">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-cream">
            <Lock size={22} aria-hidden="true" />
          </span>
          <h1 className="text-2xl text-forest">Admin sign in</h1>
          <p className="text-sm text-ink/65">{schoolConfig.identity.name}</p>
        </div>

        {state === 'unconfigured' && (
          <AdminNotice tone="info" title="Appwrite is not configured yet">
            <p>Sign-in is unavailable until these variables are set in your environment:</p>
            <ul className="mt-2 list-disc pl-5">
              {missingEnvNames()
                .filter((n) => n.includes('ENDPOINT') || n.includes('PROJECT'))
                .map((n) => (
                  <li key={n}>
                    <code>{n}</code>
                  </li>
                ))}
            </ul>
          </AdminNotice>
        )}

        {state === 'loading' && (
          <div className="flex justify-center py-6" role="status">
            <LoaderCircle className="animate-spin text-forest" aria-hidden="true" />
            <span className="sr-only">Checking your session…</span>
          </div>
        )}

        {state === 'forbidden' && (
          <div className="flex flex-col gap-4">
            <AdminNotice tone="error" title="This account is not an administrator">
              It is signed in but does not have the <code>admin</code> label.
            </AdminNotice>
            <button type="button" onClick={signOut} className="text-sm font-semibold text-forest underline underline-offset-2">
              Sign out and try another account
            </button>
          </div>
        )}

        {state === 'anonymous' && (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-forest">
                Email
              </label>
              <input id="admin-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} disabled={busy} className={inputClass} />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-forest">
                Password
              </label>
              <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} className={inputClass} />
            </div>
            {error && <AdminNotice tone="error">{error}</AdminNotice>}
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream hover:bg-forest-light disabled:opacity-60"
            >
              {busy && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />} Sign in
            </button>
          </form>
        )}

        {state === 'mfa' && (
          <form onSubmit={handleVerify} className="flex flex-col gap-4" noValidate>
            <p className="text-sm text-ink/75">Enter your second-step code to finish signing in.</p>
            {availableFactors.length > 1 && (
              <div role="group" aria-label="Verification method" className="flex gap-2">
                {availableFactors.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={factor === f.id}
                    onClick={() => {
                      setFactor(f.id);
                      setError('');
                    }}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${factor === f.id ? 'bg-forest text-cream' : 'bg-forest/10 text-forest'}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
            <div>
              <label htmlFor="admin-code" className="mb-1.5 block text-sm font-medium text-forest">
                {factor === 'recoverycode' ? 'Recovery code' : '6-digit code'}
              </label>
              <input
                id="admin-code"
                type="text"
                inputMode={factor === 'totp' ? 'numeric' : 'text'}
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={busy}
                className={inputClass}
              />
            </div>
            {error && <AdminNotice tone="error">{error}</AdminNotice>}
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream hover:bg-forest-light disabled:opacity-60"
            >
              {busy && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />} Verify
            </button>
            <button type="button" onClick={signOut} className="text-sm font-medium text-forest underline underline-offset-2">
              Cancel and sign out
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-ink/50">
          <Link to="/" className="hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
