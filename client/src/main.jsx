import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const API = '/api';

function request(path, options = {}) {
  const token = localStorage.getItem('shoptopToken');
  return fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  }).then(async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'Ошибка запроса');
    return data;
  });
}

const emptyProduct = { name: '', price: '', category: '', description: '', referralUrl: '' };

function App() {
  const [route, setRoute] = useState(location.hash.replace('#', '') || '/');
  const [session, setSession] = useState(null);
  const [stores, setStores] = useState([]);
  const [storePage, setStorePage] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace('#', '') || '/');
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  async function loadSession() {
    if (!localStorage.getItem('shoptopToken')) return setSession(null);
    try {
      setSession(await request('/me'));
    } catch {
      localStorage.removeItem('shoptopToken');
      setSession(null);
    }
  }

  async function loadStores() {
    setStores(await request('/stores'));
  }

  async function loadDashboard() {
    if (!localStorage.getItem('shoptopToken')) return;
    setDashboard(await request('/my/dashboard'));
    await loadSession();
  }

  useEffect(() => {
    loadSession();
    loadStores();
  }, []);

  useEffect(() => {
    if (route.startsWith('/store/')) {
      const id = route.split('/')[2];
      request(`/stores/${id}`).then(setStorePage).catch((err) => setError(err.message));
    }
    if (['/dashboard', '/collection', '/editor', '/earnings'].includes(route)) loadDashboard();
  }, [route]);

  const active = route.split('/')[1] || '';

  async function auth(path, payload) {
    setError('');
    try {
      const data = await request(`/auth/${path}`, { method: 'POST', body: JSON.stringify(payload) });
      localStorage.setItem('shoptopToken', data.token);
      await loadSession();
      await loadStores();
      location.hash = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  }

  function logout() {
    localStorage.removeItem('shoptopToken');
    setSession(null);
    setDashboard(null);
    location.hash = '/';
  }

  const page = useMemo(() => {
    if (route === '/') return <Home stores={stores} session={session} />;
    if (route === '/auth') return <Auth onAuth={auth} error={error} />;
    if (route === '/dashboard') return <Dashboard dashboard={dashboard} reload={loadDashboard} />;
    if (route === '/collection') return <Collection dashboard={dashboard} reload={loadDashboard} />;
    if (route === '/editor') return <Editor dashboard={dashboard} reload={loadDashboard} />;
    if (route === '/earnings') return <Earnings dashboard={dashboard} />;
    if (route.startsWith('/store/')) return <StoreView data={storePage} session={session} reload={() => setRoute(route)} />;
    return <NotFound />;
  }, [route, stores, session, error, dashboard, storePage]);

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#/">ShopTop</a>
        <nav>
          <a className={active === '' ? 'active' : ''} href="#/">Витрины</a>
          <a className={active === 'dashboard' ? 'active' : ''} href="#/dashboard">Моя витрина</a>
          <a className={active === 'collection' ? 'active' : ''} href="#/collection">Товары</a>
          <a className={active === 'editor' ? 'active' : ''} href="#/editor">Редактор</a>
          <a className={active === 'earnings' ? 'active' : ''} href="#/earnings">Клики</a>
        </nav>
        <div className="user">
          {session?.user ? (
            <>
              <span>{session.user.displayName}</span>
              <b>{session.user.coins} монет</b>
              <button onClick={logout}>Выйти</button>
            </>
          ) : (
            <a className="button primary" href="#/auth">Войти</a>
          )}
        </div>
      </header>
      <main>{page}</main>
    </>
  );
}

function Home({ stores, session }) {
  return (
    <div className="stack">
      <section className="hero panel">
        <span className="badge">рабочая социальная сеть витрин</span>
        <h1>Создавайте витрины с реферальными товарами</h1>
        <p>Здесь нет демо-режима. Все витрины создаются пользователями и сохраняются в общей SQLite-базе.</p>
        <div className="actions">
          <a className="button primary" href={session ? '#/dashboard' : '#/auth'}>Открыть витрину</a>
          <a className="button" href="#stores">Смотреть витрины</a>
        </div>
      </section>
      <section id="stores" className="grid">
        {stores.length ? stores.map((store) => <StoreCard key={store.id} store={store} />) : <Empty />}
      </section>
    </div>
  );
}

