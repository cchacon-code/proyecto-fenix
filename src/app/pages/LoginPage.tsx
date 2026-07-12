import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, Sparkles } from 'lucide-react';

import { useAuth } from '../../auth/AuthProvider';

export function LoginPage() {
  const { user, signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resetting, setResetting] = useState(false);

  if (user) {
    return <Navigate to="/inicio" replace />;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setError('');
    setNotice('');
    setSubmitting(true);

    try {
      await signIn({ email, password });
      const from = (
        location.state as { from?: { pathname?: string } } | null
      )?.from?.pathname;

      navigate(from ?? '/inicio', { replace: true });
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'No fue posible iniciar sesión.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResetPassword(): Promise<void> {
    setError('');
    setNotice('');

    if (!email.trim()) {
      setError('Ingresa tu correo para recuperar la contraseña.');
      return;
    }

    setResetting(true);

    try {
      await resetPassword(email);
      setNotice(
        'Firebase envió un correo para restablecer tu contraseña.',
      );
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'No fue posible enviar el correo de recuperación.',
      );
    } finally {
      setResetting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="login-brand-mark">
          <Sparkles size={28} />
        </div>
        <span>EduSuite AI · Cloud 0.6</span>
        <h1>Más tiempo para educar.</h1>
        <p>
          Un espacio de trabajo inteligente y seguro para equipos
          escolares.
        </p>
        <div className="login-feature-list">
          <span>✓ Autenticación real mediante Firebase</span>
          <span>✓ Sesión restaurada automáticamente</span>
          <span>✓ Rutas y menús protegidos por permisos</span>
        </div>
      </section>

      <section className="login-form-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-icon">
            <LockKeyhole size={24} />
          </div>

          <div>
            <span className="eyebrow">Bienvenido</span>
            <h2>Ingresa a tu workspace</h2>
            <p>Utiliza tu cuenta registrada en Firebase.</p>
          </div>

          <label>
            Correo
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              placeholder="nombre@correo.cl"
              required
            />
          </label>

          <label>
            Contraseña
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </label>

          {error && <div className="login-error">{error}</div>}
          {notice && <div className="login-success">{notice}</div>}

          <button
            className="login-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Ingresando…' : 'Ingresar a EduSuite AI'}
          </button>

          <button
            className="login-reset"
            type="button"
            disabled={resetting}
            onClick={handleResetPassword}
          >
            {resetting
              ? 'Enviando correo…'
              : '¿Olvidaste tu contraseña?'}
          </button>
        </form>
      </section>
    </main>
  );
}
