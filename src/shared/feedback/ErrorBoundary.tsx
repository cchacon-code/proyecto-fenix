import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps { children: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; errorMessage: string; }

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('EduSuite AI error:', error, info);
  }

  private reload = (): void => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <main className="fatal-error-page">
          <section className="fatal-error-card">
            <span className="fatal-error-icon">!</span>
            <h1>Ocurrió un problema inesperado</h1>
            <p>La aplicación evitó que el error afectara el resto del sistema.</p>
            <small>{this.state.errorMessage}</small>
            <button type="button" className="ui-button ui-button-primary" onClick={this.reload}>
              Recargar aplicación
            </button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}