function Auth({ onAuth, error }) {
  const [mode, setMode] = useState('register');
  const [form, setForm] = useState({ username: '', displayName: '', password: '', storeName: '' });
  const isRegister = mode === 'register';
  return (
    <section className="auth panel">
      <h1>{isRegister ? 'Регистрация витрины' : 'Вход'}</h1>
      <p>{isRegister ? 'Создайте аккаунт и первую пустую витрину.' : 'Войдите, чтобы управлять витриной.'}</p>
      <form onSubmit={(event) => { event.preventDefault(); onAuth(mode, form); }}>
        <input placeholder="Логин латиницей" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        {isRegister && <input placeholder="Ваше имя" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />}
        {isRegister && <input placeholder="Название витрины" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} />}
        <input type="password" placeholder="Пароль" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <div className="error">{error}</div>}
        <button className="button primary">{isRegister ? 'Создать витрину' : 'Войти'}</button>
      </form>
      <button className="link" onClick={() => setMode(isRegister ? 'login' : 'register')}>
        {isRegister ? 'У меня уже есть аккаунт' : 'Создать новую витрину'}
      </button>
    </section>
  );
}

function Dashboard({ dashboard, reload }) {
  if (!dashboard) return <NeedAuth />;
  const active = dashboard.products.filter((p) => p.active_slot);
  return (
    <div className="stack">
      <Storefront store={dashboard.store} products={active} own />
      <section className="cards">
        <Stat label="Товаров" value={`${dashboard.products.length}/100`} />
        <Stat label="Активно" value={`${active.length}/5`} />
        <Stat label="Клики" value={dashboard.stats.clicks} />
        <Stat label="Доход оценка" value={`$${dashboard.stats.estimatedIncome.toFixed(2)}`} />
      </section>
      <section className="panel">
        <h2>История</h2>
        {dashboard.activity.map((item) => <p key={item.id}>{item.text} <b>{item.coins > 0 ? '+' : ''}{item.coins}</b></p>)}
      </section>
    </div>
  );
}

function Editor({ dashboard, reload }) {
  const [form, setForm] = useState(null);
  useEffect(() => { if (dashboard?.store) setForm({
    name: dashboard.store.name,
    description: dashboard.store.description,
    category: dashboard.store.category,
    neonColor: dashboard.store.neon_color
  }); }, [dashboard?.store?.id]);
  if (!dashboard || !form) return <NeedAuth />;
  async function save(event) {
    event.preventDefault();
    await request('/my/store', { method: 'PATCH', body: JSON.stringify(form) });
    await reload();
    alert('Витрина сохранена');
  }
  return (
    <section className="panel form-panel">
      <h1>Редактор витрины</h1>
      <form onSubmit={save}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Название" />
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Категория" />
        <input value={form.neonColor} onChange={(e) => setForm({ ...form, neonColor: e.target.value })} placeholder="#a855f7" />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Описание витрины" />
        <button className="button primary">Сохранить</button>
      </form>
    </section>
  );
}

