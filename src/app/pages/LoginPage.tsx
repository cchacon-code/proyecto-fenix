import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, Sparkles } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';

export function LoginPage() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@edusuite.ai');
  const [password, setPassword] = useState('EduSuite2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/inicio" replace />;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await signIn({ email, password });
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from ?? '/inicio', { replace: true });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No fue posible iniciar sesión.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="login-brand-mark"><Sparkles size={28} /></div>
        <span>EduSuite AI · Platform 0.4</span>
        <h1>Más tiempo para educar.</h1>
        <p>Un espacio de trabajo inteligente para equipos escolares.</p>
        <div className="login-feature-list">
          <span>✓ Identidad centralizada con EduCore</span>
          <span>✓ Menús y rutas según permisos</span>
          <span>✓ Arquitectura preparada para Firebase Auth</span>
        </div>
      </section>

      <section className="login-form-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-icon"><LockKeyhole size={24} /></div>
          <div>
            <span className="eyebrow">Bienvenido</span>
            <h2>Ingresa a tu workspace</h2>
            <p>Usa una cuenta de demostración para validar permisos.</p>
          </div>

          <label>
            Correo
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
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
              <button type="button" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {error && <div className="login-error">{error}</div>}

          <button className="login-submit" type="submit" disabled={submitting}>
            {submitting ? 'Ingresando…' : 'Ingresar a EduSuite AI'}
          </button>

          <div className="demo-accounts">
            <strong>Cuentas de prueba</strong>
            <button type="button" onClick={() => { setEmail('admin@edusuite.ai'); setPassword('EduSuite2026!'); }}>Administrador</button>
            <button type="button" onClick={() => { setEmail('coordinacion@edusuite.ai'); setPassword('EduSuite2026!'); }}>Coordinación</button>
            <button type="button" onClick={() => { setEmail('docente@edusuite.ai'); setPassword('EduSuite2026!'); }}>Docente</button>
          </div>
        </form>
      </section>
    </main>
  );
}
