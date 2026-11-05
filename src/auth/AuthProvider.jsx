import { useCallback, useEffect, useMemo, useState } from 'react';
import { account } from '../lib/appwrite';
import { features } from '../lib/appwriteConfig';
import { describeError } from '../lib/errors';
import { AuthContext } from './authContext';

export const ADMIN_LABEL = 'admin';

/**
 * Auth states:
 *  unconfigured → Appwrite env vars missing
 *  loading      → checking for an existing session
 *  anonymous    → nobody signed in
 *  mfa          → password accepted, second factor still required
 *  forbidden    → signed in, but the account does not carry the `admin` label
 *  admin        → signed in as an administrator
 *
 * IMPORTANT: this only decides what the UI shows. Real protection comes from the
 * Appwrite table/bucket permissions (label:admin) — see APPWRITE_SETUP.md.
 */
export function AuthProvider({ children }) {
  const [state, setState] = useState(features.auth ? 'loading' : 'unconfigured');
  const [user, setUser] = useState(null);
  const [mfaFactors, setMfaFactors] = useState({ totp: false, recoverycode: false });
  const [mfaChallengeId, setMfaChallengeId] = useState(null);

  const applyUser = useCallback((nextUser) => {
    setUser(nextUser);
    setState(nextUser.labels?.includes(ADMIN_LABEL) ? 'admin' : 'forbidden');
  }, []);

  const enterMfaStep = useCallback(async () => {
    const factors = await account.listMFAFactors();
    setMfaFactors({ totp: Boolean(factors.totp), recoverycode: Boolean(factors.recoverycode) });
    setMfaChallengeId(null);
    setState('mfa');
  }, []);

  const refresh = useCallback(async () => {
    if (!features.auth) return;
    try {
      applyUser(await account.get());
    } catch (error) {
      if (error?.type === 'user_more_factors_required') {
        try {
          await enterMfaStep();
          return;
        } catch {
          /* fall through to anonymous */
        }
      }
      setUser(null);
      setState('anonymous');
    }
  }, [applyUser, enterMfaStep]);

  useEffect(() => {
    if (!features.auth) return undefined;
    let cancelled = false;
    account
      .get()
      .then((current) => {
        if (!cancelled) applyUser(current);
      })
      .catch(async (error) => {
        if (cancelled) return;
        if (error?.type === 'user_more_factors_required') {
          try {
            await enterMfaStep();
            return;
          } catch {
            /* fall through to anonymous */
          }
        }
        if (!cancelled) {
          setUser(null);
          setState('anonymous');
        }
      });
    return () => {
      cancelled = true;
    };
  }, [applyUser, enterMfaStep]);

  const signIn = useCallback(
    async (email, password) => {
      try {
        // Clear any leftover session first, otherwise Appwrite rejects a second login.
        try {
          await account.deleteSession({ sessionId: 'current' });
        } catch {
          /* no active session */
        }
        await account.createEmailPasswordSession({ email, password });
        try {
          applyUser(await account.get());
        } catch (error) {
          if (error?.type === 'user_more_factors_required') await enterMfaStep();
          else throw error;
        }
        return { ok: true };
      } catch (error) {
        setState('anonymous');
        return { ok: false, message: describeError(error, 'Could not sign in. Please try again.') };
      }
    },
    [applyUser, enterMfaStep],
  );

  const verifyMfa = useCallback(
    async (factor, code) => {
      try {
        const challengeId =
          factor === 'totp' && mfaChallengeId
            ? mfaChallengeId
            : (await account.createMFAChallenge({ factor })).$id;
        setMfaChallengeId(challengeId);
        await account.updateMFAChallenge({ challengeId, otp: code.trim() });
        setMfaChallengeId(null);
        applyUser(await account.get());
        return { ok: true };
      } catch (error) {
        setMfaChallengeId(null);
        const wrongCode = error?.type === 'user_invalid_token' || error?.code === 401;
        return {
          ok: false,
          message: wrongCode
            ? 'That code was not accepted. Check the code and try again.'
            : describeError(error, 'Could not verify the code. Please try again.'),
        };
      }
    },
    [applyUser, mfaChallengeId],
  );

  const signOut = useCallback(async () => {
    try {
      await account.deleteSession({ sessionId: 'current' });
    } catch {
      /* session may already be gone */
    }
    setUser(null);
    setMfaChallengeId(null);
    setState('anonymous');
  }, []);

  const value = useMemo(
    () => ({ state, user, mfaFactors, signIn, verifyMfa, signOut, refresh }),
    [state, user, mfaFactors, signIn, verifyMfa, signOut, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
