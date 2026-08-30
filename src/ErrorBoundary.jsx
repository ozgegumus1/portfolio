import { Component } from 'react';

// Site genelinde beklenmeyen bir çalışma zamanı hatası (ör. bir tarayıcının
// desteklemediği bir API) olursa, React bu hatayı yakalamayan bir uygulamayı
// tamamen boş bırakır. Bu bileşen tüm uygulamayı sarar ve böyle bir durumda
// sayfanın bembeyaz/boş kalmasını engeller.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Uygulama genelinde beklenmeyen hata:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