function Collection({ dashboard, reload }) {
  const [form, setForm] = useState(emptyProduct);
  if (!dashboard) return <NeedAuth />;
  async function add(event) {
    event.preventDefault();
    await request('/my/products', { method: 'POST', body: JSON.stringify(form) });
    setForm(emptyProduct);
    await reload();
  }
  async function toggle(product) {
    await request(`/my/products/${product.id}/active`, { method: 'PATCH' });
    await reload();
  }
  return (
    <div className="stack">
      <section className="panel form-panel">
        <h1>Добавить товар</h1>
        <form onSubmit={add}>
          <input placeholder="Название" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Цена" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input placeholder="Категория" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input placeholder="Реферальная ссылка" value={form.referralUrl} onChange={(e) => setForm({ ...form, referralUrl: e.target.value })} />
          <textarea placeholder="Описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button className="button primary">Добавить</button>
        </form>
      </section>
      <section className="grid">
        {dashboard.products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
            <button className={`button full ${product.active_slot ? 'green' : ''}`} onClick={() => toggle(product)}>
              {product.active_slot ? 'Активен' : 'На витрину'}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

function StoreView({ data, session }) {
  const [body, setBody] = useState('');
  if (!data) return <section className="panel"><h1>Загрузка витрины...</h1></section>;
  async function comment(event) {
    event.preventDefault();
    await request(`/stores/${data.store.id}/comments`, { method: 'POST', body: JSON.stringify({ body }) });
    location.reload();
  }
  return (
    <div className="stack">
      <Storefront store={data.store} products={data.products} />
      <section className="panel">
        <h2>О витрине</h2>
        <p>{data.store.description}</p>
      </section>
      <section className="panel">
        <h2>Комментарии</h2>
        {data.comments.map((c) => <p key={c.id}><b>{c.author_name}:</b> {c.body}</p>)}
        {session?.user ? (
          <form className="inline-form" onSubmit={comment}>
            <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Комментарий" />
            <button className="button primary">Отправить</button>
          </form>
        ) : <a className="button" href="#/auth">Войти, чтобы комментировать</a>}
      </section>
    </div>
  );
}

function Earnings({ dashboard }) {
  if (!dashboard) return <NeedAuth />;
  return (
    <section className="panel">
      <h1>Клики и предполагаемый доход</h1>
      <table>
        <tbody>
          {dashboard.products.map((p) => <tr key={p.id}><td>{p.name}</td><td>{p.clicks} кликов</td><td>${(p.clicks * 0.18).toFixed(2)}</td></tr>)}
        </tbody>
      </table>
    </section>
  );
}

function Storefront({ store, products }) {
  return (
    <section className="storefront" style={{ '--neon': store.neon_color }}>
      <h1>{store.name}</h1>
      <p>{store.owner_name} · {store.category}</p>
      <div className="product-row">
        {products.length ? products.map((p) => <ProductCard key={p.id} product={p} />) : <div className="empty">Пока нет активных товаров</div>}
      </div>
    </section>
  );
}

function StoreCard({ store }) {
  return (
    <a className="store-card" href={`#/store/${store.id}`} style={{ '--neon': store.neon_color }}>
      <h2>{store.name}</h2>
      <p>{store.description}</p>
      <span>{store.owner_name} · {store.category}</span>
      <b>{store.active_count}/5 товаров</b>
    </a>
  );
}

function ProductCard({ product }) {
  async function open() {
    const data = await request(`/products/${product.id}/click`, { method: 'POST' });
    window.open(data.url, '_blank', 'noopener,noreferrer');
  }
  async function like() {
    await request(`/products/${product.id}/like`, { method: 'POST' });
    location.reload();
  }
  return (
    <article className="product-card">
      <div className="product-art">ref</div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>{product.price} · {product.category}</span>
      <div className="actions">
        <button className="button cyan" onClick={open}>Перейти</button>
        <button className="button" onClick={like}>♡ {product.likes}</button>
      </div>
    </article>
  );
}

function Stat({ label, value }) {
  return <div className="stat"><b>{value}</b><span>{label}</span></div>;
}

function Empty() {
  return <section className="panel empty"><h2>Пока нет витрин</h2><p>Создайте первую витрину через регистрацию.</p><a className="button primary" href="#/auth">Создать витрину</a></section>;
}

function NeedAuth() {
  return <section className="panel empty"><h1>Нужно войти</h1><a className="button primary" href="#/auth">Войти или зарегистрироваться</a></section>;
}

function NotFound() {
  return <section className="panel empty"><h1>Страница не найдена</h1><a className="button" href="#/">На главную</a></section>;
}

createRoot(document.getElementById('root')).render(<App />);
